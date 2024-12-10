"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Trophy, Users, Building2 } from 'lucide-react';
import Agente2 from '../../../public/ser agente.jpg'

const highlights = [
    {
        icon: Globe,
        text: 'Red Global #1',
    },
    {
        icon: Trophy,
        text: 'Líder Mundial',
    },
    {
        icon: Users,
        text: '+140.000 Agentes',
    },
    {
        icon: Building2,
        text: '+8.000 Oficinas',
    },
];

export function Hero() {
    return (
        <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden">
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
            >
                <img
                    src={Agente2}
                    alt="Modern office workspace"
                    className="w-full h-full object-cover"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/85 to-blue-900/75"
                />
            </motion.div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center py-6 sm:py-8 lg:-mt-14 sm:-mt-8 -mt-7">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl pt-2 sm:pt-4"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-white"
                    >
                        Unite al Líder Inmobiliario Mundial
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200"
                    >
                        Somos RE/MAX NOA, la red inmobiliaria más grande de Salta y Jujuy.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4 "
                >
                    {highlights.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 * index }}
                            className="flex items-center justify-center sm:justify-start space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3"
                        >
                            <item.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white flex-shrink-0" />
                            <span className="text-xs sm:text-sm lg:text-base font-medium text-white whitespace-nowrap">{item.text}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}