using System.ComponentModel.DataAnnotations.Schema;

public class CustomerRequestModel
{
    public required string ReferenceId { get; set; } // Primary Key
    public string? SelectedVan { get; set; }
    public string? UserLocation { get; set; }
    public DateTime? PickupDate { get; set; }
    public DateTime? ReturnDate { get; set; }
    public string? StreetAddress { get; set; }
    public string? City { get; set; }
    public string? Province { get; set; }
    public string? Zip { get; set; }
    public string? MobileNumber { get; set; }
    public string? RentalOption { get; set; }
    public string? PaymentMethod { get; set; }
    public string? PaymentType { get; set; }
    [NotMapped]
    public IFormFile? PaymentProofFile { get; set; } // Excluded from database mapping
    [Column(TypeName = "varbinary(max)")]
    public byte[]? PaymentProof { get; set; } // For storing binary data in the database
}
