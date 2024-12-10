'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export default function Estadistica() {
    // En una aplicación real, estos datos vendrían de una API
    const monthlyData = [
        { name: "Ene", total: 1200 },
        { name: "Feb", total: 1800 },
        { name: "Mar", total: 2200 },
        { name: "Abr", total: 2600 },
        { name: "May", total: 3200 },
        { name: "Jun", total: 3800 },
        { name: "Jul", total: 4200 },
    ]

    const propertyTypeData = [
        { name: "Casas", total: 4500 },
        { name: "Apartamentos", total: 3200 },
        { name: "Terrenos", total: 2100 },
        { name: "Oficinas", total: 1800 },
        { name: "Locales", total: 1500 },
    ]

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Estadísticas</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Visitas Mensuales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Bar dataKey="total" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Propiedades por Tipo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={propertyTypeData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Bar dataKey="total" fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

