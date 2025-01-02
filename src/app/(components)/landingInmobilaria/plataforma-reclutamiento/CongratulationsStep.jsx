'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarIcon, MapIcon, MapPinIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import moment from "moment";



export default function CongratulationsStep({ interviewInfo }) {
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
                    ¡Felicitaciones!
                </CardTitle>
            </CardHeader>
            <CardContent>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                >

                    <p className="text-lg sm:text-xl text-center text-gray-700">
                        Has completado con éxito el proceso de registro para la entrevista.
                        Estamos emocionados de conocerte pronto.
                    </p>
                    {interviewInfo && (
                        <motion.div
                            className="bg-white p-6 rounded-xl shadow-lg space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <h3 className="text-xl font-semibold text-blue-800 mb-4">Detalles de tu entrevista:</h3>
                            <div className="flex items-center space-x-3 text-gray-700">
                                <CalendarIcon className="w-6 h-6 text-blue-600" />
                                <div>
                                    <p className="font-medium text-gray-700">Fecha y Hora:</p>
                                    <p className='text-gray-700'>{interviewInfo.dia} a las {interviewInfo.hora}</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 text-gray-700">
                                <MapPinIcon className="w-6 h-6 text-blue-600" />
                                <div>
                                    <p className="font-medium text-gray-700">Ubicación:</p>
                                    <p

                                        className="text-gray-700"
                                    >
                                        Pueyrredon 608
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="ml-2 p-2 bg-white hover:bg-gray-100 text-sm"
                                onClick={() => window.open('https://www.google.com/maps/place/RE%2FMAX+NOA+-+LIDER+MUNDIAL+EN+SERVICIOS+INMOBILIARIOS/@-24.7824775,-65.4061099,17z/data=!3m1!4b1!4m6!3m5!1s0x941bc391ec315b71:0x420a76b559f613cd!8m2!3d-24.7824775!4d-65.4061099!16s%2Fg%2F11h3mw5hxh?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D', '_blank', 'noopener,noreferrer')}
                            >
                                <MapIcon className="w-5 h-5 mr-2 text-red-500" />
                                Ver en Google Maps
                            </Button>
                        </motion.div>




                    )}

                </motion.div>
            </CardContent>
        </Card>


    )
}



