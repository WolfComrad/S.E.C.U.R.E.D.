using System.ComponentModel.DataAnnotations;

namespace SECURED_WEB.Entities;

public class Message
{
    public int Id { get; set; }
    [Required]
    public string Text { get; set; } = string.Empty;
    public bool IsViewed { get; set; }
    public bool IsReceived { get; set; }    
    public DateTime DateTimeSent { get; set; }

    public virtual User Sender { get; set; } = null!;
    public virtual User Receiver { get; set; } = null!;
    public int SenderId { get; set; }
    public int ReceiverId { get; set; }
  


}
public class MessageDto
{
    public int Id { get; set; }
    [Required]
    public string Text { get; set; } = string.Empty;
    public bool IsViewed { get; set; }
    public bool IsReceived { get; set; }
    public DateTime DateTimeSent { get; set; }
    public int SenderId { get; set; }
    public int ReceiverId { get; set; }

}
