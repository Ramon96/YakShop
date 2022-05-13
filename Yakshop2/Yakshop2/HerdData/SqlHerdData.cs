using Microsoft.EntityFrameworkCore;
using Yakshop2.Models;

namespace Yakshop2.HerdData
{
    public class SqlHerdData : IHerdData
    {

        private YakContext _yakContext;

        public SqlHerdData(YakContext yakContext)
        {
            _yakContext = yakContext;
        }

        public Herd AddHerd(Herd herd)
        {
            throw new NotImplementedException();
        }

        public Stock createStock(Stock stock)
        {
            _yakContext.Stock.Add(stock);
            _yakContext.SaveChanges();

            return stock;
        }

        public Stock getStock()
        {
            return _yakContext.Stock.FirstOrDefault();
        }

        public Stock updateStock(Stock stock)
        {
            var currentStock = _yakContext.Stock.FirstOrDefault();

            currentStock.Milk = stock.Milk;
            currentStock.Skins = stock.Skins;

            _yakContext.SaveChanges();

            return currentStock;
        }

        public void DeleteHerd(Herd herd)
        {
            throw new NotImplementedException();
        }

        public Herd GetHerd(int id)
        {
            throw new NotImplementedException();
        }

        public List<Herd> GetHerds()
        {
            return _yakContext.Herds.Include(y => y.Yaks).ToList();
        }

        public Herd ResetHerd(Herd herd)
        {
            // leeg herds table
            _yakContext.Herds.RemoveRange(_yakContext.Herds);

            // add new herd
            _yakContext.Herds.Add(herd);


            //save changes
            _yakContext.SaveChanges();

            return herd;
        }

        public void UpdateHerd()
        {
            _yakContext.SaveChanges();
        }
    }
}
