using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SECURED_WEB.Data;
using SECURED_WEB.Entities;
using SECURED_WEB.Hubs;
using SECURED_WEB.Models;
using SECURED_WEB.Services;
using Microsoft.Extensions;
namespace SECURED_WEB.Extensions;

public static class ServiceExtensions
{
    public  static void ConfigureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<DataContext>(options => options.UseSqlServer(configuration.GetConnectionString("DataContext")));


        services.AddIdentity<User, IdentityRole<int>>()
            .AddEntityFrameworkStores<DataContext>()
            .AddDefaultTokenProviders();

        services.AddSignalR();
        services.AddCors(options =>
        {
            options.AddPolicy("AllowLocalhost",
        builder =>
        {
            builder.WithOrigins("http://10.0.2.2:8081") // Update with your React Native app's HTTPS URL
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
        });

       

        var emailConfig = configuration.GetSection("EmailConfiguration")
            .Get<EmailConfiguration>();

        services.AddSingleton(emailConfig);
        services.AddTransient<EmailService>();

        

        services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddScoped<ChatHub>();
    }
}
