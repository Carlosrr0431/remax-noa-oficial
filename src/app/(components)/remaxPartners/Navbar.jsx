"use client"

import React, { useState } from 'react';
import { Building2, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../public/LOGO REMAX.svg'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 glass-effect">
            <div className="max-w-7xl mx-auto container-padding ">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center space-x-2">
                        {/* <Building2 className="h-8 w-8 text-blue-600" />
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                            PropConnect
                        </span> */}
                        <Link href="/#inicio" >

                            <Image
                                src={Logo}
                                width={140}
                                height={120}
                                alt=""
                                priority={true}
                                // lg:mx-0 lg:start-1 lg:translate-y-14 lg:items-start lg:-translate-x-[80px]
                                className={` object-cover relative right-0 bottom-[50px] sm:bottom-0 sm:right-[50px]`}

                            />




                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Características
                        </a>
                        <a href="#rankings" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Rankings
                        </a>
                        <a href="#newsletter" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Noticias
                        </a>
                        <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                            Iniciar Sesión
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <a
                                href="#features"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                                onClick={() => setIsOpen(false)}
                            >
                                Características
                            </a>
                            <a
                                href="#rankings"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                                onClick={() => setIsOpen(false)}
                            >
                                Rankings
                            </a>
                            <a
                                href="#newsletter"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                                onClick={() => setIsOpen(false)}
                            >
                                Noticias
                            </a>
                            <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full">
                                Iniciar Sesión
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}