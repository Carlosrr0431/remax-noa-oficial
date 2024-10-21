"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"


const camposTracking = [
    'Formulario de Referidos',
    'Formulario Prelisting',
    'ACM',
    'Seguimiento ACM',
    'Captaciones',
    'Propiedades Activas'
]

const agentsMock = [
    { id: 1, name: "Juan Pérez", group: "Juniors" },
    { id: 2, name: "María García", group: "Rookies" },
    { id: 3, name: "Carlos López", group: "Juniors" },
    { id: 4, name: "Ana Martínez", group: "Rookies" },
]

export default function Tracking() {
    const [trackingData, setTrackingData] = useState([])
    const [agents] = useState(agentsMock)
    const [selectedGroup, setSelectedGroup] = useState('Juniors')
    const [selectedAgent, setSelectedAgent] = useState(null)
    const [nuevoRegistro, setNuevoRegistro] = useState({
        semana: '',
        agentId: 0,
        formularioReferidos: '',
        formularioPrelisting: '',
        acm: '',
        seguimientoAcm: '',
        captaciones: '',
        propiedadesActivas: ''
    })

    useEffect(() => {
        if (agents.length > 0 && selectedGroup) {
            const firstAgentOfGroup = agents.find(agent => agent.group === selectedGroup)
            if (firstAgentOfGroup) {
                setSelectedAgent(firstAgentOfGroup)
                setNuevoRegistro(prev => ({ ...prev, agentId: firstAgentOfGroup.id }))
            }
        }
    }, [selectedGroup, agents])

    const handleInputChange = (campo, valor) => {

        console.log("campo: " + campo + "valor: " + valor);
        
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
        setTrackingData([...trackingData, nuevoRegistroConNumeros])
        setNuevoRegistro({
            semana: '',
            agentId: selectedAgent.id,
            formularioReferidos: '',
            formularioPrelisting: '',
            acm: '',
            seguimientoAcm: '',
            captaciones: '',
            propiedadesActivas: ''
        })
    }

    const calcularTotales = () => {
        const totales = {
            formularioReferidos: 0,
            formularioPrelisting: 0,
            acm: 0,
            seguimientoAcm: 0,
            captaciones: 0,
            propiedadesActivas: 0
        }

        trackingData.forEach(registro => {
            console.log("registro: " + registro);
            
            totales.formularioReferidos += parseInt(registro.formularioReferidos) || 0
            totales.formularioPrelisting += parseInt(registro.formularioPrelisting) || 0
            totales.acm += parseInt(registro.acm) || 0
            totales.seguimientoAcm += parseInt(registro.seguimientoAcm) || 0
            totales.captaciones += parseInt(registro.captaciones) || 0
            totales.propiedadesActivas += parseInt(registro.propiedadesActivas) || 0
        })

        return totales
    }

    const calcularPorcentajes = (totales) => {
        const total = Object.values(totales).reduce((sum, value) => sum + value, 0)
        return Object.entries(totales).reduce((acc, [key, value]) => {
            acc[key] = total > 0 ? (value / total) * 100 : 0
            return acc
        }, {})
    }

    const totales = calcularTotales()
    const porcentajes = calcularPorcentajes(totales)

    const getWeekOptions = () => {
        const options = []
        const currentDate = new Date()
        currentDate.setDate(currentDate.getDate() - (currentDate.getDay() + 6) % 7) // Set to previous Monday

        for (let i = 0; i < 52; i++) {
            const weekStart = new Date(currentDate)
            weekStart.setDate(weekStart.getDate() + i * 7)
            const weekEnd = new Date(weekStart)
            weekEnd.setDate(weekEnd.getDate() + 4) // Friday

            const weekString = `${weekStart.toISOString().slice(0, 10)} al ${weekEnd.toISOString().slice(0, 10)}`
            options.push(
                <option key={i} value={weekString}>
                    {weekString}
                </option>
            )
        }
        return options
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Tracking Semanal</h1>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Nuevo Registro</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="semana">Semana</Label>
                                <Select
                                    value={nuevoRegistro.semana}
                                    onValueChange={(value) => handleInputChange('semana', value)}
                                >
                                    <SelectTrigger id="semana">
                                        <SelectValue placeholder="Selecciona una semana" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getWeekOptions()}
                                    </SelectContent>
                                </Select>
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
                                        .filter(agent => agent.group === selectedGroup)
                                        .map(agent => (
                                            <SelectItem key={agent.id} value={agent.id.toString()}>
                                                {agent.name}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {camposTracking.map((campo) => (
                                <div key={campo}>
                                    <Label htmlFor={campo}>{campo}</Label>
                                    <Input
                                        id={campo}
                                        type="number"
                                        min="0"
                                        value={nuevoRegistro[campo.toLowerCase().replace(/ /g, '')]}
                                        onChange={(e) => handleInputChange(campo.toLowerCase().replace(/ /g, ''), e.target.value)}
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                        <Button type="submit">Agregar Registro</Button>
                    </form>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Resumen</CardTitle>
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
                            {Object.entries(totales).map(([key, value]) => (
                                <TableRow key={key}>
                                    <TableCell>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</TableCell>
                                    <TableCell>{value}</TableCell>
                                    <TableCell>{porcentajes[key].toFixed(2)}%</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

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
                            {trackingData.map((registro) => (
                                <TableRow key={registro.id}>
                                    <TableCell>{registro.semana}</TableCell>
                                    <TableCell>{agents.find(a => a.id === registro.agentId)?.name}</TableCell>
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