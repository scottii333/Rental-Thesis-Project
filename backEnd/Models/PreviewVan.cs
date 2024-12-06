namespace backEnd.Models
{
   public class PreviewVans
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string Mileage { get; set; }
    public required string FuelType { get; set; }
    public required string Transmission { get; set; }
    public required string Price { get; set; }
    public required string Capacity { get; set; }
    public required string Seats { get; set; }
    
    // Store image as a byte array
    public byte[]? Image { get; set; }

    

    // A helper property to return Base64 string for the image
    public string? Base64Image 
    {
        get
        {
            if (Image != null)
            {
                // Convert byte array to Base64 string
                return "data:image/png;base64," + Convert.ToBase64String(Image);
            }
            return null;
        }
    }
}
}
