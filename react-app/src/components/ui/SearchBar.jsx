import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../../contexts/SearchContext";

export default function SearchBar() {
  const {
    query,
    results,
    showSuggestions,
    search,
    clearSearch,
    hideSuggestions,
  } = useSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  console.log({ results });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        hideSuggestions();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [hideSuggestions]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    search(value);
  };

  const handleClear = () => {
    setInputValue("");
    clearSearch();
    inputRef.current?.focus();
  };

  const handleSuggestionClick = () => {
    hideSuggestions();
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex items-center bg-gray-100 rounded-full overflow-hidden border-2 border-transparent focus-within:border-green-500 transition-colors">
        <div className="pl-4 text-gray-400">
          <i className="fas fa-search"></i>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Buscar productos..."
          className="w-full py-3 px-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="px-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
          {results.map((product) => (
            <Link
              key={product.idMedicamento}
              to={`/producto/${product.idMedicamento}`}
              onClick={handleSuggestionClick}
              className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
            >
              <img
                src={product.urlImg}
                alt={product.nombre}
                className="w-12 h-12 object-contain rounded-lg bg-gray-50"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">
                  {product.nombre}
                </p>
                <p className="text-sm text-gray-500">
                  {`${product.tipoEnvase} x ${product.volumen}`}
                </p>
              </div>
              <span className="font-bold text-green-600 whitespace-nowrap">
                S/{product.precioUnitario.toFixed(2)}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* No results */}
      {showSuggestions && inputValue && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 text-center text-gray-500 z-50">
          <i className="fas fa-search text-3xl mb-2 text-gray-300"></i>
          <p>No se encontraron productos para "{inputValue}"</p>
        </div>
      )}
    </div>
  );
}
