'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ProgressBarComponent from '@/app/(components)/landingInmobilaria/plataforma-reclutamiento/ProgressBarComponent'
import PersonalInfoForm from '@/app/(components)/landingInmobilaria/plataforma-reclutamiento/PersonalInfoForm'
import Survey from '@/app/(components)/landingInmobilaria/plataforma-reclutamiento/Survey'
import InterviewScheduler from '@/app/(components)/landingInmobilaria/plataforma-reclutamiento/InterviewScheduler'
import ConsentForm from '@/app/(components)/landingInmobilaria/plataforma-reclutamiento/ConsentForm'
import { guardarCV } from '@/app/action'
import { supabaseClient } from '@/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { HeartHandshake, Trophy } from 'lucide-react'
import ConfirmationModal from '@/app/(components)/landingInmobilaria/plataforma-reclutamiento/ConfirmationModal'
import { useAppContext } from '@/app/(context)/AppWrapper'
import moment from "moment-timezone";
import CongratulationsStep from '@/app/(components)/landingInmobilaria/plataforma-reclutamiento/CongratulationsStep'

const images = [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1153&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
]


export default function Home() {
    const [step, setStep] = useState(1)
    const [surveyScore, setSurveyScore] = useState(null)
    const [dia, setDia] = useState(null)
    const [hora, setHora] = useState(null)
    const { interviews, setInterviews } = useAppContext()
    const contentRef = useRef(null)


    useEffect(() => {



        const channelUsuarios = supabaseClient
            .channel('cuposDisponibles')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'cuposDisponibles' }, async (payload) => {

                if (payload.eventType == "UPDATE") {
                    const obtenerEntrevistas = async () => {
                        const { data, error } = await supabaseClient
                            .from('cuposDisponibles')
                            .select('*')

                        let entrevistas = []

                        data?.map((elem, index) => {
                            const date = elem.date.split('/').reverse().join('-') + " " + elem.time;

                            if (elem.segundaEntrevista) {

                                const object = {
                                    start: elem.start || moment(date).tz("America/Argentina/Salta").toDate(),
                                    name: elem.nombreCompleto,
                                    end: elem.end || moment(date).add(20, 'minutes').toDate(),
                                    email: elem.email,
                                    phone: elem.telefono,
                                    cv: elem.cv,
                                    status: "pendiente",
                                    rescheduleDate: null,
                                    diaPrimeraEntrevista: elem.diaPrimeraEntrevista,
                                    horaPrimeraEntrevista: elem.horaPrimeraEntrevista,
                                    segundaEntrevista: elem.segundaEntrevista,
                                    isUrgent: elem.isUrgent,
                                    displayContent: `${elem.segundaEntrevista ? `${elem.nombreCompleto}` : `${elem.cantidadGrupo} Entrevistas programadas`} `
                                }
                                entrevistas.push(object)
                            } else {
                                const object = {
                                    start: elem.start || moment(date).tz("America/Argentina/Salta").toDate(),
                                    name: elem.nombreCompleto,
                                    end: elem.end || moment(date).add(40, 'minutes').toDate(),
                                    email: elem.email,
                                    phone: elem.telefono,
                                    cv: elem.cv,
                                    status: "pendiente",
                                    rescheduleDate: null,
                                    segundaEntrevista: elem.segundaEntrevista,
                                    diaPrimeraEntrevista: elem.diaPrimeraEntrevista,
                                    horaPrimeraEntrevista: elem.horaPrimeraEntrevista,
                                    isUrgent: elem.isUrgent,
                                    displayContent: `${elem.segundaEntrevista ? `${elem.nombreCompleto}` : `${elem.cantidadGrupo} Entrevistas programadas`} `
                                }
                                entrevistas.push(object)
                            }

                        })

                        setInterviews([...entrevistas])

                    }
                    await obtenerEntrevistas()
                } else if (payload.eventType == "INSERT") {
                    const obtenerEntrevistas = async () => {
                        const { data, error } = await supabaseClient
                            .from('cuposDisponibles')
                            .select('*')

                        let entrevistas = []

                        data?.map((elem, index) => {
                            const date = elem.date.split('/').reverse().join('-') + " " + elem.time;

                            if (elem.segundaEntrevista) {

                                const object = {
                                    start: elem.start || moment(date).tz("America/Argentina/Salta").toDate(),
                                    name: elem.nombreCompleto,
                                    end: elem.end || moment(date).add(20, 'minutes').toDate(),
                                    email: elem.email,
                                    phone: elem.telefono,
                                    cv: elem.cv,
                                    status: "pendiente",
                                    rescheduleDate: null,
                                    diaPrimeraEntrevista: elem.diaPrimeraEntrevista,
                                    horaPrimeraEntrevista: elem.horaPrimeraEntrevista,
                                    segundaEntrevista: elem.segundaEntrevista,
                                    isUrgent: elem.isUrgent,
                                    displayContent: `${elem.segundaEntrevista ? `${elem.nombreCompleto}` : `${elem.cantidadGrupo} Entrevistas programadas`} `
                                }
                                entrevistas.push(object)
                            } else {
                                const object = {
                                    start: elem.start || moment(date).tz("America/Argentina/Salta").toDate(),
                                    name: elem.nombreCompleto,
                                    end: elem.end || moment(date).add(40, 'minutes').toDate(),
                                    email: elem.email,
                                    phone: elem.telefono,
                                    cv: elem.cv,
                                    status: "pendiente",
                                    rescheduleDate: null,
                                    segundaEntrevista: elem.segundaEntrevista,
                                    diaPrimeraEntrevista: elem.diaPrimeraEntrevista,
                                    horaPrimeraEntrevista: elem.horaPrimeraEntrevista,
                                    isUrgent: elem.isUrgent,
                                    displayContent: `${elem.segundaEntrevista ? `${elem.nombreCompleto}` : `${elem.cantidadGrupo} Entrevistas programadas`} `
                                }
                                entrevistas.push(object)
                            }

                        })

                        setInterviews([...entrevistas])

                    }

                    await obtenerEntrevistas()
                }

            })
            .subscribe()

        return () => {
            supabaseClient.removeChannel(supabaseClient.channel(channelUsuarios))
        }
    }, [setInterviews])


    const handlePersonalInfoSubmit = async (datos) => {

        const formData = new FormData()
        formData.append('file', datos.cvFile)
        formData.append('email', datos.email)
        formData.append('nombre', datos.fullName)
        formData.append('telefono', datos.phone)


        const result = await guardarCV(formData, dia, hora)

        const obtenerEntrevistas = async () => {
            const { data, error } = await supabaseClient
                .from('cuposDisponibles')
                .select('*')

            let entrevistas = []

            data?.map((elem, index) => {
                const date = elem.date.split('/').reverse().join('-') + " " + elem.time;


                if (elem.segundaEntrevista) {

                    const object = {
                        start: elem.start || moment(date).tz("America/Argentina/Salta").toDate(),
                        name: elem.nombreCompleto,
                        end: elem.end || moment(date).add(20, 'minutes').toDate(),
                        email: elem.email,
                        phone: elem.telefono,
                        cv: elem.cv,
                        status: "pendiente",
                        rescheduleDate: null,
                        diaPrimeraEntrevista: elem.diaPrimeraEntrevista,
                        horaPrimeraEntrevista: elem.horaPrimeraEntrevista,
                        segundaEntrevista: elem.segundaEntrevista,
                        isUrgent: elem.isUrgent,
                        displayContent: `${elem.segundaEntrevista ? `${elem.nombreCompleto}` : `${elem.cantidadGrupo} Entrevistas programadas`} `
                    }
                    entrevistas.push(object)
                } else {
                    const object = {
                        start: elem.start || moment(date).tz("America/Argentina/Salta").toDate(),
                        name: elem.nombreCompleto,
                        end: elem.end || moment(date).add(40, 'minutes').toDate(),
                        email: elem.email,
                        phone: elem.telefono,
                        cv: elem.cv,
                        status: "pendiente",
                        rescheduleDate: null,
                        segundaEntrevista: elem.segundaEntrevista,
                        diaPrimeraEntrevista: elem.diaPrimeraEntrevista,
                        horaPrimeraEntrevista: elem.horaPrimeraEntrevista,
                        isUrgent: elem.isUrgent,
                        displayContent: `${elem.segundaEntrevista ? `${elem.nombreCompleto}` : `${elem.cantidadGrupo} Entrevistas programadas`} `
                    }
                    entrevistas.push(object)
                }

            })

            setInterviews([...entrevistas])

        }

        await obtenerEntrevistas()

        setStep(4)

        return result.message
    }

    const handleConsent = () => {
        setStep(2)
    }

    const handleInterviewScheduled = (datos) => {
        setDia(datos.dia)
        setHora(datos.hora)
        setStep(3)
    }

    const scrollToTop = () => {
        if (contentRef.current) {
            contentRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }

    useEffect(() => {
        scrollToTop()
    }, [step])

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    }

    return (

        <main className="h-screen flex flex-col lg:flex-row overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    className="w-full lg:w-1/2 h-48 sm:h-64 md:h-80 lg:h-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url('${images[step - 1]}')` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <motion.h1
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white text-center px-4"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            Únete a Nuestro Equipo de Asesores Inmobiliarios
                        </motion.h1>
                    </div>
                </motion.div>
            </AnimatePresence>
            <div ref={contentRef} className="w-full lg:w-1/2 h-full overflow-y-auto bg-gray-50">
                <motion.div
                    className="max-w-xl mx-auto p-4 sm:p-6 md:p-8"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                >
                    <ProgressBarComponent currentStep={step} totalSteps={4} />
                    <motion.div
                        key={step}
                        className="bg-white shadow-lg rounded-xl overflow-hidden mt-6"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="p-4 sm:p-6">
                            {step === 1 && <ConsentForm onConsent={handleConsent} />}
                            {step === 2 && <InterviewScheduler onSchedule={handleInterviewScheduled} />}
                            {step === 3 && <PersonalInfoForm onSubmit={handlePersonalInfoSubmit} />}
                            {step === 4 && <CongratulationsStep interviewInfo={{ dia: dia, hora: hora }} />}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </main>


    )
}