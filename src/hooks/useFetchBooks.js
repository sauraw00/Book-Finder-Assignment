import React, { useState } from 'react';
import { fetchBooks } from '../services/api';

export const useFetchBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchBooks = async (title) => {
    if (!title.trim()) {
      setError('Please enter a book title');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await fetchBooks(title);
      if (data.length === 0) {
        setError('No books found.');
        setBooks([]);
      } else {
        setBooks(data);
      }
    } catch (err) {
      setError('Failed to fetch books. Try again later.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return { books, loading, error, searchBooks };
};
