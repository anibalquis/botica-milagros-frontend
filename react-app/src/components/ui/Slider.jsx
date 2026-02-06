import { useState, useEffect } from 'react';
import sliderImg1 from '../../assets/images/pg1.png';
import sliderImg2 from '../../assets/images/pg2.png';
import sliderImg3 from '../../assets/images/pg3.png';
import sliderImg4 from '../../assets/images/pg4.png';
import sliderImg5 from '../../assets/images/pg5.png';

const defaultSlides = [
    { id: 1, image: sliderImg1, alt: 'Promoción 1' },
    { id: 2, image: sliderImg2, alt: 'Promoción 2' },
    { id: 3, image: sliderImg3, alt: 'Promoción 3' },
    { id: 4, image: sliderImg4, alt: 'Promoción 4' },
    { id: 5, image: sliderImg5, alt: 'Promoción 5' },
];

export default function Slider({ slides = defaultSlides, autoPlay = true, interval = 4000 }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (!autoPlay) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, interval);

        return () => clearInterval(timer);
    }, [autoPlay, interval, slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const goToPrev = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    return (
        <div className="relative w-full overflow-hidden bg-gray-100 rounded-xl">
            {/* Slides container */}
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="w-full flex-shrink-0">
                        <img
                            src={slide.image}
                            alt={slide.alt}
                            className="w-full h-64 md:h-80 lg:h-96 object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Navigation arrows */}
            <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-green-600 transition-all shadow-lg"
            >
                &#10094;
            </button>
            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-green-600 transition-all shadow-lg"
            >
                &#10095;
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                                ? 'bg-green-500 w-6'
                                : 'bg-white/70 hover:bg-white'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
