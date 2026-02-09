import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { getAllMedicines } from "../services/medications";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  const [allMedicines, setAllMedicines] = useState([]);
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const loadMedicines = async () => {
      try {
        const data = await getAllMedicines();
        setAllMedicines(data);
      } catch (error) {
        console.error("Error loading medicines", error);
      } finally {
        setLoadingData(false);
      }
    };

    loadMedicines();
  }, []);

  const search = useCallback(
    (searchQuery) => {
      setQuery(searchQuery);

      if (!searchQuery.trim()) {
        setResults([]);
        setShowSuggestions(false);
        return;
      }

      setIsSearching(true);

      const normalizedQuery = searchQuery.toLowerCase();

      const filtered = allMedicines.filter(
        (med) =>
          med.nombre.toLowerCase().includes(normalizedQuery) ||
          med.categoria?.nombreCategoria
            ?.toLowerCase()
            .includes(normalizedQuery),
      );

      setResults(filtered.slice(0, 10));
      setShowSuggestions(true);
      setIsSearching(false);
    },
    [allMedicines],
  );

  const value = {
    query,
    results,
    isSearching,
    showSuggestions,
    loadingData,
    search,
    clearSearch: () => {
      setQuery("");
      setResults([]);
      setShowSuggestions(false);
    },
    hideSuggestions: () => setShowSuggestions(false),
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

export default SearchContext;
