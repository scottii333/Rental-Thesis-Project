using System.ComponentModel.DataAnnotations.Schema;

public class CustomerRequestModel
{
    public required string ReferenceId { get; set; } // Primary Key
    public required string CustomerEmail { get; set; } // Foreign Key for customer

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

    // Excluded from database mapping; handles uploaded files
    [NotMapped]
    public IFormFile? PaymentProofFile { get; set; }

    [NotMapped]
    public IFormFile? DriverLicenseFrontFile { get; set; }

    [NotMapped]
    public IFormFile? DriverLicenseBackFile { get; set; }

    // Database-stored binary data
    [Column(TypeName = "varbinary(max)")]
    public byte[]? PaymentProof { get; set; }

    [Column(TypeName = "varbinary(max)")]
    public byte[]? DriverLicenseFront { get; set; }

    [Column(TypeName = "varbinary(max)")]
    public byte[]? DriverLicenseBack { get; set; }
}
