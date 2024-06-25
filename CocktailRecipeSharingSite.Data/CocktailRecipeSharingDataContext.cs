using Microsoft.EntityFrameworkCore;

namespace CocktailRecipeSharingSite.Data;

public class CocktailRecipeSharingDataContext : DbContext
{
    private readonly string _connectionString;

    public CocktailRecipeSharingDataContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }
    }

    public DbSet<Category> Categories { get; set; }
    public DbSet<User> Users{get;set;}
    public DbSet<Recipe> Recipes { get; set; }
}