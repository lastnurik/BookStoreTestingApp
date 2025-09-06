import React, { useState } from 'react';

export function BookForm({ onSubmit, initialParams }) {
  const [language, setLanguage] = useState(initialParams.language);
  const [seed, setSeed] = useState(initialParams.seed);
  const [likes, setLikes] = useState(initialParams.likes);
  const [reviews, setReviews] = useState(initialParams.reviews);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ language, seed, likes, reviews });
  };

  const generateRandomSeed = () => {
    const newSeed = Math.floor(Math.random() * 10000);
    setSeed(newSeed);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-medium text-gray-800 mb-4">Search Parameters</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="en">English</option>
            <option value="ru">Russian</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="seed" className="block text-sm font-medium text-gray-700">
            Seed
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              id="seed"
              value={seed}
              onChange={(e) => setSeed(Number(e.target.value))}
              min="0"
              className="flex-1 p-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <button 
              type="button" 
              onClick={generateRandomSeed} 
              className="px-4 py-3 bg-gray-200 text-gray-800 font-medium rounded-sm hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              Generate
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="likes" className="block text-sm font-medium text-gray-700">
            Likes Factor: <span className="font-medium text-gray-900">{likes}</span>
          </label>
          <input
            type="range"
            id="likes"
            value={likes}
            onChange={(e) => setLikes(parseFloat(e.target.value))}
            min="0"
            max="10"
            step="0.5"
            className="w-full h-2 bg-gray-200 rounded-sm appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>0.5</span>
            <span>1</span>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="reviews" className="block text-sm font-medium text-gray-700">
            Reviews Factor: <span className="font-medium text-gray-900">{reviews}</span>
          </label>
          <input
            type="range"
            id="reviews"
            value={reviews}
            onChange={(e) => setReviews(parseFloat(e.target.value))}
            min="0"
            max="10"
            step="0.5"
            className="w-full h-2 bg-gray-200 rounded-sm appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>0.5</span>
            <span>1</span>
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        className="w-full py-3 px-4 bg-gray-800 text-white font-medium rounded-sm hover:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-600"
      >
        Fetch Books
      </button>
    </form>
  );
}