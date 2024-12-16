using Microsoft.EntityFrameworkCore;
using backEnd.Models;

namespace backEnd.Data
{
    public class DataContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public DataContext(DbContextOptions<DataContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        public required DbSet<AdminModel> Admins { get; set; }
        public required DbSet<PreviewVans> AvailableVans { get; set; }

        public required DbSet<CustomerModel> Customers { get; set; }

        public required DbSet<CustomerRequestModel> CustomerRequests { get; set; }

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

            // Map CustomerModel to CustomersAcc table
            modelBuilder.Entity<CustomerModel>().ToTable("CustomersAcc");
            modelBuilder.Entity<CustomerModel>().HasKey(c => c.Id);

            // Map CustomerRequestModel to CustomerRequests table
            modelBuilder.Entity<CustomerRequestModel>().ToTable("CustomerRequest");
            modelBuilder.Entity<CustomerRequestModel>().HasKey(cr => cr.ReferenceId); // Set ReferenceId as PK
            modelBuilder.Entity<CustomerRequestModel>().Property(cr => cr.PaymentProof).HasColumnType("varbinary(max)"); // Configure binary type
            modelBuilder.Entity<CustomerRequestModel>().Property(cr => cr.ReferenceId).IsRequired(); // Ensure ReferenceId is not null
            modelBuilder.Entity<CustomerRequestModel>().Property(cr => cr.SelectedVan).IsRequired();

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"), options =>
                {
                    options.CommandTimeout(1200); // Set timeout to 1200 seconds
                });
            }
        }
    }
}
