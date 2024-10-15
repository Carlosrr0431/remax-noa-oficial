"use client"

import React from 'react'
import { motion } from "framer-motion";
import Image from 'next/image';
import Degradado from '../../public/marketing-4859134_1920.png'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link";
import { useEffect } from "react"
import { FcGoogle } from "react-icons/fc";
import { RiMailSendFill } from "react-icons/ri";

// SISTEMA DE MAILING EMPRESARIAL

const fadeInAnimationVariants = {
    initial: (i) => ({
        opacity: 0,
        translateY: -50,
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

const RemaxMailing = () => {
    return (
        <div className="flex h-screen  w-full">
            {/* Mitad izquierda */}
            {/* bg-gradient-to-br from-red-600 to-red-800 */}
            <div className="w-[100%] h-[40%] sm:w-1/2  flex items-center justify-center  ">

                <Image src={Degradado}
                    width={0}

                    height={0}
                    alt=""
                    className="w-[100%] h-[40%] sm:h-full sm:w-1/2   absolute z-20 inset-0 object-cover mix-blend-multiply" />
            </div>

            {/* Mitad derecha */}
            {/* bg-gradient-to-bl from-blue-500 to-blue-800 */}

            <div className="w-full  h-[50%] sm:h-full sm:mt-0 sm:w-1/2  flex items-center justify-center p-0 sm:bg-gradient-to-r sm:from-slate-900 sm:to-slate-700 relative" >


                <div className='flex flex-col w-full h-full space-y-7 justify-center mx-auto items-center'>

                    <h1 className='bg-rgb(178, 190, 181) text-center flex justify-center text-[30px]  bottom-[130px] sm:bottom-[80px] mx-auto relative text-white items-center gap-x-4'>SME   <RiMailSendFill className="w-8 h-8" /></h1>

                    <Card className="w-full max-w-md bg-white/50">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold text-center">REMAX NOA <span className='text-blue-700'>AGENTES</span></CardTitle>
                            {/* <CardDescription className="text-center">
                            O inicia sesión con Google aquí
                        </CardDescription> */}
                        </CardHeader>
                        <CardContent>
                            <Link href='/mailingSystem/agentes'>
                                <Button
                                    variant="outline"
                                    className="w-full bg-white/60 text-black hover:bg-gray-100"

                                >
                                    <span className="text-blue-700">CONTINUAR</span>
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="w-full max-w-md bg-white/50">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold text-center">REMAX NOA <span className='text-red-700'>RRHH</span></CardTitle>
                            {/* <CardDescription className="text-center">
                            O inicia sesión con Google aquí
                        </CardDescription> */}
                        </CardHeader>
                        <CardContent>
                            <Link href='/mailingSystem/rrhh'>
                                <Button
                                    variant="outline"
                                    className="w-full bg-white/60 text-black hover:bg-gray-100"

                                >
                                    <span className="text-red-700">CONTINUAR</span>
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}

export default RemaxMailing
