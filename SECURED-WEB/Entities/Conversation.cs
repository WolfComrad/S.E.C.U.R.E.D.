namespace SECURED_WEB.Entities
{
    public class Conversation
    {
        public int Id { get; set; }
        public string ConversationName { get; set; } = string.Empty;

        public string CoverPhoto { get; set; } = string.Empty;

        public ICollection<Message> Messages { get; set; } = new List<Message>();
    }
}
