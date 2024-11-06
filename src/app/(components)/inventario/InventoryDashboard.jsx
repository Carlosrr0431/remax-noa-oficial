"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, BoxIcon, LineChart, Settings2 } from "lucide-react";
import InventoryList from './InventoryList';
import AddInventoryItem from './AddInventoryItem';
import ProjectionChart from './ProjectionChart';
import InventoryStats from './InventoryStats';

export const InventoryDashboard = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleItemAdded = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="container mx-auto px-4 py-8 overflow-y-scroll w-full h-full">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Control de Inventario RE/MAX NOA</h1>
                    <p className="text-gray-600">Sistema de gestión y proyección de inventario</p>
                </div>
                <Settings2 className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid grid-cols-4 gap-4 bg-white p-1">
                    <TabsTrigger value="overview" className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Vista General
                    </TabsTrigger>
                    <TabsTrigger value="inventory" className="flex items-center gap-2">
                        <BoxIcon className="h-4 w-4" />
                        Inventario
                    </TabsTrigger>
                    <TabsTrigger value="add" className="flex items-center gap-2">
                        <BoxIcon className="h-4 w-4" />
                        Agregar Item
                    </TabsTrigger>
                    <TabsTrigger value="projection" className="flex items-center gap-2">
                        <LineChart className="h-4 w-4" />
                        Proyección
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <InventoryStats refreshTrigger={refreshTrigger} />
                </TabsContent>

                <TabsContent value="inventory">
                    <InventoryList refreshTrigger={refreshTrigger} />
                </TabsContent>

                <TabsContent value="add">
                    <AddInventoryItem onItemAdded={handleItemAdded} />
                </TabsContent>

                <TabsContent value="projection">
                    <ProjectionChart refreshTrigger={refreshTrigger} />
                </TabsContent>
            </Tabs>
        </div>
    );
}