using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Yakshop2.HerdData;
using Yakshop2.Models;

namespace Yakshop2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HerdController : ControllerBase
    {
        private IHerdData _herdData;

        public HerdController(IHerdData herdData)
        {
            _herdData = herdData;
        }

        //Check if a yak can be shaved
        [ApiExplorerSettings(IgnoreApi = true)]
        public bool CanShave (double age, double ageLastShaved) 
        {
            //atleat 1 year old
            if(age >= 100)
            {
                return age > (ageLastShaved * 100) + (8 + (ageLastShaved * 100) * 0.01);
            }
            return false;
        }

        // calculate the current stock
        [ApiExplorerSettings(IgnoreApi = true)]
        public Stock ProduceStock(List<Yak> Yaks, int Days)
        {
            var stock = _herdData.getStock();

            double Milk = 0;
            int Skins = 0;

            foreach (Yak yak in Yaks)
            {
                for (int i = 0; i < Days; i++)
                {
                    double AgeInDays = (yak.Age * 100) + i;

                    // 1000 === 10 yak years
                    if(AgeInDays < 1000)
                    {
                        // Shave yaks
                        if(CanShave(AgeInDays, yak.ageLastShaved))
                        {
                            Skins++;
                            yak.ageLastShaved = AgeInDays / 100;
                        }

                        // Milk yaks
                        Milk += 50 - AgeInDays * 0.03;
                    }
                }
                if (yak.Age + ((double)Days / 100) < 10)
                {
                    yak.Age = yak.Age + ((double)Days / 100);
                }
                else
                {
                    yak.Age = 10;
                }
            }

            // return stock
            Stock producedStock = new Stock
            {
                Milk = Math.Round(Milk, 2),
                Skins = Skins,
            };

            return producedStock;
        }

        // reset the content
        [HttpPost]
        [Route("yak-shop/load")]
        [ProducesResponseType(StatusCodes.Status205ResetContent)]
        public IActionResult resetContent(Herd herd)
        {

            var currentStock = _herdData.getStock();

            currentStock.Milk = 0;
            currentStock.Skins = 0;
            
            var herdBody = _herdData.ResetHerd(herd);

            return StatusCode(205, herdBody);
        }

        // get the stock
        [HttpGet]
        [Route("yak-shop/stock/{days}")]
        public IActionResult GetStock(int days)
        {
            var herdData = _herdData.GetHerds();

            List<Yak> yaks = herdData.First().Yaks;

            //do we already have in stock?
            var currentStock = _herdData.getStock();
            var producedStock = ProduceStock(yaks, days);

            if(currentStock != null)
            {
                Stock newStock = new Stock
                {
                    Milk = currentStock.Milk += producedStock.Milk,
                    Skins = currentStock.Skins += producedStock.Skins,
                };
                return Ok(_herdData.updateStock(newStock));
            }

            _herdData.createStock(producedStock);

            return Ok(producedStock);
        }

        // get the herd data
        [HttpGet]
        [Route("yak-shop/herd/{days}")]
        public IActionResult GetHerds(int days)
        {
            var herdData = _herdData.GetHerds();

            List<Yak> yaks = herdData.First().Yaks;

            foreach (Yak yak in yaks)
            {
                for (int i = 0; i < days; i++)
                {
                    double AgeInDays = (yak.Age * 100) + i;

                    if (AgeInDays < 1000)
                    {
                        // Shave yaks
                        if (CanShave(AgeInDays, yak.ageLastShaved))
                        {
                            yak.ageLastShaved = AgeInDays / 100;
                        }

                    }
                }
                if(yak.Age + ((double)days / 100) < 10)
                {
                    yak.Age = yak.Age + ((double)days / 100);
                }
                else 
                {
                    yak.Age = 10;
                }
            }

            herdData.First().Yaks = yaks;

            _herdData.UpdateHerd();

            return Ok(herdData);
        }

        // Post a order from the stock
        [HttpPost]
        [Route("yak-shop/order/{days}")]
        public IActionResult GetOrder(int days, Order order)
        {
            var herdData = _herdData.GetHerds();

            List<Yak> yaks = herdData.First().Yaks;

            var inStock = _herdData.getStock();

            var stock = inStock != null ? inStock : ProduceStock(yaks, days);

            string Customer = order.Customer;
            double? OrderedMilk = order.CustomerOrder.Milk > stock.Milk ? null : order.CustomerOrder.Milk;
            int? OrderedSkins = order.CustomerOrder.Skins > stock.Skins ? null : order.CustomerOrder.Skins;

            Order madeOrder = new Order
            {
                Customer = Customer,
                CustomerOrder = new Stock
                { 
                    Milk = OrderedMilk,
                    Skins = OrderedSkins,
                }
            };

            Stock UpdatedStock = new Stock
            {
                Milk = OrderedMilk != null ? stock.Milk - OrderedMilk : stock.Milk,
                Skins = OrderedSkins != null ? stock.Skins - OrderedSkins : stock.Skins,
            };

            _ = inStock != null ? _herdData.updateStock(UpdatedStock) : _herdData.createStock(UpdatedStock);



            // Order not in stock
            if (OrderedMilk == null && OrderedSkins == null)
            {
                return NotFound("Your order is not in stock");
            }

            // Order that is partially in stock
            if (OrderedMilk == null || OrderedSkins == null)
            {
                return StatusCode(206, madeOrder.CustomerOrder);
            }

            // Order that is in stock
            return StatusCode(201, madeOrder.CustomerOrder);

            //save stock
        }
        

    }
}
