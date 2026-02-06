import { useRef } from 'react';
import ProductCard from './ProductCard';

export default function ProductSlider({ title, products }) {
    const trackRef = useRef(null);

    const scroll = (direction) => {
        if (trackRef.current) {
            const scrollAmount = 320 * direction;
            trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!products || products.length === 0) return null;

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
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {products.map((product) => (
                            <div key={product.id} className="flex-shrink-0 w-64">
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
