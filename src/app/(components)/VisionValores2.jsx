'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from 'lucide-react'

import { Rocket, Zap, Shield } from "lucide-react"
import Image from 'next/image'

const features = [
    {
        icon: Rocket,
        title: "Visión", description: "Somos el equipo que eligen los mejores agentes/dueños del 40% del mercado.",
        gradient: "from-pink-500 to-purple-500"
    },
    {
        icon: Zap,
        title: "Valores", description: "Confianza, enfoque, generosidad, compromiso y pasión.",
        gradient: "from-yellow-400 to-orange-500"
    },
    {
        icon: Shield,
        title: "Misión", description: "Llevar a nuestros agentes al Hall Of Fame en 4 años.",
        gradient: "from-green-400 to-cyan-500"
    }
]

export const VisionValores2 = () => {
    const [hoveredCard, setHoveredCard] = useState(null)

    return (
        <section className="relative h-full  ">
            <div className="absolute inset-0  bg-cover bg-center opacity-10"
                style={{ transform: `translateY(${hoveredCard === 1 ? -10 : hoveredCard === 2 ? 10 : 0}px)` }}></div>
            <div className="container mx-auto h-full flex items-center justify-center gap-8 px-4">
                <motion.div className="w-1/2 h-[90%] border-none"
                    initial={{ x: -1000 }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}>
                    <Card
                        className="w-full shadow-md shadow-black h-full bg-gradient-to-br from-red-500 to-red-400 text-white overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 border-none"
                        onMouseEnter={() => setHoveredCard(1)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <CardContent className="flex flex-col justify-between h-full p-8">
                            <div>

                                <h2 className="text-4xl font-bold mb-4">Sumate a la experiencia REMAX NOA</h2>
                                {/* <p className="text-lg opacity-90">Sumérgete en un mundo de posibilidades infinitas. Descubre cómo la tecnología puede transformar tu vida cotidiana.</p> */}
                            </div>

                            {/* <div className=" mx-auto">
                                <div className="space-y-8">
                                    {features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className={`relative overflow-hidden rounded-2xl`}
                                        >
                                            <div className="relative flex items-center dark:bg-gray-800 rounded-2xl p-2 transition-transform duration-300 ease-in-out transform hover:scale-[1.02]">
                                                <div className={`flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 rounded-full  flex items-center justify-center mr-6`}>
                                                    <feature.icon className="w-4 h-4 sm:w-10 sm:h-10 text-white" />
                                                </div>
                                                <div className="flex-grow">
                                                    <h3 className="text-[18px] sm:text-md font-semibold mb-2 text-white dark:text-white">{feature.title}</h3>
                                                    <p className="text-white text-[18px] dark:text-gray-300">{feature.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div> */}
                            {/* <div className="flex items-center mt-8">
                                <span className="text-xl font-semibold">Explorar</span>
                                <ArrowRight className="ml-2" />
                            </div> */}
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div className="w-1/2 h-[90%] border-none"
                    initial={{ x: 1000 }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}>
                    <Card
                        className="w-full h-full  text-white overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 border-none border-[1px] border-black shadow-black/40 shadow-lg"
                        onMouseEnter={() => setHoveredCard(2)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <CardContent className="p-8 h-full ">
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                <div>
                                    <img class="object-cover object-center w-full h-40 max-w-full rounded-lg"
                                        src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
                                        alt="gallery-photo" />
                                </div>
                                <div>
                                    <img class="object-cover object-center w-full h-40 max-w-full rounded-lg"
                                        src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
                                        alt="gallery-photo" />
                                </div>
                                <div>
                                    <img class="object-cover object-center w-full h-40 max-w-full rounded-lg"
                                        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2560&amp;q=80"
                                        alt="gallery-photo" />
                                </div>
                                <div>
                                    <img class="object-cover object-center w-full h-40 max-w-full rounded-lg"
                                        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2940&amp;q=80"
                                        alt="gallery-photo" />
                                </div>
                                <div>
                                    <img class="object-cover object-center w-full h-40 max-w-full rounded-lg"
                                        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2762&amp;q=80"
                                        alt="gallery-photo" />
                                </div>
                                <div>
                                    <img class="object-cover object-center w-full h-40 max-w-full rounded-lg"
                                        src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2832&amp;q=80"
                                        alt="gallery-photo" />
                                </div>
                                <div>
                                    <img class="object-cover object-center w-full h-40 max-w-full rounded-lg"
                                        src="https://demos.creative-tim.com/material-kit-pro/assets/img/examples/blog5.jpg" alt="gallery-photo" />
                                </div>
                                <div>
                                    <img class="object-cover object-center w-full h-40 max-w-full rounded-lg"
                                        src="https://material-taillwind-pro-ct-tailwind-team.vercel.app/img/content2.jpg" alt="gallery-photo" />
                                </div>
                                <div>
                                    <img class="object-cover object-center w-full h-40 max-w-full rounded-lg"
                                        src="https://images.unsplash.com/photo-1620064916958-605375619af8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1493&amp;q=80"
                                        alt="gallery-photo" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}