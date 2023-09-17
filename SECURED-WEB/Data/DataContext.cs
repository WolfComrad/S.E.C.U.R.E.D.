using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SECURED_WEB.Entities;
using System.Data;

namespace SECURED_WEB.Data;

public class DataContext : IdentityDbContext<User, IdentityRole<int>, int, IdentityUserClaim<int>, IdentityUserRole<int>, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
{
    public DbSet<Message> Messages { get; set; }
    public DbSet<FriendRequest> FriendRequest { get; set; }
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

        modelBuilder.Entity<FriendRequest>()
           .HasOne(fr => fr.Sender)
           .WithMany(u => u.SentFriendRequests)
           .HasForeignKey(fr => fr.SenderId)
           .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<FriendRequest>()
            .HasOne(fr => fr.Receiver)
            .WithMany(u => u.ReceivedFriendRequests)
            .HasForeignKey(fr => fr.ReceiverId)
            .OnDelete(DeleteBehavior.Restrict);

        // Configure the many-to-many relationship for Friends
        modelBuilder.Entity<User>()
            .HasMany(u => u.Friends)
            .WithMany()
            .UsingEntity(j => j.ToTable("UserFriends"));

        // Other configurations and mappings can go here

        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
    }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        base.ConfigureConventions(configurationBuilder);
    }
}
