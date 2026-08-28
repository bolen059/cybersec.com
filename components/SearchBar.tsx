'use client';
import { useState } from 'react';
import { searchContent } from '@/lib/search';
import Link from 'next/link';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    if (q.length >= 2) {
      const res = searchContent(q);
      setResults(res);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        aria-label="Search"
      />
      {showResults && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <ul>
              {results.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setShowResults(false)}>
                    <span className="font-medium">{item.title}</span>
                    <span className="block text-xs text-gray-500">{item.type}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-2 text-sm text-gray-500">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}