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
        const string password3 = "HelloWorld123!";

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
            
            
           

        };
        var result = await userManager.CreateAsync(Jacob, password);
        var Marco = new User
        {
            FirstName = "Marco",
            LastName = "Feigero",
            UserName = "MarcoPolo",
            Email = "marcofiguero@gmail.com",
            PhoneNumber = "9854782011"

        };
        await userManager.CreateAsync(Marco, password2);
        var Camden = new User
        {

            FirstName = "Camden",
            LastName = "Doeman",
            UserName = "CamOpener",
            Email = "camdendoeman@gmail.com",
            PhoneNumber = "9255713011"

        };
         await userManager.CreateAsync(Camden, password3);

      
            await services.GetRequiredService<DataContext>().SaveChangesAsync();
         

    }
}
