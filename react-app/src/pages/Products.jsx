import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import { products, categories, getProductsByCategory } from '../data/products';

export default function Products() {
    const { categoria } = useParams();
    const [filters, setFilters] = useState({
        priceRange: [0, 500],
        deliveryOnly: false,
        storePickup: false,
    });

    // Get filtered products
    const filteredProducts = useMemo(() => {
        let result = categoria ? getProductsByCategory(categoria) : products;

        // Apply price filter
        result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

        // Apply delivery filter
        if (filters.deliveryOnly) {
            result = result.filter(p => p.deliveryAvailable);
        }

        // Apply store pickup filter
        if (filters.storePickup) {
            result = result.filter(p => p.storePickup);
        }

        return result;
    }, [categoria, filters]);

    const currentCategory = categories.find(c => c.id === categoria);

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-600 mb-6">
                <Link to="/" className="hover:text-green-600">Inicio</Link>
                <span className="mx-2">&gt;</span>
                <span className="text-green-600">{currentCategory?.name || 'Productos'}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                        <h3 className="font-bold text-gray-800 mb-4">Filtros</h3>

                        {/* Categories */}
                        <div className="mb-6">
                            <h4 className="font-medium text-gray-700 mb-3">Categorías</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        to="/productos"
                                        className={`block py-2 px-3 rounded-lg text-sm transition-colors ${!categoria ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'
                                            }`}
                                    >
                                        Todos los productos
                                    </Link>
                                </li>
                                {categories.map((cat) => (
                                    <li key={cat.id}>
                                        <Link
                                            to={cat.path}
                                            className={`block py-2 px-3 rounded-lg text-sm transition-colors ${categoria === cat.id ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'
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
                            <h4 className="font-medium text-gray-700 mb-3">Rango de precio</h4>
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
                                onChange={(e) => setFilters(f => ({ ...f, priceRange: [0, parseInt(e.target.value)] }))}
                                className="w-full accent-green-500"
                            />
                        </div>

                        {/* Delivery Options */}
                        <div className="mb-6">
                            <h4 className="font-medium text-gray-700 mb-3">Opciones de entrega</h4>
                            <label className="flex items-center gap-2 text-sm text-gray-600 mb-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.deliveryOnly}
                                    onChange={(e) => setFilters(f => ({ ...f, deliveryOnly: e.target.checked }))}
                                    className="accent-green-500"
                                />
                                <i className="fas fa-truck text-green-500"></i>
                                Delivery disponible
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.storePickup}
                                    onChange={(e) => setFilters(f => ({ ...f, storePickup: e.target.checked }))}
                                    className="accent-green-500"
                                />
                                <i className="fas fa-store text-green-500"></i>
                                Retiro en tienda
                            </label>
                        </div>

                        {/* Reset button */}
                        <button
                            onClick={() => setFilters({ priceRange: [0, 500], deliveryOnly: false, storePickup: false })}
                            className="w-full py-2 text-sm text-gray-600 hover:text-green-600 transition-colors"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                </aside>

                {/* Products Grid */}
                <main className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {currentCategory?.name || 'Todos los productos'}
                        </h1>
                        <span className="text-gray-500 text-sm">
                            {filteredProducts.length} productos
                        </span>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
                            <p className="text-gray-500 text-lg">No se encontraron productos</p>
                            <p className="text-gray-400 text-sm">Intenta ajustar los filtros</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
