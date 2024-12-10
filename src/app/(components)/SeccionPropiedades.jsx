import { PropiedadCard } from './PropiedadCard'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { useAppContext } from '../(context)/AppWrapper';
import { useEffect } from 'react';
import { FaQuoteLeft } from 'react-icons/fa'

const properties = [
    {
        id: 1,
        title: "Casa moderna en el centro",
        image: "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1732538348/bqqsutujzqv1wuj3f6gv.webp",
        price: "$250,000",
        bedrooms: 3,
        bathrooms: 2,
        area: "150 m²",
        parking: 1,
        garden: true,
        description: "Hermosa casa moderna ubicada en el corazón de la ciudad. Perfecta para familias jóvenes que buscan comodidad y estilo en una ubicación céntrica."
    },
    {
        id: 2,
        title: "Apartamento con vista al mar",
        image: "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1732538180/vm2ixbxmt1znzfsetl3t.webp",
        price: "$180,000",
        bedrooms: 2,
        bathrooms: 1,
        area: "80 m²",
        parking: 1,
        garden: true,
        description: "Acogedor apartamento con impresionantes vistas al mar. Ideal para parejas o inversores que buscan una propiedad de alto potencial en una ubicación privilegiada."
    },
    {
        id: 3,
        title: "Villa de lujo con piscina",
        image: "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1732538180/vm2ixbxmt1znzfsetl3t.webp",
        price: "$500,000",
        bedrooms: 5,
        bathrooms: 4,
        area: "300 m²",
        parking: 2,
        garden: true,
        description: "Espectacular villa de lujo con piscina privada y amplios jardines. Perfecta para aquellos que buscan exclusividad y confort en un entorno privilegiado."
    },

    {
        id: 2,
        title: "Apartamento con vista al mar",
        image: "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1732538180/vm2ixbxmt1znzfsetl3t.webp",
        price: "$180,000",
        bedrooms: 2,
        bathrooms: 1,
        area: "80 m²",
        parking: 1,
        garden: true,
        description: "Acogedor apartamento con impresionantes vistas al mar. Ideal para parejas o inversores que buscan una propiedad de alto potencial en una ubicación privilegiada."
    },
    {
        id: 3,
        title: "Villa de lujo con piscina",
        image: "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1732538180/vm2ixbxmt1znzfsetl3t.webp",
        price: "$500,000",
        bedrooms: 5,
        bathrooms: 4,
        area: "300 m²",
        parking: 2,
        garden: true,
        description: "Espectacular villa de lujo con piscina privada y amplios jardines. Perfecta para aquellos que buscan exclusividad y confort en un entorno privilegiado."
    }
]

export default function SeccionPropiedades() {

    const { ancho, setAncho } = useAppContext()

    useEffect(() => {
        window?.addEventListener("resize", () => {
            setAncho(window.innerWidth);
        });
    })

    return (
        <div className="relative  pb-16">

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{
                    el: '.swiper-pagination',
                    clickable: true,
                }}

                autoplay={{
                    delay: 5000
                }}

                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                }}
                className="mySwiper !pb-12" // Añadimos padding inferior al Swiper
            >
                <div className="mx-10">
                    {properties.map((property) => (
                        <SwiperSlide key={property.id}>
                            <PropiedadCard property={property} />
                        </SwiperSlide>
                    ))}
                </div>


                {/* Flechas de navegación personalizadas */}
                <div className="swiper-button-prev !text-primary !left-2"></div>
                <div className="swiper-button-next !text-primary !right-2"></div>
                {/* Paginación personalizada */}
                <div className="swiper-pagination !bottom-0"></div>
            </Swiper>

        </div>

    );
};











// {
//     return (
//         <div className="min-h-screen bg-gray-100 mt-[100px] mb-[100px]">
//             <header className="bg-white shadow">
//                 <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//                     <h1 className="text-3xl font-bold text-gray-900">Propiedades Destacadas</h1>
//                 </div>
//             </header>
//             <main>
//                 <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//                     <div className="px-4 py-6 sm:px-0">
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {properties.map((property) => (
//                                 <PropiedadCard key={property.id} property={property} />
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     )
// }



