using Microsoft.AspNetCore.SignalR;
using SECURED_WEB.Entities;
using SECURED_WEB.Models;

namespace SECURED_WEB.Hubs
{
    public class ChatHub : Hub
    {
        private readonly string botUser;

        public ChatHub()
        {
            botUser = "Chat bot";
        }
        public async Task JoinRoomAsync(string user, string room)
        {
            
            await Groups.AddToGroupAsync(Context.ConnectionId, room);
            await Clients.Groups(room).SendAsync("ReceiveMessage", $"{user} has joined {room}");
        }
       /* public override async Task OnConnectedAsync()
        {
          
            await Clients.All.SendAsync("ReceiveMessage", $"{Context.ConnectionId} has joined");
        
        }*/

        public async Task SendMessageAsync(string name,string message)
        {
           
            await Clients.Group(name).SendAsync("GotUserName",$"{name} {message}");

        }

    }
}
