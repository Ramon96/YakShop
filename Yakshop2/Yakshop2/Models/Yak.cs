using System.ComponentModel.DataAnnotations;

namespace Yakshop2.Models
{
    public class Yak
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(20, ErrorMessage = "Name cant exceed the 20 character limit.")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [Range(0, 10, ErrorMessage = "Yaks can only be between 0 - 10 years old")]
        public double Age { get; set; }

        [Required]
        [RegularExpression("MALE|FEMALE", ErrorMessage = "Yaks only identify as male or female")]
        public string Sex { get; set; } = string.Empty;

        public double ageLastShaved { get; set; }

        public int HerdId { get; set; }
    }
}
