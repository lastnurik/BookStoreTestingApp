import React, { useState, useEffect, useCallback } from 'react';
import { BookTable } from './components/BookTable';
import { BookForm } from './components/BookForm';
import { fetchBooks } from './api/books';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [params, setParams] = useState({
    language: 'en',
    seed: Math.floor(Math.random() * 10000),
    likes: 0.5,
    reviews: 0.5,
    batchNumber: 0,
    batchSize: 20
  });

  const loadBooks = useCallback(async (reset = false) => {
    if (loading) return;
    
    setLoading(true);
    try {
      const newBooks = await fetchBooks(params);
      
      if (reset) {
        setBooks(newBooks);
      } else {
        setBooks(prevBooks => [...prevBooks, ...newBooks]);
      }
      
      // If we get fewer books than batchSize, there are no more to load
      if (newBooks.length < params.batchSize) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  }, [params, loading]);

  // Load books when search parameters change
  useEffect(() => {
    loadBooks(true);
  }, [params.language, params.seed, params.likes, params.reviews]);

  // Load more books when batchNumber changes (for infinite scrolling)
  useEffect(() => {
    if (params.batchNumber > 0) {
      loadBooks(false);
    }
  }, [params.batchNumber]);

  const handleFormSubmit = (newParams) => {
    setParams(prev => ({ 
      ...prev, 
      ...newParams, 
      batchNumber: 0 
    }));
  };

  const handleLoadMore = () => {
    setParams(prev => ({
      ...prev,
      batchNumber: prev.batchNumber + 1
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Book Catalog</h1>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <BookForm 
            onSubmit={handleFormSubmit} 
            initialParams={params}
          />
        </div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <BookTable 
            books={books}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
          />
        </div>
      </div>
    </div>
  );
}

export default App;