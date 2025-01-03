'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { es } from "date-fns/locale"
import { Card, CardContent } from "@/components/ui/card"
import { format, addDays, isSaturday, isSunday, isAfter, isBefore, startOfDay, isSameDay } from 'date-fns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Clock, CalendarIcon, User, Phone, Mail, FileText } from 'lucide-react'
import moment from "moment-timezone";
import { supabaseClient } from '@/supabase/client'
import { guardarCV2 } from '@/app/action'
import { motion } from 'framer-motion'
import { emailCaptacionHTML } from '../emailCaptacionHTML'

const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
]

export default function InterviewSchedulerModal({ isOpen, onClose, onSchedule }) {
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: undefined,
        time: ''
    })
    const [availableSlots, setAvailableSlots] = useState([])
    const timeSlotsRef = useRef(null)
    const [selectedDate, setSelectedDate] = useState(undefined)
    const [selectedTime, setSelectedTime] = useState(null)


    useEffect(() => {
        fetchAvailableSlots()
    }, [])
    // Horarios personalizables
    const availableTimeSlots = {
        0: [], // Domingo
        1: ['09:00', '10:00', '15:00', '16:00'], // Lunes
        2: ['09:00', '10:00', '15:00', '16:00'], // Martes
        3: ['09:40', '10:40', '15:00', '16:00'], // Miércoles
        4: ['09:00', '10:00', '15:00', '16:00'], // Jueves
        5: ['09:40', '10:40', '15:00', '16:00'], // Viernes
        6: [], // Sábado
    }

    const fetchAvailableSlots = async () => {
        try {
            const { data, error } = await supabaseClient
                .from('cuposDisponibles')
                .select('*')
                .gt('cantidadGrupo', 3)

            if (error) throw error

            setAvailableSlots(data || [])
        } catch (error) {
            console.error('Error fetching available slots:', error)
        } finally {

        }
    }



    const handleInputChange = (e) => {
        const { name, value } = e.target

        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleDateSelect = (date) => {
        setFormData(prev => ({ ...prev, date }))
        // Scroll to time slots after a short delay to ensure the DOM has updated
        setTimeout(() => {
            timeSlotsRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
    }

    const handleTimeSelect = (time) => {
        setFormData(prev => ({ ...prev, time }))
        setStep(3)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setStep(2)
    }

    const handleConfirm = async () => {
        // onSchedule(formData)



        const formData2 = new FormData()
        formData2.append('nombre', formData.name)
        formData2.append('telefono', formData.phone)

        setIsLoading(true)


        const result = await guardarCV2(formData2, moment(formData.date).tz("America/Argentina/Salta").format("DD/MM/yyyy"), formData.time)

        if (result.message == "File uploaded successfully!") {
            setIsLoading(false)
        }


        // const sendMail = async (htmlContent) => {
        //     const response = await fetch('/api/sendEmail', {
        //         method: 'POST',
        //         headers: {
        //             'content-type': 'application/json'
        //         },
        //         // 'castanedasantos@gmail.com'
        //         body: JSON.stringify({
        //             // 'castanedasantos@gmail.com'
        //             listaEmail: ["carlos.facundo.rr@gmail.com"],
        //             htmlContenido: htmlContent,
        //             titulo: '¡Tu proximo trabajo esta cerca en RE/MAX NOA!'
        //         })
        //     })
        // }


        const sendMail = async () => {
            const response = await fetch('/api/resend', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                }
            })
        }

        const result2 = await sendMail()

        console.log("email: " + JSON.stringify(result2));


        onClose()
    }

    useEffect(() => {
        if (step === 2 && formData.date) {
            timeSlotsRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [step, formData.date])



    const holidays = [
        new Date(2025, 0, 1), // Año Nuevo
        new Date(2024, 11, 31), // Día de la Independencia
    ];

    function isHoliday(date) {
        return holidays.some((holiday) => isSameDay(date, holiday));
    }


    const today = startOfDay(addDays(new Date(), 1))

    const availableDates = useMemo(() => {
        const dates = []
        let currentDate = today
        let daysAdded = 0

        while (daysAdded < 7) {
            if (!isSaturday(currentDate) && !isSunday(currentDate)) {
                dates.push(currentDate)
                daysAdded++
            }
            currentDate = addDays(currentDate, 1)
        }

        return dates
    }, [today])

    const isDateDisabled = (date) => {
        return isBefore(date, today) || isAfter(date, availableDates[availableDates.length - 1]) || isSaturday(date) || isSunday(date) || isHoliday(date)
    }



    const getTimeSlots = (date) => {
        const dayOfWeek = date.getDay()
        return availableTimeSlots[dayOfWeek] || []
    }

    const timeSlots = formData.date ? getTimeSlots(formData.date) : []

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre</Label>
                                <div className="relative">
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        disabled={isDateDisabled}
                                        required
                                        className="pl-10"
                                    />
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Teléfono</Label>
                                <div className="relative">
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="pl-10"
                                    />
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                </div>
                            </div>
                            {/* <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="pl-10"
                                    />
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                </div>
                            </div> */}
                            {/* <div className="space-y-2">
                                <Label htmlFor="cv" className="text-sm font-medium text-gray-700">CV (PDF)</Label>
                                <div className="relative">
                                    <Input
                                        id="cv"
                                        name="cv"
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleInputChange}
                                        className="pl-10"
                                    />
                                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                </div>
                            </div> */}
                        </div>
                        <Button type="submit" className="w-full">Siguiente</Button>
                    </form>
                )
            case 2:
                return (
                    <div className="space-y-6 p-4">

                        <Calendar
                            mode="single"
                            selected={formData.date}
                            onSelect={handleDateSelect}
                            locale={es}
                            disabled={isDateDisabled}
                            className="rounded-md border mx-auto w-full max-w-sm"
                        />
                        <div ref={timeSlotsRef}>
                            <h3 className="mb-4 font-semibold text-center">Horarios Disponibles</h3>
                            <div className="grid grid-cols-4 gap-2">
                                {timeSlots.map((time) => {

                                    let flag = true
                                    if (availableSlots.map((item, index) => {

                                        if (item.date == format(formData.date, 'dd/MM/yyyy')) {

                                            if (item.time == time) {
                                                flag = false

                                            }
                                        }
                                    }))

                                        if (flag) {
                                            return (
                                                <Button
                                                    key={time}
                                                    type="button"
                                                    variant={formData.time === time ? "default" : "outline"}
                                                    className={`px-6 py-3 text-sm ${formData.time === time ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                                                    onClick={() => handleTimeSelect(time)}
                                                >
                                                    {time}
                                                </Button>
                                            )
                                        } else return null
                                })}
                            </div>
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="space-y-6 p-4">
                        <h3 className="text-lg font-semibold text-center mb-4">Confirmar Datos de la Entrevista</h3>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-2">
                                    <p className="flex items-center text-black"><User className="mr-2" size={18} /> <strong>Nombre:</strong> {formData.name}</p>
                                    <p className="flex items-center text-black"><Phone className="mr-2" size={18} /> <strong>Teléfono:</strong> {formData.phone}</p>
                                    <p className="flex items-center text-black"><CalendarIcon className="mr-2" size={18} /> <strong>Fecha:</strong> {formData.date ? format(formData.date, 'dd/MM/yyyy', { locale: es }) : ''}</p>
                                    <p className="flex items-center text-black"><Clock className="mr-2" size={18} /> <strong>Hora:</strong> {formData.time}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <div className="flex justify-between">
                            <Button variant="outline" onClick={() => setStep(1)}>
                                <ChevronLeft className="mr-2" size={16} />
                                Editar
                            </Button>
                            <Button onClick={handleConfirm} disabled={isLoading} className="w-[50%] bg-blue-600 hover:bg-blue-700 text-white transition-colors py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                {isLoading ? (
                                    <motion.div
                                        className="flex items-center justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Enviando...
                                    </motion.div>
                                ) : 'Enviar Información'}
                            </Button>
                        </div>
                    </div>
                )
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] sm:h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">
                        {step === 1 && "Programar Entrevista"}
                        {step === 2 && "Seleccionar Fecha y Hora"}
                        {step === 3 && "Confirmar Datos"}
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        {step === 1 && "Ingrese los datos del candidato"}
                        {step === 2 && "Elija la fecha y hora de la entrevista"}
                        {step === 3 && "Revise y confirme los datos de la entrevista"}
                    </DialogDescription>
                </DialogHeader>
                <Tabs value={step.toString()} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="1" disabled>Datos</TabsTrigger>
                        <TabsTrigger value="2" disabled>Fecha y Hora</TabsTrigger>
                        <TabsTrigger value="3" disabled>Confirmar</TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="space-y-6 p-4">
                    {renderStep()}
                </div>
            </DialogContent>
        </Dialog>
    )
}

