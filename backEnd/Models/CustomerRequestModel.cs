using Microsoft.AspNetCore.Mvc;

public class CustomerRequestModel
{
    public required string ReferenceId { get; set; } // Primary Key
    public required string CustomerEmail { get; set; }
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
    public byte[]? PaymentProof { get; set; } // Changed to byte[]
    public byte[]? DriverLicenseFront { get; set; } // Changed to byte[]
    public byte[]? DriverLicenseBack { get; set; } // Changed to byte[]
}
