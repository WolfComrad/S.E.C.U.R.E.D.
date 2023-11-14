using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SECURED_WEB.Data;
using SECURED_WEB.Entities;
using SECURED_WEB.Hubs;
using SECURED_WEB.Models;
using System.Collections.Generic;

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

        if (id == null)
        {
            return BadRequest();
        }

        var user = userManager.Users.FirstOrDefault(x => x.Id == id);



       var MessageListFromSender = context.Messages.Where(x => x.ReceiverId == sessionUser.Id && x.SenderId == user.Id);
       var MessageListFromReciever = context.Messages.Where(x => x.SenderId == sessionUser.Id && x.ReceiverId == user.Id);


        var CombinedMessageList = MessageListFromSender.Concat(MessageListFromReciever).OrderByDescending(x => x.DateTimeSent);
      
        foreach (var message in CombinedMessageList)
        {
            message.IsViewed = true;
        }
        foreach(var message in context.Messages.Where(x => x.ReceiverId == user.Id))
        {
            message.IsViewed = true;
        }
        await context.SaveChangesAsync();

        return Ok(ToMessageDto(CombinedMessageList));
    }

    [HttpPost("chat")]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public async Task<IActionResult> Create(MessageModel model)
    {

        var sender = await userManager.GetUserAsync(User);

        var receiver =  userManager.Users.FirstOrDefault(x => x.Id == model.userId);

        if(receiver == null)
        {
            return BadRequest();
        }

       var user =  context.Users.Include(x => x.Friends).FirstOrDefault(x => x.Id == sender.Id);

        if (!user.Friends.Contains(receiver))
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
            Text = model.Message,
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
            SenderId = x.SenderId,
            
        });
    }
}
