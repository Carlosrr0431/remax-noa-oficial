"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserPlus, Pencil, Trash2, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { supabaseClient } from "@/supabase/client"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

// const empleadosMock = [
//     { id: 1, nombre: "Juan Pérez", email: "Agente", grupo: "Juniors" },
//     { id: 2, nombre: "María García", email: "Agente", grupo: "Rookis" },
//     { id: 3, nombre: "Carlos López", email: "Agente", grupo: "Rookis" },
// ]

export default function Empleados() {
    const [empleados, setEmpleados] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [empleadoEditando, setEmpleadoEditando] = useState(null)
    const [nuevoEmpleado, setNuevoEmpleado] = useState({ nombre: '', email: '' })
    const [selectedGroup, setSelectedGroup] = useState("")
    const [open, setOpen] = useState(false)

    const empleadosFiltrados = empleados && empleados.filter(empleado =>
        empleado.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        empleado.email.toLowerCase().includes(busqueda.toLowerCase())
    )

    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("empleados")
                .select("*")

            setEmpleados(data.data);
        }

        getSupabaseOficial()

        const channelUsuarios = supabaseClient
            .channel('empleados')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'empleados' }, (payload) => {

                if (payload.eventType == "INSERT") {


                    return setEmpleados((antContenido) => [payload.new, ...antContenido])


                } else if (payload.eventType == 'UPDATE') {


                    return setEmpleados((antContenido) => antContenido.map((elem) => {
                        if (elem.id == payload.new.id) {
                            elem = payload.new
                        }

                        return elem;
                    }))



                } else if (payload.eventType == 'DELETE') {

                    return setEmpleados(antContenido => antContenido.filter((elem) => elem.id !== payload.old.id))

                }
            })
            .subscribe()


        return () => {

            supabaseClient.removeChannel(supabaseClient.channel(channelUsuarios))
        }
    }, [])


    const handleNuevoEmpleado = () => {
        const id = empleados.length > 0 ? Math.max(...empleados.map(e => e.id)) + 1 : 1

        const getSupabaseOficial = async () => {
            const result3 = await supabaseClient.from("empleados").insert({
                nombre: nuevoEmpleado.nombre,
                email: nuevoEmpleado.email,
                grupo: selectedGroup
            });

            console.log(result3);

        }

        getSupabaseOficial()

        setOpen(false)
        setNuevoEmpleado({ nombre: '', email: '' })
    }

    const handleEditarEmpleado = () => {
        if (empleadoEditando) {
            setEmpleados(empleados.map(e => e.id === empleadoEditando.id ? empleadoEditando : e))
            setEmpleadoEditando(null)
        }
    }

    const handleEliminarEmpleado = (id) => {
        setEmpleados(empleados.filter(e => e.id !== id))
    }

    return (
        <div className="container mx-auto p-4 min-w-[1000px] min-h-[1000px]">
            <h1 className="text-3xl font-bold mb-4">Gestión de Empleados</h1>
            <div className="flex justify-between mb-4">
                <Input
                    placeholder="Buscar empleados..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="max-w-sm"
                />
                <Dialog open={open}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setOpen(true)}>
                            <UserPlus className="mr-2 h-4 w-4" /> Agregar Empleado
                        </Button>
                    </DialogTrigger>
                    <DialogContent >
                        <DialogHeader>
                            <DialogTitle>Agregar Nuevo Empleado</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="nombre" className="text-right">
                                    Nombre
                                </Label>
                                <Input
                                    id="nombre"
                                    value={nuevoEmpleado.nombre}
                                    onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, nombre: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"

                                    value={nuevoEmpleado.email}
                                    onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, email: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="grupo" className="text-right">
                                    Grupo
                                </Label>
                                <div className="space-y-4">
                                    <Select onValueChange={setSelectedGroup} value={selectedGroup}>
                                        <SelectTrigger className="w-[200px]">
                                            <SelectValue placeholder="Selecciona un grupo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Grupos</SelectLabel>
                                                <SelectItem value="Juniors">Juniors</SelectItem>
                                                <SelectItem value="Rookies">Rookies</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>


                                </div>
                            </div>
                        </div>
                        <Button onClick={handleNuevoEmpleado}>Agregar Empleado</Button>
                    </DialogContent>
                </Dialog>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Grupo</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {empleadosFiltrados && empleadosFiltrados.map((empleado) => (
                        <TableRow key={empleado.id}>
                            <TableCell>{empleado.nombre}</TableCell>
                            <TableCell>{empleado.email}</TableCell>
                            <TableCell>{empleado.grupo}</TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Editar Empleado</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="edit-nombre" className="text-right">
                                                    Nombre
                                                </Label>
                                                <Input
                                                    id="edit-nombre"
                                                    value={empleadoEditando?.nombre || ''}
                                                    onChange={(e) => setEmpleadoEditando(prev => prev ? { ...prev, nombre: e.target.value } : null)}
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="edit-email" className="text-right">
                                                    Email
                                                </Label>
                                                <Input
                                                    id="edit-email"
                                                    value={empleadoEditando?.email || ''}
                                                    onChange={(e) => setEmpleadoEditando(prev => prev ? { ...prev, email: e.target.value } : null)}
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="edit-grupo" className="text-right">
                                                    Grupo
                                                </Label>
                                                <div className="space-y-4">
                                                    <Select onValueChange={setSelectedGroup} value={selectedGroup}>
                                                        <SelectTrigger className="w-[200px]">
                                                            <SelectValue placeholder="Selecciona un grupo" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Grupos</SelectLabel>
                                                                <SelectItem value="juniors">Juniors</SelectItem>
                                                                <SelectItem value="rookies">Rookies</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>


                                                </div>
                                            </div>
                                        </div>
                                        <Button onClick={handleEditarEmpleado}>Guardar Cambios</Button>
                                    </DialogContent>
                                </Dialog>
                                <Button variant="ghost" size="icon" onClick={() => handleEliminarEmpleado(empleado.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}