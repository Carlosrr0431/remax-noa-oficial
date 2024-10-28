'use client'

import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Mail, PanelsTopLeft } from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabaseClient } from '@/supabase/client'
import { Badge } from '@/components/ui/badge'

// Datos de ejemplo
const usuariosIniciales = [
    { id: 1, nombre: "Juan Pérez", cv: "juan_cv.pdf", fuente: "Landing Page", fechaIngreso: "2023-10-15", descargado: false },
    { id: 2, nombre: "María García", cv: "maria_cv.doc", fuente: "Mailing Masivo", fechaIngreso: "2023-10-16", descargado: false },
    { id: 3, nombre: "Carlos Rodríguez", cv: "carlos_cv.pdf", fuente: "Landing Page", fechaIngreso: "2023-10-17", descargado: true },
    { id: 4, nombre: "Ana Martínez", cv: "ana_cv.pdf", fuente: "Mailing Masivo", fechaIngreso: "2023-10-18", descargado: false },
]

export default function FormularioCVMejorado() {
    const [usuarios, setUsuarios] = useState([])
    const [filtroFuente, setFiltroFuente] = useState("Todos")
    const [contactos, setContactos] = useState();
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([])
    const pathname = usePathname();

    // const usuariosFiltrados = filtroFuente
    //     ? usuarios.filter(usuario => usuario.fuente === filtroFuente || filtroFuente == "Todos")
    //     : usuarios

    const marcarComoDescargado = async (id) => {
        // setUsuarios(usuarios.map(usuario =>
        //     usuario.id === id ? { ...usuario, descargado: true } : usuario
        // ))

        const result2 = await supabaseClient
            .from("formularioCV")
            .update({
                descargado: true
            })
            .eq("id", id);

        console.log(result2);

    }



    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("formularioCV")
                .select("*").order('id', { ascending: true })

            setUsuarios(data.data)
            setUsuariosFiltrados(data.data)
        }

        getSupabaseOficial()

        const channelUsuarios = supabaseClient
            .channel('formularioCV')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'formularioCV' }, (payload) => {

                if (payload.eventType == "INSERT") {


                    return (setUsuarios((antContenido) => [payload.new, ...antContenido]),
                        setUsuariosFiltrados((antContenido) => [payload.new, ...antContenido]))


                } else if (payload.eventType == 'UPDATE') {


                    return (setUsuarios((antContenido) => antContenido.map((elem) => {
                        if (elem.id == payload.new.id) {
                            elem = payload.new
                        }

                        return elem;
                    })), setUsuariosFiltrados((antContenido) => antContenido.map((elem) => {
                        if (elem.id == payload.new.id) {
                            elem = payload.new
                        }

                        return elem;
                    })))



                } else if (payload.eventType == 'DELETE') {

                    return (setUsuarios(antContenido => antContenido.filter((elem) => elem.id !== payload.old.id)), setUsuariosFiltrados(antContenido => antContenido.filter((elem) => elem.id !== payload.old.id)))

                }
            })
            .subscribe()


        return () => {

            supabaseClient.removeChannel(supabaseClient.channel(channelUsuarios))
        }


    }, [])

    return (
        <div className="container mx-auto p-4">

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <Select onValueChange={(value) => {
                        // setFiltroFuente(value || null)
                        const arrayFilter = usuarios.filter(usuario => usuario.fuente === value || value == "Todos")

                        setUsuariosFiltrados(arrayFilter)
                    }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filtrar por fuente" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Todos">Todas</SelectItem>
                            <SelectItem value="Landing Page">Landing Page</SelectItem>
                            <SelectItem value="Mailing Masivo">Mailing Masivo</SelectItem>
                        </SelectContent>
                    </Select>

                    <Badge variant="secondary" className="text-sm py-1 px-2">
                        {usuariosFiltrados.length}
                    </Badge>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Datos del usuario</TableHead>

                        <TableHead>Fuente</TableHead>
                        <TableHead>Fecha de Ingreso</TableHead>
                        <TableHead>CV</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {usuariosFiltrados && usuariosFiltrados.filter((e) => {

                        if (pathname == '/dashboard/administrador') {
                            return e
                        } else if (pathname == '/dashboard/jujuy')
                            return e
                    }).map((usuario, index) => {


                        return (
                            <TableRow key={usuario.id}>
                                <TableCell>{usuario.email}</TableCell>

                                <TableCell>
                                    <div className="flex space-x-4 gap-x-4">


                                        {usuario.fuente == "Landing Page" ? (

                                            <PanelsTopLeft className="h-4 w-4 text-blue-500" />
                                        ) : (
                                            <Mail className="h-4 w-4 text-red-500" />
                                        )}

                                        {usuario.fuente == "Landing Page" ? (
                                            "Landing Page"
                                        ) : (
                                            "Mailing Masivo"
                                        )}
                                    </div>

                                </TableCell>
                                <TableCell>{usuario.created_at.substr(0, 10).split('-').reverse().join('/')}</TableCell>
                                <TableCell>
                                    <Link href={usuario.cv} download='cv.pdf' target='_blank' className="">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex space-x-4 gap-x-4 text-black"
                                            onClick={() => {
                                                marcarComoDescargado(usuario.id)
                                            }}

                                            aria-label={`Descargar CV de ${usuario.nombre}`}
                                        >
                                            {usuario.descargado ? (
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <Download className="h-4 w-4" />
                                            )}

                                            {usuario.descargado ? (
                                                "Descargar CV"
                                            ) : (
                                                "Descargar CV"
                                            )}

                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        )



                    })}

                </TableBody>
            </Table>
        </div>
    )
}