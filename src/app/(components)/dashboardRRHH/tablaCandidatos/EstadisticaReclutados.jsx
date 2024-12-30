'use client'

import { useState } from 'react'
import { format, isValid, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getWorkWeekRange, isWorkingDay, moveWorkWeek } from './date-utils'
import { getInterviewStatsBySource, getRecruitmentStats, recruits } from './data'

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const colorPalette = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'
]

const sources = ['LinkedIn', 'Indeed', 'Referral', 'Company Website', 'Job Fair'];

export default function EstadisticaReclutados() {
  const [dateRange, setDateRange] = useState(() => getWorkWeekRange(new Date()))

  const [selectedMonth, setSelectedMonth] = useState(null)

  const handleMonthSelect = (month) => {
    const currentYear = new Date().getFullYear()
    const monthIndex = months.indexOf(month)
    if (monthIndex !== -1) {
      const newDate = new Date(currentYear, monthIndex, 1)
      setDateRange(getWorkWeekRange(newDate))
      setSelectedMonth(month)
    }
  }

  const moveWeek = (direction) => {
    const newDate = moveWorkWeek(dateRange.from, direction)
    setDateRange(getWorkWeekRange(newDate))
    setSelectedMonth(null)
  }

  const handleDateSelect = (date) => {
    if (date && isValid(date)) {
      setDateRange(getWorkWeekRange(date))
      setSelectedMonth(null)
    }
  }

  const recruitmentStats = getRecruitmentStats(dateRange.from, dateRange.to)
  const interviewStats = getInterviewStatsBySource(dateRange.from, dateRange.to)

  return (
    <div className="container mx-auto p-6 space-y-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Dashboard de Reclutamiento</h1>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Filtros de Tiempo (Días Hábiles)</CardTitle>
          <CardDescription>Selecciona un rango de fechas, navega por semanas laborales o elige un mes específico</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={() => moveWeek('backward')}>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(dateRange.from, "dd MMM", { locale: es })} -{" "}
                  {format(dateRange.to, "dd MMM, yyyy", { locale: es })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateRange.from}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button variant="outline" size="icon" onClick={() => moveWeek('forward')}>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
          <Select onValueChange={handleMonthSelect} value={selectedMonth || undefined}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar mes" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Estadísticas de Reclutamiento</CardTitle>
            <CardDescription>Cantidad de reclutados por fuente (días hábiles)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={recruitmentStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Cantidad de reclutados" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Estadísticas de Entrevistas por Fuente</CardTitle>
            <CardDescription>Comparación de fuentes de reclutamiento en cada etapa de entrevista (días hábiles)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={interviewStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                {sources.map((source, index) => (
                  <Bar key={source} dataKey={source} fill={colorPalette[index % colorPalette.length]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Detalles de Reclutados</CardTitle>
          <CardDescription>Lista de candidatos en el período seleccionado (días hábiles)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Fuente</TableHead>
                  <TableHead>Fecha de Aplicación</TableHead>
                  <TableHead>Estado de Entrevista</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recruits
                  .filter(
                    (recruit) =>
                      isValid(recruit.applicationDate) &&
                      recruit.applicationDate >= dateRange.from &&
                      recruit.applicationDate <= dateRange.to &&
                      isWorkingDay(recruit.applicationDate)
                  )
                  .map((recruit) => (
                    <TableRow key={recruit.id}>
                      <TableCell className="font-medium">{recruit.name}</TableCell>
                      <TableCell>{recruit.source}</TableCell>
                      <TableCell>
                        {format(recruit.applicationDate, 'dd/MM/yyyy')}
                      </TableCell>
                      <TableCell>{recruit.interviewStatus}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
