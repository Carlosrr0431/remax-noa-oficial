"use client"

import * as React from "react"
import { addDays, format, startOfWeek, endOfWeek, isWeekend, eachDayOfInterval, isSameMonth, isToday, isSameDay } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function CalendarioSemanas() {
    const [date, setDate] = React.useState()

    const handleRangeSelect = (range) => {
        if (range?.from) {
            const start = startOfWeek(range.from, { weekStartsOn: 1 })
            const end = range.to ? endOfWeek(range.to, { weekStartsOn: 1 }) : addDays(start, 4)

            const workDays = eachDayOfInterval({ start, end }).filter(day => !isWeekend(day))

            setDate({
                from: workDays[0],
                to: workDays[workDays.length - 1]
            })
        } else {
            setDate(undefined)
        }
    }

    const isDateInRange = (day) => {
        if (date?.from && date?.to) {
            return day >= date.from && day <= date.to && !isWeekend(day)
        }
        return false
    }

    return (
        <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl">

            <CardContent>
                <div className="grid gap-4 mt-[10px]">
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
                        className="rounded-md border border-gray-700"
                        classNames={{
                            day_today: "bg-white text-black font-bold",
                            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
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
                                        !isSameMonth(dayDate, props.displayMonth) && "text-gray-500 opacity-50",
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
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-2">
                {date?.from && date?.to && (
                    <div className="rounded-lg bg-gray-700 p-3 w-full">
                        <CalendarIcon className="mb-2 h-4 w-4 text-primary" />
                        <p className="text-sm font-medium">Rango seleccionado</p>
                        <p className="text-xs text-gray-400">
                            {format(date.from, "PPP", { locale: es })} - {format(date.to, "PPP", { locale: es })}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            {`${Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24) / 7)} semana(s)`}
                        </p>
                    </div>
                )}
                <Button
                    variant="outline"
                    className="w-full mt-2 bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-200"
                    onClick={() => setDate(undefined)}
                >
                    Limpiar selección
                </Button>
            </CardFooter>
        </Card>
    )
}