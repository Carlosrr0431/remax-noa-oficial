"use client"

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Image as ImageIcon, View } from 'lucide-react';
import Image from 'next/image';
import { PropertyModal } from './ModalGaleria';

export function PropiedadGaleria({ images }) {
    const [currentImage, setCurrentImage] = useState(0);
    const [showLightbox, setShowLightbox] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const previousImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <>
            <div className="relative ">
                <div className="container mx-auto px-0">
                    <div className="grid grid-cols-4 grid-rows-2 gap-2 mb-4 h-[400px]">
                        {images.slice(0, 5).map((image, index) => (


                            <div
                                key={image.id}
                                className={`relative overflow-hidden rounded-lg cursor-pointer ${index === 0 ? 'col-span-2 row-span-2' : ''
                                    }`}
                                onClick={() => {
                                    setCurrentImageIndex(index)
                                    setIsModalOpen(true)
                                }}
                            >
                                <img
                                    src={image}

                                    className="w-full h-full object-cover"
                                />
                                {/* <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                /> */}
                                {image.type === '360' && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                        <View className="h-8 w-8 text-white" />
                                    </div>
                                )}
                                {index === 0 && (
                                    <div className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-sm font-semibold text-blue-800">
                                        {images.length} Fotos
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>


                </div>

                <PropertyModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    images={images}
                    currentImageIndex={currentImageIndex}
                    onNavigate={setCurrentImageIndex}
                />
            </div>

            {/* Lightbox */}
            {showLightbox && (
                <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center backdrop-blur-sm">
                    <button
                        onClick={() => setShowLightbox(false)}
                        className="absolute top-4 right-4 text-white/90 p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <button
                        onClick={previousImage}
                        className="absolute left-4 text-white/90 p-3 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    <div className="relative w-full h-full flex items-center justify-center">
                        <img
                            src={images[currentImage]}
                            alt={`Property view ${currentImage + 1}`}
                            className="max-h-[85vh] max-w-[85vw] object-contain"
                        />
                    </div>

                    <button
                        onClick={nextImage}
                        className="absolute right-4 text-white/90 p-3 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white/90 px-4 py-2 rounded-full backdrop-blur-sm">
                        {currentImage + 1} / {images.length}
                    </div>
                </div>
            )}
        </>
    );
}