"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ArrowDown, ArrowUp, Package } from 'lucide-react';
import { supabaseClient } from '@/supabase/client';




export default function InventoryStats({ refreshTrigger }) {
    const [stats, setStats] = useState({
        totalItems: 0,
        totalValue: 0,
        lowStock: 0,
        reorderNeeded: 0,
    });

    useEffect(() => {

        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("item")
                .select("*")

            const items = data.data

            const calculatedStats = items != null && items.reduce((acc, item) => {
                acc.totalItems += 1;
                acc.totalValue += item.cantidad * item.precioUnitario;

                // if (item.quantity <= item.minStock) {
                //     acc.lowStock += 1;
                // } else if (item.quantity <= item.reorderPoint) {
                //     acc.reorderNeeded += 1;
                // }

                return acc;
            }, {
                totalItems: 0,
                totalValue: 0,
                lowStock: 0,
                reorderNeeded: 0,
            });

            setStats(calculatedStats);

        }

        getSupabaseOficial()



    }, [refreshTrigger]);

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total de Items</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalItems}</div>
                    <p className="text-xs text-muted-foreground">
                        Items en inventario
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
                    <ArrowUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        ${stats.totalValue.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Valor del inventario
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
                    <ArrowDown className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-500">{stats.lowStock}</div>
                    <p className="text-xs text-muted-foreground">
                        Items con stock crítico
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Reorden Necesario</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-yellow-500">{stats.reorderNeeded}</div>
                    <p className="text-xs text-muted-foreground">
                        Items para reordenar
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}