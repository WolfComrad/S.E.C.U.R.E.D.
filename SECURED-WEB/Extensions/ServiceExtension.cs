using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SECURED_WEB.Data;
using SECURED_WEB.Entities;
using SECURED_WEB.Hubs;

namespace SECURED_WEB.Extensions;

public static class ServiceExtensions
{
    public  static void ConfigureServices(this IServiceCollection services, IConfiguration configuration)
    {

        services.AddDbContext<DataContext>(options => options.UseSqlServer(configuration.GetConnectionString("DataContext")));


        services.AddIdentity<User, IdentityRole<int>>()
            .AddEntityFrameworkStores<DataContext>();

        services.AddSignalR();
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
            });
        });

        services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddScoped<ChatHub>();
    }
}
