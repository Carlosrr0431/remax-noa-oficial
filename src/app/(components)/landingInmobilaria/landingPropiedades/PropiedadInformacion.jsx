import React from 'react';
import { ArrowLeft, Calendar, Eye, Heart, MapPin, Share2 } from 'lucide-react';
import { PropiedadGaleria } from './PropiedadGaleria';
import { PropiedadDetalles } from './PropiedadDetalles';
import { AgenteCard } from './AgenteCard';


export function PropiedadInformacion({ property, onBack }) {
  if (!property) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No se encontró la propiedad</p>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-gray-50 overflow-y-auto">
      {/* Back button and actions */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al listado</span>
          </button>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Gallery section */}
        <div className="my-6">
          <PropiedadGaleria images={property.images} />
        </div>

        {/* Content grid with sticky agent card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price and stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm font-medium text-blue-600 mb-2 block">
                    {property.category}
                  </span>
                  <h1 className="text-3xl font-bold mb-2 text-gray-800">
                    {property.currency} {property.price.toLocaleString()}
                  </h1>
                  {property.expenses && (
                    <p className="text-gray-600">
                      + {property.currency} {property.expenses.toLocaleString()} exp.
                    </p>
                  )}
                  {property.estimatedPayment && (
                    <p className="text-sm text-gray-600 mt-1">
                      Cuota estimada: {property.currency} {property.estimatedPayment.toLocaleString()}/mes
                    </p>
                  )}
                </div>
                {property.totalViews && (
                  <div className="flex items-center gap-1 text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{property.totalViews.toLocaleString()} visitas</span>
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-600">{property.location.area}</h2>
                  {/* <p className="text-gray-600">
                    {property.location.address && `${property.location.address}, `}
                    {property.location.city}, {property.location.province}
                  </p> */}
                  {/* {property.location.neighborhood && (
                    <p className="text-gray-600">{property.location.neighborhood}</p>
                  )} */}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Características principales</h3>
              <PropiedadDetalles {...property.features} />
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Descripción</h3>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Publication date */}
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Calendar className="w-4 h-4" />
              <span>Publicado hace 2 días</span>
            </div>
          </div>

          {/* Sticky agent card */}
          <div className="lg:col-span-1 ">
            <div className="sticky top-24">
              {property.agent && <AgenteCard agent={property.agent} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}