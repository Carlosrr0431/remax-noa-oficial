'use client'

import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarIcon } from 'lucide-react'



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
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
                                <CalendarIcon className="mr-2" /> Detalles de tu entrevista:
                            </h3>
                            <p className="text-blue-700">
                                Fecha: {interviewInfo.dia}
                            </p>
                            <p className="text-blue-700">
                                Hora: {interviewInfo.hora}
                            </p>
                        </div>
                    )}

                </motion.div>
            </CardContent>
        </Card>
    )
}