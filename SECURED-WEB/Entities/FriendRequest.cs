namespace SECURED_WEB.Entities;

public class FriendRequest
{
    public int Id { get; set; }

    // Usernames can be stored here if needed
     public string UserName { get; set; } = string.Empty;

    // Foreign key and navigation property for the sender
    public int SenderId { get; set; }
    public virtual User Sender { get; set; }

    // Foreign key and navigation property for the receiver
    public int ReceiverId { get; set; }
    public virtual User Receiver { get; set; }

    public string Pub_Key { get; set; } = string.Empty;
}

public class FriendRequestDto
{
    public int Id { get; set; }

    // Usernames can be stored here if needed
    public string UserName { get; set; } = string.Empty;

    // Foreign key and navigation property for the sender
    public int SenderId { get; set; }
    

    // Foreign key and navigation property for the receiver
    public int ReceiverId { get; set; }

    public string Pub_Key { get; set; } = string.Empty;
    
}
