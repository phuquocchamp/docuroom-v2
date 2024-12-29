import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

interface SearchProps {
  // If you want to pass props like initial search query, you can define them here
}

const Search: React.FC<SearchProps> = () => {
  const [searchQuery] = useState<string>(''); // Search query state
  const [resultsCount] = useState<number>(0); // Results count state
    useNavigate();
// To handle navigation
    return (
        <div className="p-4">


      {/* Results Count */}
      <p className="text-gray-700 mb-4">
        {resultsCount > 0
          ? `Showing ${resultsCount} result${resultsCount > 1 ? 's' : ''} for "${searchQuery}"`
          : `No results found for "${searchQuery}"`}
      </p>

      {/* Search Results */}
      <div className="bg-white p-4 rounded-md shadow-sm">
        {/* You can display dynamic search results here */}
        {resultsCount > 0 ? (
          <ul>
            {[...Array(resultsCount)].map((_, index) => (
              <li key={index} className="p-2 border-b">
                Result {index + 1} - {searchQuery}
              </li>
            ))}
          </ul>
        ) : (
          <p>No documents found.</p>
        )}
      </div>


    </div>
  );
};

export default Search;
