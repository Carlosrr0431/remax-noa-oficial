"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabaseClient } from '@/supabase/client';
import { ChartView } from './ChartView';
import { TableView } from './TableView';


export default function ProjectionChart({ refreshTrigger }) {
    const [items, setItems] = useState([]);
    const [selectedSector, setSelectedSector] = useState('all');
    const [projectionData, setProjectionData] = useState([]);

    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("item")
                .select("*")




            setItems(data.data);

        }

        getSupabaseOficial()

        calculateProjections(items, selectedSector);
    }, [refreshTrigger, selectedSector]);

    const calculateProjections = (items, sector) => {
        const filteredItems = sector === 'all'
            ? items
            : items.filter(item => item.sector === sector);

        const projections = filteredItems.map(item => {
            const currentStock = item.cantidad;
            const minimumRequired = item.minStock;
            const reorderPoint = item.reorderPoint;

            const projected = currentStock <= reorderPoint
                ? reorderPoint - currentStock + minimumRequired
                : 0;

            return {
                name: item.nombre,
                actual: currentStock,
                projected: projected,
                difference: projected - currentStock,
                price: item.precioUnitario * projected
            };
        })
            .filter(item => item.projected > 0)
            .sort((a, b) => b.projected - a.projected);

        setProjectionData(projections);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Proyección de Compras Mensuales</CardTitle>
                    <CardDescription>
                        Análisis de necesidades de compra basado en niveles de inventario actuales
                    </CardDescription>
                    <div className="mt-4">
                        <Select value={selectedSector} onValueChange={setSelectedSector}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Filtrar por sector" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los sectores</SelectItem>
                                <SelectItem value="baño">Baño</SelectItem>
                                <SelectItem value="buffet">Buffet</SelectItem>
                                <SelectItem value="imprenta">Imprenta</SelectItem>

                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="chart" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="chart">Gráfico</TabsTrigger>
                            <TabsTrigger value="table">Tabla</TabsTrigger>
                        </TabsList>

                        <TabsContent value="chart">
                            <ChartView data={projectionData} />
                        </TabsContent>

                        <TabsContent value="table">
                            <TableView data={projectionData} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};