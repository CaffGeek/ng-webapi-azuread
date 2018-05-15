using domain;
using System.Data.Entity;

namespace database
{
    public class ApiDbContext : DbContext, IApiDbContext
    {
        public DbSet<Log> Logs { get; set; }
    }
}
