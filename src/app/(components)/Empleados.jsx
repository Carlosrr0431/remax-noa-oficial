"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserPlus, Pencil, Trash2, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const empleadosMock = [
    { id: 1, nombre: "Juan Pérez", cargo: "Desarrollador", departamento: "TI" },
    { id: 2, nombre: "María García", cargo: "Diseñadora", departamento: "Marketing" },
    { id: 3, nombre: "Carlos López", cargo: "Gerente", departamento: "Ventas" },
]

export default function Empleados() {
    const [empleados, setEmpleados] = useState(empleadosMock)
    const [busqueda, setBusqueda] = useState("")
    const [empleadoEditando, setEmpleadoEditando] = useState(null)
    const [nuevoEmpleado, setNuevoEmpleado] = useState({ nombre: '', cargo: '', departamento: '' })

    const empleadosFiltrados = empleados.filter(empleado =>
        empleado.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        empleado.cargo.toLowerCase().includes(busqueda.toLowerCase()) ||
        empleado.departamento.toLowerCase().includes(busqueda.toLowerCase())
    )

    const handleNuevoEmpleado = () => {
        const id = empleados.length > 0 ? Math.max(...empleados.map(e => e.id)) + 1 : 1
        setEmpleados([...empleados, { id, ...nuevoEmpleado }])
        setNuevoEmpleado({ nombre: '', cargo: '', departamento: '' })
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
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4" /> Agregar Empleado
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
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
                                <Label htmlFor="cargo" className="text-right">
                                    Cargo
                                </Label>
                                <Input
                                    id="cargo"
                                    value={nuevoEmpleado.cargo}
                                    onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, cargo: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="departamento" className="text-right">
                                    Departamento
                                </Label>
                                <Input
                                    id="departamento"
                                    value={nuevoEmpleado.departamento}
                                    onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, departamento: e.target.value })}
                                    className="col-span-3"
                                />
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
                        <TableHead>Cargo</TableHead>
                        <TableHead>Departamento</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {empleadosFiltrados.map((empleado) => (
                        <TableRow key={empleado.id}>
                            <TableCell>{empleado.nombre}</TableCell>
                            <TableCell>{empleado.cargo}</TableCell>
                            <TableCell>{empleado.departamento}</TableCell>
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
                                                <Label htmlFor="edit-cargo" className="text-right">
                                                    Cargo
                                                </Label>
                                                <Input
                                                    id="edit-cargo"
                                                    value={empleadoEditando?.cargo || ''}
                                                    onChange={(e) => setEmpleadoEditando(prev => prev ? { ...prev, cargo: e.target.value } : null)}
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="edit-departamento" className="text-right">
                                                    Departamento
                                                </Label>
                                                <Input
                                                    id="edit-departamento"
                                                    value={empleadoEditando?.departamento || ''}
                                                    onChange={(e) => setEmpleadoEditando(prev => prev ? { ...prev, departamento: e.target.value } : null)}
                                                    className="col-span-3"
                                                />
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