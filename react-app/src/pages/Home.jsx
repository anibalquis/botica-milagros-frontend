import { Link } from "react-router-dom";
import Slider from "../components/ui/Slider";
import ProductSlider from "../components/products/ProductSlider";
import adImg1 from "../assets/images/Add.png";
import adImg2 from "../assets/images/add2.png";
import adImg4 from "../assets/images/add4.png";
import { useEffect, useState } from "react";
import { getRelatedMedicinesByCategoryId } from "../services/categories";

export default function Home() {
  const [relatedMedicines, setRelatedMedicines] = useState([]);
  const [babyProducts, setBabyProducts] = useState([]);
  const [genericMedicines, setGenericMedicines] = useState([]);

  const [loadingCare, setLoadingCare] = useState(true);
  const [loadingBabies, setLoadingBabies] = useState(true);
  const [loadingGenericMedicines, setLoadingGenericMedicines] = useState(true);

  const fetchCareProducts = async () => {
    try {
      const data = await getRelatedMedicinesByCategoryId(9);
      setRelatedMedicines(data);
    } catch (error) {
      console.error("Error loading care products", error);
    } finally {
      setLoadingCare(false);
    }
  };

  const fetchBabyProducts = async () => {
    try {
      const data = await getRelatedMedicinesByCategoryId(7);
      setBabyProducts(data);
    } catch (error) {
      console.error("Error loading baby products", error);
    } finally {
      setLoadingBabies(false);
    }
  };

  const fetchGenericMedicines = async () => {
    try {
      const data = await getRelatedMedicinesByCategoryId(4);
      setGenericMedicines(data);
    } catch (error) {
      console.error("Error loading supplement products", error);
    } finally {
      setLoadingGenericMedicines(false);
    }
  };

  useEffect(() => {
    fetchCareProducts();
    fetchBabyProducts();
    fetchGenericMedicines();
  }, []);

  return (
    <div>
      {/* Main Slider */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <Slider />
      </section>

      {/* Ad Banner 1 */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <Link to="/productos">
          <img
            src={adImg1}
            alt="Trabaja con nosotros"
            className="w-full rounded-xl shadow-md hover:shadow-lg transition-shadow"
          />
        </Link>
      </section>

      {/* Vitaminas y suplementos */}
      <ProductSlider
        title="Todos los medicamentos"
        loading={loadingGenericMedicines}
        products={genericMedicines}
      />

      {/* Small Ads */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/productos" className="block">
            <img
              src={adImg2}
              alt="Promoción"
              className="w-full rounded-xl hover:shadow-lg transition-shadow"
            />
          </Link>
          <Link to="/productos" className="block">
            <img
              src={adImg2}
              alt="Promoción"
              className="w-full rounded-xl hover:shadow-lg transition-shadow"
            />
          </Link>
          <Link to="/productos" className="block">
            <img
              src={adImg2}
              alt="Promoción"
              className="w-full rounded-xl hover:shadow-lg transition-shadow"
            />
          </Link>
        </div>
      </section>

      {/* Baby Products Section */}
      <section className="bg-linear-to-r from-blue-50 to-pink-50 py-10 my-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Los mejores productos para tu bebé
                <br />
                <span className="text-green-600">
                  con las marcas más confiables
                </span>
              </h2>
              <Link
                to="/productos/bebes"
                className="inline-block px-6 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
              >
                Ver más productos
              </Link>
            </div>

            <div className="overflow-hidden">
              {loadingBabies && (
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="shrink-0 w-56 aspect-square bg-gray-200 rounded-xl animate-pulse"
                    />
                  ))}
                </div>
              )}

              {!loadingBabies && babyProducts.length === 0 && (
                <p className="text-gray-500">
                  No hay productos para bebés disponibles.
                </p>
              )}

              <div className="flex gap-4 overflow-x-auto pb-4 slider-track">
                {!loadingBabies &&
                  babyProducts.length > 0 &&
                  babyProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/producto/${product.id}`}
                      className="shrink-0 w-56 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-contain mb-3"
                      />
                      <h3 className="font-medium text-gray-800 text-sm line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">
                        {product.description}
                      </p>
                      <p className="font-bold text-green-600">
                        S/{product.price.toFixed(2)}
                      </p>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner 2 */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <Link to="/productos">
          <img
            src={adImg4}
            alt="Ofertas especiales"
            className="w-full rounded-xl shadow-md hover:shadow-lg transition-shadow"
          />
        </Link>
      </section>

      {/* Personal Care Products */}
      <ProductSlider
        title="Cuidado Personal"
        loading={loadingCare}
        products={relatedMedicines}
      />
    </div>
  );
}
