import { Link } from "react-router-dom";
import Slider from "../components/ui/Slider";
import ProductSlider from "../components/products/ProductSlider";
import { products, getProductsByCategory } from "../data/products";
import adImg1 from "../assets/images/Add.png";
import adImg2 from "../assets/images/add2.png";
import adImg4 from "../assets/images/add4.png";

export default function Home() {
  // Get products for different sections
  const featuredProducts = products.filter((p) =>
    [49, 50, 51, 52, 53].includes(p.id),
  );
  const babyProducts = getProductsByCategory("bebes");
  const personalCareProducts = getProductsByCategory("cuidado-personal");

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

      {/* Featured Products */}
      <ProductSlider title="Lo Más Buscado" products={featuredProducts} />

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
              <div className="flex gap-4 overflow-x-auto pb-4 slider-track">
                {babyProducts.map((product) => (
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
      <ProductSlider title="Cuidado Personal" products={personalCareProducts} />
    </div>
  );
}
