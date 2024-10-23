"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns"
import { es } from "date-fns/locale"
import { supabaseClient } from "@/supabase/client"
import moment from "moment-timezone";

const camposTracking = [
    'formularioReferidos',
    'formularioPrelisting',
    'acm',
    'seguimientoAcm',
    'captaciones',
    'propiedadesActivas'
]

const agentsMock = [
    { id: 1, name: "Juan Pérez", group: "Juniors" },
    { id: 2, name: "María García", group: "Rookies" },
    { id: 3, name: "Carlos López", group: "Juniors" },
    { id: 4, name: "Ana Martínez", group: "Rookies" },
]

export default function Tracking() {
    const [trackingData, setTrackingData] = useState([])
    const [agents, setAgents] = useState([])
    const [selectedGroup, setSelectedGroup] = useState('Juniors')
    const [selectedAgent, setSelectedAgent] = useState(null)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedPeriod, setSelectedPeriod] = useState('weekly')
    const [nuevoRegistro, setNuevoRegistro] = useState({
        semana: format(new Date(), 'yyyy-MM-dd'),
        agentId: 0,
        formularioReferidos: '',
        formularioPrelisting: '',
        acm: '',
        seguimientoAcm: '',
        captaciones: '',
        propiedadesActivas: ''
    })


    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("empleados")
                .select("*")

            setAgents(data.data);
        }

        getSupabaseOficial()
    }, [])


    useEffect(() => {
        if (agents.length > 0 && selectedGroup) {
            const firstAgentOfGroup = agents.find(agent => agent.grupo === selectedGroup)
            if (firstAgentOfGroup) {
                setSelectedAgent(firstAgentOfGroup)
                setNuevoRegistro(prev => ({ ...prev, agentId: firstAgentOfGroup.id }))
            }
        }
    }, [selectedGroup, agents])

    useEffect(() => {
        if (selectedDate) {
            const formattedDate = format(selectedDate, 'yyyy-MM-dd')
            setNuevoRegistro(prev => ({ ...prev, semana: formattedDate }))
        }
    }, [selectedDate])

    const handleInputChange = (campo, valor) => {
        setNuevoRegistro(prev => ({
            ...prev,
            [campo]: valor
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!selectedAgent) return

        const id = trackingData.length > 0 ? Math.max(...trackingData.map(d => d.id)) + 1 : 1
        const nuevoRegistroConNumeros = {
            ...nuevoRegistro,
            id,
            agentId: selectedAgent.id,
            formularioReferidos: nuevoRegistro.formularioReferidos || '0',
            formularioPrelisting: nuevoRegistro.formularioPrelisting || '0',
            acm: nuevoRegistro.acm || '0',
            seguimientoAcm: nuevoRegistro.seguimientoAcm || '0',
            captaciones: nuevoRegistro.captaciones || '0',
            propiedadesActivas: nuevoRegistro.propiedadesActivas || '0',
        }

        const getSupabaseOficial = async () => {

            const agente = await supabaseClient
                .from("empleados")
                .select("*")
                .eq("id", selectedAgent.id)

            if (agente.data[0]?.formularios != null) {
                const result3 = await supabaseClient.from("empleados").update({
                    formularios: [...agente.data[0]?.formularios, {
                        fecha: nuevoRegistro.semana,
                        formularioReferidos: nuevoRegistro.formularioReferidos,
                        formularioPrelisting: nuevoRegistro.formularioPrelisting,
                        acm: nuevoRegistro.acm,
                        seguimientoAcm: nuevoRegistro.seguimientoAcm,
                        captaciones: nuevoRegistro.captaciones,
                        propiedadesActivas: nuevoRegistro.propiedadesActivas
                    }]
                }).eq("id", selectedAgent.id);

                console.log(result3);
            } else {
                const result3 = await supabaseClient.from("empleados").update({
                    formularios: [{
                        fecha: nuevoRegistro.semana,
                        formularioReferidos: nuevoRegistro.formularioReferidos,
                        formularioPrelisting: nuevoRegistro.formularioPrelisting,
                        acm: nuevoRegistro.acm,
                        seguimientoAcm: nuevoRegistro.seguimientoAcm,
                        captaciones: nuevoRegistro.captaciones,
                        propiedadesActivas: nuevoRegistro.propiedadesActivas
                    }]
                }).eq("id", selectedAgent.id);

                console.log(result3);
            }



        }

        getSupabaseOficial()
        setTrackingData([...trackingData, nuevoRegistroConNumeros])
        setNuevoRegistro({
            semana: format(new Date(), 'yyyy-MM-dd'),
            agentId: selectedAgent.id,
            formularioReferidos: '',
            formularioPrelisting: '',
            acm: '',
            seguimientoAcm: '',
            captaciones: '',
            propiedadesActivas: ''
        })
    }

    const calcularTotales = async (data) => {


        let fecha2 = moment(new Date().toLocaleDateString().split('/').reverse().join('/'));

        let dif = Math.abs(fecha2.diff(selectedDate, 'days'))

        const totales = {
            formularioReferidos: 0,
            formularioPrelisting: 0,
            acm: 0,
            seguimientoAcm: 0,
            captaciones: 0,
            propiedadesActivas: 0
        }

        if (dif != 0) {
            const agente = await supabaseClient
                .from("empleados")
                .select("*")
                .eq("id", selectedAgent.id)

            if (agente.data[0]?.formularios != null) {
                agente.data[0]?.formularios.forEach(item => {

                    if (item.fecha.split('-').reverse().join('/') == selectedDate.toLocaleDateString()) {
                        // console.log(item.fecha.split('-').reverse().join('/'));
                        // console.log("fecha seleccionada: " + selectedDate.toLocaleDateString());
                        // console.log("Son iguales");

                        console.log("formulario referido: " + parseInt(item.formularioReferidos));

                        totales.formularioReferidos += parseInt(item.formularioReferidos) || 0
                        totales.formularioPrelisting += parseInt(item.formularioPrelisting) || 0
                        totales.acm += parseInt(item.acm) || 0
                        totales.seguimientoAcm += parseInt(item.seguimientoAcm) || 0
                        totales.captaciones += parseInt(item.captaciones) || 0
                        totales.propiedadesActivas += parseInt(item.propiedadesActivas) || 0
                        return totales
                    }
                })
            }

        }

        // data.forEach(registro => {
        //     totales.formularioReferidos += parseInt(registro.formularioReferidos) || 0
        //     totales.formularioPrelisting += parseInt(registro.formularioPrelisting) || 0
        //     totales.acm += parseInt(registro.acm) || 0
        //     totales.seguimientoAcm += parseInt(registro.seguimientoAcm) || 0
        //     totales.captaciones += parseInt(registro.captaciones) || 0
        //     totales.propiedadesActivas += parseInt(registro.propiedadesActivas) || 0
        // })

        return totales
    }

    const calcularPorcentajes = (totales) => {
        const total = Object.values(totales).reduce((sum, value) => sum + value, 0)
        return Object.entries(totales).reduce((acc, [key, value]) => {
            acc[key] = total > 0 ? (value / total) * 100 : 0
            return acc
        }, {})
    }

    const filtrarDatosPorPeriodo = (data) => {
        if (!selectedDate) return data

        const start = selectedPeriod === 'weekly' ? startOfWeek(selectedDate) : startOfMonth(selectedDate)
        const end = selectedPeriod === 'weekly' ? endOfWeek(selectedDate) : endOfMonth(selectedDate)

        return data.filter(registro => {
            const fecha = new Date(registro.semana)
            return fecha >= start && fecha <= end
        })
    }

    const datosFiltrados = filtrarDatosPorPeriodo(trackingData)
    const datosGrupo = datosFiltrados.filter(registro =>
        agents.find(agent => agent.id === registro.agentId)?.grupo === selectedGroup
    )
    const datosAgente = selectedAgent
        ? datosFiltrados.filter(registro => registro.agentId === selectedAgent.id)
        : []

    const totalesGrupo = calcularTotales(datosGrupo)
    const totalesAgente = calcularTotales(datosAgente)
    const porcentajesGrupo = calcularPorcentajes(totalesGrupo)
    const porcentajesAgente = calcularPorcentajes(totalesAgente)

    return (
        <div className="container mx-auto p-4 w-[90%]">
            <h1 className="text-3xl font-bold mb-4">Tracking Semanal</h1>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Nuevo Registro</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="fecha">Fecha</Label>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                                            {selectedDate ? format(selectedDate, 'PPP', { locale: es }) : <span>Selecciona una fecha</span>}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Seleccionar fecha</DialogTitle>
                                        </DialogHeader>
                                        <Calendar
                                            mode="single"
                                            selected={selectedDate}
                                            onSelect={setSelectedDate}
                                            locale={es}
                                        />
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div>
                                <Label htmlFor="grupo">Grupo</Label>
                                <Select
                                    value={selectedGroup}
                                    onValueChange={(value) => setSelectedGroup(value)}
                                >
                                    <SelectTrigger id="grupo">
                                        <SelectValue placeholder="Selecciona un grupo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Juniors">Juniors</SelectItem>
                                        <SelectItem value="Rookies">Rookies</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="agente">Agente</Label>
                            <Select
                                value={selectedAgent?.id.toString() || ''}
                                onValueChange={(value) => {
                                    const agent = agents.find(a => a.id === parseInt(value))
                                    if (agent) {
                                        setSelectedAgent(agent)
                                        setNuevoRegistro(prev => ({ ...prev, agentId: agent.id }))
                                    }
                                }}
                            >
                                <SelectTrigger id="agente">
                                    <SelectValue placeholder="Selecciona un agente" />
                                </SelectTrigger>
                                <SelectContent>
                                    {agents
                                        .filter(agent => agent.grupo === selectedGroup)
                                        .map(agent => (
                                            <SelectItem key={agent.id} value={agent.id.toString()}>
                                                {agent.nombre}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {camposTracking.map((campo) => (

                                // formularioReferidos - formularioPrelisting - acm - seguimientoAcm - captaciones - propiedadesActivas
                                <div key={campo}>
                                    <Label htmlFor={campo}>{campo == 'formularioReferidos' ? 'Formulario de Referidos' : campo == 'formularioPrelisting' ? 'Formulario de Prelisting' : campo == 'acm' ? 'ACM' : campo == 'seguimientoAcm' ? 'Seguimiento ACM' : campo == 'captaciones' ? 'Captaciones' : campo == 'propiedadesActivas' ? 'Propiedades Activas' : ''}</Label>
                                    <Input
                                        id={campo}
                                        type="number"
                                        min="0"
                                        value={nuevoRegistro[campo] || ''}
                                        onChange={(e) => handleInputChange(campo, e.target.value)}
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                        <Button type="submit">Agregar Registro</Button>
                    </form>
                </CardContent>
            </Card>

            <div className="mb-4">
                <Label htmlFor="periodo">Período</Label>
                <Select
                    value={selectedPeriod}
                    onValueChange={(value) => setSelectedPeriod(value)}
                >
                    <SelectTrigger id="periodo">
                        <SelectValue placeholder="Selecciona un período" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensual</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Resumen del Grupo: {selectedGroup}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Campo</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Porcentaje</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Object.entries(totalesGrupo).map(([key, value]) => (
                                <TableRow key={key}>
                                    <TableCell>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</TableCell>
                                    <TableCell>{value}</TableCell>
                                    <TableCell>{porcentajesGrupo[key].toFixed(2)}%</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {selectedAgent && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Resumen Individual: {selectedAgent.nombre}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Campo</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Porcentaje</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Object.entries(totalesAgente).map(([key, value]) => (
                                    <TableRow key={key}>
                                        <TableCell>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</TableCell>
                                        <TableCell>{value}</TableCell>
                                        <TableCell>{porcentajesAgente[key].toFixed(2)}%</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Historial de Registros</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Semana</TableHead>
                                <TableHead>Agente</TableHead>
                                {camposTracking.map((campo) => (
                                    <TableHead key={campo}>{campo}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {datosFiltrados.map((registro) => (
                                <TableRow key={registro.id}>
                                    <TableCell>{registro.semana}</TableCell>
                                    <TableCell>{agents.find(a => a.id === registro.agentId)?.nombre}</TableCell>
                                    <TableCell>{registro.formularioReferidos}</TableCell>
                                    <TableCell>{registro.formularioPrelisting}</TableCell>
                                    <TableCell>{registro.acm}</TableCell>
                                    <TableCell>{registro.seguimientoAcm}</TableCell>
                                    <TableCell>{registro.captaciones}</TableCell>
                                    <TableCell>{registro.propiedadesActivas}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}