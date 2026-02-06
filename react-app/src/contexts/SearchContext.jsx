import { createContext, useContext, useState, useCallback } from 'react';
import { products } from '../data/products';

const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const search = useCallback((searchQuery) => {
        setQuery(searchQuery);

        if (!searchQuery.trim()) {
            setResults([]);
            setShowSuggestions(false);
            return;
        }

        setIsSearching(true);

        // Filter products that match the query
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setResults(filtered.slice(0, 10)); // Limit to 10 results
        setShowSuggestions(true);
        setIsSearching(false);
    }, []);

    const clearSearch = useCallback(() => {
        setQuery('');
        setResults([]);
        setShowSuggestions(false);
    }, []);

    const hideSuggestions = useCallback(() => {
        setShowSuggestions(false);
    }, []);

    const value = {
        query,
        results,
        isSearching,
        showSuggestions,
        search,
        clearSearch,
        hideSuggestions,
    };

    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}

export default SearchContext;
