import { useRef } from "react";
import ProductCard from "./ProductCard";

export default function ProductSlider({ title, loading, products }) {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = 320 * direction;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>

          <div className="flex gap-4 overflow-x-auto scroll-smooth pb-4 -mx-4 px-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="shrink-0 w-64 aspect-square bg-gray-200 rounded-xl p-4 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
          <p className="text-gray-500">No hay productos disponibles.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-green-600 hover:shadow-xl transition-all -ml-5"
          >
            &#10094;
          </button>

          {/* Products track */}
          <div
            ref={trackRef}
            className="slider-track flex gap-4 overflow-x-auto scroll-smooth pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product) => (
              <div key={product.id} className="shrink-0 w-64">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-green-600 hover:shadow-xl transition-all -mr-5"
          >
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
}
