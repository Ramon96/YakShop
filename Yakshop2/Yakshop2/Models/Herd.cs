using System.ComponentModel.DataAnnotations;

namespace Yakshop2.Models
{
    public class Herd
    {
        [Key]
        public int Id { get; set; }

        public List<Yak>? Yaks { get; set; }
    }
}
