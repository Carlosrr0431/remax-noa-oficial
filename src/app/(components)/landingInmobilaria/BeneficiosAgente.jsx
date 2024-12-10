"use client"

import { motion } from "framer-motion"
import { Building2, Award, BadgeDollarSign, Users2, Target, Rocket, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from "react"
import Video from '../../public/video 1920x1080_convención 2024 (1).mp4'
import { useRouter } from "next/navigation"
import Link from "next/link"

const benefits = [
    {
        icon: <Building2 className="w-8 h-8" />,
        title: "Portafolio Premium",
        description: "Propiedades exclusivas"
    },
    {
        icon: <Award className="w-8 h-8" />,
        title: "Marca Reconocida",
        description: "Líder en el mercado"
    },
    {
        icon: <BadgeDollarSign className="w-8 h-8" />,
        title: "Altas Comisiones",
        description: "Estructura competitiva"
    },
    {
        icon: <Users2 className="w-8 h-8" />,
        title: "Red Global",
        description: "Conexiones mundiales"
    },
    {
        icon: <Target className="w-8 h-8" />,
        title: "Capacitación Continua",
        description: "Desarrollo profesional"
    },
    {
        icon: <Rocket className="w-8 h-8" />,
        title: "Herramientas Digitales",
        description: "Tecnología de punta"
    }
]

const BenefitCard = ({ benefit }) => (
    <div className="bg-white  p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
        <div className="text-red-600 mb-3 group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:scale-105 transition-transform duration-300">{benefit.title}</h3>
        <p className="text-sm text-gray-600 group-hover:scale-105 transition-transform duration-300">{benefit.description}</p>
    </div>
)

const Carousel = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const carouselRef = useRef(null)
    const [startX, setStartX] = useState(null)
    const [isSwiping, setIsSwiping] = useState(false)

    const totalSlides = children.length

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
        }, 5000)

        return () => clearInterval(interval)
    }, [totalSlides])

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.style.transform = `translateX(-${currentIndex * 100}%)`
        }
    }, [currentIndex])

    const handleDragStart = (e) => {
        setStartX(e.pageX || (e.touches && e.touches[0].pageX))
        setIsSwiping(true)
    }

    const handleDragMove = (e) => {
        if (!isSwiping) return
        const currentX = e.pageX || (e.touches && e.touches[0].pageX)
        const diff = startX - currentX
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
            } else {
                setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
            }
            setIsSwiping(false)
        }
    }

    const handleDragEnd = () => {
        setIsSwiping(false)
    }

    return (
        <>
            <div className="relative overflow-hidden">
                <div
                    ref={carouselRef}
                    className="flex transition-transform duration-500 ease-in-out cursor-grab active:cursor-grabbing"
                    style={{ width: `${totalSlides * 100}%` }}
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                >
                    {children}
                </div>
            </div>
            <div className="flex justify-center space-x-2 mt-4">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                        key={index}
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-red-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Ir a la diapositiva ${index + 1}`}
                    />
                ))}
            </div>
        </>
    )
}
export default function BeneficiosAgente() {

    const [isMobile, setIsMobile] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 flex items-center justify-center">
            <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 p-4">
                <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
                    <div className="relative h-[60vh] sm:h-[50vh] lg:h-[80vh] rounded-3xl overflow-hidden shadow-2xl">


                        <video
                            src={Video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full rounded-2xl h-[100vh] shadow-2xl ring-1 ring-gray-900/10 object-cover"
                        >

                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/70 to-transparent">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                                Beneficios de ser Agente
                                <span className="text-red-400 block mt-1"> REMAX NOA</span>
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 lg:space-y-8">
                    {isMobile ? (
                        <Carousel>
                            {[0, 2, 4].map((index) => (
                                <div key={index} className="w-full flex-shrink-0 px-2">
                                    <div className="grid grid-cols-1 gap-4">
                                        <BenefitCard benefit={benefits[index]} />
                                        <BenefitCard benefit={benefits[index + 1]} />
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            {benefits.map((benefit, index) => (
                                <BenefitCard key={index} benefit={benefit} />
                            ))}
                        </div>
                    )}

                    <Link
                        href={'/nuevaLanding/forma-parte'}
                        className="bg-red-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:bg-red-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 w-full sm:w-[70%] mx-auto text-center"
                    >
                        Únete a Nuestro Equipo
                    </Link>
                </div>
            </div>
        </div>
    )
    // return (
    //     <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 flex items-center justify-center">
    //         <div className="w-full max-w-7xl flex gap-4">
    //             <motion.div
    //                 initial={{ opacity: 0, x: -50 }}
    //                 animate={{ opacity: 1, x: 0 }}
    //                 transition={{ duration: 0.5 }}
    //                 className="w-1/2"
    //             >
    //                 <motion.div
    //                     whileHover={{ scale: 1.02 }}
    //                     transition={{ duration: 0.2 }}
    //                     className="relative h-[80vh] rounded-3xl overflow-hidden shadow-2xl"
    //                 >
    //                     <Image
    //                         src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"
    //                         alt="Propiedad inmobiliaria moderna"
    //                         fill
    //                         className="object-cover"
    //                         sizes="50vw"
    //                     />
    //                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    //                     <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
    //                         <motion.h2
    //                             initial={{ opacity: 0, y: 20 }}
    //                             animate={{ opacity: 1, y: 0 }}
    //                             transition={{ duration: 0.5, delay: 0.3 }}
    //                             className="text-3xl font-bold"
    //                         >
    //                             Beneficios de ser Agente
    //                             <span className="text-red-400"> REMAX NOA</span>
    //                         </motion.h2>
    //                     </div>
    //                 </motion.div>
    //             </motion.div>

    //             <motion.div
    //                 initial={{ opacity: 0, x: 50 }}
    //                 animate={{ opacity: 1, x: 0 }}
    //                 transition={{ duration: 0.5, delay: 0.2 }}
    //                 className="w-1/2 flex flex-col justify-center space-y-4"
    //             >

    //                 <div className="grid grid-cols-2 gap-4 h-[70vh]">
    //                     {benefits.map((benefit, index) => (
    //                         <motion.div
    //                             key={index}
    //                             initial={{ opacity: 0, y: 20 }}
    //                             animate={{ opacity: 1, y: 0 }}
    //                             transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
    //                             className="bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between"
    //                         >
    //                             <div>
    //                                 <div className="text-red-600 mb-2">{benefit.icon}</div>
    //                                 <h3 className="text-sm font-semibold text-gray-900">{benefit.title}</h3>
    //                             </div>
    //                             <p className="text-xs text-gray-600">{benefit.description}</p>
    //                         </motion.div>
    //                     ))}
    //                 </div>

    //                 <motion.button
    //                     whileHover={{ scale: 1.05 }}
    //                     whileTap={{ scale: 0.95 }}
    //                     className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:bg-red-700 transition-colors mx-auto   w-[70%] "
    //                 >
    //                     Únete a Nuestro Equipo
    //                 </motion.button>
    //             </motion.div>
    //         </div>
    //     </div>
    // )
}