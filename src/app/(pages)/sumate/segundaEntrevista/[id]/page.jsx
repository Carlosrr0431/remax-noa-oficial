'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/supabase/client'
import Image from 'next/image'
import ScheduleInterviewSegunda from '@/app/(components)/landingInmobilaria/plataforma-reclutamiento/segundaEntrevista/ScheduleInterviewSegunda'

const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM"
]

const TOTAL_TIME = 500 // 5 minutes in seconds

export default function ItemPage({ params }) {
    const router = useRouter()
    const [timeLeft, setTimeLeft] = useState(null)
    const [date, setDate] = useState(undefined)
    const [selectedTime, setSelectedTime] = useState(null)
    const timeSlotsRef = useRef(null)
    const [userSelect, setUserSelect] = useState()


    useEffect(() => {

        const obtenerLink = async () => {
            const { data, error } = await supabaseClient
                .from('cuposDisponibles')
                .select('*').eq('linkEntrevistaIndividual', `http://localhost:3000/sumate/segundaEntrevista/${params.id}`)

            if (data.length == 0) {
                router.push('/')
            }

            console.log("data" + JSON.stringify(data[0].diaPrimeraEntrevista));


            const result2 = await supabaseClient
                .from('cuposDisponibles')
                .select('*').eq('date', data[0].diaPrimeraEntrevista).eq('time', data[0].horaPrimeraEntrevista)


            result2?.data[0]?.reclutados.map((elem) => {
                if (elem.nombre == data[0].nombreCompleto && elem.telefono == data[0].telefono) {
                    const object = {
                        cv: elem.cv,
                        email: elem.email,
                        nombre: elem.nombre,
                        telefono: elem.telefono,
                        diaPrimeraEntrevista: elem.diaPrimeraEntrevista,
                        horaPrimeraEntrevista: elem.horaPrimeraEntrevista,
                        feedBack: elem.feedBack,
                        interviewPassed: "paso",
                        fuente: elem.fuente
                    }

                    setUserSelect(object)

                }

            })


        }

        obtenerLink()

        const storedStartTime = localStorage.getItem(`timer-start-${params.id}`)
        const startTime = storedStartTime ? parseInt(storedStartTime, 10) : Date.now()

        const calculateTimeLeft = () => {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000)
            return Math.max(TOTAL_TIME - elapsedTime, 0)
        }

        setTimeLeft(calculateTimeLeft())

        const interval = setInterval(async () => {
            const remaining = calculateTimeLeft()
            setTimeLeft(remaining)

            if (remaining === 0) {
                const result4 = await supabaseClient
                    .from("cuposDisponibles")
                    .update({
                        linkEntrevistaIndividual: null,

                    }).eq('linkEntrevistaIndividual', `http://localhost:3000/sumate/segundaEntrevista/${params.id}`)

                clearInterval(interval)
                router.push('/')
            }
        }, 1000)

        if (!storedStartTime) {
            localStorage.setItem(`timer-start-${params.id}`, startTime.toString())
        }

        return () => clearInterval(interval)
    }, [params.id, router])


    useEffect(() => {
        if (date && timeSlotsRef.current) {
            timeSlotsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [date])

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }


    const handleInterviewScheduled = async (datos) => {

        const result4 = await supabaseClient.from("cuposDisponibles").select('*').eq('date', userSelect.diaPrimeraEntrevista).eq('time', userSelect.horaPrimeraEntrevista)


        let nuevosReclutados = []

        result4?.data[0]?.reclutados.map((elem) => {
            if (elem.nombre == userSelect.nombre && elem.telefono == userSelect.telefono) {
                const object = {
                    cv: elem.cv,
                    email: elem.email,
                    nombre: elem.nombre,
                    telefono: elem.telefono,
                    diaPrimeraEntrevista: elem.diaPrimeraEntrevista,
                    horaPrimeraEntrevista: elem.horaPrimeraEntrevista,
                    diaSegundaEntrevista: datos.dia,
                    horaSegundaEntrevista: datos.hora,
                    feedBack: elem.feedBack,
                    interviewPassed: "paso",
                    fuente: elem.fuente,
                    linkEntrevistaIndividual: null,
                }

                nuevosReclutados.push(object)

            } else
                nuevosReclutados.push(elem)

        })


        const result6 = await supabaseClient
            .from("cuposDisponibles")
            .update({
                reclutados: nuevosReclutados,

            })
            .eq("time", userSelect.horaPrimeraEntrevista)
            .eq("date", userSelect.diaPrimeraEntrevista)

        const result3 = await supabaseClient.from("cuposDisponibles").update({
            email: userSelect.email,
            cv: userSelect.cv,
            telefono: userSelect.telefono,
            nombreCompleto: userSelect.nombre,
            diaPrimeraEntrevista: userSelect.diaPrimeraEntrevista,
            horaPrimeraEntrevista: userSelect.horaPrimeraEntrevista,
            segundaEntrevista: true,
            date: datos.dia,
            time: datos.hora,
            interviewPassed: userSelect.interviewPassed,
            fuente: userSelect.fuente,
            feedBack: userSelect.feedBack,
            linkEntrevistaIndividual: null,
        }).eq("nombreCompleto", userSelect.nombre).eq("telefono", userSelect.telefono).eq('diaPrimeraEntrevista', userSelect.diaPrimeraEntrevista).eq('horaPrimeraEntrevista', userSelect.horaPrimeraEntrevista)

        console.log("RESULTADO: " + result3);


        router.push('/')
        // window.open(`https://wa.me/+549${userSelect.telefono}?text=Hola, nos contactamos para citarte a la siguiente etapa del proceso de selección. Te esperamos el ${datos.dia} a las ${datos.hora} en Pueyrredón 608 para una entrevista individual. Aguardamos confirmación. Muchas gracias.`, "_blank")
    }

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Left side - Full height image */}
            <div className="w-full lg:w-1/2 h-screen relative">
                <Image
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                    alt="Professional woman in an office setting"
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80 flex items-center justify-center p-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight drop-shadow-lg">
                        Tiempo restante: {timeLeft !== null ? formatTime(timeLeft) : 'Cargando...'}
                    </h1>
                </div>
            </div>

            {/* Right side - Scrollable Calendar and Time Slots */}
            <div className="w-full lg:w-1/2 h-screen overflow-y-auto">
                <div className="max-w-2xl mx-auto p-6 md:p-10 md:my-14 mb-[130px]">
                    {timeLeft != null &&

                        userSelect != undefined && <ScheduleInterviewSegunda
                            onSchedule={handleInterviewScheduled}
                            userSelect={userSelect}

                        />
                        // <Card className="w-full shadow-2xl bg-white rounded-2xl overflow-hidden border-t-4 border-blue-500">
                        //     <CardContent className="p-8">
                        //         <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Select Your Interview Date</h2>
                        //         <Calendar
                        //             mode="single"
                        //             selected={date}
                        //             onSelect={setDate}
                        //             className="rounded-lg border-2 border-gray-200 shadow-md mb-8 p-3 mx-auto"
                        //         />
                        //         <div ref={timeSlotsRef}>
                        //             <h3 className="text-2xl font-medium mb-4 text-gray-700 text-center">Available Time Slots</h3>
                        //             <ScrollArea className="h-64 rounded-lg border-2 border-gray-200 p-4 bg-gray-50">
                        //                 <div className="space-y-2">
                        //                     {timeSlots.map((time) => (
                        //                         <Button
                        //                             key={time}
                        //                             variant={selectedTime === time ? "default" : "outline"}
                        //                             className="w-full text-lg transition-all duration-200 ease-in-out hover:bg-blue-100 hover:text-blue-700"
                        //                             onClick={() => setSelectedTime(time)}
                        //                         >
                        //                             {time}
                        //                         </Button>
                        //                     ))}
                        //                 </div>
                        //             </ScrollArea>
                        //         </div>
                        //         {selectedTime && date && (
                        //             <div className="mt-8 p-6 bg-green-100 rounded-lg border-2 border-green-300 shadow-inner">
                        //                 <p className="text-center text-green-800 font-medium">
                        //                     Interview scheduled for:<br />
                        //                     <span className="text-2xl font-bold">{date.toDateString()} at {selectedTime}</span>
                        //                 </p>
                        //                 <Button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white">
                        //                     Confirm Booking
                        //                 </Button>
                        //             </div>
                        //         )}
                        //     </CardContent>
                        // </Card>


                    }
                </div>
            </div>
        </div>
    )
}
