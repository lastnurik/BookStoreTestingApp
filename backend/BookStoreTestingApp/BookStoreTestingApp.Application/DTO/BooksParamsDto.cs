using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStoreTestingApp.Application.DTO
{
    public class BooksParamsDto
    {
        public string Language { get; set; }

        public int Seed { get; set; }

        public float Likes { get; set; }

        public float Reviews { get; set; }

        public int BatchNumber { get; set; }

        public int BatchSize { get; set; }
    }
}
