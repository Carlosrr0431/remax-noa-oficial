"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail, FileText, Check, X, MessageCircle, UserIcon, Calendar, Clock } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@radix-ui/react-select"
import { Badge } from "@/components/ui/badge"

export default function InterviewModal2({ user, setOpen, dia, hora }) {
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setOpen(false)
            }
        }

        window.addEventListener('keydown', handleEscape)

        return () => {
            window.removeEventListener('keydown', handleEscape)
        }
    }, [])

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
    }

    const updateInterviewStatus = (userId, passed) => {
        console.log(`Usuario ${userId} ${passed ? "pasó" : "no pasó"} la entrevista`)
        // Aquí iría la lógica para actualizar el estado de la entrevista en el backend
    }

    const sendWhatsAppMessage = (phone) => {
        window.open(`https://wa.me/+549${user.telefono}?text=Hola!!!`, "_blank")
    }

    return (
        <div>
            {/* <Button onClick={openModal} className="mb-4">Ver Entrevistas Programadas</Button> */}


            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                    <div className="p-6 flex-grow overflow-y-auto">
                        <h2 className="text-2xl font-bold  text-center text-black">Segunda Entrevista </h2>
                        <div className="flex items-center justify-center text-muted-foreground mb-4">
                            <Calendar className="mr-2 h-5 w-5" />
                            <span className="mr-4">{dia}</span>
                            <Clock className="mr-2 h-5 w-5" />
                            <span>{hora}</span>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">

                            <Card key={user.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <UserIcon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-black">{user.nombre}</h3>

                                        </div>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="space-y-2">
                                        <p className="flex items-center text-sm">
                                            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">Email: {user.interviewPassed}</span>
                                            <span className="ml-2 text-black">{user.email}</span>
                                        </p>
                                        <p className="flex items-center text-sm">
                                            <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">Teléfono:</span>
                                            <span className="ml-2 text-black">{user.telefono}</span>
                                        </p>
                                        <p className="flex items-center text-sm">
                                            <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">CV:</span>
                                            <a href={user.cv} target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">
                                                Ver CV
                                            </a>
                                        </p>
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-muted/50 p-4 flex flex-wrap gap-2 justify-end">

                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => sendWhatsAppMessage(user.phone)}
                                    >
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        WhatsApp
                                    </Button>
                                </CardFooter>
                            </Card>

                        </div>
                    </div>
                    <div className="bg-muted px-6 py-4 flex justify-end text-black">
                        <Button variant="outline" onClick={closeModal}>
                            Cerrar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}