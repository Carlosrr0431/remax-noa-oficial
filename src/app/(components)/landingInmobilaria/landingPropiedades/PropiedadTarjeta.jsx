import React from 'react';
import { Heart, Phone, MessageCircle, Car, Square, Bath, Bed } from 'lucide-react';
import { PropiedadInformacion } from './PropiedadInformacion';
import { PropiedadDetalles } from './PropiedadDetalles';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export function PropiedadTarjeta({ property }) {
  return (

    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={property.images[0]}
          alt={`Property in ${property.location.area}`}
          className="w-full h-64 object-cover"
        />
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
          <Heart className="w-5 h-5 text-red-600" />
        </button>
        <span className="absolute bottom-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
          {property.features.images} fotos
        </span>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-black">
              {property.currency} {property.price.toLocaleString()}
            </h3>
            {property.expenses && (
              <p className="text-gray-600 text-sm">
                + {property.currency} {property.expenses.toLocaleString()} exp.
              </p>
            )}
          </div>
          {property.highlighted && (
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
              Destacado
            </span>
          )}
        </div>

        <div>
          <h4 className="font-semibold text-lg text-gray-900">{property.location.area}</h4>
         
        </div>

        <PropiedadDetalles {...property.features} />
 

        <p className="text-gray-700 line-clamp-2 text-[16px] font-normal">{property.description}</p>

        <div className="flex gap-3 justify-center">
          <button className="flex-1 bg-green-500 text-white px-2 py-1 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 text-[20px]">
            <Phone className="w-5 h-5" />
            Llamar
          </button>
          <button className="flex-1 bg-blue-500 text-white px-2 py-1 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 text-[20px]">
            <MessageCircle className="w-5 h-5" />
            Contactar
          </button>
        </div>
      </div>
    </div>

    // <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
    //         <div className="relative h-64">
    //             <Image
    //                 src={property.images[0]}
    //                 layout="fill"
    //                 objectFit="cover"
    //                 className="transition-all duration-300 hover:scale-105"
    //             />
    //             <div className="absolute top-2 right-2">
    //                 <Badge className="bg-primary text-primary-foreground">{property.price.toLocaleString()}</Badge>
    //             </div>


    //         </div>
    //         <CardContent className="p-4">
    //             <h3 className="text-xl font-semibold text-gray-800 mb-2">{property.title}</h3>
    //             <p className="text-sm text-gray-600 mb-4 line-clamp-2">{property.description}</p>
    // <div className="grid grid-cols-2 gap-2">
    //     <Badge variant="outline" className="flex items-center justify-center py-1">
    //         <Bed className="w-4 h-4 mr-1" />
    //         {property.features.area} Dormitorios
    //     </Badge>
    //     <Badge variant="outline" className="flex items-center justify-center py-1">
    //         <Bath className="w-4 h-4 mr-1" />
    //         {property.features.bedrooms} Baños
    //     </Badge>
    //     <Badge variant="outline" className="flex items-center justify-center py-1">
    //         <Square className="w-4 h-4 mr-1" />
    //         {property.features.area} m² Cubiertos
    //     </Badge>
    //     <Badge variant="outline" className="flex items-center justify-center py-1">
    //         <Car className="w-4 h-4 mr-1" />
    //         {property.features.area} m² Totales
    //     </Badge>
    // </div>

    //         </CardContent>

    //     </Card>


  );
}