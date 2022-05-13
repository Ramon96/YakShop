using System.ComponentModel.DataAnnotations;

namespace Yakshop2.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public string Customer { get; set; }
        public Stock CustomerOrder { get; set; }
    }
}
