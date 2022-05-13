using Yakshop2.Models;

namespace Yakshop2.HerdData
{
    public interface IYakData
    {
        List<Yak> GetYaks();

        Yak GetYak(int id);

        Yak AddYak(Yak yak);

        Yak UpdateYak(Yak yak);

        void DeleteYak(Yak yak);
    }
}
