// BookApi/Models/Book.cs
using System.ComponentModel.DataAnnotations;

namespace BookApi.Models
{
    public class Book
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }
        [Required]
        [MaxLength(100)]
        public string Author { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Category { get; set; }
    }
}