using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SECURED_WEB.Data;
using SECURED_WEB.Entities;

namespace SECURED_WEB.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FriendRequestController : ControllerBase
{
    private readonly DataContext dataContext;
    private readonly UserManager<User> userManager;

    public FriendRequestController(DataContext dataContext, UserManager<User> userManager)
    {
        this.dataContext = dataContext;
        this.userManager = userManager;
    }


    [HttpGet("get-requests/{id}")]
    [Authorize]
    public  async Task<ActionResult<FriendRequestDto>> GetMyFriendRequest(int id)
    { 
        var myFriendRequest =  this.dataContext.FriendRequest.Where(x => x.ReceiverId == id);
        
        var dtos = ToFriendRequestDtos(myFriendRequest);
        return Ok(dtos);
    }


    [HttpPost("send")]
    [Authorize]
    public async Task<IActionResult> SendFriendRequest(FriendRequestDto  request)
    {
        // Assuming you have authentication in place to get the current user's ID
        var sendingUser = await this.userManager.GetUserAsync(User);
        var receivingUser = this.userManager.Users.FirstOrDefault(x => x.Id == request.ReceiverId);
        //var receivingUser = this.userManager.Users.FirstOrDefault(x => x.Id == receiverId);

        var friendRequest = new FriendRequest
        {   Sender = sendingUser,
            Receiver = receivingUser,
            ReceiverId = request.ReceiverId,
            SenderId = sendingUser.Id,
            UserName = sendingUser.UserName,
            Pub_Key = sendingUser.Public_Key
              
        };
        dataContext.FriendRequest.Add(friendRequest);

        sendingUser.SentFriendRequests.Add(friendRequest);

        receivingUser?.ReceivedFriendRequests.Add(friendRequest);
        ;
        await dataContext.SaveChangesAsync();
        var requests = dataContext.FriendRequest;

        return Ok(ToFriendRequestDtos(requests));

        // Call your FriendRequestService to send a friend request
       
    }

    [HttpPost("accept/{id}")]
    [Authorize]
    public async Task<IActionResult> AcceptFriendRequest(int id)
      {
        var recievingUser = await this.userManager.GetUserAsync(User);
        var request = dataContext.FriendRequest.FirstOrDefault(x => x.Id == id);

        var sendingUser  = this.userManager.Users.FirstOrDefault(x => x.Id == request.SenderId);

        sendingUser.SentFriendRequests.Remove(request);
        recievingUser.ReceivedFriendRequests.Remove(request);
        dataContext.FriendRequest.Remove(request);
        sendingUser.Friends.Add(recievingUser);
        recievingUser.Friends.Add(sendingUser);

       await dataContext.SaveChangesAsync();
        var users = new List<User>();
        users.Add(recievingUser);
        return Ok(ToUserDto(dataContext.Users.Where(x => x.Id == recievingUser.Id)));
        
     }

   
    private static ICollection<FriendRequestDto> ConvertToDtoForReturn(ICollection<FriendRequestDto> data)
    {
        return (ICollection<FriendRequestDto>)data.Select(x => new FriendRequestDto
        {
            Id = x.Id,
            UserName = x.UserName,
            ReceiverId = x.ReceiverId,
            SenderId = x.SenderId,

        });
    }

    // Helper method to get turn FriendRequest To DTO's
    private static IQueryable<FriendRequestDto> ToFriendRequestDtos(IQueryable<FriendRequest> messages)
    {
        return messages.Select(x => new FriendRequestDto
        {
            Id = x.Id,
            UserName = x.UserName,
            ReceiverId = x.ReceiverId,
            SenderId = x.SenderId,
            Pub_Key = x.Pub_Key,
           
        });
    }
    private static IQueryable<UserDto> ToUserDto(IQueryable<User> users)
    {
        return users.Select(x => new UserDto
        {
            Id = x.Id,
            FirstName = x.FirstName,
            LastName = x.LastName,
            UserName = x.UserName,
            Email = x.Email,
            PhoneNumber = x.PhoneNumber,
            Public_Key = x.Public_Key,
            SentFriendRequest = x.SentFriendRequests.Select(x => new FriendRequestDto
            {
                Id = x.Id,
                SenderId = x.SenderId,
                UserName = x.UserName,
                ReceiverId = x.ReceiverId,
            }).ToList(),

            ReceivedFriendRequest = x.ReceivedFriendRequests.Select(x => new FriendRequestDto
            {
                Id = x.Id,
                SenderId = x.SenderId,
                UserName = x.UserName,
                ReceiverId = x.ReceiverId,
                Pub_Key = x.Pub_Key
            }).ToList(),
            Friends = x.Friends.Select(x => new UserDto
            {
                FirstName = x.FirstName,
                LastName = x.LastName,
                UserName = x.UserName,
                Email = x.Email,
                PhoneNumber = x.PhoneNumber,
                SentFriendRequest = x.SentFriendRequests.Select(x => new FriendRequestDto
                {
                    Id = x.Id,
                    SenderId = x.SenderId,
                    UserName = x.UserName,
                    ReceiverId = x.ReceiverId,
                }).ToList(),

                ReceivedFriendRequest = x.ReceivedFriendRequests.Select(x => new FriendRequestDto
                {
                    Id = x.Id,
                    SenderId = x.SenderId,
                    UserName = x.UserName,
                    ReceiverId = x.ReceiverId,
                }).ToList(),

            }).ToList()






        }) ;
    }
}
