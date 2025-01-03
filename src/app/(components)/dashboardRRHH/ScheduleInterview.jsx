'use client'

import { useState, useMemo, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { format, addDays, isSaturday, isSunday, isAfter, isBefore, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { supabaseClient } from '@/supabase/client'

export default function ScheduleInterview({ onSchedule, setSchedulingUser, userSelect }) {
  const [selectedDate, setSelectedDate] = useState(undefined)
  const [selectedTime, setSelectedTime] = useState(null)
  const [availableSlots, setAvailableSlots] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchAvailableSlots()
  }, [])

  const availableTimeSlots = {
    0: [], // Domingo
    1: ['08:20', '11:00', '11:40', '12:20', '14:00'], // Lunes
    2: ['08:20', '11:00', '11:40', '12:20', '14:00'], // Martes
    3: ['08:20', '09:00', '11:40', '12:20', '14:00'], // Miércoles
    4: ['08:20', '11:00', '11:40', '12:20', '14:00'], // Jueves
    5: ['08:20', '09:00', '11:40', '12:20', '14:00'], // Viernes
    6: [], // Sábado
  }
  const fetchAvailableSlots = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabaseClient
        .from('cuposDisponibles')
        .select('*').eq('segundaEntrevista', true)

      if (error) throw error

      setAvailableSlots(data || [])
    } catch (error) {
      console.error('Error fetching available slots:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getTimeSlots = (date) => {
    const dayOfWeek = date.getDay()
    return availableTimeSlots[dayOfWeek] || []
  }

  const timeSlots = selectedDate ? getTimeSlots(selectedDate) : []

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selectedDate && selectedTime) {
      // alert(`Entrevista programada para ${format(selectedDate, 'dd/MM/yyyy', { locale: es })} a las ${selectedTime}`)
    }

    const datos = {
      dia: format(selectedDate, 'dd/MM/yyyy', { locale: es }),
      hora: selectedTime
    }


    onSchedule(datos)

  }

  const today = startOfDay(addDays(new Date(), 1))

  const availableDates = useMemo(() => {
    const dates = []
    let currentDate = today
    let daysAdded = 0

    while (daysAdded < 7) {
      if (!isSaturday(currentDate) && !isSunday(currentDate)) {
        dates.push(currentDate)
        daysAdded++
      }
      currentDate = addDays(currentDate, 1)
    }

    return dates
  }, [today])

  const isDateDisabled = (date) => {

    let flag = false

    if (userSelect.diaPrimeraEntrevista == format(date, 'dd/MM/yyyy', { locale: es })) {
      flag = true
    }

    return isBefore(date, today) || isAfter(date, availableDates[availableDates.length - 1]) || isSaturday(date) || isSunday(date) || flag
  }







  return (
    <Card className="w-full max-w-md mx-auto h-full sm:max-w-xl relative">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-bold text-center text-primary">Programa tu Entrevista</CardTitle>

        <div className=" px-6 py-4 left-[80%] -top-[10px] text-black absolute">
          <Button variant="outline" onClick={() => setSchedulingUser(false)} >
            Volver
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6 sm:flex sm:space-x-8">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Fecha</label>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={isDateDisabled}
                className="rounded-md border p-3"
                locale={es}
              />
            </div>
          </div>
          {selectedDate && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 sm:bottom-5 relative">Hora</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {timeSlots.map((time) => {

                  let flag = true
                  if (availableSlots.map((item, index) => {

                    if (item.date == format(selectedDate, 'dd/MM/yyyy')) {

                      if (item.time == time) {
                        flag = false

                      }
                    }
                  }))

                    if (flag) {
                      return (
                        <Button
                          key={time}
                          type="button"
                          variant={selectedTime === time ? "default" : "outline"}
                          className={`p-4 text-sm ${selectedTime === time ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      )
                    } else return null
                })}
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={!selectedDate || !selectedTime}
          className="w-full bg-primary hover:bg-primary-dark transition-colors"
        >
          Programar Entrevista
        </Button>
      </CardFooter>
    </Card>
  )
}