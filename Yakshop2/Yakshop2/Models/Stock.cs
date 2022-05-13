using System.ComponentModel.DataAnnotations;

namespace Yakshop2.Models
{
    public class Stock
    {
        [Key]
        public int Id { get; set; }
        public double? Milk { get; set; }
        public int? Skins { get; set; }
    }
}
