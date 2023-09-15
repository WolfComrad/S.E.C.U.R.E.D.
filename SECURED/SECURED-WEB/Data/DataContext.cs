using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SECURED_WEB.Entities;
using System.Data;

namespace SECURED_WEB.Data;

public class DataContext : IdentityDbContext<User, IdentityRole<int>, int, IdentityUserClaim<int>, IdentityUserRole<int>, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
{
    public DbSet<Message> Messages { get; set; }

    public DataContext (DbContextOptions<DataContext> options) : base(options)
    {

    }



    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Message>()
            .HasOne<User>(a => a.Sender)
            .WithMany(x => x.SentMessages)
            .HasForeignKey(x => x.SenderId);

        modelBuilder.Entity<Message>()
            .HasOne<User>(a => a.Receiver)
            .WithMany(x => x.ReceivedMessages)
            .HasForeignKey(x => x.ReceiverId).OnDelete(DeleteBehavior.NoAction); 
                

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
    }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        base.ConfigureConventions(configurationBuilder);
    }
}
