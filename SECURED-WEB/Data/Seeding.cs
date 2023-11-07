using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SECURED_WEB.Entities;

namespace SECURED_WEB.Data;

public class Seeding
{

    public static async Task Init(IServiceProvider services)
    {
        var context = services.GetRequiredService<DataContext>();

        await context.Database.MigrateAsync();
        await SeedUsers(services);


    }


    private static async Task SeedUsers(IServiceProvider services)
    {
        const string password = "Password123!";
        const string password2 = "FizzBuzz123!";
        const string password3 = "Localhost123!";
        const string password4 = "HelloWorld123!";

       var userManager = services.GetRequiredService<UserManager<User>>();

        if (userManager.Users.Any())
        {
            return;
        }
         
        var Jacob = new User
        {
            FirstName = "Jacob",
            LastName = "Dillon",
            UserName = "JakeSnake",
            Email = "jacobdillon119@gmail.com",
            PhoneNumber = "9852888019",
            Private_Key = """
            -----BEGIN EC PRIVATE KEY-----
            MHcCAQEEIFwaBa6O1d3+hXQ2wJEBAsXDjIvstHTbSSsJMYfvGeXioAoGCCqGSM49
            AwEHoUQDQgAENHnFaRPT9O3tLf2ekK8/xSbz6Ox8DCLW+72McrH9pgnFLb+y0vPw
            J+Vfs2ulupM4FtX52FwP8RCIrKLwqS3J3g==
            -----END EC PRIVATE KEY-----
            """,

            Public_Key = """
            -----BEGIN PUBLIC KEY-----
            MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAENHnFaRPT9O3tLf2ekK8/xSbz6Ox8
            DCLW+72McrH9pgnFLb+y0vPwJ+Vfs2ulupM4FtX52FwP8RCIrKLwqS3J3g==
            -----END PUBLIC KEY-----
            """

        };
        var result = await userManager.CreateAsync(Jacob, password);
        var Marco = new User
        {
            FirstName = "Marco",
            LastName = "Feigero",
            UserName = "MarcoPolo",
            Email = "marcofiguero@gmail.com",
            PhoneNumber = "9854782011",
            Private_Key = """
            -----BEGIN EC PRIVATE KEY-----
            MHcCAQEEIJHbUfZpZs5hekGWDDtIMWlHgkN7ZplAiHPzFFedrENIoAoGCCqGSM49
            AwEHoUQDQgAEWxuhmEiIOWUnPv3CAwAdZhiUPX2z5xeb3g+d/I8FWxEnx4fYoVvU
            /2RAO/3PoXWxeR7KCimrl6lr2tfx6gSB8w==
            -----END EC PRIVATE KEY-----
            """,
            Public_Key = """
            -----BEGIN PUBLIC KEY-----
            MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEWxuhmEiIOWUnPv3CAwAdZhiUPX2z
            5xeb3g+d/I8FWxEnx4fYoVvU/2RAO/3PoXWxeR7KCimrl6lr2tfx6gSB8w==
            -----END PUBLIC KEY-----
            """
        };
        await userManager.CreateAsync(Marco, password2);

        var Patrick = new User
        {
            FirstName = "Patrick",
            LastName = "Theriot",
            UserName = "PatrickStar",
            Email = "theriotpatrick@gmail.com",
            PhoneNumber = "9854782011",
            Private_Key = """
            -----BEGIN EC PRIVATE KEY-----
            MHcCAQEEIP5SBLkGgfXlcS268THmf9E6ZI6ei29EAwiGuHqumJ0UoAoGCCqGSM49
            AwEHoUQDQgAEIE6sZngT+o8DC9m0ZSm8Is0CkgRMYGKspoUuIhOIpXaWAm1Hp877
            XWGWLvn/f1KrlOsK4EDdH+BMy7fy6eDZVw==
            -----END EC PRIVATE KEY----- 
            """,
            Public_Key = """
            -----BEGIN PUBLIC KEY-----
            MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEIE6sZngT+o8DC9m0ZSm8Is0CkgRM
            YGKspoUuIhOIpXaWAm1Hp877XWGWLvn/f1KrlOsK4EDdH+BMy7fy6eDZVw==
            -----END PUBLIC KEY-----
            """
        };

        await userManager.CreateAsync(Patrick, password3);
        var Camden = new User
        {

            FirstName = "Camden",
            LastName = "Doeman",
            UserName = "CamOpener",
            Email = "camdendoeman@gmail.com",
            PhoneNumber = "9255713011"

        };
         await userManager.CreateAsync(Camden, password4);

      
            await services.GetRequiredService<DataContext>().SaveChangesAsync();
         

    }
}
