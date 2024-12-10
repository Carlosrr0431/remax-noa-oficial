import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarousel } from './useCarousel';
import { properties } from './CarouselData';
import { PropiedadCard } from '../PropiedadCard';
import { useAppContext } from '@/app/(context)/AppWrapper'
import { useRouter } from 'next/navigation'

export const CarouselPropiedades = () => {
    const { currentIndex,
        nextSlide,
        prevSlide,
        getVisibleCards,
        isAutoplay,
        toggleAutoplay,
        pauseAutoplay,
        resumeAutoplay } = useCarousel(5000);
    const [visibleCards, setVisibleCards] = useState(1);
    const {setSelectedProperty } = useAppContext();
    const router = useRouter()


    useEffect(() => {
        const handleResize = () => {
            setVisibleCards(getVisibleCards());
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [getVisibleCards]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-700">Propiedades más destacadas</h2>
                <div className="flex justify-between items-center">
                    <p className="text-gray-600">Contamos con las mejores propiedades de Salta & Jujuy</p>
                    <div className="flex gap-2">
                        <button
                            onClick={prevSlide}
                            className="p-2 rounded-full bg-white text-black shadow-md hover:bg-gray-50 transition-colors"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-2 rounded-full bg-white text-black shadow-md hover:bg-gray-50 transition-colors"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                    }}
                >
                    {properties.map((property, index) => (
                        <div
                            key={index}
                            className="w-full px-2 md:w-1/2 lg:w-1/3 flex-shrink-0"
                            style={{ flex: `0 0 ${100 / visibleCards}%` }}
                            onClick={() => {
                                setSelectedProperty(property)
                                router.push(`/nuevaLanding/propiedades?id=${property.id}`)
                            }}
                        >
                            <PropiedadCard property={property.previsualizar} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};