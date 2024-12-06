namespace backEnd.Models
{
    public class CustomerModel
    {
        public int Id { get; set; } // Optional, since it will be auto-generated
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
