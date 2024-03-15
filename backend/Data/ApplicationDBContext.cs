using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Model;
using Microsoft.AspNetCore.Hosting.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDBContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
        }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Response> Answers { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<ChatRoom> ChatRooms { get; set; }
        public DbSet<Coaching> Coachings { get; set; }
        public DbSet<Community> Communities { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<DigitalProduct> DigitalProducts { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Purchase> Purchases { get; set; }
        public DbSet<View> Views { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<CommunityUser> CommunityUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            var roles = new List<IdentityRole>{
                new IdentityRole{
                    Name="Admin",
                    NormalizedName="ADMIN"
                },
                new IdentityRole{
                    Name="User",
                    NormalizedName="USER"
                },
            };

            builder.Entity<IdentityRole>().HasData(roles);


            //product DigitalProduct relationship using discriminator
            builder.Entity<Product>()
            .HasDiscriminator<string>("ProductType")
            .HasValue<DigitalProduct>("DigitalProduct")
            .HasValue<Course>("Course")
            .HasValue<Coaching>("Coaching");



            //message chatroom relationship one to many
            builder.Entity<Message>()
            .HasOne(m => m.ChatRoom)
            .WithMany(c => c.Messages)
            .HasForeignKey(m => m.ChatRoomId)
            .OnDelete(DeleteBehavior.NoAction);

            //user chatroom relationship one to many
            builder.Entity<ChatRoom>()
            .HasOne(c => c.User)
            .WithMany(u => u.ChatRooms)
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.NoAction);

            //admin chatroom relationship one to many
            builder.Entity<ChatRoom>()
            .HasOne(c => c.Admin)
            .WithMany(a => a.ChatRooms)
            .HasForeignKey(c => c.AdminId)
            .OnDelete(DeleteBehavior.NoAction);

            //product chatroom relationship one to many
            builder.Entity<ChatRoom>()
            .HasOne(c => c.Product)
            .WithMany(p => p.ChatRooms)
            .HasForeignKey(c => c.ProductId)
            .OnDelete(DeleteBehavior.NoAction);

            //product Admin relationship many to many
            builder.Entity<Offer>()
            .HasKey(o => new { o.ProductId, o.AdminId });

            builder.Entity<Offer>()
            .HasOne(o => o.Product)
            .WithMany(p => p.Offerings)
            .HasForeignKey(o => o.ProductId);
            

            builder.Entity<Offer>()
            .HasOne(o => o.Admin)
            .WithMany(a => a.Offerings)
            .HasForeignKey(o => o.AdminId);
            

            //Community product relationship one to one
            builder.Entity<Community>()
            .HasOne(c => c.Product)
            .WithOne(p => p.Community)
            .HasForeignKey<Community>(c => c.ProductId);
            

            //community Post relationship one to many
            builder.Entity<Post>()
            .HasOne(p => p.Community)
            .WithMany(c => c.Posts)
            .HasForeignKey(p => p.CommunityId)
            .OnDelete(DeleteBehavior.NoAction);

            //user post relationship one to many
            builder.Entity<Post>()
            .HasOne(p => p.AppUser)
            .WithMany(u => u.Posts)
            .HasForeignKey(p => p.AppUserId)
            .OnDelete(DeleteBehavior.NoAction);

            //user likes post relationship many to many
            //1. user like relationship one to many
            builder.Entity<Like>()
            .HasOne(l => l.AppUser)
            .WithMany(u => u.Likes)
            .HasForeignKey(l => l.AppUserId)
            .OnDelete(DeleteBehavior.NoAction);
            //2. post like relationship one to many
            builder.Entity<Like>()
            .HasOne(l => l.Post)
            .WithMany(p => p.Likes)
            .HasForeignKey(l => l.PostId)
            .OnDelete(DeleteBehavior.NoAction);

            //user comment on post relationship many to many
            //1. user comment relationship one to many
            builder.Entity<Comment>()
            .HasOne(c => c.AppUser)
            .WithMany(u => u.Comments)
            .HasForeignKey(c => c.AppUserId)
            .OnDelete(DeleteBehavior.NoAction);
            //2. post comment relationship one to many
            builder.Entity<Comment>()
            .HasOne(c => c.Post)
            .WithMany(p => p.Comments)
            .HasForeignKey(c => c.PostId)
            .OnDelete(DeleteBehavior.NoAction);

            //user view post relationship many to many
            //1. user view relationship one to many
            builder.Entity<View>()
            .HasOne(v => v.AppUser)
            .WithMany(u => u.Views)
            .HasForeignKey(v => v.AppUserId)
            .OnDelete(DeleteBehavior.NoAction);
            //2. post view one to relationship
            builder.Entity<View>()
            .HasOne(v => v.Post)
            .WithMany(p => p.Views)
            .HasForeignKey(v => v.PostId)
            .OnDelete(DeleteBehavior.NoAction);

            //user purchase product relationship many to many
            //1. user purchase relationship one to many
            builder.Entity<Purchase>()
            .HasOne(p => p.User)
            .WithMany(u => u.Purchases)
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.NoAction);
            //2. product purchase relationship one to many
            builder.Entity<Purchase>()
            .HasOne(p => p.Product)
            .WithMany(p => p.Purchases)
            .HasForeignKey(p => p.ProductId)
            .OnDelete(DeleteBehavior.NoAction);

            //user Rate product relationship many to many
            //1. user rate relationship one to many
            builder.Entity<Feedback>()
            .HasOne(f => f.User)
            .WithMany(u => u.Feedbacks)
            .HasForeignKey(f => f.UserId)
            .OnDelete(DeleteBehavior.NoAction);
            //2. product rate relationship one to many
            builder.Entity<Feedback>()
            .HasOne(f => f.Product)
            .WithMany(p => p.Feedbacks)
            .HasForeignKey(f => f.ProductId)
            .OnDelete(DeleteBehavior.NoAction);

            //user book coaching relationship many to many
            //1. user booking relationship one to many
            builder.Entity<Booking>()
            .HasOne(b => b.User)
            .WithMany(u => u.Bookings)
            .HasForeignKey(b => b.UserId);
            
            //2. coaching booking relationship one to many
            builder.Entity<Booking>()
            .HasOne(b => b.Coaching)
            .WithMany(c => c.Bookings)
            .HasForeignKey(b => b.CoachingId);
            

            //Course section relationship one to many
            builder.Entity<Section>()
            .HasOne(s => s.Course)
            .WithMany(c => c.Sections)
            .HasForeignKey(s => s.CourseId)
            .OnDelete(DeleteBehavior.NoAction);


            //parentsection include childsection relationship
            builder.Entity<Section>()
            .HasMany(s => s.ChildSections)
            .WithOne(s => s.ParentSection)
            .HasForeignKey(s => s.ParentSectionId)
            .OnDelete(DeleteBehavior.NoAction);



            //lesson section relationship
            builder.Entity<Lesson>().
            HasOne(l => l.Section).
            WithMany(s => s.Lessons).
            HasForeignKey(l => l.SectionId);

            //lesson quiz relationship using discriminator
            builder.Entity<Lesson>()
            .HasDiscriminator<string>("LessonType")
            .HasValue<Lesson>("Lesson")
            .HasValue<Quiz>("Quiz");


            //quiz question relationship one to many
            builder.Entity<Question>()
            .HasOne(q => q.Quiz)
            .WithMany(q => q.Questions)
            .HasForeignKey(q => q.QuizId);

            //response question relationship
            builder.Entity<Response>()
            .HasOne(r => r.Question)
            .WithMany(r => r.Responses)
            .HasForeignKey(r => r.Id);

            //response User relationship
            builder.Entity<Response>()
            .HasOne(r => r.User)
            .WithMany(r => r.Responses)
            .HasForeignKey(r => r.UserId);
        }

    }
}