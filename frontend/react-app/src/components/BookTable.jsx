import React, { useState, useEffect, useRef } from 'react';

export function BookTable({ books, loading, hasMore, onLoadMore }) {
  const [expandedRow, setExpandedRow] = useState(null);
  const observerRef = useRef(null);
  const lastBookElementRef = useRef(null);

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (lastBookElementRef.current) {
      observer.observe(lastBookElementRef.current);
    }

    return () => {
      if (lastBookElementRef.current) {
        observer.unobserve(lastBookElementRef.current);
      }
    };
  }, [hasMore, loading, onLoadMore]);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="mt-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="text-left p-4 font-medium text-gray-700">#</th>
              <th className="text-left p-4 font-medium text-gray-700">ISBN</th>
              <th className="text-left p-4 font-medium text-gray-700">Title</th>
              <th className="text-left p-4 font-medium text-gray-700">Author(s)</th>
              <th className="text-left p-4 font-medium text-gray-700">Publisher</th>
              <th className="text-left p-4 font-medium text-gray-700">Likes</th>
              <th className="text-left p-4 font-medium text-gray-700">Reviews</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <React.Fragment key={index}>
                <tr 
                  className={`cursor-pointer transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-gray-100 border-b border-gray-200`}
                  onClick={() => handleRowClick(index)}
                  ref={index === books.length - 1 ? lastBookElementRef : null}
                >
                  <td className="p-4 font-medium text-gray-900">{book.index}</td>
                  <td className="p-4 font-mono text-sm text-gray-700">{book.isbn}</td>
                  <td className="p-4 font-medium text-blue-600">{book.title}</td>
                  <td className="p-4 text-gray-700">{book.author}</td>
                  <td className="p-4 text-gray-700">{book.publisher}</td>
                  <td className="p-4 font-medium text-gray-900">{book.likesCount}</td>
                  <td className="p-4 font-medium text-gray-900">{book.reviewsCount}</td>
                </tr>
                {expandedRow === index && (
                  <tr>
                    <td colSpan={7} className="bg-gray-50 p-4">
                      <BookDetails book={book} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Loading indicator */}
      <div className="h-20 flex items-center justify-center">
        {loading && (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-700"></div>
            <span className="ml-3 text-gray-700">Loading more books...</span>
          </div>
        )}
        {!hasMore && books.length > 0 && (
          <p className="text-gray-700">No more books to load</p>
        )}
      </div>
    </div>
  );
}

function BookDetails({ book }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      <div className="md:col-span-1 flex flex-col items-center">
        {book.coverImageBase64 && (
          <img 
            src={`data:image/jpeg;base64,${book.coverImageBase64}`} 
            alt={book.title}
            className="w-full max-w-xs rounded-sm shadow-sm mb-4"
          />
        )}
        <div className="bg-gray-100 rounded-sm p-4 w-full">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Stats</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center bg-white rounded-sm p-2 border border-gray-200">
              <p className="text-xl font-medium text-gray-900">{book.likesCount}</p>
              <p className="text-sm text-gray-600">Likes</p>
            </div>
            <div className="text-center bg-white rounded-sm p-2 border border-gray-200">
              <p className="text-xl font-medium text-gray-900">{book.reviewsCount}</p>
              <p className="text-sm text-gray-600">Reviews</p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:col-span-2">
        <h2 className="text-xl font-medium text-gray-900 mb-4">{book.title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-sm p-3 border border-gray-200">
            <p className="text-sm font-medium text-gray-700">Author(s)</p>
            <p className="text-gray-900">{book.author}</p>
          </div>
          <div className="bg-gray-50 rounded-sm p-3 border border-gray-200">
            <p className="text-sm font-medium text-gray-700">Publisher</p>
            <p className="text-gray-900">{book.publisher}</p>
          </div>
          <div className="bg-gray-50 rounded-sm p-3 border border-gray-200">
            <p className="text-sm font-medium text-gray-700">ISBN</p>
            <p className="font-mono text-gray-900">{book.isbn}</p>
          </div>
        </div>
        
        {book.reviews && book.reviews.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-300 pb-2">
              Reviews
            </h3>
            <div className="space-y-4">
              {book.reviews.map((review, index) => (
                <div key={index} className="bg-white rounded-sm p-4 shadow-xs border border-gray-200">
                  <p className="text-gray-700">"{review.content}"</p>
                  <p className="text-sm text-gray-600 mt-2">
                    — {review.author}, <em className="text-gray-600">{review.source}</em>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}