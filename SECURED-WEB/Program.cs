using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SECURED_WEB.Data;
using SECURED_WEB.Entities;
using SECURED_WEB.Extensions;
using SECURED_WEB.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.ConfigureServices(builder.Configuration);


var app = builder.Build();


using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    await Seeding.Init(services);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();
app.UseCors();


app.MapHub<ChatHub>("/chathub");


app.UseHttpsRedirection();



app.MapControllers();

app.Run();
