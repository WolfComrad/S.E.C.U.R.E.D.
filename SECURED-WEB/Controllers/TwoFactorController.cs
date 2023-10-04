using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SECURED_WEB.Data;
using SECURED_WEB.Entities;
using SECURED_WEB.Models;
using SECURED_WEB.Services;

namespace SECURED_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TwoFactorController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        public TwoFactorController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }



        [HttpPost("enable2fa")]
        public async Task<IActionResult> Enable2FA(string code)
        {
            var user = await userManager.GetUserAsync(User);


            var isTokenValid = await userManager.VerifyTwoFactorTokenAsync(user, "Default", code);

            if (isTokenValid)
            {
                user.TwoFactorEnabled = true;
                await signInManager.SignInAsync(user, false);

                return Ok(ToUserDto(userManager.Users).SingleAsync(x => x.UserName == user.UserName));
            }
            return BadRequest("Invalid code");
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
                TwoFactorEnabled = x.TwoFactorEnabled,
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
}
