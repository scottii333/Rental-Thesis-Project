using backEnd.Data;
using backEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using System.Data;
using Newtonsoft.Json;



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
        public async Task<IActionResult> CustomerRequest(
    [FromForm] CustomerRequestModel request,
    [FromForm] IFormFile? paymentProof,
    [FromForm] IFormFile? driverLicenseFront,
    [FromForm] IFormFile? driverLicenseBack)
        {
            try
            {
                // Convert files to byte arrays if provided
                request.PaymentProof = paymentProof != null ? await ConvertToByteArrayAsync(paymentProof) : null;
                request.DriverLicenseFront = driverLicenseFront != null ? await ConvertToByteArrayAsync(driverLicenseFront) : null;
                request.DriverLicenseBack = driverLicenseBack != null ? await ConvertToByteArrayAsync(driverLicenseBack) : null;

                // Ensure the CustomerRequests table exists
                var createTableQuery = @"
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CustomerRequest' AND xtype='U')
        CREATE TABLE CustomerRequest (
            ReferenceId NVARCHAR(20) NOT NULL PRIMARY KEY,
            CustomerEmail NVARCHAR(255) NOT NULL DEFAULT '',
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
            PaymentProof VARBINARY(MAX) NULL,
            DriverLicenseFront VARBINARY(MAX) NULL,
            DriverLicenseBack VARBINARY(MAX) NULL
        )";
                await _context.Database.ExecuteSqlRawAsync(createTableQuery);

                // Check for duplicate ReferenceId
                var existingRequest = await _context.CustomerRequests
                    .AsNoTracking()
                    .FirstOrDefaultAsync(cr => cr.ReferenceId == request.ReferenceId);

                if (existingRequest != null)
                {
                    return BadRequest(new { message = "ReferenceId must be unique." });
                }

                // Insert request into the database
                var insertQuery = @"
        INSERT INTO CustomerRequest 
        (ReferenceId, CustomerEmail, SelectedVan, UserLocation, PickupDate, ReturnDate, StreetAddress, City, Province, Zip, MobileNumber, RentalOption, PaymentMethod, PaymentType, PaymentProof, DriverLicenseFront, DriverLicenseBack)
        VALUES 
        (@ReferenceId, @CustomerEmail, @SelectedVan, @UserLocation, @PickupDate, @ReturnDate, @StreetAddress, @City, @Province, @Zip, @MobileNumber, @RentalOption, @PaymentMethod, @PaymentType, @PaymentProof, @DriverLicenseFront, @DriverLicenseBack)";

                var parameters = new[]
                {
            new SqlParameter("@ReferenceId", SqlDbType.NVarChar, 20) { Value = request.ReferenceId },
            new SqlParameter("@CustomerEmail", SqlDbType.NVarChar, 255) { Value = request.CustomerEmail ?? string.Empty },
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
            new SqlParameter("@PaymentProof", SqlDbType.VarBinary) { Value = request.PaymentProof ?? (object)DBNull.Value },
            new SqlParameter("@DriverLicenseFront", SqlDbType.VarBinary) { Value = request.DriverLicenseFront ?? (object)DBNull.Value },
            new SqlParameter("@DriverLicenseBack", SqlDbType.VarBinary) { Value = request.DriverLicenseBack ?? (object)DBNull.Value }
        };

                await _context.Database.ExecuteSqlRawAsync(insertQuery, parameters);

                return Ok(new { message = "Customer request added successfully!", referenceId = request.ReferenceId });
            }
            catch (DbUpdateException dbEx)
            {
                return StatusCode(500, new { message = "Database error occurred.", error = dbEx.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", error = ex.Message });
            }
        }

        // Helper method to convert IFormFile to byte[]
        private async Task<byte[]> ConvertToByteArrayAsync(IFormFile file)
        {
            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            return memoryStream.ToArray();
        }


        // GET: api/Admin/GetAllRequests
        [HttpGet("GetAllRequests")]
        public async Task<IActionResult> GetAllRequests()
        {
            try
            {
                // Fetch all requests from the CustomerRequests table
                var requests = await _context.CustomerRequests.ToListAsync();

                // Transform byte[] fields to Base64 strings for the frontend
                var transformedRequests = requests.Select(r => new
                {
                    r.ReferenceId,
                    r.CustomerEmail,
                    r.SelectedVan,
                    r.UserLocation,
                    r.PickupDate,
                    r.ReturnDate,
                    r.StreetAddress,
                    r.City,
                    r.Province,
                    r.Zip,
                    r.MobileNumber,
                    r.RentalOption,
                    r.PaymentMethod,
                    r.PaymentType,
                    PaymentProof = r.PaymentProof != null ? Convert.ToBase64String(r.PaymentProof) : null,
                    DriverLicenseFront = r.DriverLicenseFront != null ? Convert.ToBase64String(r.DriverLicenseFront) : null,
                    DriverLicenseBack = r.DriverLicenseBack != null ? Convert.ToBase64String(r.DriverLicenseBack) : null
                }).ToList();

                return Ok(transformedRequests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching requests.", error = ex.Message });
            }
        }



        // POST: api/Admin/ApproveRequest
        [HttpPost("ApproveRequest")]
        public async Task<IActionResult> ApproveRequest([FromBody] ApproveRequestModel model)
        {
            try
            {
                // Ensure the CustomerOngoing table exists
                var createTableQuery = @"
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CustomerOngoing' AND xtype='U')
            CREATE TABLE CustomerOngoing (
                ReferenceId NVARCHAR(20) NOT NULL PRIMARY KEY,
                CustomerEmail NVARCHAR(255) NOT NULL,
                SelectedVan NVARCHAR(MAX) NULL,
                UserLocation NVARCHAR(255) NULL,
                PickupDate DATETIME NULL,
                ReturnDate DATETIME NULL,
                StreetAddress NVARCHAR(255) NULL,
                City NVARCHAR(100) NULL,
                Province NVARCHAR(100) NULL,
                Zip NVARCHAR(20) NULL,
                MobileNumber NVARCHAR(20) NULL,
                RentalOption NVARCHAR(50) NULL,
                PaymentMethod NVARCHAR(50) NULL,
                PaymentType NVARCHAR(50) NULL,
                PaymentProof VARBINARY(MAX) NULL,
                DriverLicenseFront VARBINARY(MAX) NULL,
                DriverLicenseBack VARBINARY(MAX) NULL,
                Status NVARCHAR(50) NOT NULL
            )";
                await _context.Database.ExecuteSqlRawAsync(createTableQuery);

                // Find the request in CustomerRequests
                var existingRequest = await _context.CustomerRequests
                    .FirstOrDefaultAsync(r => r.ReferenceId == model.ReferenceId);

                if (existingRequest == null)
                {
                    return NotFound(new { message = "Request not found." });
                }

                // Map the request to CustomerOngoing with Status = "Ongoing"
                var ongoingRequest = new CustomerOngoing
                {
                    ReferenceId = existingRequest.ReferenceId,
                    CustomerEmail = existingRequest.CustomerEmail,
                    SelectedVan = existingRequest.SelectedVan,
                    UserLocation = existingRequest.UserLocation,
                    PickupDate = existingRequest.PickupDate,
                    ReturnDate = existingRequest.ReturnDate,
                    StreetAddress = existingRequest.StreetAddress,
                    City = existingRequest.City,
                    Province = existingRequest.Province,
                    Zip = existingRequest.Zip,
                    MobileNumber = existingRequest.MobileNumber,
                    RentalOption = existingRequest.RentalOption,
                    PaymentMethod = existingRequest.PaymentMethod,
                    PaymentType = existingRequest.PaymentType,
                    PaymentProof = existingRequest.PaymentProof,
                    DriverLicenseFront = existingRequest.DriverLicenseFront,
                    DriverLicenseBack = existingRequest.DriverLicenseBack,
                    Status = "Ongoing"
                };

                // Add the ongoing request to CustomerOngoing and remove it from CustomerRequests
                await _context.CustomerOngoing.AddAsync(ongoingRequest);
                _context.CustomerRequests.Remove(existingRequest);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Request approved and moved to Ongoing." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred.", error = ex.Message });
            }
        }



        // GET: api/Admin/GetOngoingRequests
        [HttpGet("GetOngoingRequests")]
        public async Task<IActionResult> GetOngoingRequests()
        {
            try
            {
                var ongoingRequests = await _context.CustomerOngoing.ToListAsync();
                return Ok(ongoingRequests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching ongoing requests", error = ex.Message });
            }
        }


        [HttpPost("RejectRequest")]
        public async Task<IActionResult> RejectRequest([FromBody] CompleteRequestModel model)
        {
            try
            {
                // Find the request in the CustomerRequests table
                var requestToReject = await _context.CustomerRequests
                    .FirstOrDefaultAsync(r => r.ReferenceId == model.ReferenceId);

                if (requestToReject == null)
                {
                    return NotFound(new { message = "Request not found in customer requests." });
                }

                // Parse the SelectedVan JSON and get the price
                dynamic selectedVan = JsonConvert.DeserializeObject(requestToReject.SelectedVan);
                decimal price = selectedVan?.price ?? 0;

                // Map the rejected request to CustomerHistory with Status "Rejected"
                var historyRecord = new CustomerHistory
                {
                    ReferenceId = requestToReject.ReferenceId,
                    SelectedVan = requestToReject.SelectedVan,
                    UserLocation = requestToReject.UserLocation,
                    PickupDate = requestToReject.PickupDate.GetValueOrDefault(),
                    ReturnDate = requestToReject.ReturnDate.GetValueOrDefault(),
                    Price = price,
                    Status = "Rejected"
                };

                // Add to the CustomerHistory table
                await _context.CustomerHistory.AddAsync(historyRecord);

                // Remove the rejected request from the CustomerRequests table
                _context.CustomerRequests.Remove(requestToReject);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Request rejected and moved to history." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while rejecting the request.", error = ex.Message });
            }
        }



        [HttpPost("CompleteRequest")]
        public async Task<IActionResult> CompleteRequest([FromBody] CompleteRequestModel model)
        {
            try
            {
                // Check if the CustomerHistory table exists, create it if not
                var createTableQuery = @"
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CustomerHistory' AND xtype='U')
            CREATE TABLE CustomerHistory (
                ReferenceId NVARCHAR(20) NOT NULL PRIMARY KEY,
                SelectedVan NVARCHAR(MAX) NOT NULL,
                UserLocation NVARCHAR(255) NOT NULL,
                PickupDate DATETIME NOT NULL,
                ReturnDate DATETIME NOT NULL,
                Price DECIMAL NOT NULL,
                Status NVARCHAR(50) NOT NULL
            )";
                await _context.Database.ExecuteSqlRawAsync(createTableQuery);

                // Find the request in the CustomerOngoing table
                var ongoingRequest = await _context.CustomerOngoing
                    .FirstOrDefaultAsync(r => r.ReferenceId == model.ReferenceId);

                if (ongoingRequest == null)
                {
                    return NotFound(new { message = "Request not found in ongoing requests." });
                }

                // Parse the SelectedVan JSON and get the price
                dynamic selectedVan = JsonConvert.DeserializeObject(ongoingRequest.SelectedVan);
                decimal price = selectedVan?.price ?? 0; // Assuming price is a property of selectedVan

                // Map the ongoing request to CustomerHistory
                var historyRecord = new CustomerHistory
                {
                    ReferenceId = ongoingRequest.ReferenceId,
                    SelectedVan = ongoingRequest.SelectedVan,
                    UserLocation = ongoingRequest.UserLocation,
                    PickupDate = ongoingRequest.PickupDate.GetValueOrDefault(),
                    ReturnDate = ongoingRequest.ReturnDate.GetValueOrDefault(),
                    Price = price,
                    Status = "Completed"
                };

                // Add to the CustomerHistory table
                await _context.CustomerHistory.AddAsync(historyRecord);

                // Remove the completed request from the CustomerOngoing table
                _context.CustomerOngoing.Remove(ongoingRequest);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Request completed and moved to history." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while completing the request.", error = ex.Message });
            }
        }



        [HttpPost("CancelRequest")]
        public async Task<IActionResult> CancelRequest([FromBody] CompleteRequestModel model)
        {
            try
            {
                // Find the request in the CustomerOngoing table
                var ongoingRequest = await _context.CustomerOngoing
                    .FirstOrDefaultAsync(r => r.ReferenceId == model.ReferenceId);

                if (ongoingRequest == null)
                {
                    return NotFound(new { message = "Request not found in ongoing requests." });
                }

                // Parse the SelectedVan JSON and get the price
                dynamic selectedVan = JsonConvert.DeserializeObject(ongoingRequest.SelectedVan);
                decimal price = selectedVan?.price ?? 0;

                // Map the ongoing request to CustomerHistory with Status "Canceled"
                var historyRecord = new CustomerHistory
                {
                    ReferenceId = ongoingRequest.ReferenceId,
                    SelectedVan = ongoingRequest.SelectedVan,
                    UserLocation = ongoingRequest.UserLocation,
                    PickupDate = ongoingRequest.PickupDate.GetValueOrDefault(),
                    ReturnDate = ongoingRequest.ReturnDate.GetValueOrDefault(),
                    Price = price,
                    Status = "Canceled"
                };

                // Add to the CustomerHistory table
                await _context.CustomerHistory.AddAsync(historyRecord);

                // Remove the canceled request from the CustomerOngoing table
                _context.CustomerOngoing.Remove(ongoingRequest);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Request canceled and moved to history." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while canceling the request.", error = ex.Message });
            }
        }


        // Example route for customer history
        [HttpGet("GetCustomerHistory")]
        public async Task<IActionResult> GetCustomerHistory()
        {
            try
            {
                // Fetch history data logic
                var historyData = await _context.CustomerHistory.ToListAsync();
                return Ok(historyData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred.", error = ex.Message });
            }
        }



    }


}
