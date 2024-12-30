'use client'

import { useState, useMemo, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { format, addDays, isSaturday, isSunday, isAfter, isBefore, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { supabaseClient } from '@/supabase/client'

export default function InterviewScheduler({ onSchedule }) {
    const [selectedDate, setSelectedDate] = useState(undefined)
    const [selectedTime, setSelectedTime] = useState(null)
    const [availableSlots, setAvailableSlots] = useState([])
    const [isLoading, setIsLoading] = useState(false)

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
        setIsLoading(true)
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
            setIsLoading(false)
        }
    }


    // const today = new Date()
    // const nextWeek = addDays(today, 7)


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
        return isBefore(date, today) || isAfter(date, availableDates[availableDates.length - 1]) || isSaturday(date) || isSunday(date)
    }

    const getTimeSlots = (date) => {
        const dayOfWeek = date.getDay()
        return availableTimeSlots[dayOfWeek] || []
    }

    const timeSlots = selectedDate ? getTimeSlots(selectedDate) : []

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (selectedDate && selectedTime) {
            // alert(`Entrevista programada para ${format(selectedDate, 'dd/MM/yyyy', { locale: es })} a las ${selectedTime}`)
        }

        const datos = {
            dia: format(selectedDate, 'dd/MM/yyyy', { locale: es }),
            hora: selectedTime
        }


        onSchedule(datos)

    }

    return (
        <Card className="w-full max-w-xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-bold text-center text-primary">Programa tu Entrevista</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6 sm:flex sm:space-x-8">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Fecha</label>
                        <div className="flex justify-center">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                disabled={isDateDisabled}
                                onSelect={setSelectedDate}
                                // disabled={(date) => date < today || date > nextWeek}
                                className="rounded-md border w-full"
                                locale={es}
                            />
                        </div>
                    </div>
                    {selectedDate && (
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 sm:bottom-5 relative">Hora</label>
                            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                                {timeSlots.map((time) => {

                                    let flag = true
                                    if (availableSlots.map((item, index) => {

                                        if (item.date == format(selectedDate, 'dd/MM/yyyy')) {

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
                                                    variant={selectedTime === time ? "default" : "outline"}
                                                    className={`px-6 py-3 text-sm ${selectedTime === time ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                                                    onClick={() => setSelectedTime(time)}
                                                >
                                                    {time}
                                                </Button>
                                            )
                                        } else return null
                                })}
                            </div>
                        </div>
                    )}
                </form>
            </CardContent>
            <CardFooter>
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full bg-primary hover:bg-primary-dark transition-colors"
                >
                    Programar Entrevista
                </Button>
            </CardFooter>
        </Card>
    )
}

// 'use client'

// import { useState, useEffect } from 'react'
// import { Button } from '@/components/ui/button'
// import { Calendar } from '@/components/ui/calendar'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { format, parse } from 'date-fns'
// import { es } from 'date-fns/locale'
// import { Clock, CalendarIcon } from 'lucide-react'
// import { supabaseClient } from '@/supabase/client'

// interface AvailableSlot {
//     id: number
//     date: string // Formato: 'YYYY-MM-DD'
//     time: string // Formato: 'HH:mm'
//     is_available: boolean
// }

// interface PersonalInfo {
//     fullName: string
//     email: string
//     phone: string
//     cvUrl: string
// }

// export default function InterviewScheduler() {
//     const [selectedDate, setSelectedDate] = useState(undefined)
//     const [selectedTime, setSelectedTime] = useState(null)
//     const [availableSlots, setAvailableSlots] = useState([])
//     const [isLoading, setIsLoading] = useState(false)
//     const [personalInfo, setPersonalInfo] = useState({
//         fullName: '',
//         email: '',
//         phone: '',
//         cvUrl: ''
//     })

//     useEffect(() => {
//         fetchAvailableSlots()
//     }, [])

//     const fetchAvailableSlots = async () => {
//         setIsLoading(true)
//         try {
//             const { data, error } = await supabaseClient
//                 .from('cuposDisponibles')
//                 .select('*')
//                 .eq('is_available', true)

//             if (error) throw error

//             setAvailableSlots(data || [])
//         } catch (error) {
//             console.error('Error fetching available slots:', error)
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     const availableDates = [...new Set(availableSlots.map(slot => slot.date))]

//     const timeSlots = availableSlots
//         .filter(slot => slot.date !== format(selectedDate || new Date(), 'yyyy-MM-dd'))
//         .map(slot => slot.time)

//     const handleInputChange = (e) => {
//         const { name, value } = e.target
//         setPersonalInfo(prev => ({ ...prev, [name]: value }))
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         if (selectedDate && selectedTime) {
//             try {
//                 // Insert into scheduled_interviews
//                 const { data: interviewData, error: interviewError } = await supabaseClient
//                     .from('scheduled_interviews')
//                     .insert([
//                         {
//                             full_name: personalInfo.fullName,
//                             email: personalInfo.email,
//                             phone: personalInfo.phone,
//                             cv_url: personalInfo.cvUrl,
//                             date: format(selectedDate, 'yyyy-MM-dd'),
//                             time: selectedTime
//                         }
//                     ])

//                 if (interviewError) throw interviewError

// const { error: updateError } = await supabaseClient
//     .from('available_slots')
//     .update({ is_available: false })
//     .eq('date', format(selectedDate, 'yyyy-MM-dd'))
//     .eq('time', selectedTime)

//                 if (updateError) throw updateError

//                 alert(`Entrevista programada para ${format(selectedDate, 'dd/MM/yyyy', { locale: es })} a las ${selectedTime}`)


//                 await fetchAvailableSlots()
//             } catch (error) {
//                 console.error('Error scheduling interview:', error)
//                 alert('Hubo un error al programar la entrevista. Por favor, inténtalo de nuevo.')
//             }
//         }
//     }

//     return (
//         <Card className="w-full max-w-2xl mx-auto shadow-lg">
//             <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
//                 <CardTitle className="text-2xl sm:text-3xl font-bold text-center">Programa tu Entrevista</CardTitle>
//             </CardHeader>
//             <CardContent className="p-6">
//                 {isLoading ? (
//                     <div className="flex justify-center items-center h-64">
//                         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//                     </div>
//                 ) : (
//                     <form onSubmit={handleSubmit} className="space-y-6">

//                         <div className="space-y-4">
//                             <Label className="text-sm font-medium text-gray-700 flex items-center">
//                                 <CalendarIcon className="mr-2 h-4 w-4" /> Fecha de la Entrevista
//                             </Label>
//                             <div className="flex justify-center">
//                                 <Calendar
//                                     mode="single"
//                                     selected={selectedDate}
//                                     onSelect={setSelectedDate}
//                                     disabled={(date) => !availableDates.includes(format(date, 'yyyy-MM-dd'))}
//                                     className="rounded-md border shadow p-3"
//                                 />
//                             </div>
//                         </div>
//                         {selectedDate && (
//                             <div className="space-y-4">
//                                 <Label className="text-sm font-medium text-gray-700 flex items-center">
//                                     <Clock className="mr-2 h-4 w-4" /> Hora de la Entrevista
//                                 </Label>
//                                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//                                     {timeSlots.map((time) => (
//                                         <Button
//                                             key={time}
//                                             type="button"
//                                             variant={selectedTime === time ? "default" : "outline"}
//                                             className={`py-2 px-3 text-sm ${selectedTime === time ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
//                                             onClick={() => setSelectedTime(time)}
//                                         >
//                                             {time}
//                                         </Button>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </form>
//                 )}
//             </CardContent>
//             <CardFooter>
//                 <Button
//                     type="submit"
//                     onClick={handleSubmit}
//                     disabled={!selectedDate || !selectedTime || isLoading}
//                     className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
//                 >
//                     Programar Entrevista
//                 </Button>
//             </CardFooter>
//         </Card>
//     )
// }

