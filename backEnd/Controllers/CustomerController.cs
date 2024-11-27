using backEnd.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace backEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerDbContext _dbContext;

        public CustomerController(CustomerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] CustomerAcc customer)
        {
            try
            {
                // Ensure table exists
                var sqlCreateTable = @"
                    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'customerAcc')
                    BEGIN
                        CREATE TABLE customerAcc (
                            Id INT PRIMARY KEY IDENTITY(1,1),
                            FullName NVARCHAR(255) NOT NULL,
                            Email NVARCHAR(255) NOT NULL UNIQUE,
                            Password NVARCHAR(255) NOT NULL
                        )
                    END";

                await _dbContext.Database.ExecuteSqlRawAsync(sqlCreateTable);

                // Check if the email already exists
                var existingCustomer = await _dbContext.CustomerAcc
                    .FirstOrDefaultAsync(c => c.Email == customer.Email);

                if (existingCustomer != null)
                {
                    return BadRequest("Email already exists.");
                }

                // Add new user
                _dbContext.CustomerAcc.Add(customer);
                await _dbContext.SaveChangesAsync();

                return Ok("Signup successful.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                // Find the user with the provided email
                var user = await _dbContext.CustomerAcc
                    .FirstOrDefaultAsync(c => c.Email == loginRequest.Email);

                if (user == null)
                {
                    return Unauthorized("Invalid email or password.");
                }

                // Validate password
                if (user.Password != loginRequest.Password)
                {
                    return Unauthorized("Invalid email or password.");
                }

                // Create a mock token (for simplicity, in production use JWT)
                var token = "mock-jwt-token";

                // Determine if the user is an admin (mock condition for demonstration)
                bool isAdmin = user.Email == "admin@example.com"; // Example admin check

                return Ok(new
                {
                    isValid = true,
                    isAdmin,
                    token
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
