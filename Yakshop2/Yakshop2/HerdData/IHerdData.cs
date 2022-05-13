using Yakshop2.Models;

namespace Yakshop2.HerdData
{
    public interface IHerdData
    {
        List<Herd> GetHerds();

        Herd GetHerd(int id);

        Herd AddHerd(Herd herd);

        void UpdateHerd();

        void DeleteHerd(Herd herd);

        Herd ResetHerd(Herd herd);

        Stock createStock(Stock stock);

        Stock updateStock(Stock stock);

        Stock getStock();
    }
}
