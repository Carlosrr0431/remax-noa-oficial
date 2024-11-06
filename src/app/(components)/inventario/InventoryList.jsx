"use client";

import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Edit2, Trash2 } from "lucide-react";
import { supabaseClient } from '@/supabase/client';


export default function InventoryList({ refreshTrigger }) {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterSector, setFilterSector] = useState('all');

    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("item")
                .select("*")

            setItems(data.data);
            setFilteredItems(data.data);
        }

        getSupabaseOficial()


    }, [refreshTrigger]);

    useEffect(() => {
        let filtered = items;

        if (search) {
            filtered = filtered.filter(item =>
                item.nombre.toLowerCase().includes(search.toLowerCase()) ||
                item.proveedor.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (filterType !== 'all') {
            filtered = filtered.filter(item => item.tipo === filterType);
        }

        if (filterSector !== 'all') {
            filtered = filtered.filter(item => item.sector === filterSector);
        }

        setFilteredItems(filtered);
    }, [search, filterType, filterSector, items]);

    const handleDelete = (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar este item?')) {
            const updatedItems = items.filter(item => item.id !== id);
            localStorage.setItem('inventoryItems', JSON.stringify(updatedItems));
            setItems(updatedItems);
        }
    };

    return (
        <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                    placeholder="Buscar por nombre o proveedor..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="md:w-1/3"
                />
                <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="md:w-1/4">
                        <SelectValue placeholder="Filtrar por tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los tipos</SelectItem>
                        <SelectItem value="producto">Productos</SelectItem>
                        <SelectItem value="servicio">Servicios</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={filterSector} onValueChange={setFilterSector}>
                    <SelectTrigger className="md:w-1/4">
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

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Cantidad</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Sector</TableHead>
                            <TableHead>Proveedor</TableHead>
                            <TableHead>Caja</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredItems != null && filteredItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.nombre}</TableCell>
                                <TableCell>{item.tipo === 'producto' ? 'Producto' : 'Servicio'}</TableCell>
                                <TableCell>{item.cantidad} {item.unit}</TableCell>
                                <TableCell>${item.precioUnitario.toFixed(2)}</TableCell>
                                <TableCell>{item.sector}</TableCell>
                                <TableCell>{item.proveedor}</TableCell>
                                <TableCell>{item.caja}</TableCell>
                                {/* <TableCell>
                                    {item.cantidad <= item.minStock ? (
                                        <span className="text-red-500 font-medium">Stock Bajo</span>
                                    ) : item.quantity <= item.reorderPoint ? (
                                        <span className="text-yellow-500 font-medium">Reordenar</span>
                                    ) : (
                                        <span className="text-green-500 font-medium">OK</span>
                                    )}
                                </TableCell> */}
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon">
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}