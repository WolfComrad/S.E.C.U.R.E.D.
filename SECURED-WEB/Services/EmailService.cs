using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using SECURED_WEB.Models;

namespace SECURED_WEB.Services;

public class EmailService
{
    private readonly EmailConfiguration emailConfiguration;
    private readonly IConfiguration configuration;
    public EmailService(IOptions<EmailConfiguration> emailConfiguration, IConfiguration configuration)
    {
        this.emailConfiguration = emailConfiguration.Value;
        this.configuration = configuration;
        
    }


    public void SendEmail(string toEmail, string subject, string messageBody)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress(configuration["EmailConfiguration:SmtpUsername"], configuration["EmailConfiguration:SenderEmail"]));

        emailMessage.To.Add( new MailboxAddress("",toEmail));
        emailMessage.Subject = subject;

        var bodyBuilder = new BodyBuilder { HtmlBody = messageBody };
        
        int port = int.Parse(configuration["EmailConfiguration:SmtpPort"]);
        emailMessage.Body = bodyBuilder.ToMessageBody();
        var password = System.Environment.GetEnvironmentVariable("SMTP_PASS");
        using (var client = new SmtpClient())
        {

           client.Connect(configuration["EmailConfiguration:SmtpServer"], port);
           

           client.Authenticate(configuration["EmailConfiguration:SmtpUsername"], password );
           client.Send(emailMessage);
           client.Disconnect(true);
        }

    }
}
