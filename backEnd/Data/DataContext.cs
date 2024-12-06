using Microsoft.EntityFrameworkCore;
using backEnd.Models;

namespace backEnd.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<AdminModel> Admins { get; set; }
        public DbSet<PreviewVans> AvailableVans { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Map AdminModel to AdminAcc table
            modelBuilder.Entity<AdminModel>().ToTable("AdminAcc");
            modelBuilder.Entity<AdminModel>().HasKey(a => a.CompanyId);

            // Map PreviewVans to AvailableVans table
            modelBuilder.Entity<PreviewVans>().ToTable("AvailableVans");
            modelBuilder.Entity<PreviewVans>().HasKey(v => v.Id);

            // Configure Image property for large binary data
            modelBuilder.Entity<PreviewVans>().Property(v => v.Image).HasColumnType("varbinary(max)");

            // Add Index for frequently queried fields
            modelBuilder.Entity<PreviewVans>().HasIndex(v => v.Name);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=SCOTTIIEEE\\SQLEXPRESS;Database=EasyDriveDB;Trusted_Connection=True;TrustServerCertificate=True;", options =>
            {
                options.CommandTimeout(120); // Set timeout to 120 seconds
            });
        }
    }
}
