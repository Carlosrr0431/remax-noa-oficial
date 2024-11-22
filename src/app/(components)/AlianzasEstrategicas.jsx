import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Instagram, Globe, Phone } from 'lucide-react'
import Autoplay from "embla-carousel-autoplay"

import BodegonHotel from '../public/bodegueroLogo.png'
import HerClub from '../public/Logo the her club_Mesa de trabajo 1 (1).png'
import AmberSpa from '../public/amberspa.png'
import BenditoCafe from '../public/benditoCafe.jpg'

import Gilberto from '../public/Logo-gilberto-2.png'
import Image from "next/image"

export function AlianzasEstrategicas() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        skipSnaps: false,
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 640px)': { slidesToScroll: 2 },
            '(min-width: 1024px)': { slidesToScroll: 3 }
        }
    })

    const autoplayRef = useRef(null)
    const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true)

    const startAutoplay = useCallback(() => {
        if (emblaApi && isAutoplayEnabled) {
            autoplayRef.current = setInterval(() => {
                emblaApi.scrollNext()
            }, 5000)
        }
    }, [emblaApi, isAutoplayEnabled])

    const stopAutoplay = useCallback(() => {
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current)
        }
    }, [])

    useEffect(() => {
        startAutoplay()
        return () => stopAutoplay()
    }, [startAutoplay, stopAutoplay])

    const onSelect = useCallback(() => {
        stopAutoplay()
        startAutoplay()
    }, [stopAutoplay, startAutoplay])

    useEffect(() => {
        if (!emblaApi) return
        emblaApi.on('select', onSelect)
        return () => {
            emblaApi.off('select', onSelect)
        }
    }, [emblaApi, onSelect])


    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const alianzas = [
        {
            id: 1,
            nombre: "Gilberto",
            subtitulo: "Casa Arte Deco",
            tamaño: "90px",
            logo: Gilberto,
            instagram: "https://www.instagram.com/gilbertocasaartedeco?igsh=MWt0enZzbjNpNHBrZA==",
            web: "https://www.instagram.com/gilbertocasaartedeco?igsh=MWt0enZzbjNpNHBrZA==",
            whatsapp: "+5493873116510"
        },
        {
            id: 2,
            nombre: "El Bodeguero Hotel",
            subtitulo: "Restaurante & Resto Bar",
            logo: BodegonHotel,
            tamaño: "70px",
            instagram: "https://www.instagram.com/elbodeguerohotel?igsh=dmNpMzJoODl3OWU4",
            web: "https://www.elbodeguerohotel.com.ar/",
            whatsapp: "+"
        },
        {
            id: 3,
            nombre: "The Her Club ",
            subtitulo: "Cafe & Resto Bar",
            logo: HerClub,
            tamaño: "180px",
            instagram: "https://mobile.wonoma.com/#/centro/1862",
            web: "https://mobile.wonoma.com/#/centro/1862",
            whatsapp: "+5493875494142"
        },
        {
            id: 4,
            nombre: "Amber Spa",
            subtitulo: "Servicio de Spa",
            logo: AmberSpa,
            tamaño: "140px",
            instagram: "https://www.instagram.com/amberspasalta?igsh=NTJwOHdpY3A2Z2Rm",
            web: "https://linktr.ee/amberspasalta?fbclid=PAZXh0bgNhZW0CMTEAAabpZOR3xaCo9s7SR1DHvAwX1ieRmMexRUBKkykrkVGuUm7YfppSPuOcob4_aem_YEGCnq8sDMtC33W8vcej6A  ",
            whatsapp: "+5493874681921"
        },
        {
            id: 5,
            nombre: "Bendito Café",
            subtitulo: "Cafe & Resto Bar",
            logo: BenditoCafe,
            tamaño: "140px",
            instagram: "https://www.instagram.com/benditocafe.salta?igsh=c3g0cDRwZjZtOHJn ",
            web: "https://www.instagram.com/benditocafe.salta?igsh=c3g0cDRwZjZtOHJn ",
            whatsapp: "+5493873116510"
        },
    ]

    return (
        <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-gray-50 to-gray-100">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-gray-800">
                Nuestras Alianzas Estratégicas
            </h2>
            <div className="relative w-full max-w-7xl mx-auto">
                <Carousel
                    ref={emblaRef}
                    className="w-full"
                    plugins={[
                        Autoplay({
                            delay: 2000,
                        }),
                    ]}
                >
                    <CarouselContent className="-ml-4">
                        {alianzas.map((alianza) => (
                            <CarouselItem key={alianza.id} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                    <CardContent className="p-4 sm:p-6">
                                        <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                                            <div className="p-2 sm:p-4 rounded-lg  w-full max-w-[200px] sm:max-w-[240px] aspect-video flex items-center justify-center">
                                                <Image
                                                    src={alianza.logo}
                                                    width={240}
                                                    height={120}
                                                    alt={`Logo de ${alianza.nombre}`}
                                                    className={`w-full max-w-[200px] sm:max-w-[${alianza.tamaño}] object-cover`}
                                                />
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 text-center">{alianza.nombre}</h3>
                                            <p className="text-xs sm:text-sm text-gray-600 text-center">{alianza.subtitulo}</p>
                                            <div className="flex space-x-4 mt-2 sm:mt-4">
                                                <a href={alianza.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700">
                                                    <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                                                    <span className="sr-only">Instagram de {alianza.nombre}</span>
                                                </a>
                                                <a href={alianza.web} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                                                    <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                                                    <span className="sr-only">Sitio web de {alianza.nombre}</span>
                                                </a>
                                                <a href={`https://wa.me/${alianza.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">
                                                    <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                                                    <span className="sr-only">WhatsApp de {alianza.nombre}</span>
                                                </a>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {/* <CarouselPrevious onClick={scrollPrev} className="absolute left-0 sm:-left-4 md:-left-6 lg:-left-8 bg-white/80 hover:bg-white shadow-md" />
                    <CarouselNext onClick={scrollNext} className="absolute right-0 sm:-right-4 md:-right-6 lg:-right-8 bg-white/80 hover:bg-white shadow-md" /> */}
                </Carousel>
            </div>
        </div>
    )
}