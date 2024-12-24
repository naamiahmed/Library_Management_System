using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.Sqlite;
using LibraryManagement.Data;
using LibraryManagement.Models;

namespace LibraryManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly LibraryDbContext _context;
        private readonly ILogger<BooksController> _logger;

        public BooksController(LibraryDbContext context, ILogger<BooksController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            try
            {
                var books = await _context.Books.ToListAsync();
                _logger.LogInformation($"Retrieved {books.Count} books");
                return books;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving books");
                return StatusCode(500, "Internal server error while retrieving books");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            try
            {
                var book = await _context.Books.FindAsync(id);
                if (book == null)
                {
                    _logger.LogWarning($"Book with ID {id} not found");
                    return NotFound();
                }
                return book;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving book {id}");
                return StatusCode(500, "Internal server error while retrieving book");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Book>> CreateBook(Book book)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("Invalid book model state");
                    return BadRequest(ModelState);
                }

                _context.Books.Add(book);
                await _context.SaveChangesAsync();

                _logger.LogInformation($"Book created successfully: {book.Title}");
                return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Error creating book");
                return StatusCode(500, "Database error while creating book");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating book");
                return StatusCode(500, "Internal server error while creating book");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, Book book)
        {
            try
            {
                if (id != book.Id)
                {
                    _logger.LogWarning($"ID mismatch: URL ID {id} != book ID {book.Id}");
                    return BadRequest("ID mismatch");
                }

                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("Invalid book model state");
                    return BadRequest(ModelState);
                }

                _context.Entry(book).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                _logger.LogInformation($"Book updated successfully: {book.Title}");
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    _logger.LogWarning($"Book with ID {id} not found");
                    return NotFound();
                }
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating book {id}");
                return StatusCode(500, "Internal server error while updating book");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            try
            {
                var book = await _context.Books.FindAsync(id);
                if (book == null)
                {
                    _logger.LogWarning($"Book with ID {id} not found");
                    return NotFound();
                }

                _context.Books.Remove(book);
                await _context.SaveChangesAsync();

                _logger.LogInformation($"Book deleted successfully: {id}");
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting book {id}");
                return StatusCode(500, "Internal server error while deleting book");
            }
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.Id == id);
        }
    }
}