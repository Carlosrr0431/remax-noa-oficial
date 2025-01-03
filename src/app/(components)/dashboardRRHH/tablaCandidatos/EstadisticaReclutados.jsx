'use client'

import { useState, useEffect } from 'react'
import { format, isValid, parse } from 'date-fns'
import { es } from 'date-fns/locale'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell } from 'recharts'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, Users, BarChart3, UserPlus } from 'lucide-react'

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
import { getRecruitmentStats, getInterviewStatsBySource, getRecruits, Recruit, RecruitmentSource, InterviewStatsBySource } from './data'
import { getWorkWeekRange, moveWorkWeek, getMonthRange } from './date-utils'

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const colorPalette = [
  '#3498db', '#2ecc71', '#f1c40f', '#e74c3c', '#9b59b6', '#1abc9c', '#f39c12', '#d35400'
]

const sources = ['Redes', 'Empleo12', 'CompuTrabajo', 'Referidos', 'LinkedIn']

export default function Dashboard() {
  const [dateRange, setDateRange] = useState(() => {
    const today = format(new Date(), 'dd/MM/yyyy')
    return getWorkWeekRange(today)
  })
  const [selectedMonth, setSelectedMonth] = useState(null)
  const [isMonthView, setIsMonthView] = useState(false)
  const [recruitmentStats, setRecruitmentStats] = useState([])
  const [interviewStats, setInterviewStats] = useState([])
  const [recruits, setRecruits] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const recruitmentStatsData = await getRecruitmentStats(dateRange.from, dateRange.to)
      const interviewStatsData = await getInterviewStatsBySource(dateRange.from, dateRange.to)
      const recruitsData = await getRecruits(dateRange.from, dateRange.to, isMonthView)

      setRecruitmentStats(recruitmentStatsData)
      setInterviewStats(interviewStatsData)
      setRecruits(recruitsData)
    }

    fetchData()
  }, [dateRange, isMonthView])

  const handleMonthSelect = (month) => {
    const currentYear = new Date().getFullYear()
    const monthIndex = months.indexOf(month)
    if (monthIndex !== -1) {
      const { from, to } = getMonthRange(currentYear, monthIndex)
      setDateRange({ from, to })
      setSelectedMonth(month)
      setIsMonthView(true)
    }
  }

  const moveWeek = (direction) => {
    const newDate = moveWorkWeek(dateRange.from, direction)
    setDateRange(getWorkWeekRange(newDate))
    setSelectedMonth(null)
    setIsMonthView(false)
  }

  const handleDateSelect = (date) => {
    if (date && isValid(date)) {
      const dateString = format(date, 'dd/MM/yyyy')
      setDateRange(getWorkWeekRange(dateString))
      setSelectedMonth(null)
      setIsMonthView(false)
    }
  }

  const totalRecruits = interviewStats.find(stat => stat.status === 'Pasó 3')
    ? Object.entries(interviewStats.find(stat => stat.status === 'Pasó 3'))
      .filter(([key, value]) => key !== 'status' && typeof value === 'number')
      .reduce((sum, [_, value]) => sum + (value), 0)
    : 0

  const totalInterviews = interviewStats.reduce((sum, stat) => {
    if (['Pasó 1', 'Pasó 2', 'Pasó 3'].includes(stat.status)) {
      return sum + Object.entries(stat)
        .filter(([key, value]) => key !== 'status' && typeof value === 'number')
        .reduce((innerSum, [_, value]) => innerSum + (value), 0)
    }
    return sum
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-6 space-y-8">


        <Card className="shadow-lg border-t-4 border-blue-500">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-blue-500" />
              Filtros de Tiempo
            </CardTitle>
            <CardDescription>
              {isMonthView
                ? "Mostrando datos para el mes completo"
                : "Selecciona un rango de fechas, navega por semanas laborales o elige un mes específico"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={() => moveWeek('backward')} disabled={isMonthView}>
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from} - {dateRange.to}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={parse(dateRange.from, 'dd/MM/yyyy', new Date())}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button variant="outline" size="icon" onClick={() => moveWeek('forward')} disabled={isMonthView}>
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

        <div className="grid gap-6 md:grid-cols-3">

          <Card className="shadow-lg border-t-4 border-yellow-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Entrevistas</CardTitle>
              <UserPlus className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalInterviews}</div>
              <p className="text-xs text-muted-foreground">
                que pasaron entrevistas 1, 2 o 3
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-t-4 border-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reclutados</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRecruits}</div>
              <p className="text-xs text-muted-foreground">
                que pasaron la entrevista 3
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-t-4 border-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fuente Principal</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recruitmentStats[0]?.name}</div>
              <p className="text-xs text-muted-foreground">
                {recruitmentStats[0]?.count} candidatos
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-1">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-blue-500" />
                Estadísticas de Reclutamiento
              </CardTitle>
              <CardDescription>Cantidad de reclutados por fuente</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={recruitmentStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#3498db" name="Cantidad de reclutados">
                    {recruitmentStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colorPalette[index % colorPalette.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="h-6 w-6 text-green-500" />
                Estadísticas de Entrevistas por Fuente
              </CardTitle>
              <CardDescription>Comparación de fuentes de reclutamiento en cada etapa de entrevista</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
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
            <CardTitle className="text-2xl flex items-center gap-2">
              <Users className="h-6 w-6 text-purple-500" />
              Detalles de Reclutados
            </CardTitle>
            <CardDescription>Lista de candidatos en el período seleccionado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Nombre</TableHead>
                    <TableHead>Fuente</TableHead>
                    <TableHead>Fecha de Aplicación</TableHead>
                    <TableHead>Estado de Entrevista</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recruits.map((recruit, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-black">{recruit.nombre}</TableCell>
                      <TableCell className="text-black">{recruit.fuente}</TableCell>
                      <TableCell className="text-black">
                        {recruit.diaPrimeraEntrevista}
                      </TableCell>
                      <TableCell className="text-black">{recruit.interviewStatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}



