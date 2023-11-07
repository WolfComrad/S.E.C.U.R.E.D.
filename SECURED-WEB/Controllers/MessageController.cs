using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SECURED_WEB.Data;
using SECURED_WEB.Entities;
using SECURED_WEB.Hubs;

namespace SECURED_WEB.Controllers;

[Microsoft.AspNet.SignalR.Authorize]

[Route("api/[controller]")]
[ApiController]

public class MessageController : ControllerBase
{
    public readonly DataContext context;
    public readonly UserManager<User> userManager;
    public readonly ChatHub chatHub;
    

    public MessageController(DataContext context, UserManager<User> userManager, ChatHub chatHub)
    {
        this.context = context;
        this.userManager = userManager;
        this.chatHub= chatHub;
    }
    [HttpGet("{id}")]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public async Task<IActionResult> GetMessagesByUserId(int id)
    {
        var sessionUser = await userManager.GetUserAsync(User);

        if (id == null || id != sessionUser.Id)
        {
            return BadRequest();
        }

        var user = userManager.Users.FirstOrDefault(x => x.Id == id);



       var MessageList = context.Messages.Where(x => x.ReceiverId == user.Id);
        foreach (var message in MessageList)
        {
            message.IsViewed = true;
        }
        foreach(var message in context.Messages.Where(x => x.ReceiverId == user.Id))
        {
            message.IsViewed = true;
        }
        await context.SaveChangesAsync();

        return Ok(ToMessageDto(MessageList));
    }

    [HttpPost("chat")]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public async Task<IActionResult> Create(string message,int sendTo)
    {

        var sender = await userManager.GetUserAsync(User);

        var receiver =  userManager.Users.FirstOrDefault(x => x.Id == sendTo);

        if(receiver == null)
        {
            return BadRequest();
        }
        if (!sender.Friends.Contains(receiver))
        {
            return BadRequest("Not a friend can not message.");
        }
        var createdMessage = new Message
        {
            Sender = sender,
            SenderId = sender.Id,
            ReceiverId = receiver.Id,
            DateTimeSent = DateTime.UtcNow,
            IsReceived = false,
            IsViewed = false,
            Text = message,
        };
        createdMessage.ReceiverId = receiver.Id;
        sender.SentMessages.Add(createdMessage);
        createdMessage.IsReceived = true;
        context.Messages.Add(createdMessage);

        var messages = context.Messages.Where(x => x.ReceiverId == receiver.Id);
        await context.SaveChangesAsync();
                

        return Ok(ToMessageDto(messages));
    }

    private static IQueryable<MessageDto> ToMessageDto(IQueryable<Message> messages)
    {
        return messages.Select(x => new MessageDto
        {
            Id = x.Id,
            Text = x.Text,
            DateTimeSent = x.DateTimeSent,
            IsReceived = x.IsReceived,
            IsViewed = x.IsViewed,
            ReceiverId = x.ReceiverId,
            SenderId = x.SenderId
            
        });
    }
}
