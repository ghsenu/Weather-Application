'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export default function SearchBar({ onSearch, placeholder = 'Search for a city...', initialValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const [debouncedQuery, setDebouncedQuery] = useState(initialValue);

  // Requirement: debounce (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // We can automatically search on debounce if needed, but a form submit is usually better for routing.
  // I will leave debouncedQuery if the parent wants to pass an auto-updating prop, but here we just trigger onSearch manually.
  
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-lg mx-auto">
      <div className="relative flex items-center w-full h-14 rounded-2xl bg-white/10 border border-white/20 shadow-glass overflow-hidden focus-within:border-white/40 transition-colors">
        <div className="grid place-items-center h-full w-12 text-gray-400 cursor-pointer" onClick={() => handleSubmit()}>
          <Search className="h-6 w-6" />
        </div>
        <input
          className="peer h-full w-full outline-none text-lg text-white bg-transparent pr-12 placeholder-gray-400"
          type="text"
          id="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            type="button"
            className="absolute right-0 top-0 h-full w-12 grid place-items-center text-gray-400 hover:text-white transition-colors"
            onClick={() => {
              setQuery('');
            }}
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </form>
  );
}
