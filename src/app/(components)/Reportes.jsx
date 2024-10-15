"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
    { departamento: 'TI', empleados: 20, contrataciones: 5, evaluacionPromedio: 85 },
    { departamento: 'Marketing', empleados: 15, contrataciones: 3, evaluacionPromedio: 88 },
    { departamento: 'Ventas', empleados: 25, contrataciones: 7, evaluacionPromedio: 82 },
    { departamento: 'RRHH', empleados: 10, contrataciones: 2, evaluacionPromedio: 90 },
    { departamento: 'Finanzas', empleados: 12, contrataciones: 1, evaluacionPromedio: 87 },
]

export default function Reportes() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Reportes y Estadísticas</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Total de Empleados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-black">{data.reduce((sum, item) => sum + item.empleados, 0)}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Contrataciones Recientes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-black">{data.reduce((sum, item) => sum + item.contrataciones, 0)}</p>
                    </CardContent>
                </Card>
            </div>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Distribución de Empleados por Departamento</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="departamento" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="empleados" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Evaluación Promedio por Departamento</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="departamento" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="evaluacionPromedio" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}