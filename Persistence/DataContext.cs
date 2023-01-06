using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<WorkOrder> WorkOrders { get; set; }
        public DbSet<WorkOrderHistory> WorkOrderHistories { get; set; }
        public DbSet<HotNews> HotNewses { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<QualityReview> QualityReviews { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<WorkOrderHistory>().HasOne(u => u.WorkOrder).WithMany(c => c.History).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<WorkOrder>().HasOne<QualityReview>(u => u.Review).WithOne(c => c.WorkOrder).HasForeignKey<QualityReview>(u => u.Id);
            builder.Entity<WorkOrder>().HasIndex(u => u.Job).IsUnique();
        }
    }
}