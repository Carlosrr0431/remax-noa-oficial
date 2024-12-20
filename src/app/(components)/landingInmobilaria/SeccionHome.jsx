"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Logo from '../../public/LOGO REMAX.svg'
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Agente2 from '../../public/ser agente.jpg'
import Comprar from '../../public/comprar.jpg'
import Vender from '../../public/vender.jpg'
import BeneficiosAgentes from "./BeneficiosAgente"
import ClasificacionPropiedades from "./ClasificacionPropiedades"
import { CarouselPropiedades } from "./CarouselPropiedades"
import Image from "next/image"
import { BottomNav } from "./BottomNav"
import { SeccionNoticias } from "./seccionNoticias/SeccionNoticias"
import SeccionAgente from "./seccionAgente/SeccionAgente"

const tabs = [
    { id: "mortgage", label: "Ser Agente", image: Agente2, title: "FORMA PARTE DE NUESTRO EQUIPO Y DEL EXITO EN RE/MAX NOA" },
    { id: "buy", label: "Comprar", image: Comprar, title: "COMPRA TU PROPIEDAD EN LA RED INMOBILARIA N°1 DEL MUNDO" },
    { id: "sell", label: "Vender", image: Vender, title: "VENDE TU PROPIEDAD Y CONTA CON EL MEJOR SERVICIO INMOBILIARIO" }
]

const nav = [
    {
        titulo: "Comprar",
        id: 1,
        descripcion1: "¿Porque comprar en RE/MAX NOA?",
        descripcion2: "¿Porque RE/MAX NOA?",
        url: '/nuevaLanding/porque-comprar'
    },
    {
        titulo: "Vender",
        id: 2,
        descripcion1: "¿Porque Vender en RE/MAX NOA?",
        descripcion2: "¿Porque RE/MAX NOA?",
        url: '/nuevaLanding/porque-vender'
    },

    {
        titulo: "Alquilar",
        id: 3,
        descripcion1: "¿Porque Alquilar en RE/MAX NOA?",
        descripcion2: "¿Porque RE/MAX NOA?"
    },

    {
        titulo: "Trabaja con nosotros",
        id: 4,
        descripcion1: "¿Porque Trabaja con nosotros en RE/MAX NOA?",
        descripcion2: "¿Porque RE/MAX NOA?",
        url: '/nuevaLanding/reclutamiento'
    },
]

export default function SeccionHome() {
    const [currentTab, setCurrentTab] = useState(tabs[0].id)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTab((prevTab) => {
                const currentIndex = tabs.findIndex((tab) => tab.id === prevTab)
                const nextIndex = (currentIndex + 1) % tabs.length
                return tabs[nextIndex].id
            })
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative min-h-[600px] lg:min-h-screen w-full overflow-hidden">

            {/* Content */}
            <div className="relative z-20">
                <nav className="bg-transparent px-4 py-4">
                    <div className="container mx-auto flex items-center justify-between">
                        <Link href="/#inicio" >

                            <Image
                                src={Logo}
                                width={180}
                                height={160}
                                alt=""
                                priority={true}
                                // lg:mx-0 lg:start-1 lg:translate-y-14 lg:items-start lg:-translate-x-[80px]
                                className={`object-cover relative right-0 bottom-[50px] sm:bottom-0 sm:right-[70px]`}

                            />

                        </Link>
                        <NavigationMenu className="hidden lg:flex">
                            <NavigationMenuList>
                                {nav.map((item, index) => (
                                    <NavigationMenuItem key={index}>
                                        <NavigationMenuTrigger className="text-white bg-transparent hover:bg-white/10">{item.titulo}</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                                                <li className="row-span-3">
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                            href={`${item.url}`}
                                                        >
                                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                                {item.titulo} Con Re/Max Noa
                                                            </div>
                                                            <p className="text-sm leading-tight text-muted-foreground">
                                                                Descubre como Re/Max Noa puede ayudarte {item.titulo.toLowerCase()}.
                                                            </p>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                                <li>
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                            href={`${item.url}`}
                                                        >
                                                            <div className="text-sm font-medium leading-none">{item.descripcion1}</div>
                                                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                                Description for Option 1
                                                            </p>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                                <li>
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                            href={`${item.url}`}
                                                        >
                                                            <div className="text-sm font-medium leading-none">{item.descripcion2}</div>
                                                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                                Description for Option 2
                                                            </p>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                        <Link href={'/nuevaLanding/forma-parte'}>
                            <Button variant="outline" className="text-black border-white hover:bg-white hover:text-black">
                                Enviar CV
                            </Button></Link>

                    </div>
                </nav>

                <div className="container mx-auto px-4 pt-20 pb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        {/* */}

                        {tabs.map((tab, index) => (
                            currentTab === tab.id && (

                                <h1 key={index} className="text-3xl md:text-5xl font-bold text-white mb-6">
                                    {tab.title}
                                    {/* <br /> */}

                                </h1>

                            )
                        ))}

                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                            <AnimatePresence mode="wait">
                                {tabs.map((tab, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Button
                                            variant={currentTab === tab.id ? "default" : "ghost"}
                                            onClick={() => setCurrentTab(tab.id)}
                                            className={`text-base sm:text-lg font-medium text-white bg-white/10 border border-white/20 ${currentTab === tab.id ? "bg-primary text-primary-foreground" : ""
                                                }`}
                                        >
                                            {tab.label}
                                            {currentTab === tab.id && (
                                                <motion.div
                                                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary-foreground"
                                                    layoutId="activeTab"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                />
                                            )}
                                        </Button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>

                <AnimatePresence initial={false} mode="wait">
                    {tabs.map((tab, index) => (
                        currentTab === tab.id && (
                            <motion.div
                                key={index}
                                className="absolute inset-0 bg-black/50 -z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Image

                                    className="w-full h-full object-cover"
                                    width={0}
                                    height={0}
                                    src={tab.image}
                                    alt=""
                                >

                                </Image>
                                <div className="absolute inset-0 bg-black/50 z-10" />
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>



            </div>



            {/* Service Cards */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative z-20 bg-background"
            >

                <BeneficiosAgentes />

            </motion.div>



            {/* Service Cards */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative z-20 bg-background"
            >

                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Clasificación de propiedades</h1>
                    <p className="text-2xl font-normal text-gray-600">Elegí entre más de 360 propiedades</p>
                </div>
                <div className="mx-auto  px-4 sm:px-6 lg:px-9">    <ClasificacionPropiedades /></div>



            </motion.div>



            {/* Service Cards */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative z-20 bg-background  min-h-screen bg-gray-100"
            >
                {/* <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Propiedades Destacadas</h1>
                </div> */}
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"> <CarouselPropiedades /></div>


            </motion.div>


            {/* Service Cards */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className=" min-h-screen bg-gray-50"
            >

                <SeccionNoticias />

            </motion.div>


            {/* Service Cards */}
            {/* <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative z-20 bg-background"
            >

                <ListaServicios />

            </motion.div> */}


            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative z-20 bg-background"
            >

                <SeccionAgente />

            </motion.div>

            <BottomNav />
        </div>
    )
}

