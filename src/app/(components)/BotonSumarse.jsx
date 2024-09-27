"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserPlus } from 'lucide-react'

export const BotonSumarse = () => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.button
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 active:from-purple-600 active:to-indigo-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="mr-2"
                    animate={{
                        scale: isHovered ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: isHovered ? Infinity : 0,
                        repeatType: "reverse",
                    }}
                >
                    <UserPlus className="h-5 w-5" />
                </motion.div>
                <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    Sumarse al equipo
                </motion.span>
            </motion.div>
        </motion.button>
    )
}