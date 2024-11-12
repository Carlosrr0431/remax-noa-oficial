"use client"

import { useState, useMemo, useEffect } from 'react'
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { startOfMonth, endOfMonth } from 'date-fns'
import { es } from 'date-fns/locale'
import { supabaseClient } from '@/supabase/client'


const años = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i)
const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]


export default function GraficoCostosPorTipo() {
    const [año, setAño] = useState(new Date().getFullYear())
    const [mes, setMes] = useState("")
    const [items, setItems] = useState([]);
    const [datos, setDatos] = useState([{
        tipo: "Sueldos",
        total: 0
    },

    {
        tipo: "Servicios",
        total: 0
    },

    {
        tipo: "Productos",
        total: 0
    }

    ])

    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("item")
                .select("*")

            setItems(data.data);
        }

        getSupabaseOficial().then(() => actualizarGrafica())


        // if (items.length != 0 && año != undefined && mes != undefined)
        //     actualizarGrafica()

    }, []);

    // useEffect(() => {
    //     console.log("fecha: " + new Date(items[0]?.created_at))
    // }, [items])


    useEffect(() => {

        if (items.length != 0 && año != undefined && mes != undefined)
            actualizarGrafica()

    }, [año, mes])




    const actualizarGrafica = () => {
        const fechaInicio = startOfMonth(new Date(año, mes))
        const fechaFin = endOfMonth(fechaInicio)






        const itemsDelMes = items.filter(item =>

            new Date(item?.created_at) >= fechaInicio && new Date(item?.created_at) <= fechaFin
        )

        const totales = {
            Sueldos: 0,
            Servicios: 0,
            Productos: 0
        }

        itemsDelMes.forEach(item => {

            const cantidad = (item.cantidad).replace(/\./g, '').replace(/\$/g, '').replace(/[^0-9\.]/g, '')
            const precio = (item.precioUnitario).replace(/\./g, '').replace(/\$/g, '').replace(/[^0-9\.]/g, '')

            console.log("costo: " + parseInt(cantidad) * parseInt(precio));

            const costo = parseInt(cantidad) * parseInt(precio);

            console.log("tipo de dato: " + typeof (totales.Sueldos));


            switch (item.tipo) {
                case 'sueldo':
                    totales.Sueldos += costo;
                    console.log("total sueldo: " + totales.Sueldos);

                    break;
                case 'servicio y impuestos':
                    totales.Servicios += costo;
                    console.log("total servicio: " + totales.Servicios);
                    break;
                case 'producto':
                    totales.Productos += costo;
                    console.log("total producto: " + totales.Productos);
                    break;
            }
        })

        const nuevaGrafica = Object.entries(totales).map(([tipo, total]) => ({ tipo, total }))

        setDatos(nuevaGrafica)

    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Gráfico de Costos por Tipo</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between mb-4">
                    <Select value={año.toString()} onValueChange={(value) => setAño(parseInt(value))}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Seleccionar año" />
                        </SelectTrigger>
                        <SelectContent>
                            {años.map((a) => (
                                <SelectItem key={a} value={a.toString()}>{a}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={mes.toString()} onValueChange={(value) => {
                        setMes(parseInt(value)),
                            actualizarGrafica(parseInt(value))
                    }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Seleccionar mes" />
                        </SelectTrigger>
                        <SelectContent>
                            {meses.map((m, index) => (
                                <SelectItem key={index} value={index.toString()}>{m}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <ChartContainer
                    config={{
                        Sueldos: {
                            label: "Sueldos",
                            color: "hsl(var(--chart-1))",
                        },
                        Servicios: {
                            label: "Servicios",
                            color: "hsl(var(--chart-2))",
                        },
                        Productos: {
                            label: "Productos",
                            color: "hsl(var(--chart-3))",
                        },
                    }}
                    className="h-[400px]"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={datos}>
                            <XAxis dataKey="tipo" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar
                                dataKey="total"
                                fill="hsl(var(--chart-1))"
                                shape={props => {
                                    const { x, y, width, height, tipo } = props;
                                    let fill;
                                    switch (tipo) {
                                        case 'Sueldos':
                                            fill = "hsl(var(--chart-1))";
                                            break;
                                        case 'Servicios':
                                            fill = "hsl(var(--chart-2))";
                                            break;
                                        case 'Productos':
                                            fill = "hsl(var(--chart-3))";
                                            break;
                                        default:
                                            fill = "hsl(var(--chart-1))";
                                    }
                                    return <rect x={x} y={y} width={width} height={height} fill={fill} />;
                                }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}