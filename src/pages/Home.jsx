import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import MapView from '../components/MapView';
import { useFetchBooks } from '../hooks/useFetchBooks';

const Home = () => {
  // Custom hook for fetching books and handling state
  const { books, loading, error, searchBooks } = useFetchBooks();
  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Calculate total pages and determine which books to display
  const totalPages = Math.max(1, Math.ceil((books?.length || 0) / pageSize));
  const startIndex = (page - 1) * pageSize;
  const visibleBooks = books.slice(startIndex, startIndex + pageSize);

  // Handler: starts a new search and resets pagination
  const handleSearch = (q) => {
    setPage(1);
    searchBooks(q);
  };

  // Pagination controls
  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Header section */}
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-300">
            Book Finder
          </h1>
          <p className="mt-3 text-slate-300">Discover books from Open Library with a sleek, modern UI.</p>
        </header>

        {/* Search bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Loading spinner and error message */}
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}

        {/* Book cards grid, animates on page change */}
        <div key={page} className="mt-8 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeSlide">
          {visibleBooks.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>

        {/* Pagination controls (hidden if no books) */}
        {!loading && !error && books.length > 0 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={goPrev}
              disabled={page === 1}
              className="rounded-full px-4 py-2 font-semibold border border-slate-600 text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition shadow-md shadow-black/30"
            >
              Previous
            </button>
            <span className="text-sm text-slate-300">
              Page <span className="font-semibold text-slate-100">{page}</span> of <span className="font-semibold text-slate-100">{totalPages}</span>
            </span>
            <button
              onClick={goNext}
              disabled={page === totalPages}
              className="rounded-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition shadow-md shadow-black/30"
            >
              Next
            </button>
          </div>
        )}

        {/* Interactive Map section using React-Leaflet */}
        <div className="mt-14">
          <h2 className="text-xl font-bold mb-4 text-slate-100">Explore on Map</h2>
          <MapView />
        </div>

        {/* Prompt for user to start searching if no books loaded */}
        {!loading && !error && books.length === 0 && (
          <p className="text-center text-slate-400 mt-10">Start by searching for a title above.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
