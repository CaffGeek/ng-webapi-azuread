using System.Data.Entity;

namespace domain
{
    public interface IApiDbContext
    {
        DbSet<Log> Logs { get; set; }
    }
}