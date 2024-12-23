// Data/LibraryDbContext.cs
using Microsoft.EntityFrameworkCore;
using LibraryManagement.Models;

namespace LibraryManagement.Data
{
    public class LibraryDbContext : DbContext
    {
        public LibraryDbContext(DbContextOptions<LibraryDbContext> options)
            : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed initial data
            modelBuilder.Entity<Book>().HasData(
                new Book
                {
                    Id = 1,
                    Title = "Sample Book",
                    Author = "John Doe",
                    Description = "Sample Description",
                    Category = "Fiction"
                }
            );
        }
    }
}