import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { properties } from './CarouselData';

export const useCarousel = (autoplayInterval = 5000) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);
    const autoplayTimeoutRef = useRef();

    const getVisibleCards = useCallback(() => {
        if (typeof window === 'undefined') return 1;
        if (window.innerWidth >= 1024) return 3; // Desktop
        if (window.innerWidth >= 768) return 2;  // Tablet
        return 1; // Mobile
    }, []);

    const maxIndex = useMemo(() => {
        const visibleCards = getVisibleCards();
        return Math.max(0, properties.length - visibleCards);
    }, [getVisibleCards]);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex >= maxIndex ? 0 : prevIndex + 1
        );
    }, [maxIndex]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? maxIndex : prevIndex - 1
        );
    }, [maxIndex]);

    const toggleAutoplay = useCallback(() => {
        setIsAutoplay(prev => !prev);
    }, []);

    useEffect(() => {
        if (isAutoplay) {
            autoplayTimeoutRef.current = window.setInterval(() => {
                nextSlide();
            }, autoplayInterval);
        }

        return () => {
            if (autoplayTimeoutRef.current) {
                clearInterval(autoplayTimeoutRef.current);
            }
        };
    }, [isAutoplay, nextSlide, autoplayInterval]);

    // Pause autoplay on hover
    const pauseAutoplay = useCallback(() => {
        if (autoplayTimeoutRef.current) {
            clearInterval(autoplayTimeoutRef.current);
        }
    }, []);

    const resumeAutoplay = useCallback(() => {
        if (isAutoplay) {
            autoplayTimeoutRef.current = window.setInterval(() => {
                nextSlide();
            }, autoplayInterval);
        }
    }, [isAutoplay, nextSlide, autoplayInterval]);

    return {
        currentIndex,
        nextSlide,
        prevSlide,
        getVisibleCards,
        isAutoplay,
        toggleAutoplay,
        pauseAutoplay,
        resumeAutoplay
    };
};