import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 3.905 9.405l3.095 3.095a.75.75 0 1 0 1.06-1.06l-3.095-3.095A5.5 5.5 0 0 0 9 3.5Zm-4 5.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" clipRule="evenodd" />
            </svg>
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books by title..."
            className="w-full rounded-full bg-slate-800/70 border border-slate-700 text-slate-100 placeholder-slate-400 pl-11 pr-4 py-3 shadow-lg shadow-black/30 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:border-indigo-400/40 transition"
            aria-label="Search books"
          />
        </div>
        <button
          type="submit"
          className="rounded-full px-5 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 active:scale-[0.99] transition shadow-lg shadow-black/30"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
