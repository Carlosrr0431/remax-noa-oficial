"use client"

import { useState, useMemo } from "react"
import { CalendarIcon, Clock } from "lucide-react"
import { format, isSameDay, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



// Días disponibles para entrevistas (ejemplo: próximos 7 días laborables)
const diasDisponibles = [
    "2024-09-21",
    "2024-09-22",
    "2024-09-23",

]

// Horas disponibles para entrevistas
const horasDisponibles = [
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
]

export const ProgramarEntrevista2 = () => {
    const [date, setDate] = useState()
    const [time, setTime] = useState("")

    const diasParsed = useMemo(() => diasDisponibles.map(d => parseISO(d)), [])

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const nombre = formData.get("nombre")
        const email = formData.get("email")
        console.log("Entrevista programada:", { nombre, email, date, time })
        // Aquí puedes agregar la lógica para guardar la entrevista
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white/40 rounded-lg shadow-md mt-[50px]  fixed  z-50  bg-opacity-100 backdrop-blur-sm
        ">
            <h2 className="text-2xl font-bold mb-6 text-center text-black">Programar Entrevista</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="nombre" className="text-black">Nombre y Apellido</Label>
                    <Input id="nombre" name="nombre" className="text-black active:bg-white hover:bg-white font-medium" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-black">Correo electrónico</Label>
                    <Input id="email" name="email" type="email" required className="text-black active:bg-white hover:bg-white font-medium" />
                </div>
                <div className="space-y-2">
                    <Label className="text-black">Fecha de la entrevista</Label>
                    <Popover>
                        <PopoverTrigger asChild className="bg-transparent" >
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal text-black border-black/40",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                disabled={(date) => !diasParsed.some(d => isSameDay(d, date))}
                                initialFocus
                                modifiers={{
                                    available: (date) => diasParsed.some(d => isSameDay(d, date)),
                                }}
                                modifiersClassNames={{
                                    available: "bg-green-100 hover:bg-green-200",

                                }}


                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="space-y-2">
                    <Label className="text-black" htmlFor="time">Hora de la entrevista</Label>
                    <Select onValueChange={setTime} value={time}>
                        <SelectTrigger className="w-full text-black active:bg-white hover:bg-white font-medium">
                            <SelectValue className="text-black" placeholder="Selecciona una hora" />
                        </SelectTrigger>
                        <SelectContent>
                            {horasDisponibles.map((hora) => (
                                <SelectItem key={hora} value={hora}>
                                    {hora}
                                </SelectItem>
                            ))}

                        </SelectContent>

                    </Select>
                </div>
                <Button type="submit" className="w-full" disabled={!date || !time}>
                    Programar Entrevista
                </Button>
            </form>
        </div>
    )
}