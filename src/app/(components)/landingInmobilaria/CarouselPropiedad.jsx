import React from 'react';

export const CarouselPropiedad = ({
    price,
    image,
    beds,
    baths,
    sqft,
    status,
    address,
    location,
    mlsInfo,
    tag
}) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
            <div className="relative">
                {tag && (
                    <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {tag}
                    </span>
                )}
                <img
                    src={image}
                    alt={address}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
            </div>
            <div className="p-4 md:p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl md:text-2xl font-bold">${price.toLocaleString()}</h3>
                    <span className="text-green-600 font-medium">{status}</span>
                </div>
                <div className="flex gap-4 mb-4">
                    <span className="text-gray-600">{beds} beds</span>
                    <span className="text-gray-600">{baths} ba</span>
                    <span className="text-gray-600">{sqft.toLocaleString()} sqft</span>
                </div>
                <p className="text-gray-800 font-medium mb-2">{address}</p>
                <p className="text-gray-600 mb-4">{location}</p>
                <p className="text-sm text-gray-500">{mlsInfo}</p>
            </div>
        </div>
    );
};