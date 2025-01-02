'use client'

import { useState, useRef, useEffect } from 'react'

import PersonalInfoForm from '@/app/(components)/landingInmobilaria/plataforma-reclutamiento/PersonalInfoForm'
import InterviewScheduler from '@/app/(components)/landingInmobilaria/plataforma-reclutamiento/InterviewScheduler'
import ConsentForm from '@/app/(components)/landingInmobilaria/plataforma-reclutamiento/ConsentForm'
// import { guardarCV } from '@/app/action'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '@/app/(context)/AppWrapper'

import CongratulationsStep from '@/app/(components)/landingInmobilaria/plataforma-reclutamiento/CongratulationsStep'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import ProgressBarComponent from '@/app/(components)/landingInmobilaria/plataforma-reclutamiento/ProgressBarComponent'
import { guardarCV } from '@/app/action'

const images2 = [
    {
        mobile: "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1735437971/banner_01_400x150px_kpu4b4.jpg",
        tablet: "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1735437973/banner_01_950x250px_sigrqe.jpg",
        desktop: "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1735435106/banner_01_600x770px_jn3wbc.jpg",
    },
    {
        mobile: "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1735437972/banner_02_400x150px_qbj8tr.jpg",
        tablet: "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1735437972/banner_02_950x250px_ftr4mp.jpg",
        desktop: "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1735435105/banner_02_600x770px_gnknxq.jpg",
    },
    {
        mobile: "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1735437971/banner_03_400x150px_w01m8a.jpg",
        tablet: "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1735437971/banner_03_950x250px_s61ymq.jpg",
        desktop: "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1735435105/banner_03_600x770px_h8x4ds.jpg",
    },
    {
        mobile: "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1735437971/banner_04_400x150px_qq6vhc.jpg",
        tablet: "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1735437972/banner_04_950x250px_hvxquo.jpg",
        desktop: "https://res.cloudinary.com/dlxwkq6bm/image/upload/v1735435105/banner_04_600x770px_ybtsq6.jpg",
    }
]

const text = [
    "Unite a nuestro equipo RE/MAX NOA",
    "¡Es ahora!",
    "¡A un Clic!",
    "¡Felicidades!",
]


export default function Home() {
    const [step, setStep] = useState(1)
    const [surveyScore, setSurveyScore] = useState(null)
    const [dia, setDia] = useState(null)
    const [hora, setHora] = useState(null)
    const { interviews, setInterviews } = useAppContext()
    const contentRef = useRef(null)
    const searchParams = useSearchParams()
    const fuente = searchParams.get('fuente')

    const handlePersonalInfoSubmit = async (datos) => {

        const formData = new FormData()
        formData.append('file', datos.cvFile)
        formData.append('email', datos.email)
        formData.append('nombre', datos.fullName)
        formData.append('telefono', datos.phone)


        //en guardarCV debemos guardar la fuente que se extrae del valor de la variable "search"
        const result = await guardarCV(formData, dia, hora, fuente)

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
                    className="w-full lg:w-1/2 h-48 sm:h-64 md:h-80 lg:h-full relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* <Image
                        src={images[step - 1]}
                        alt="Imagen representativa del paso actual"
                        // layout="fill"
                        width={600}
                        height={770}
                        className='w-full h-full'
                        objectFit="cover"
                        priority
                    /> */}
                    <Image
                        src={images2[step - 1].desktop}
                        alt="Imagen representativa del paso actual"
                        // layout="fill"
                        objectFit="cover"
                        priority
                        className='w-full h-full'
                        width={0}
                        height={0}
                        sizes="(max-width: 640px) 400px, (max-width: 1024px) 950px, 600px"
                        srcSet={`
                         ${images2[step - 1].mobile} 400w,
                         ${images2[step - 1].tablet} 950w,
                        ${images2[step - 1].desktop} 600w
                 `}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <motion.h1
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white text-center px-4"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            {text[step - 1]}
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
