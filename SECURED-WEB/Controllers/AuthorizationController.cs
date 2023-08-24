using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.EntityFrameworkCore;
using SECURED_WEB.Data;
using SECURED_WEB.Entities;
using SECURED_WEB.Extensions;
using SECURED_WEB.Hubs;
using SECURED_WEB.Models;

namespace SECURED_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly SignInManager<User> signInManager;
        private readonly UserManager<User> userManager;
        private readonly ChatHub chatHub;
        private readonly IServiceProvider service;

        public AuthorizationController(SignInManager<User> signInManager, UserManager<User> userManager, IServiceProvider service, ChatHub chatHub)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.service = service;
            this.chatHub = chatHub;
        }

        [HttpGet("whoami")]
        [Authorize]
        public async Task<ActionResult<UserDto>> WhoAmI()
        {
            var name = User.GetUserName();
            var result = await ToUserDto(userManager.Users)
                               .SingleAsync(x => x.UserName == name);
            return Ok(result);  
        }



        [HttpPost("login")]

        public async Task<IActionResult> Login(LoginModel login)
        {
            var user = await userManager.FindByNameAsync(login.UserName);
          

           
            if (user == null)
            {
                return BadRequest();
            }

            var result = await signInManager.CheckPasswordSignInAsync(user, login.Password, true);

            if(!result.Succeeded) 
            {
                return BadRequest();
            }

            await signInManager.SignInAsync(user,false);
            
            var resultObject = await ToUserDto(userManager.Users)
                                     .SingleAsync(x => x.UserName == user.UserName); 

            return Ok(resultObject);
              }


        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Ok();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register (RegisterModel register)
        {
            if (register == null)
            {
                return BadRequest();
            }
            var users = userManager.Users.ToList();
            foreach (var user in users)
            {
                if(user.UserName == register.UserName)
                {
                    return BadRequest("username is taken");
                }
            }
            var newUser = new User
            {
                FirstName = register.FirstName,
                LastName = register.LastName,
                UserName = register.UserName,
                Email = register.Email,
                PhoneNumber = register.PhoneNumber,
                PasswordHash = register.Password
            };

            await userManager.CreateAsync(newUser, register.Password);
            await service.GetRequiredService<DataContext>().SaveChangesAsync();
            var userDto = ToUserDto(userManager.Users).Where(x => x.UserName == register.UserName);


            return Ok(userDto);
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
                PhoneNumber = x.PhoneNumber

            });
        }
    }
}
