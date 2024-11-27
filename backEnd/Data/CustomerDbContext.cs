using Microsoft.EntityFrameworkCore;

namespace backEnd.Data
{
    public class CustomerDbContext : DbContext
    {
        public CustomerDbContext(DbContextOptions<CustomerDbContext> options) : base(options) { }

        public DbSet<CustomerAcc> CustomerAcc { get; set; }
    }

    public class CustomerAcc
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
