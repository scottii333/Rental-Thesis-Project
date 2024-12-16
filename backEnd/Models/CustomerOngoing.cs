using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class CustomerOngoing
{
    [Key]
    public required string ReferenceId { get; set; } // Primary Key

    [Required]
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

    [Column(TypeName = "varbinary(max)")]
    public byte[]? PaymentProof { get; set; }

    [Column(TypeName = "varbinary(max)")]
    public byte[]? DriverLicenseFront { get; set; }

    [Column(TypeName = "varbinary(max)")]
    public byte[]? DriverLicenseBack { get; set; }

    [Required]
    public string Status { get; set; } = "Ongoing"; // Added for tracking status
}
