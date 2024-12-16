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
        public async Task<IActionResult> AdminAddVan([FromForm] PreviewVans van, IFormFile image)
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




        // POST: api/Customer/CustomerSignup
        [HttpPost("CustomerSignup")]
        public IActionResult CustomerSignup([FromBody] CustomerModel customer)
        {
            try
            {
                Console.WriteLine("Checking if the Customers table exists...");

                // Ensure the Customers table exists
                var tableExistsQuery = @"
                IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CustomersAcc' AND xtype='U')
                CREATE TABLE CustomersAcc (
                    Id INT IDENTITY(1,1) PRIMARY KEY,
                    FullName NVARCHAR(100) NOT NULL,
                    Email NVARCHAR(100) NOT NULL UNIQUE,
                    Password NVARCHAR(100) NOT NULL
                )";
                _context.Database.ExecuteSqlRaw(tableExistsQuery);

                Console.WriteLine("Table check complete. Adding new customer...");

                // Check if the email already exists
                var existingCustomer = _context.Customers.FirstOrDefault(c => c.Email == customer.Email);
                if (existingCustomer != null)
                {
                    Console.WriteLine("Email already registered.");
                    return BadRequest(new { message = "Email already registered. Please log in." });
                }

                // Insert new customer
                _context.Customers.Add(customer);
                _context.SaveChanges();

                Console.WriteLine("Customer registered successfully.");
                return Ok(new { message = "Customer registered successfully!" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during signup: {ex.Message}");
                return StatusCode(500, new { message = "Error occurred.", error = ex.Message });
            }
        }


        // POST: api/Customer/CustomerLogin
        [HttpPost("CustomerLogin")]
        public IActionResult CustomerLogin([FromBody] LoginRequestModel loginRequest)
        {
            try
            {
                Console.WriteLine("Attempting to log in...");

                // Validate the incoming request
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage)
                        .ToList();

                    return BadRequest(new { message = "Validation failed", errors });
                }

                // Check if the email and password match
                var customer = _context.Customers.FirstOrDefault(c =>
                    c.Email == loginRequest.Email && c.Password == loginRequest.Password);

                if (customer == null)
                {
                    Console.WriteLine("Invalid login attempt.");
                    return Unauthorized(new { message = "Invalid email or password." });
                }

                Console.WriteLine("Login successful.");
                return Ok(new
                {
                    message = "Login successful!",
                    customerId = customer.Id,
                    fullName = customer.FullName,
                    email = customer.Email
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during login: {ex.Message}");
                return StatusCode(500, new { message = "Error occurred.", error = ex.Message });
            }
        }


        // POST: api/Admin/CustomerRequest
        [HttpPost("CustomerRequest")]
        public async Task<IActionResult> CustomerRequest([FromForm] CustomerRequestModel request, [FromForm] IFormFile? paymentProof)
        {
            try
            {
                Console.WriteLine($"ReferenceId: {request.ReferenceId}");
                Console.WriteLine($"SelectedVan: {request.SelectedVan}");
                Console.WriteLine($"UserLocation: {request.UserLocation}");
                Console.WriteLine($"PickupDate: {request.PickupDate}");
                Console.WriteLine($"ReturnDate: {request.ReturnDate}");
                Console.WriteLine($"StreetAddress: {request.StreetAddress}");
                Console.WriteLine($"City: {request.City}");
                Console.WriteLine($"Province: {request.Province}");
                Console.WriteLine($"Zip: {request.Zip}");
                Console.WriteLine($"MobileNumber: {request.MobileNumber}");
                Console.WriteLine($"RentalOption: {request.RentalOption}");
                Console.WriteLine($"PaymentMethod: {request.PaymentMethod}");
                Console.WriteLine($"PaymentType: {request.PaymentType}");
                Console.WriteLine($"PaymentProofFileName: {paymentProof?.FileName}");
                Console.WriteLine("Checking if the CustomerRequests table exists...");


                // Ensure the CustomerRequests table exists
                var tableExistsQuery = @"
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CustomerRequests' AND xtype='U')
        CREATE TABLE CustomerRequests (
            ReferenceId NVARCHAR(20) NOT NULL PRIMARY KEY,
            SelectedVan NVARCHAR(MAX) NOT NULL,
            UserLocation NVARCHAR(255) NOT NULL,
            PickupDate DATETIME NOT NULL,
            ReturnDate DATETIME NOT NULL,
            StreetAddress NVARCHAR(255) NOT NULL,
            City NVARCHAR(100) NOT NULL,
            Province NVARCHAR(100) NOT NULL,
            Zip NVARCHAR(20) NOT NULL,
            MobileNumber NVARCHAR(20) NOT NULL,
            RentalOption NVARCHAR(50) NOT NULL,
            PaymentMethod NVARCHAR(50) NOT NULL,
            PaymentType NVARCHAR(50) NOT NULL,
            PaymentProof VARBINARY(MAX) NULL
        )";
                await _context.Database.ExecuteSqlRawAsync(tableExistsQuery);

                Console.WriteLine("Table check complete. Adding new customer request...");

                // Check if the ReferenceId is unique
                var existingRequest = await _context.CustomerRequests
                    .AsNoTracking()
                    .FirstOrDefaultAsync(cr => cr.ReferenceId == request.ReferenceId);

                if (existingRequest != null)
                {
                    return BadRequest(new { message = "ReferenceId must be unique." });
                }

                // Convert the payment proof file to a byte array if provided
                byte[]? paymentProofBytes = null;
                if (paymentProof != null)
                {
                    using (var ms = new MemoryStream())
                    {
                        await paymentProof.CopyToAsync(ms);
                        paymentProofBytes = ms.ToArray();
                    }
                }

                // Use parameterized query to insert the request into the database
                var insertQuery = @"
        INSERT INTO CustomerRequests 
        (ReferenceId, SelectedVan, UserLocation, PickupDate, ReturnDate, StreetAddress, City, Province, Zip, MobileNumber, RentalOption, PaymentMethod, PaymentType, PaymentProof)
        VALUES 
        (@ReferenceId, @SelectedVan, @UserLocation, @PickupDate, @ReturnDate, @StreetAddress, @City, @Province, @Zip, @MobileNumber, @RentalOption, @PaymentMethod, @PaymentType, @PaymentProof)";

                var parameters = new[]
                {
            new SqlParameter("@ReferenceId", SqlDbType.NVarChar, 20) { Value = request.ReferenceId },
            new SqlParameter("@SelectedVan", SqlDbType.NVarChar) { Value = request.SelectedVan ?? (object)DBNull.Value },
            new SqlParameter("@UserLocation", SqlDbType.NVarChar, 255) { Value = request.UserLocation ?? (object)DBNull.Value },
            new SqlParameter("@PickupDate", SqlDbType.DateTime) { Value = request.PickupDate ?? (object)DBNull.Value },
            new SqlParameter("@ReturnDate", SqlDbType.DateTime) { Value = request.ReturnDate ?? (object)DBNull.Value },
            new SqlParameter("@StreetAddress", SqlDbType.NVarChar, 255) { Value = request.StreetAddress ?? (object)DBNull.Value },
            new SqlParameter("@City", SqlDbType.NVarChar, 100) { Value = request.City ?? (object)DBNull.Value },
            new SqlParameter("@Province", SqlDbType.NVarChar, 100) { Value = request.Province ?? (object)DBNull.Value },
            new SqlParameter("@Zip", SqlDbType.NVarChar, 20) { Value = request.Zip ?? (object)DBNull.Value },
            new SqlParameter("@MobileNumber", SqlDbType.NVarChar, 20) { Value = request.MobileNumber ?? (object)DBNull.Value },
            new SqlParameter("@RentalOption", SqlDbType.NVarChar, 50) { Value = request.RentalOption ?? (object)DBNull.Value },
            new SqlParameter("@PaymentMethod", SqlDbType.NVarChar, 50) { Value = request.PaymentMethod ?? (object)DBNull.Value },
            new SqlParameter("@PaymentType", SqlDbType.NVarChar, 50) { Value = request.PaymentType ?? (object)DBNull.Value },
            new SqlParameter("@PaymentProof", SqlDbType.VarBinary) { Value = paymentProofBytes ?? (object)DBNull.Value }
        };

                await _context.Database.ExecuteSqlRawAsync(insertQuery, parameters);

                Console.WriteLine("Customer request added successfully.");
                return Ok(new { message = "Customer request added successfully!", referenceId = request.ReferenceId });
            }
            catch (DbUpdateException dbEx)
            {
                Console.WriteLine($"Database error: {dbEx.Message}");
                return StatusCode(500, new { message = "Database error occurred.", error = dbEx.Message });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error adding customer request: {ex.Message}");
                return StatusCode(500, new { message = "An unexpected error occurred.", error = ex.Message });
            }
        }

    }


}
