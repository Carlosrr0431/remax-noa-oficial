"use client"

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { UserPlus, Pencil, Trash2, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { guardarFomularioBaja } from '../action'
import { ModalFormBaja } from './ModalFormBaja'
import { supabaseClient } from '@/supabase/client'

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

const datos = [
    {
        nombre: "Ana García",
        email: "ana.garcia@ejemplo.com",
        razonEconomica: "Mejor salario",
        razonPersonal: "Flexibilidad horaria",
        razonEmocional: "Ambiente laboral positivo",
        razonEmpresa: "Oportunidades de crecimiento",
    },
    {
        nombre: "Carlos Rodríguez",
        email: "carlos.rodriguez@ejemplo.com",
        razonEconomica: "Beneficios adicionales",
        razonPersonal: "Cercanía al hogar",
        razonEmocional: "Reconocimiento profesional",
        razonEmpresa: "Proyectos innovadores",
    },
    {
        nombre: "Laura Martínez",
        email: "laura.martinez@ejemplo.com",
        razonEconomica: "Plan de bonificaciones",
        razonPersonal: "Desarrollo profesional",
        razonEmocional: "Trabajo en equipo",
        razonEmpresa: "Responsabilidad social",
    },
]

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

export const FormularioBaja = () => {

    const [showModal, setShowModal] = useState(false)
    const [empleados, setEmpleados] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [usuariosFilter, setUsuariosFilter] = useState()

    const empleadosFiltrados = empleados.filter(empleado =>
        empleado.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )

    // const handleNuevoEmpleado = () => {
    //     const id = empleados.length > 0 ? Math.max(...empleados.map(e => e.id)) + 1 : 1
    //     setEmpleados([...empleados, { id, ...nuevoEmpleado }])
    //     setNuevoEmpleado({ nombre: '', cargo: '', departamento: '' })
    // }


    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("formularioBaja")
                .select("*").order('id', { ascending: true })


            setEmpleados(data.data)
            setUsuariosFilter(data.data)
        }


        getSupabaseOficial()

        const channelUsuarios = supabaseClient
            .channel('formularioBaja')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'formularioBaja' }, (payload) => {

                if (payload.eventType == "INSERT") {


                    return setUsuariosFilter((antContenido) => [payload.new, ...antContenido])


                } else if (payload.eventType == 'UPDATE') {


                    return setUsuariosFilter((antContenido) => antContenido.map((elem) => {
                        if (elem.id == payload.new.id) {
                            elem = payload.new
                        }

                        return elem;
                    }))



                } else if (payload.eventType == 'DELETE') {

                    return setUsuariosFilter(antContenido => antContenido.filter((elem) => elem.id !== payload.old.id))

                }
            })
            .subscribe()


        return () => {

            supabaseClient.removeChannel(supabaseClient.channel(channelUsuarios))
        }

    }, [])

    const getUsuarios = async () => {
        let data = await supabaseClient
            .from("formularioBaja")
            .select("*").order('id', { ascending: true })


        setEmpleados(data.data)
    }

    let inputHandler = (e) => {

        getUsuarios()

        const searchUser = empleados.filter((el) => {


            return el.nombre.toLowerCase().includes(e.target.value.toLowerCase())

        })

        setUsuariosFilter(searchUser)
    };

    return (
        <div>

            <div className="w-full">

                <h1 className="text-3xl font-bold mb-4">Gestión de bajas</h1>
                <div className="flex justify-between mb-4 mr-10">
                    <Input
                        placeholder="Buscar empleados..."
                        onChange={inputHandler}


                        className="max-w-sm border-white bg-white/80 text-black"
                    />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button onClick={() => setShowModal(true)}>
                                <UserPlus className="mr-2 h-4 w-4" /> Agregar Baja
                            </Button>
                        </DialogTrigger>

                    </Dialog>
                </div>
                <div className="w-full mr-10 relative right-10">
                    <Table>
                        <TableCaption>Tabla de Razones de Empleados</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[150px]">Nombre</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Razón Económica</TableHead>
                                <TableHead>Razón Personal</TableHead>
                                <TableHead>Razón Emocional</TableHead>
                                <TableHead className="text-right">Razón Empresa</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {usuariosFilter && usuariosFilter.map((empleado) => (
                                <TableRow key={empleado.id}>
                                    <TableCell className="font-medium">{empleado.nombre}</TableCell>
                                    <TableCell>{empleado.email}</TableCell>
                                    <TableCell>{empleado.economicReason}</TableCell>
                                    <TableCell>{empleado.personalReason}</TableCell>
                                    <TableCell>{empleado.emotionalReason}</TableCell>
                                    <TableCell className="text-right">{empleado.companyReason}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>


            {
                showModal && <ModalFormBaja setShowModal={setShowModal} />
            }

        </div>
    )
}