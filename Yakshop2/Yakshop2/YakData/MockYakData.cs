using Yakshop2.Models;

namespace Yakshop2.HerdData
{
    public class MockYakData : IYakData
    {
        private List<Yak> yaks = new List<Yak>()
        {
            new Yak()
            {
                Name = "Yak-1",
                Age = 4,
                Sex = "Female"
            },
            new Yak()
            {
                Name = "Yak-2",
                Age = 8,
                Sex = "Female"
            },
            new Yak()
            {
                Name = "Yak-3",
                Age = 9.5,
                Sex = "Female"
            },
        };

        public Yak AddYak(Yak yak)
        {
            throw new NotImplementedException();
        }

        public void DeleteYak(Yak yak)
        {
            throw new NotImplementedException();
        }

        public Yak GetYak(int id)
        {
            throw new NotImplementedException();
        }

        public List<Yak> GetYaks()
        {
            return yaks;
        }

        public Yak UpdateYak(Yak yak)
        {
            throw new NotImplementedException();
        }
    }
}
