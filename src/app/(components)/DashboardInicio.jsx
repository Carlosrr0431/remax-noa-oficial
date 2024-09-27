"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link";
import { useEffect } from "react"
import { FcGoogle } from "react-icons/fc";

export const DashboardInicio = () => {


    return (
        <div className="flex h-screen bg-gray-200">
            {/* Mitad izquierda */}
            {/* bg-gradient-to-br from-red-600 to-red-800 */}
            <div className="w-1/2  flex items-center justify-center p-8 border-b sm:border-b-0 sm:border-r border-black/30">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">REMAX NOA <span className='text-red-500'>SALTA</span></CardTitle>
                        {/* <CardDescription className="text-center">
                            Inicia sesión con Google aquí
                        </CardDescription> */}
                    </CardHeader>

                    <CardContent>
                        <Link href='/dashboard/administrador'>
                            <Button

                                variant="outline"
                                className="w-full bg-white  text-black hover:bg-gray-100"

                            >
                                <FcGoogle className="w-6 h-6 mr-2" />

                                <span className="text-red-800">Iniciar sesión con Google</span>
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* Mitad derecha */}
            {/* bg-gradient-to-bl from-blue-500 to-blue-800 */}
            <div className="w-1/2  flex items-center justify-center p-8">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">REMAX NOA <span className='text-blue-700'>JUJUY</span></CardTitle>
                        {/* <CardDescription className="text-center">
                            O inicia sesión con Google aquí
                        </CardDescription> */}
                    </CardHeader>
                    <CardContent>
                        <Link href='/dashboard/user'>
                            <Button
                                variant="outline"
                                className="w-full bg-white text-black hover:bg-gray-100"

                            >
                                <FcGoogle className="w-6 h-6 mr-2" />
                                <span className="text-blue-700">Iniciar sesión con Google</span>
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}