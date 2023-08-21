namespace SECURED_WEB.Entities;

public class ConversationUser
{
    public int Id { get; set; } 
    public int UserId { get; set; }
    public int ConversationId { get; set; }

    public Conversation Conversation { get; set; } = null!;
    public User User { get; set; } = null!;
}
