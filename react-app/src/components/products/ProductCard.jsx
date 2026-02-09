import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../ui/Toast";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`${product.name} agregado al carrito`, "success");
  };

  return (
    <Link
      to={`/producto/${product.id}`}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square p-4 bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {/* {product.price && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            OFERTA
          </span>
        )} */}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1 group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mb-2">{product.description}</p>

        {/* Price */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-2">
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                S/{product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-green-600">
              S/{product.price.toFixed(2)}
            </span>
          </div>

          {/* Delivery icons */}
          <div className="flex items-center gap-3 text-gray-400 text-sm mb-3">
            {product.deliveryAvailable && (
              <span title="Delivery disponible">
                <i className="fas fa-truck"></i>
              </span>
            )}
            {product.storePickup && (
              <span title="Retiro en tienda">
                <i className="fas fa-store"></i>
              </span>
            )}
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 bg-green-500 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
          >
            <i className="fas fa-cart-plus"></i>
            Agregar
          </button>
        </div>
      </div>
    </Link>
  );
}
