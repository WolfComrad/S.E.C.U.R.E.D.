using System.ComponentModel.DataAnnotations;

namespace SECURED_WEB.Models
{
    public class MessageModel
    {
        [Required]
        public string Message { get; set; } = string.Empty;
        [Required]
        public int userId { get; set; }
    }
}
