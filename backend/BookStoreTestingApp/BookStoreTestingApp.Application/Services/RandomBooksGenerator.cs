using BookStoreTestingApp.Application.DTO;
using BookStoreTestingApp.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStoreTestingApp.Application.Services
{
    public class RandomBooksGenerator : IRandomBooksGenerator
    {
        public Task<List<BookDto>> GenerateBooks(BooksParamsDto parameters)
        {
            throw new NotImplementedException();
        }
    }
}
