using backEnd.Data;
using backEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using System.Data;



namespace backEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;

        public AdminController(DataContext context)
        {
            _context = context;
        }

        // POST: api/Admin/signup
        [HttpPost("signup")]
        public IActionResult AdminSignup([FromBody] AdminModel admin)
        {
            try
            {
                Console.WriteLine("Checking if the AdminAcc table exists...");

                // Ensure the AdminAcc table exists
                var tableExistsQuery = @"
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='AdminAcc' AND xtype='U')
            CREATE TABLE AdminAcc (
                CompanyId INT PRIMARY KEY,
                Email NVARCHAR(100) NOT NULL UNIQUE,
                Password NVARCHAR(100) NOT NULL
            )";
                _context.Database.ExecuteSqlRaw(tableExistsQuery);

                Console.WriteLine("Table check complete. Checking for existing admin...");

                // Check if an admin already exists
                if (_context.Admins.Any())
                {
                    Console.WriteLine("An admin already exists.");
                    return BadRequest(new { message = "An admin already exists. Please log in." });
                }

                // Insert new admin
                Console.WriteLine("Registering new admin...");
                _context.Admins.Add(admin);
                _context.SaveChanges();

                Console.WriteLine("Admin registered successfully.");
                return Ok(new { message = "Admin registered successfully!" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during signup: {ex.Message}");
                return StatusCode(500, new { message = "Error occurred.", error = ex.Message });
            }
        }





        // POST: api/Admin/login
        [HttpPost("login")]
        public IActionResult AdminLogin([FromBody] AdminModel admin)


        {
            try
            {
                Console.WriteLine("Checking credentials...");

                // Validate email and password
                var existingAdmin = _context.Admins.FirstOrDefault(a =>
                    a.Email == admin.Email && a.Password == admin.Password);

                if (existingAdmin == null)
                {
                    Console.WriteLine("Invalid login attempt.");
                    return Unauthorized(new { message = "Invalid email or password." });
                }

                Console.WriteLine("Login successful.");
                return Ok(new { message = "Login successful!", companyId = existingAdmin.CompanyId });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during login: {ex.Message}");
                return StatusCode(500, new { message = "Error occurred.", error = ex.Message });
            }
        }


        [HttpPost("AdminAddVan")]
        public async Task<IActionResult> AdminAddVan([FromForm] VanModel van, IFormFile image)
        {
            try
            {
                // Validate the incoming data
                if (string.IsNullOrEmpty(van.Name) || string.IsNullOrEmpty(van.Description) ||
                    string.IsNullOrEmpty(van.Mileage) || string.IsNullOrEmpty(van.FuelType) ||
                    string.IsNullOrEmpty(van.Transmission) || string.IsNullOrEmpty(van.Price) ||
                    string.IsNullOrEmpty(van.Capacity) || string.IsNullOrEmpty(van.Seats))
                {
                    return BadRequest(new { message = "All fields are required." });
                }

                // Check if the table exists - this is optional if you're handling schema with migrations
                var tableExistsQuery = @"
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='AvailableVans' AND xtype='U')
        CREATE TABLE AvailableVans (
            Id INT IDENTITY(1,1) PRIMARY KEY,
            Name NVARCHAR(100) NOT NULL,
            Description NVARCHAR(200) NOT NULL,
            Image VARBINARY(MAX) NULL,
            Mileage NVARCHAR(50) NOT NULL,
            FuelType NVARCHAR(50) NOT NULL,
            Transmission NVARCHAR(50) NOT NULL,
            Price NVARCHAR(50) NOT NULL,
            Capacity NVARCHAR(50) NOT NULL,
            Seats NVARCHAR(50) NOT NULL
        )";
                await _context.Database.ExecuteSqlRawAsync(tableExistsQuery);

                // Convert the image to byte array if provided
                byte[]? imageBytes = null;
                if (image != null)
                {
                    using (var ms = new MemoryStream())
                    {
                        await image.CopyToAsync(ms);
                        imageBytes = ms.ToArray();
                    }
                }

                // Insert the van details into the table
                var insertQuery = @"
        INSERT INTO AvailableVans (Name, Description, Image, Mileage, FuelType, Transmission, Price, Capacity, Seats)
        VALUES (@Name, @Description, @Image, @Mileage, @FuelType, @Transmission, @Price, @Capacity, @Seats)";

                var parameters = new[]
                {
            new SqlParameter("@Name", SqlDbType.NVarChar, 100) { Value = van.Name },
            new SqlParameter("@Description", SqlDbType.NVarChar, 200) { Value = van.Description },
            new SqlParameter("@Image", SqlDbType.VarBinary) { Value = imageBytes ?? (object)DBNull.Value },
            new SqlParameter("@Mileage", SqlDbType.NVarChar, 50) { Value = van.Mileage },
            new SqlParameter("@FuelType", SqlDbType.NVarChar, 50) { Value = van.FuelType },
            new SqlParameter("@Transmission", SqlDbType.NVarChar, 50) { Value = van.Transmission },
            new SqlParameter("@Price", SqlDbType.NVarChar, 50) { Value = van.Price },
            new SqlParameter("@Capacity", SqlDbType.NVarChar, 50) { Value = van.Capacity },
            new SqlParameter("@Seats", SqlDbType.NVarChar, 50) { Value = van.Seats }
        };

                await _context.Database.ExecuteSqlRawAsync(insertQuery, parameters);

                return Ok(new { message = "Van added successfully!" });
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                // _logger.LogError(ex, "Error adding van");

                return StatusCode(500, new { message = "Error occurred.", error = ex.Message });
            }
        }



        // GET: api/Van
        [HttpGet("GetAllVans")]
        public async Task<IActionResult> GetAllVans()
        {
            try
            {
                var vans = await _context.AvailableVans.ToListAsync();

                var result = vans.Select(v => new
                {
                    v.Id,
                    v.Name,
                    v.Description,
                    Image = v.Image != null ? $"data:image/png;base64,{Convert.ToBase64String(v.Image)}" : null,
                    v.Mileage,
                    v.FuelType,
                    v.Transmission,
                    v.Price,
                    v.Capacity,
                    v.Seats
                }).ToList();

                Console.WriteLine($"Retrieved {result.Count} vans");
                foreach (var van in result)
                {
                    Console.WriteLine($"Van: {van.Name}, Image Length: {van.Image?.Length ?? 0}");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching vans: {ex.Message}");
                return StatusCode(500, new { message = "Error occurred.", error = ex.Message });
            }
        }
    }


}
