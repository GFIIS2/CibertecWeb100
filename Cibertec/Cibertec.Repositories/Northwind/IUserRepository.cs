using Cibertec.Models;

namespace Cibertec.Repositories.Northwind
{
    public interface IUserRepository : IRepository<User>
    {
        User ValidaterUser(string email, string password);
    }
}
