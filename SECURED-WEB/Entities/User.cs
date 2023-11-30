using Microsoft.AspNetCore.Identity;

namespace SECURED_WEB.Entities;

public class User : IdentityUser<int>
{
    public override int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public virtual ICollection<Message> SentMessages { get; set; } = new List<Message>();
    public virtual ICollection<Message> ReceivedMessages { get; set; } = new List<Message>();

    // Navigation properties for FriendRequests
    public virtual ICollection<FriendRequest> SentFriendRequests { get; set; } = new List<FriendRequest>();

    
    public virtual ICollection<FriendRequest> ReceivedFriendRequests { get; set; } = new List<FriendRequest>();
    // Navigation property for Friends
    public virtual ICollection<User> Friends { get; set; } = new List<User>();

    public string Avatar { get; set; } = string.Empty;

    public string Private_Key { get; set; } = string.Empty;

    public string Public_Key { get; set; } = string.Empty;

}   



public class UserLoginDto
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;

    public string UserName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;
    public bool TwoFactorEnabled { get; set; } = false;
}


public class UserDto
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;

    public string UserName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string Private_Key { get; set; } = string.Empty;
    public string Public_Key { get; set; } = string.Empty;

    public string Avatar { get; set; } = "https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg";
    public bool TwoFactorEnabled { get; set; } = false;
    public ICollection<FriendRequestDto> SentFriendRequest { get; set;} = new List<FriendRequestDto>();
    public ICollection<FriendRequestDto> ReceivedFriendRequest { get; set; } = new List<FriendRequestDto>();
    public  ICollection<UserDto> Friends { get; set; } = new List<UserDto>();

}

