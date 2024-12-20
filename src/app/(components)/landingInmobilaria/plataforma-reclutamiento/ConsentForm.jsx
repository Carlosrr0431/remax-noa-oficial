'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Clock, Calendar, AlertTriangle, MessageCircle } from 'lucide-react'

export default function ConsentForm({ onConsent }) {
    const consentItems = [
        {
            icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />,
            title: "Puntualidad",
            description: "Llegar 10 minutos antes, con 5 minutos de gracia."
        },
        {
            icon: <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />,
            title: "Comunicación",
            description: "Informar inconvenientes por WhatsApp."
        }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 sm:space-y-6"
        >
            <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">Recordá lo siguiente</h2>
            <p className="text-sm sm:text-base text-gray-600 text-center">
                Estas por programar una entrevista para Agente Inmobiliario.
            </p>
            <div className="grid gap-3 sm:gap-4">
                {consentItems.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex items-start space-x-3 sm:space-x-4 bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="flex-shrink-0">{item.icon}</div>
                        <div>
                            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{item.title}</h3>
                            <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
            <Button
                onClick={onConsent}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-lg"
            >
                Continuar
            </Button>
        </motion.div>
    )
}