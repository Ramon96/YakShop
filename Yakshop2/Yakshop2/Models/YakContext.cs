using Microsoft.EntityFrameworkCore;

namespace Yakshop2.Models
{
    public class YakContext: DbContext
    {
        public YakContext(DbContextOptions<YakContext> options): base(options) { }
        public DbSet<Herd> Herds { get; set; }
        public DbSet<Yak> Yaks { get; set; }
        public DbSet<Stock> Stock { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Yak>()
                .HasOne<Herd>()
                .WithMany(y => y.Yaks)
                .HasForeignKey(y => y.HerdId);
        }
    }
}
