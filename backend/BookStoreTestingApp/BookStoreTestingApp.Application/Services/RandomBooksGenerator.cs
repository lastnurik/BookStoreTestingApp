using BookStoreTestingApp.Application.DTO;
using BookStoreTestingApp.Application.Interfaces;
using Bogus;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using SixLabors.Fonts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Drawing.Processing;

namespace BookStoreTestingApp.Application.Services
{
    public class RandomBooksGenerator : IRandomBooksGenerator
    {
        public Task<List<BookDto>> GenerateBooks(BooksParamsDto parameters)
        {
            long combinedSeed = parameters.Seed + (parameters.BatchNumber * parameters.BatchSize);

            Randomizer.Seed = new Random((int)combinedSeed);

            var faker = new Faker(parameters.Language);

            return Task.Run(() =>
            {
                var books = new List<BookDto>();

                for (int i = 0; i < parameters.BatchSize; i++)
                {
                    var book = new BookDto
                    {
                        Index = (parameters.BatchNumber * parameters.BatchSize) + i + 1,
                        ISBN = faker.Commerce.Ean13(),
                        Title = faker.Commerce.ProductName(),
                        Author = faker.Name.FullName(),
                        Publisher = faker.Company.CompanyName(),
                        LikesCount = GenerateCount(faker, parameters.Likes),
                        ReviewsCount = GenerateCount(faker, parameters.Reviews),
                        Reviews = Enumerable.Range(0, GenerateCount(faker, parameters.Reviews))
                        .Select(j => new ReviewDto
                        {
                            Text = faker.Rant.Review(),
                            Author = faker.Name.FullName()
                        })
                        .ToList()
                    };
                    book.CoverImageBase64 = GenerateBookCoverImage(faker.Commerce.ProductName(), faker.Name.FullName(), faker);
                    books.Add(book);
                }

                return books;
            });
        }

        private static int GenerateCount(Faker faker, float avgCount)
        {
            if (avgCount <= 0)
            {
                return 0;
            }

            int lowerBound = (int)Math.Floor(avgCount);
            int upperBound = (int)Math.Ceiling(avgCount);
            float fractionalPart = avgCount - lowerBound;

            if (faker.Random.Float() < fractionalPart)
            {
                return upperBound;
            }
            return lowerBound;
        }

        private string GenerateBookCoverImage(string title, string author, Faker faker)
        {
            int width = 400;
            int height = 600;

            var backgroundColor = new Rgba32(
                (byte)faker.Random.Byte(),
                (byte)faker.Random.Byte(),
                (byte)faker.Random.Byte()
            );

            using (Image<Rgba32> image = new Image<Rgba32>(width, height, backgroundColor))
            {
                FontFamily fontFamily = SystemFonts.Families.FirstOrDefault(f => f.Name == "Arial");
                if (fontFamily == null)
                {
                    fontFamily = SystemFonts.Families.First();
                }

                Font fontTitle = fontFamily.CreateFont(32);
                Font fontAuthor = fontFamily.CreateFont(20);

                image.Mutate(ctx => ctx.DrawText(
                    title,
                    fontTitle,
                    Color.White,
                    new PointF(width / 2 - (title.Length * 8), height / 2 - 50)
                ));

                image.Mutate(ctx => ctx.DrawText(
                    $"by {author}",
                    fontAuthor,
                    Color.LightGray,
                    new PointF(width / 2 - (author.Length * 6), height / 2 + 20)
                ));

                using (MemoryStream ms = new MemoryStream())
                {
                    image.SaveAsPng(ms);
                    return Convert.ToBase64String(ms.ToArray());
                }
            }
        }
    }
}
