using Microsoft.EntityFrameworkCore;
namespace DAL;
public partial class dbWeatherContext : DbContext
{
    public dbWeatherContext()
    {
    }

    public dbWeatherContext(DbContextOptions<dbWeatherContext> options)
        : base(options)
    {
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
         optionsBuilder.UseSqlServer("Server=TC99672NB\\MSSQLSERVER1;Database=Weather;User Id=.;");
    }
}

