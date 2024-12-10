import React, { useState } from 'react';
import { Menu, X, Home, ChevronDown } from 'lucide-react';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Home className="h-8 w-8 text-red-600" />
                        <span className="ml-2 text-xl font-bold text-red-600">REMAX NOA</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-black">Comprar</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4">
                                            <li className="row-span-3">
                                                <NavigationMenuLink asChild>
                                                    <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-red-500 to-red-700 p-6 no-underline outline-none focus:shadow-md">
                                                        <div className="mt-4 mb-2 text-lg font-medium text-white">Propiedades Destacadas</div>
                                                        <p className="text-sm leading-tight text-white/90">
                                                            Descubre las mejores opciones del mercado
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-red-600">
                                                        <div className="text-sm font-medium leading-none">Casas</div>
                                                        <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                                                            Encuentra tu casa ideal
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-red-600">
                                                        <div className="text-sm font-medium leading-none">Departamentos</div>
                                                        <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                                                            Explora departamentos disponibles
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-red-600">
                                                        <div className="text-sm font-medium leading-none">Terrenos</div>
                                                        <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                                                            Invierte en terrenos
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-black">Vender</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4">
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-red-600">
                                                        <div className="text-sm font-medium leading-none">Tasar Propiedad</div>
                                                        <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                                                            Obtén una tasación gratuita
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-red-600">
                                                        <div className="text-sm font-medium leading-none">Proceso de Venta</div>
                                                        <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                                                            Conoce nuestro proceso
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-red-600">
                                                        <div className="text-sm font-medium leading-none">Consejos</div>
                                                        <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                                                            Tips para vender mejor
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-black">Alquilar</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4">
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-red-600">
                                                        <div className="text-sm font-medium leading-none">Alquileres Disponibles</div>
                                                        <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                                                            Encuentra tu próximo hogar
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-red-600">
                                                        <div className="text-sm font-medium leading-none">Poner en Alquiler</div>
                                                        <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                                                            Publica tu propiedad
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-black">Trabaja con nosotros</NavigationMenuTrigger>

                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4">
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-red-600">
                                                        <div className="text-sm font-medium leading-none">Únete al Equipo</div>
                                                        <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                                                            Sé parte de REMAX NOA
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-red-600">
                                                        <div className="text-sm font-medium leading-none">Beneficios</div>
                                                        <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                                                            Conoce las ventajas
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-600"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                    <MobileMenuItem title="Comprar">
                        <MobileSubMenuItem href="#" text="Casas" />
                        <MobileSubMenuItem href="#" text="Departamentos" />
                        <MobileSubMenuItem href="#" text="Terrenos" />
                    </MobileMenuItem>

                    <MobileMenuItem title="Vender">
                        <MobileSubMenuItem href="#" text="Tasar Propiedad" />
                        <MobileSubMenuItem href="#" text="Proceso de Venta" />
                        <MobileSubMenuItem href="#" text="Consejos" />
                    </MobileMenuItem>

                    <MobileMenuItem title="Alquilar">
                        <MobileSubMenuItem href="#" text="Alquileres Disponibles" />
                        <MobileSubMenuItem href="#" text="Poner en Alquiler" />
                    </MobileMenuItem>

                    <MobileMenuItem title="Trabaja con nosotros">
                        <MobileSubMenuItem href="#" text="Únete al Equipo" />
                        <MobileSubMenuItem href="#" text="Beneficios" />
                    </MobileMenuItem>
                </div>
            </div>
        </header>
    );
};

const MobileMenuItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="space-y-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md"
            >
                {title}
                <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                        }`}
                />
            </button>
            <div className={`${isOpen ? 'block' : 'hidden'} pl-4 space-y-2`}>
                {children}
            </div>
        </div>
    );
};

const MobileSubMenuItem = ({ href, text }) => (
    <a
        href={href}
        className="block px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-md"
    >
        {text}
    </a>
);

export default Header;