"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Pencil, Trash2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const evaluacionesMock = [
    { id: 1, empleado: "Juan Pérez", fecha: "2023-05-15", puntuacion: 85 },
    { id: 2, empleado: "María García", fecha: "2023-06-01", puntuacion: 92 },
    { id: 3, empleado: "Carlos López", fecha: "2023-06-10", puntuacion: 78 },
]

export default function Evaluaciones() {
    const [evaluaciones, setEvaluaciones] = useState(evaluacionesMock)
    const [busqueda, setBusqueda] = useState("")
    const [nuevaEvaluacion, setNuevaEvaluacion] = useState({ empleado: '', fecha: '', puntuacion: 0 })

    const evaluacionesFiltradas = evaluaciones.filter(evaluacion =>
        evaluacion.empleado.toLowerCase().includes(busqueda.toLowerCase()) ||
        evaluacion.fecha.includes(busqueda)
    )

    const handleNuevaEvaluacion = () => {
        const id = evaluaciones.length > 0 ? Math.max(...evaluaciones.map(e => e.id)) + 1 : 1
        setEvaluaciones([...evaluaciones, { id, ...nuevaEvaluacion }])
        setNuevaEvaluacion({ empleado: '', fecha: '', puntuacion: 0 })
    }

    return (
        <div className="container mx-auto p-4 min-h-[1000px] min-w-[1000px]">
            <h1 className="text-3xl font-bold mb-4">Evaluaciones de Desempeño</h1>
            <div className="flex justify-between mb-4">
                <Input
                    placeholder="Buscar evaluaciones..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="max-w-sm"
                />
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <FileText className="mr-2 h-4 w-4" /> Nueva Evaluación
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Nueva Evaluación de Desempeño</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="empleado" className="text-right">
                                    Empleado
                                </Label>
                                <Input
                                    id="empleado"
                                    value={nuevaEvaluacion.empleado}
                                    onChange={(e) => setNuevaEvaluacion({ ...nuevaEvaluacion, empleado: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="fecha" className="text-right">
                                    Fecha
                                </Label>
                                <Input
                                    id="fecha"
                                    type="date"
                                    value={nuevaEvaluacion.fecha}
                                    onChange={(e) => setNuevaEvaluacion({ ...nuevaEvaluacion, fecha: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="puntuacion" className="text-right">
                                    Puntuación
                                </Label>
                                <Input
                                    id="puntuacion"
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={nuevaEvaluacion.puntuacion}
                                    onChange={(e) => setNuevaEvaluacion({ ...nuevaEvaluacion, puntuacion: Number(e.target.value) })}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <Button onClick={handleNuevaEvaluacion}>Crear Evaluación</Button>
                    </DialogContent>
                </Dialog>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Empleado</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Puntuación</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {evaluacionesFiltradas.map((evaluacion) => (
                        <TableRow key={evaluacion.id}>
                            <TableCell>{evaluacion.empleado}</TableCell>
                            <TableCell>{evaluacion.fecha}</TableCell>
                            <TableCell>
                                <div className="flex items-center">
                                    <Progress value={evaluacion.puntuacion} className="w-[60%] mr-2" />
                                    <span>{evaluacion.puntuacion}%</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon">
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
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