import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgramarEntrevista2 } from './ProgramarEntrevista2'
import Image from 'next/image'

import Degradado from '../public/0145 - 7H1A0377 B.jpg'
import { FormularioCaptacion } from './FormularioCaptacion'
import { Input } from "@/components/ui/input"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Toaster, toast } from 'sonner'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { FileUploader } from 'react-drag-drop-files';
import { HiOutlineXMark } from 'react-icons/hi2';

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};


const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf']

const formSchema = z.object({

    email: z
        .string()
        .min(1, { message: "El correo es invalido" })
        .email("Debe completar como ejemplo@ejem.com"),

    oficina: z
        .string()
        .min(1, { message: "Debe seleccionar una oficina" }),

    file: z
        .instanceof(File, { message: "No ingreso su CV" })
        .refine((file) => file.size <= MAX_FILE_SIZE, `File size should be less than 5MB.`)
        .refine(
            (file) => ACCEPTED_FILE_TYPES.includes(file.type),
            "Only PDF files are allowed."
        )
})

import { motion } from "framer-motion";
import { guardarCV, guardarFomulario, uploadPDF } from "../action"


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

export const EntrevistaPage = () => {
    const [isUploading, setIsUploading] = useState(false)
    const defaultValues = {
        email: "",
        oficina: "",

    }
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues,
    })


    async function onSubmit(values) {
        setIsUploading(true)
        const formData = new FormData()
        formData.append('file', values.file)
        formData.append('email', values.email)
        formData.append('oficina', values.oficina)




        try {
            const result = await uploadPDF(formData)
            if (result.success) {
                toast.success('Tus datos fueron enviados correctamente.', {
                    description: "Nos contactaremos contigo lo antes posible."
                })
                form.reset()
            } else {
                toast.error('Tus datos fueron enviados correctamente.', {
                    description: "Nos contactaremos contigo lo antes posible."
                })
            }
        } catch (error) {
            toast.error('Tus datos fueron enviados correctamente.', {
                description: "Nos contactaremos contigo lo antes posible."
            })
        } finally {
            setIsUploading(false)
        }
    }


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
            <div className="w-full  h-[50%] sm:h-full sm:mt-0 sm:w-1/2  flex items-center justify-center p-0 sm:bg-gradient-to-r sm:from-indigo-500 sm:from-10% sm:via-sky-500 via-30% sm:to-emerald-500 sm:to-90%  relative" >
                <motion.div


                    initial="initial"
                    variants={fadeInAnimationVariants}
                    whileInView="animate"
                    viewport={{ once: true }}
                    custom={1}
                    className="p-1 mt-[1000px] sm:p-6 w-full sm:mt-[100px] sm:mx-auto ">
                    <Form {...form} >

                        <form onSubmit={form.handleSubmit(onSubmit)} >
                            <Card className="w-full min-w-[350px]  mb-[100px] sm:mb-0 sm:max-w-md sm:mx-auto relative bottom-[50px] border-[1px] border-black/30 ">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-center">Ingresá tus datos</CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-4">

                                    <div className="space-y-2">


                                        <FormField
                                            control={form.control}
                                            name="email"
                                            id="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Ingresar correo" {...field} />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <FormField
                                            control={form.control}
                                            name="oficina"
                                            id="oficina"
                                            render={({ field }) => (
                                                <FormItem>

                                                    <FormLabel>Oficina</FormLabel>

                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Seleccioná una oficina" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>

                                                                <SelectItem value="salta">Oficinas Salta</SelectItem>
                                                                <SelectItem value="jujuy">Oficinas Jujuy</SelectItem>
                                                            </SelectContent>
                                                        </Select>

                                                    </FormControl>

                                                    <FormMessage />



                                                </FormItem>
                                            )}
                                        />
                                    </div>



                                    <div className="space-y-2">

                                        <FormField
                                            control={form.control}
                                            name="file"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Cargar CV</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="file"
                                                            accept=".pdf"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0]
                                                                if (file) {
                                                                    field.onChange(file)
                                                                }
                                                            }}
                                                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 h-auto w-full text-[12px] font-medium "

                                                        />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />


                                    </div>



                                </CardContent>

                                <CardFooter>
                                    <Button type="submit" disabled={isUploading} className="w-full">
                                        {isUploading ? 'Cargando...' : 'Enviar'}
                                    </Button>
                                </CardFooter>
                            </Card>

                        </form>
                    </Form>

                </motion.div>
            </div>
        </div>
    )
}
