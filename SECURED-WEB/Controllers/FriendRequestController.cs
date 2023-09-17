using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SECURED_WEB.Data;
using SECURED_WEB.Entities;
using System.Linq;

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

    [HttpPost("send")]
    [Authorize]
    public async Task<IActionResult> SendFriendRequest(int receiverId)
    {
        // Assuming you have authentication in place to get the current user's ID
        var sendingUser = await this.userManager.GetUserAsync(User);
        var receivingUser = this.userManager.Users.FirstOrDefault(x => x.Id == receiverId); 

        var friendRequest = new FriendRequest
        {   Sender = sendingUser,
            Receiver = receivingUser,
            ReceiverId = receiverId,
            SenderId = sendingUser.Id,
            UserName = sendingUser.UserName,
              
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

    [HttpPost("accept")]
    [Authorize]
    public async Task<IActionResult> AcceptFriendRequest(int requestId)
     {
        var recievingUser = await this.userManager.GetUserAsync(User);
        var request = dataContext.FriendRequest.FirstOrDefault(x => x.Id == requestId);

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

   

    // Helper method to get turn FriendRequest To DTO's
    private static IQueryable<FriendRequestDto> ToFriendRequestDtos(IQueryable<FriendRequest> messages)
    {
        return messages.Select(x => new FriendRequestDto
        {
            Id = x.Id,
            UserName = x.UserName,
            ReceiverId = x.ReceiverId,
            SenderId = x.SenderId,
           
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
