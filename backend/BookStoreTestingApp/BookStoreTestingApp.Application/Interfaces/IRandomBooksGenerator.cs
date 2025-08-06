using BookStoreTestingApp.Application.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStoreTestingApp.Application.Interfaces
{
    public interface IRandomBooksGenerator
    {
        Task<List<BookDto>> GenerateBooks(BooksParamsDto parameters);
    }
}
