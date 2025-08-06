using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStoreTestingApp.Application.DTO
{
    public class BookDto
    {
        public int Index { get; set; }

        public string ISBN { get; set; }

        public string Title { get; set; }

        public string Author { get; set; }

        public string Publisher { get; set; }

        public string CoverImageBase64 { get; set; }

        public int LikesCount { get; set; }

        public int ReviewsCount { get; set; }

        public List<ReviewDto> Reviews { get; set; } = new List<ReviewDto>();
    }
}
