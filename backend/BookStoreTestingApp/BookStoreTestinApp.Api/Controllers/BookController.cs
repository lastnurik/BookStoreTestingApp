using BookStoreTestingApp.Application.DTO;
using BookStoreTestingApp.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreTestinApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly IRandomBooksGenerator randomBooksGenerator;

        public BookController(IRandomBooksGenerator randomBooksGenerator)
        {
            this.randomBooksGenerator = randomBooksGenerator ?? throw new ArgumentNullException(nameof(randomBooksGenerator));
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks([FromQuery] BooksParamsDto booksParams)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var books = await randomBooksGenerator.GenerateBooks(booksParams);

            return Ok(books);
        }
    }
}
