import React from 'react';
import { PropiedadTarjeta } from './PropiedadTarjeta';
import { useRouter } from 'next/navigation'

export function ListaPropiedades({ properties, onPropertyClick }) {

    const router = useRouter()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {properties.map((property) => (
                <div key={property.id} onClick={() => {
                    router.push(`/nuevaLanding/propiedades?id=${property.id}`)
                    onPropertyClick(property)
                }} className="cursor-pointer">
                    <PropiedadTarjeta property={property} />
                </div>
            ))}
        </div>
    );
}