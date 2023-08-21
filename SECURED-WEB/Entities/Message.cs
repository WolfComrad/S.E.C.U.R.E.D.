namespace SECURED_WEB.Entities;

public class Message
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public bool IsViewed { get; set; }
    public bool IsReceived { get; set; }
    public DateTime DateTimeSent { get; set; }

    public int ConversationId { get; set; }
    public Conversation Conversation { get; set; } = null!;

    public User Sender { get; set; } = null!;
    public User Receiver { get; set; } = null!;


}
