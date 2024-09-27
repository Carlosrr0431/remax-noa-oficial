"use client"

import About from '@/app/(components)/About'
import { EntrevistaPage } from '@/app/(components)/EntrevistaPage'
import { ProgramarEntrevista2 } from '@/app/(components)/ProgramarEntrevista2'
import { useAppContext } from '@/app/(context)/AppWrapper'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import React, { useRef, useState } from 'react'

import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

const AboutPage = () => {
    const container = useRef()
    const { setCambioHeader } = useAppContext()
    const [scroll, setScroll] = useState(0)
    const handleScroll = () => {

        setScroll(container.current.scrollTop);
        if (scroll >= 100 && scroll <= 150) {
            setCambioHeader(true)
        } else if (scroll <= 50) {
            setCambioHeader(false)
        }
    }

    return (
        <div className='w-ful h-full overflow-y-auto relative' onScroll={handleScroll} ref={container}>
            <EntrevistaPage />

            <motion.div
                className="fixed top-4 right-4 z-50 "
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <Button
                    variant="outline"
                    size="icon"
                    className="w-[50px] h-[50px] rounded-full bg-background/80 backdrop-blur-sm border-primary/10 shadow-md"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="h-6 w-6 text-black" />
                    {/* <span className="sr-only text-black">Volver</span> */}
                </Button>
            </motion.div>
        </div>
    )
}

export default AboutPage