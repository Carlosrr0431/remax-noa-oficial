"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, FileCheck, MessageCircle } from 'lucide-react';

const features = [
    {
        icon: FileCheck,
        title: 'Formato Simple',
        description: 'Acepta archivos PDF para mantener el formato original'
    },
    {
        icon: Clock,
        title: 'Proceso Rápido',
        description: 'Formulario sencillo y directo para ahorrar tu tiempo'
    },
    {
        icon: MessageCircle,
        title: 'Respuesta Garantizada',
        description: 'Revisamos todos los CV\'s y respondemos en 48 horas'
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export function Features() {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
            {features.map((feature, index) => (
                <motion.div
                    key={index}
                    variants={item}
                    className="p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                        <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{feature.description}</p>
                </motion.div>
            ))}
        </motion.div>
    );
}