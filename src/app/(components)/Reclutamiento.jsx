"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, MoveRight, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DndContext, DragOverlay, useSensors, useSensor, PointerSensor } from "@dnd-kit/core"
import { Droppable } from "./Droppable"
import { Draggable } from "./Draggable"
import { Progress } from "@/components/ui/progress"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


const etapas = [
    "CV Recibido",
    "Primer Entrevista",
    "Segunda Entrevista",
    "Examen Psicotecnico",
    "Reclutado"
]

const candidatosMock = [
    { id: 1, nombre: "Ana Martínez", puesto: "Agente", estado: "Entrevista Inicial" },
    { id: 2, nombre: "Luis Rodríguez", puesto: "Agente", estado: "CV Recibido" },
    { id: 3, nombre: "Elena Sánchez", puesto: "Agente", estado: "Oferta Enviada" },
    { id: 4, nombre: "Carlos Gómez", puesto: "Agente", estado: "Prueba Técnica" },
    { id: 5, nombre: "Laura Fernández", puesto: "Agente", estado: "Entrevista Final" },
]

export default function Reclutamiento() {
    const [candidatos, setCandidatos] = useState(candidatosMock)
    const [busqueda, setBusqueda] = useState("")
    const [filtroEtapa, setFiltroEtapa] = useState(null)
    const [activeDragId, setActiveDragId] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [nuevoCandidato, setNuevoCandidato] = useState({
        nombre: "",
        puesto: "",
        estado: "CV Recibido"
    })

    const sensors = useSensors(useSensor(PointerSensor))

    const candidatosFiltrados = candidatos.filter(candidato =>
        (candidato.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            candidato.puesto.toLowerCase().includes(busqueda.toLowerCase())) &&
        (filtroEtapa ? candidato.estado === filtroEtapa : true)
    )

    const moverCandidato = (candidatoId, nuevaEtapa) => {
        setCandidatos(candidatos.map(c =>
            c.id === candidatoId ? { ...c, estado: nuevaEtapa } : c
        ))
    }

    const handleDragStart = (event) => {
        setActiveDragId(event.active.id)
    }

    const handleDragEnd = (event) => {
        const { active, over } = event
        if (over && active.id !== over.id) {
            const candidatoId = parseInt(active.id)
            const nuevaEtapa = over.id
            moverCandidato(candidatoId, nuevaEtapa)
        }
        setActiveDragId(null)
    }

    const calcularProgreso = (estado) => {
        const index = etapas.indexOf(estado)
        return ((index + 1) / etapas.length) * 100
    }

    const handleAgregarCandidato = () => {
        const nuevoId = Math.max(...candidatos.map(c => c.id)) + 1
        setCandidatos([...candidatos, { id: nuevoId, ...nuevoCandidato }])
        setNuevoCandidato({ nombre: "", puesto: "", estado: "CV Recibido" })
        setModalOpen(false)
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Pipeline de Reclutamiento</h1>
            <div className="flex justify-between mb-4">
                <div className="flex gap-2">
                    <Input
                        placeholder="Buscar candidatos..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-64"
                    />
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild className="bg-black/20">
                            <Button variant="outline">
                                <Filter className="mr-2 h-4 w-4" />
                                {filtroEtapa || "Todas las etapas"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent >
                            <DropdownMenuItem onClick={() => setFiltroEtapa(null)}>
                                Todas las etapas
                            </DropdownMenuItem>
                            {etapas.map((etapa) => (
                                <DropdownMenuItem key={etapa} onClick={() => setFiltroEtapa(etapa)}>
                                    {etapa}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4" /> Agregar Candidato
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Agregar Nuevo Candidato</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="nombre" className="text-right">
                                    Nombre
                                </Label>
                                <Input
                                    id="nombre"
                                    value={nuevoCandidato.nombre}
                                    onChange={(e) => setNuevoCandidato({ ...nuevoCandidato, nombre: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="puesto" className="text-right">
                                    Puesto
                                </Label>
                                <Input
                                    id="puesto"
                                    value={nuevoCandidato.puesto}
                                    onChange={(e) => setNuevoCandidato({ ...nuevoCandidato, puesto: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="estado" className="text-right">
                                    Estado
                                </Label>
                                <Select
                                    value={nuevoCandidato.estado}
                                    onValueChange={(value) => setNuevoCandidato({ ...nuevoCandidato, estado: value })}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Selecciona un estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {etapas.map((etapa) => (
                                            <SelectItem key={etapa} value={etapa}>
                                                {etapa}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button onClick={handleAgregarCandidato}>Agregar Candidato</Button>
                    </DialogContent>
                </Dialog>
            </div>
            <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {etapas.map((etapa) => (
                        <Droppable key={etapa} id={etapa}>
                            <Card className="col-span-1 bg-white/80 ">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">{etapa}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {candidatosFiltrados
                                        .filter(candidato => candidato.estado === etapa)
                                        .map(candidato => (
                                            <Draggable key={candidato.id} id={candidato.id.toString()}>
                                                <Card className="p-2 shadow-sm hover:shadow-md transition-shadow duration-200 bg-black/50">
                                                    <p className="font-semibold text-sm">{candidato.nombre}</p>
                                                    <p className="text-xs ">{candidato.puesto}</p>
                                                    <div className="mt-2">
                                                        <Progress value={calcularProgreso(candidato.estado)} className="h-1" />
                                                        <div className="flex justify-between items-center mt-1">
                                                            <span className="text-xs font-medium">
                                                                {Math.round(calcularProgreso(candidato.estado))}%
                                                            </span>
                                                            {etapas.indexOf(etapa) < etapas.length - 1 && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-6 w-6"
                                                                    onClick={() => moverCandidato(candidato.id, etapas[etapas.indexOf(etapa) + 1])}
                                                                >
                                                                    <MoveRight className="h-3 w-3" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Draggable>
                                        ))}
                                </CardContent>
                            </Card>
                        </Droppable>
                    ))}
                </div>
                {/* <DragOverlay>
                    {activeDragId ? (
                        <Card className="p-2 w-[200px] bg-black/90">
                            <p className="font-semibold text-sm">{candidatos.find(c => c.id.toString() === activeDragId)?.nombre}</p>
                            <p className="text-xs text-muted-foreground">{candidatos.find(c => c.id.toString() === activeDragId)?.puesto}</p>
                        </Card>
                    ) : null}
                </DragOverlay> */}
            </DndContext>
        </div>
    )
}