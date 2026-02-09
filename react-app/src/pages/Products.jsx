import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import { getCategories } from "../services/categories";
import { getProducts } from "../services/medications";

export default function Products() {
  const { categoria } = useParams();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    deliveryOnly: false,
    storePickup: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [cats, prods] = await Promise.all([
        getCategories(), // navegación
        getProducts(), // productos normalizados
      ]);

      setCategories(cats);
      setProducts(prods);
    };

    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (categoria) {
      result = result.filter((p) => p.categoria === categoria);
    }

    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
    );

    if (filters.deliveryOnly) {
      result = result.filter((p) => p.deliveryAvailable);
    }

    if (filters.storePickup) {
      result = result.filter((p) => p.storePickup);
    }

    return result;
  }, [categoria, filters, products]);

  const currentCategory = categories.find((c) => c.id === categoria);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-green-600">
          Inicio
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-green-600">
          {currentCategory?.name || "Productos"}
        </span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h3 className="font-bold text-gray-800 mb-4">Filtros</h3>

            {/* Categorias */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Categorías</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/productos"
                    className={`block py-2 px-3 rounded-lg text-sm ${
                      !categoria
                        ? "bg-green-100 text-green-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    Todos los productos
                  </Link>
                </li>

                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      to={cat.path}
                      className={`block py-2 px-3 rounded-lg text-sm ${
                        categoria === cat.id
                          ? "bg-green-100 text-green-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <i className={`fas ${cat.icon} mr-2`}></i>
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">
                Rango de precio
              </h4>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span>S/ {filters.priceRange[0]}</span>
                <span>-</span>
                <span>S/ {filters.priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    priceRange: [0, parseInt(e.target.value)],
                  }))
                }
                className="w-full accent-green-500"
              />
            </div>

            {/* Delivery Options */}
            {/* <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">
                Opciones de entrega
              </h4>
              <label className="flex items-center gap-2 text-sm text-gray-600 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.deliveryOnly}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      deliveryOnly: e.target.checked,
                    }))
                  }
                  className="accent-green-500"
                />
                <i className="fas fa-truck text-green-500"></i>
                Delivery disponible
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.storePickup}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, storePickup: e.target.checked }))
                  }
                  className="accent-green-500"
                />
                <i className="fas fa-store text-green-500"></i>
                Retiro en tienda
              </label>
            </div> */}

            {/* Reset button */}
            <button
              onClick={() =>
                setFilters({
                  priceRange: [0, 500],
                  deliveryOnly: false,
                  storePickup: false,
                })
              }
              className="w-full py-2 text-sm text-gray-600 hover:text-green-600 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        </aside>

        {/* Productos */}
        <main className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {currentCategory?.name || "Todos los productos"}
          </h1>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No se encontraron productos
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
