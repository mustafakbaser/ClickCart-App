import { useState, useCallback } from 'react';
import { useDebounce } from 'use-debounce';

export function useSearch(delay = 300) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, delay);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  return {
    searchTerm,
    debouncedSearchTerm,
    handleSearch,
  };
}