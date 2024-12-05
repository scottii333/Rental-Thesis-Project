namespace backEnd.Models
{
    public class AdminModel
    {
        public int CompanyId { get; set; } // Provided explicitly by React
        public string Email { get; set; } = string.Empty; // Admin email
        public string Password { get; set; } = string.Empty; // Admin password (hashed in production)
    }
}
