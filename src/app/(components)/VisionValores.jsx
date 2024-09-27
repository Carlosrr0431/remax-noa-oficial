'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Rocket, Target, Zap } from 'lucide-react'


const fadeInAnimationVariants = {
    initial: (i) => ({
        opacity: 0,
        translateX: -50,
    }),
    animate: (i) => (
        {
            opacity: 1, translateX: 0, translateY: 0,
            transition: {
                duration: 0.8,
                delay: i * 0.4,

            }
        }
    )
}



const fadeInAnimationVariants2 = {
    initial: (i) => ({
        opacity: 0,
        translateX: 50,
    }),
    animate: (i) => (
        {
            opacity: 1, translateX: 0, translateY: 0,
            transition: {
                duration: 0.8,
                delay: i * 0.4,

            }
        }
    )
}


const fadeInAnimationVariants3 = {
    initial: (i) => ({
        opacity: 0,
        translateX: -50,
    }),
    animate: (i) => (
        {
            opacity: 1, translateX: 0, translateY: 0,
            transition: {
                duration: 0.12,
                delay: i * 0.8,

            }
        }
    )
}

export const VisionValores = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null)

    const visionPoints = [
        { icon: <Rocket className="h-8 w-8" />, title: "Visión", description: "Somos el equipo que eligen los mejores agentes/dueños del 40% del mercado." },
        { icon: <Zap className="h-8 w-8" />, title: "Misión", description: "Llevar a nuestros agentes al Hall Of Fame en 4 años." },
        { icon: <Target className="h-8 w-8" />, title: "Valores", description: "Confianza, enfoque, generosidad, compromiso, pasión." },

    ]

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 to-blue-900 py-20 text-white sm:rounded-t-[150px] rounded-t-[100px] mt-[650px] sm:mt-0 ">
            {/* <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
            </div> */}
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >


                    <motion.h2
                        initial="initial"
                        variants={fadeInAnimationVariants}
                        whileInView="animate"
                        viewport={{ once: true }}
                        custom={1}
                        className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl">

                        Se parte de nuestro futuro
                    </motion.h2>
                    <motion.p
                        initial="initial"
                        variants={fadeInAnimationVariants2}
                        whileInView="animate"
                        viewport={{ once: true }}
                        custom={1}

                        className="mx-auto mb-12 max-w-2xl text-xl leading-7 opacity-90">
                        Imaginamos un mundo donde la tecnología y la humanidad convergen para crear un futuro brillante y sostenible.
                    </motion.p>
                </motion.div>
                <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {visionPoints.map((point, index) => (
                        <motion.div
                            key={index}
                            initial="initial"
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2, delay: index * 0.1 }}

                            variants={fadeInAnimationVariants}
                            whileInView="animate"
                            viewport={{ once: true }}
                            custom={index}

                            className="relative overflow-hidden rounded-xl bg-white/10 p-6 backdrop-blur-sm "
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <div className="rounded-full bg-blue-500 p-3 text-white">{point.icon}</div>
                                <ChevronRight className={`h-6 w-6 transform transition-transform duration-300 ${hoveredIndex === index ? 'translate-x-1' : ''}`} />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">{point.title}</h3>
                            <p className="text-white/80">{point.description}</p>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-16 text-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-full bg-white px-8 py-3 font-semibold text-blue-700 shadow-lg transition-colors hover:bg-purple-100 invisible"
                    >
                        Descubre Más
                    </motion.button>
                </div>
            </div>
        </section>
    )
}
