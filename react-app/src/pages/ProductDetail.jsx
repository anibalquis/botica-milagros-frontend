import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMedicinesById } from "../services/medications";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../components/ui/Toast";
import ProductCard from "../components/products/ProductCard";
import { getRelatedMedicinesByCategoryId } from "../services/categories";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [quantity, setQuantity] = useState(1);

  const [medicine, setMedicine] = useState({});
  const [relatedMedicines, setRelatedMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentMedicine = await getMedicinesById(id);
        setMedicine(currentMedicine);

        const currentRelatedMedicines = await getRelatedMedicinesByCategoryId(
          currentMedicine.categoria.id,
        );
        setRelatedMedicines(currentRelatedMedicines);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Cargando producto...
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <i className="fas fa-exclamation-triangle text-6xl text-gray-300 mb-4"></i>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Producto no encontrado
        </h1>
        <p className="text-gray-500 mb-6">
          El producto que buscas no existe o fue eliminado.
        </p>
        <Link
          to="/productos"
          className="inline-block px-6 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
        >
          Ver todos los productos
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(medicine, quantity);
    showToast(`${medicine.name} agregado al carrito`, "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-green-600">
          Inicio
        </Link>
        <span className="mx-2">&gt;</span>
        <Link to="/productos" className="hover:text-green-600">
          Productos
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-green-600">{medicine.name}</span>
      </nav>

      {/* Product section */}
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        {/* Image */}
        <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center">
          <img
            src={medicine.image}
            alt={medicine.name}
            className="max-w-full max-h-96 object-contain"
          />
        </div>

        {/* Info */}
        <div>
          <span className="text-sm text-gray-500 uppercase">
            {medicine.categoria.nombre}
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mt-2 mb-4">
            {medicine.name}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            {medicine.price && (
              <span className="text-3xl font-bold text-green-600">
                S/{medicine.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            {`${medicine.envase} x ${medicine.volumen}`}
          </p>

          {/* Delivery options */}
          <div className="flex gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <i className="fas fa-truck text-green-500"></i>
              <span>
                Despacho:{" "}
                <span className="text-green-600 font-medium">Disponible</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <i className="fas fa-store text-blue-500"></i>
              <span>
                Retiro:{" "}
                <span className="text-blue-600 font-medium">Consultar</span>
              </span>
            </div>
          </div>

          {/* Quantity selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-700 font-medium">Cantidad:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto px-10 py-4 bg-green-500 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl"
          >
            <i className="fas fa-cart-plus text-xl"></i>
            Agregar al carrito
          </button>
        </div>
      </div>

      {/* Product info cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-exclamation-circle text-yellow-500"></i>
            Precauciones
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
            {medicine.precauciones.split(" | ").map((precaucion, index) => (
              <li key={index}>{precaucion}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-flask text-blue-500"></i>
            Composición
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
            {medicine.composicion.split(" | ").map((composicion, index) => (
              <li key={index}>{composicion}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-info-circle text-green-500"></i>
            Recomendaciones
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
            {medicine.recomendaciones
              .split(" | ")
              .map((recommendation, index) => (
                <li key={index}>{recommendation}</li>
              ))}
          </ul>
        </div>
      </div>

      {/* Related products */}
      {relatedMedicines.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Productos relacionados
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedMedicines.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
