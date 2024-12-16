using System.ComponentModel.DataAnnotations;

public class CustomerHistory
{
    [Key]
    public required string ReferenceId { get; set; }
    public required string SelectedVan { get; set; }
    public required string UserLocation { get; set; }
    public DateTime PickupDate { get; set; }
    public DateTime ReturnDate { get; set; }
    public decimal Price { get; set; }
    public required string Status { get; set; }
}