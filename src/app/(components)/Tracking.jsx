"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { addDays, format, startOfWeek, endOfWeek, isWeekend, eachDayOfInterval, isSameMonth, isToday, isSameDay } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { supabaseClient } from "@/supabase/client"
import moment from "moment-timezone";
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { data } from "autoprefixer"
import { actualizarTracking } from "../action"


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
    const [selectedGroup, setSelectedGroup] = useState('')
    const [selectedAgent, setSelectedAgent] = useState(null)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [totalAgente, setTotalAgente] = useState({})
    const [totalGrupo, setTotalGrupo] = useState({})
    const [date, setDate] = useState({
        from: '',
        to: ''
    })
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    const [selectedPeriod, setSelectedPeriod] = useState('weekly')
    const [nuevoRegistro, setNuevoRegistro] = useState({

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




        const channelUsuarios = supabaseClient
            .channel('empleados')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'empleados' }, (payload) => {

                if (payload.eventType == "INSERT") {


                    return setAgents((antContenido) => [payload.new, ...antContenido])


                } else if (payload.eventType == 'UPDATE') {

                    // console.log("agente modificado: " + JSON.stringify(payload.new));

                    // setSelectedAgent(payload.new)
                    // console.log("tabla: " + payload.table);
                    // console.log("fecha: " + date.to + date.from);

                    // return calcularTotalSinPromise(payload.new)

                    return setAgents((antContenido) => antContenido.map((elem) => {
                        if (elem.id == payload.new.id) {
                            elem = payload.new
                        }

                        return elem;
                    }))


                } else if (payload.eventType == 'DELETE') {

                    return setAgents(antContenido => antContenido.filter((elem) => elem.id !== payload.old.id))

                }
            })
            .subscribe()


        return () => {

            supabaseClient.removeChannel(supabaseClient.channel(channelUsuarios))
        }
    }, [])


    const handleInputChange = (campo, valor) => {

        setNuevoRegistro(prev => ({
            ...prev,
            [campo]: valor
        }))
    }

    const handleSubmit = async (e) => {
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

            const tracking = await actualizarTracking(date, nuevoRegistro, selectedAgent.id)

            // console.log("tracking resultado: " + tracking.agentes[0].nombre);

            setAgents(tracking.agentes)

            const agente4 = agents.filter((elem) => elem.nombre == "ejemplo3")
            console.log("AGENTE NOMBRE: " + JSON.stringify(agente4[0].formularios))


            const agente = await supabaseClient.from("empleados").select("*").eq("id", selectedAgent.id);

            calcularTotalSinPromise(agente?.data[0])
            calcularTotalGrupo(selectedGroup, tracking.agentes)

            return tracking
        }

        const track = await getSupabaseOficial()




        setTrackingData([...trackingData, nuevoRegistroConNumeros])
        setNuevoRegistro({

            agentId: selectedAgent.id,
            formularioReferidos: '',
            formularioPrelisting: '',
            acm: '',
            seguimientoAcm: '',
            captaciones: '',
            propiedadesActivas: ''
        })
    }


    const calcularTotalSinPromise = (agente) => {



        const totales = {
            formularioReferidos: 0,
            formularioPrelisting: 0,
            acm: 0,
            seguimientoAcm: 0,
            captaciones: 0,
            propiedadesActivas: 0
        }





        if (date != null && date.from != '' && date.to != '' && agente.formularios != null && agente.formularios?.length != 0) {

            agente.formularios.forEach(item => {

                if (item.fechaInicio == date.from.toLocaleDateString() && item.fechaFin == date.to.toLocaleDateString()) {

                    totales.formularioReferidos += parseInt(item.formularioReferidos) || 0
                    totales.formularioPrelisting += parseInt(item.formularioPrelisting) || 0
                    totales.acm += parseInt(item.acm) || 0
                    totales.seguimientoAcm += parseInt(item.seguimientoAcm) || 0
                    totales.captaciones += parseInt(item.captaciones) || 0
                    totales.propiedadesActivas += parseInt(item.propiedadesActivas) || 0
                }
            })
        }


        setTotalAgente(totales)
        return totales
    }


    const calcularTotalGrupo = (grupoSeleccionado, agentesCalcular, fechaComienzo, fechaFinal) => {


        console.log("ENTRO CALCULAR TOTAL GRUPO" + grupoSeleccionado + "fecha: " + fechaComienzo + fechaFinal);

        let agentes = agentesCalcular.filter(agent => agent.grupo === grupoSeleccionado)

        let totales = {
            formularioReferidos: 0,
            formularioPrelisting: 0,
            acm: 0,
            seguimientoAcm: 0,
            captaciones: 0,
            propiedadesActivas: 0
        }


        {
            agentes.map(registro => {

                {

                    registro.formularios != null && registro.formularios.forEach(item => {

                        if (item.fechaInicio == date?.from?.toLocaleDateString() && item.fechaFin == date?.to?.toLocaleDateString()) {

                            totales.formularioReferidos += parseInt(item.formularioReferidos) || 0
                            totales.formularioPrelisting += parseInt(item.formularioPrelisting) || 0
                            totales.acm += parseInt(item.acm) || 0
                            totales.seguimientoAcm += parseInt(item.seguimientoAcm) || 0
                            totales.captaciones += parseInt(item.captaciones) || 0
                            totales.propiedadesActivas += parseInt(item.propiedadesActivas) || 0

                            setTotalGrupo(totales)

                            return totales
                        }
                    })
                }
            }

            )
        }


        setTotalGrupo(totales)

        return totales;
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

    const handleRangeSelect = (range) => {
        if (range?.from) {
            const start = startOfWeek(range.from, { weekStartsOn: 1 })
            const end = range.to ? endOfWeek(range.to, { weekStartsOn: 1 }) : addDays(start, 4)

            const workDays = eachDayOfInterval({ start, end }).filter(day => !isWeekend(day))

            setDate({
                from: workDays[0],
                to: workDays[workDays.length - 1]
            })

            console.log("total por grupo: " + JSON.stringify(calcularTotalGrupo(selectedGroup, agents, workDays[0], workDays[workDays.length - 1])))


            if (selectedAgent != null) {
                calcularTotalSinPromise(selectedAgent)
            }


        } else {
            setDate(undefined)
        }
        setIsCalendarOpen(false)


    }

    const isDateInRange = (day) => {
        if (date?.from && date?.to) {
            return day >= date.from && day <= date.to && !isWeekend(day)
        }
        return false
    }

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

                            <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-100 to-gray-200 text-white shadow-xl">

                                <CardContent>
                                    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal mt-[20px] text-black",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date?.from ? (
                                                    date.to ? (
                                                        <>
                                                            {format(date.from, "P", { locale: es })} -{" "}
                                                            {format(date.to, "P", { locale: es })}
                                                        </>
                                                    ) : (
                                                        format(date.from, "P", { locale: es })
                                                    )
                                                ) : (
                                                    <span>Selecciona un rango de fechas</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 bg-gray-800" align="start">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={date?.from}
                                                selected={date}
                                                onSelect={handleRangeSelect}
                                                numberOfMonths={1}
                                                locale={es}
                                                weekStartsOn={1}
                                                disabled={(date) => isWeekend(date)}
                                                className="rounded-md border-0"
                                                classNames={{
                                                    day_today: "bg-gray-700 text-black font-bold",
                                                    day_selected: "bg-gray-700 text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                                                    day_outside: "text-gray-500 opacity-50",
                                                }}
                                                components={{
                                                    DayContent: ({ date: dayDate, ...props }) => (
                                                        <div
                                                            {...props}
                                                            className={cn(
                                                                props.className,
                                                                "relative flex h-8 w-8 items-center justify-center p-0 font-normal aria-selected:opacity-100",
                                                                isToday(dayDate) && "text-black font-bold",
                                                                !isSameMonth(dayDate, props.displaymonth) && "text-gray-500 opacity-50",
                                                                isDateInRange(dayDate) && "bg-primary text-primary-foreground"
                                                            )}
                                                        >
                                                            <time dateTime={format(dayDate, "yyyy-MM-dd")}>
                                                                {format(dayDate, "d")}
                                                            </time>
                                                            {isToday(dayDate) && (
                                                                <div className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                                                            )}
                                                        </div>
                                                    ),
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </CardContent>
                                <CardFooter className="flex flex-col items-start space-y-2">

                                    <Button
                                        variant="outline"
                                        className="w-full mt-2 bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-200"
                                        onClick={() => {
                                            setDate(undefined)
                                            setIsCalendarOpen(false)
                                            setSelectedGroup("")
                                            setSelectedAgent(null)
                                            setTotalGrupo({
                                                formularioReferidos: 0,
                                                formularioPrelisting: 0,
                                                acm: 0,
                                                seguimientoAcm: 0,
                                                captaciones: 0,
                                                propiedadesActivas: 0
                                            })
                                        }}
                                    >
                                        Limpiar selección
                                    </Button>
                                </CardFooter>
                            </Card>

                            <div >
                                <div>
                                    <Label htmlFor="grupo">Grupo</Label>
                                    <Select
                                        value={selectedGroup}
                                        onValueChange={(value) => {
                                            setSelectedGroup(value)

                                            console.log("total por grupo: " + JSON.stringify(calcularTotalGrupo(value, agents, date.to, date.from)))
                                        }
                                        }
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

                                <div>
                                    <Label htmlFor="agente">Agente</Label>
                                    <Select
                                        value={selectedAgent?.id.toString() || ''}
                                        onValueChange={(value) => {



                                            const agent = agents.find(a => a.id === parseInt(value))


                                            if (agent) {
                                                setSelectedAgent(agent)
                                                console.log(calcularTotalSinPromise(agent));

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
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {camposTracking.map((campo) => (


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
                            {Object.entries(totalGrupo).map(([key, value]) => (
                                <TableRow key={key}>
                                    <TableCell>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</TableCell>
                                    <TableCell>{value}</TableCell>
                                    {/* <TableCell>{porcentajesGrupo[key].toFixed(2)}%</TableCell> */}
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
                                {Object.entries(totalAgente).map(([key, value]) => (
                                    <TableRow key={key}>
                                        <TableCell>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</TableCell>
                                        <TableCell>{value}</TableCell>
                                        {/* <TableCell>{porcentajesAgente[key].toFixed(2)}%</TableCell> */}
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