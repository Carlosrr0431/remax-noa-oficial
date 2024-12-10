'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from 'lucide-react'
import { useAppContext } from '@/app/(context)/AppWrapper'
import { useRouter } from 'next/navigation'


const categories = [
    {
        title: "Casas",
        count: 416,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
        description: "Explora las mejores propiedades..."
    },
    {
        title: "Departamentos",
        count: 391,
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Explora las mejores propiedades..."
    },
    {
        title: "Terrenos",
        count: 104,
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80",
        description: "Explora las mejores propiedades..."
    },
    {
        title: "Departamentos",
        count: 1660,
        image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Explora las mejores propiedades..."
    },
    {
        title: "Locales",
        count: 288,
        image: "https://images.unsplash.com/photo-1574359411659-15573a27751b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        description: "Explora las mejores propiedades..."
    },
    {
        title: "Oficinas",
        count: 16,
        image: "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80",
        description: "Explora las mejores propiedades..."
    }
    // ,
    // {
    //     title: "Precios Reducidos",
    //     count: 252,
    //     image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80",
    //     description: "Explora las mejores propiedades..."
    // },
    // {
    //     title: "Zona Sur",
    //     count: 6,
    //     image: "https://images.unsplash.com/photo-1626178793926-22b28830aa30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    //     description: "Explora las mejores propiedades..."
    // },
]

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
}

export default function ClasificacionPropiedades() {
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const { selectedCategory, setSelectedCategory } = useAppContext();
    const router = useRouter()

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
        >
            {categories.map((category, index) => (
                <motion.div
                    key={index}
                    variants={item}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    onClick={() => {

                        setSelectedCategory(category.title)
                        router.push(`/nuevaLanding/propiedades?tipo=${category.title}`)
                        // redirect(`/nuevaLanding/propiedades`)

                    }}
                >
                    <Card className="group relative overflow-hidden rounded-xl h-[250px] cursor-pointer shadow-lg transition-shadow duration-300 hover:shadow-xl">
                        {/* Background Image */}
                        <motion.div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${category.image})` }}
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />

                        {/* Content */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <h3 className="text-2xl font-bold text-white drop-shadow-md">
                                    {category.title}
                                </h3>
                                <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                                    {category.count}
                                </span>
                            </div>
                            <AnimatePresence>
                                {hoveredIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex flex-col space-y-2"
                                    >
                                        <p className="text-white text-sm">{category.description}</p>
                                        <Button variant="secondary" className="self-start">
                                            Explora <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    )
}

