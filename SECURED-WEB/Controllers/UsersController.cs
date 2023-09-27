
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
public class UsersController : ControllerBase
{
    private readonly DataContext dataContext;
    private readonly UserManager<User> userManager;

    public UsersController(DataContext dataContext, UserManager<User> userManager)
    {
        this.dataContext = dataContext;
        this.userManager = userManager;
    }

    [HttpGet("getusers")]
    [Authorize]
    public async Task<ActionResult<IQueryable<UserDto>>> GetOtherUsers()
        { 
        var currentUser = await userManager.GetUserAsync(User);
        var users =  userManager.Users;
        users = users.Where(x => x.Id != currentUser.Id);
       

       

        return Ok(ToUserDto(users));

    }

    [HttpGet("friends/{userId}")]
    [Authorize]
    public  ActionResult<IQueryable<UserDto>> GetFriends(int userId)
    {
        // Retrieve the user by ID
        var user = dataContext.Users
     .Include(u => u.Friends)
     .FirstOrDefault(u => u.Id == userId);

        if (user == null)
        {
            return NotFound("User not found.");
        }

        // Retrieve the list of friends
        var friends = user.Friends.AsQueryable();

        return Ok(ToUserDto(friends));
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
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                UserName = x.UserName,
                Email = x.Email,
                PhoneNumber = x.PhoneNumber,


            }).ToList()





        });
    }
}
