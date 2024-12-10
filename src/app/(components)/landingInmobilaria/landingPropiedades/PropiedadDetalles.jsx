import React from 'react';
import { Bed, Bath, Car, Home } from 'lucide-react';

export function PropiedadDetalles({ area, bedrooms, bathrooms, parking }) {
    return (
        <div className="flex items-center gap-4 text-gray-600 text-[17px]">
            <div className="flex items-center gap-1">
                <Home className="w-4 h-4" />
                <span>{area}m²</span>
            </div>
            <div className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                <span>{bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                <span>{bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
                <Car className="w-4 h-4" />
                <span>{parking}</span>
            </div>
        </div>
    );
}