import React from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { guardarFomularioBaja } from '../action'
import { HiOutlineXMark } from 'react-icons/hi2'

const formSchema = z.object({
    name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    economicReason: z.string().optional(),
    personalReason: z.string().optional(),
    emotionalReason: z.string().optional(),
    companyReason: z.string().optional(),
}).refine((data) => {
    return Object.values(data).some(value => value !== undefined && value !== "");
}, {
    message: "Por favor, seleccione al menos una razón de salida",
    path: ["economicReason"],
});

const reasons = {
    economic: [
        "No estoy satisfecho con los resultados, pensé que era más fácil.",
        "No estoy satisfecho con el sistema de comisiones.",
        "Los costos asociados al trabajo son demasiados altos.",
        "Pensé que iba a tener resultados más rápido.",
        "Me surgió otra oportunidad de trabajo dentro de otra inmobiliaria.",
        "Me surgió otra oportunidad de trabajo fuera de la inmobiliaria, con sueldo fijo.",
    ],
    personal: [
        "El horario de trabajo no se ajusta a mis necesidades personales.",
        "He tenido problemas para equilibrar mi vida personal y laboral.",
        "Mi situación familiar o personal ha cambiado y ya no puedo continuar en el trabajo.",
        "No estoy satisfecho con la ubicación del lugar del trabajo.",
        "No estoy de acuerdo con el tipo de liderazgo.",
        "No estoy satisfecho con el soporte administrativo/operativo que brinda el staff.",
    ],
    emotional: [
        "Me he sentido desmotivado o desalentado en mi trabajo por parte de otros agentes inmobiliarios.",
        "No me he sentido valorado o reconocido por mi trabajo.",
        "El ambiente de trabajo ha sido estresante o negativo.",
        "No encontré suficiente apoyo o tutoría.",
    ],
    company: [
        "No estoy satisfecho con la cultura y valores de la empresa.",
        "Entiendo que las oportunidades de crecimiento son limitadas.",
        "Las políticas y procedimientos de la empresa no son claros o justos.",
    ],
}

export const ModalFormBaja = ({ setShowModal }) => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            economicReason: "",
            personalReason: "",
            emotionalReason: "",
            companyReason: "",
        },
    })

    async function onSubmit(data) {
        console.log(data)

        await guardarFomularioBaja(data)


        setShowModal(false)
        // Here you would typically send the data to your backend
    }

    return (
        <div className='fixed inset-0  z-50 
             flex items-center justify-center h-full w-full  '>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white/90 p-4 rounded-sm max-w-[520px] ">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-w-[500px] min-w-[500px] max-h-[400px] overflow-y-auto">
                        <div className="flex justify-end mr-2">
                            <div className="" onClick={() => setShowModal(false)}>
                                <HiOutlineXMark className="text-black w-[30px] h-[30px] cursor-pointer hover:scale-110" color="black" />
                            </div>
                        </div>
                        <div className='flex gap-8 '>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-black">Nombre</FormLabel>
                                        <FormControl className="text-black">
                                            <Input placeholder="Ingrese su nombre" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-black">Correo Electrónico</FormLabel>
                                        <FormControl className="text-black">
                                            <Input placeholder="Ingrese su correo electrónico" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="economicReason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black">Razones Económicas</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className='text-black'>
                                                <SelectValue placeholder="Seleccione una razón económica" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {reasons.economic.map((reason, index) => (
                                                    <SelectItem key={index} value={reason}>
                                                        {reason}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="personalReason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black">Razones Personales</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="text-black">
                                                <SelectValue placeholder="Seleccione una razón personal" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {reasons.personal.map((reason, index) => (
                                                    <SelectItem key={index} value={reason}>
                                                        {reason}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="emotionalReason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black">Razones Emocionales</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="text-black">
                                                <SelectValue placeholder="Seleccione una razón emocional" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {reasons.emotional.map((reason, index) => (
                                                    <SelectItem key={index} value={reason}>
                                                        {reason}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="companyReason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-black">Razones relacionadas con la empresa</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="text-black">
                                                <SelectValue placeholder="Seleccione una razón relacionada con la empresa" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {reasons.company.map((reason, index) => (
                                                    <SelectItem key={index} value={reason}>
                                                        {reason}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-[60%] relative left-[20%]">Guardar</Button>
                </form>
            </Form></div>
    )
}
