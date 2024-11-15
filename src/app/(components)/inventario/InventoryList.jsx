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
import { supabaseClient } from '@/supabase/client';
import { eliminarItem } from '@/app/action';

import { Edit2, Trash2, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function InventoryList({ refreshTrigger }) {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterSector, setFilterSector] = useState('all');
    const [filterCaja, setFilterCaja] = useState('all');
    const [editingItem, setEditingItem] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [tipoSelect, setTipoSelect] = useState("producto")

    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("item")
                .select("*")

            setItems(data.data);
            setFilteredItems(data.data);
        }

        getSupabaseOficial()

        const channelUsuarios = supabaseClient
            .channel('item')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'item' }, (payload) => {

                if (payload.eventType == "INSERT") {
                    return (setItems((antContenido) => [payload.new, ...antContenido]),
                        setFilteredItems((antContenido) => [payload.new, ...antContenido])
                    )

                } else if (payload.eventType == 'UPDATE') {

                    return (setItems((antContenido) => antContenido.map((elem) => {
                        if (elem.id == payload.new.id) {
                            elem = payload.new
                        }

                        return elem;
                    })),
                        setFilteredItems((antContenido) => antContenido.map((elem) => {
                            if (elem.id == payload.new.id) {
                                elem = payload.new
                            }

                            return elem;
                        })))

                } else if (payload.eventType == 'DELETE') {

                    return (setItems(antContenido => antContenido.filter((elem) => elem.id !== payload.old.id)),
                        setFilteredItems(antContenido => antContenido.filter((elem) => elem.id !== payload.old.id)))

                }
            })
            .subscribe()


        return () => {

            supabaseClient.removeChannel(supabaseClient.channel(channelUsuarios))
        }

    }, [refreshTrigger]);

    useEffect(() => {
        let filtered = items;

        if (search) {
            filtered = filtered.filter(item => {
                if (item.nombre != null && item.proveedor != null) {
                    return item.nombre.toLowerCase().includes(search.toLowerCase()) ||
                        item.proveedor.toLowerCase().includes(search.toLowerCase())
                }
            }
            );
        }

        if (filterType !== 'all') {
            filtered = filtered.filter(item => item.tipo === filterType);
        }

        if (filterSector !== 'all') {
            filtered = filtered.filter(item => item.sector === filterSector);
        }


        if (filterCaja !== 'all') {
            filtered = filtered.filter(item => item.caja === filterCaja);
        }

        setFilteredItems(filtered);
    }, [search, filterType, filterSector, items, filterCaja]);

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar este item?')) {
            await eliminarItem(id)
        }
    };


    const handleEdit = (item) => {
        setEditingItem(item);
        setIsEditDialogOpen(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!editingItem) return;

        const formData = new FormData(e.currentTarget);
        const updatedItem = {
            ...editingItem,
            name: formData.get('name'),
            type: formData.get('type'),
            quantity: Number(formData.get('quantity')),
            price: Number(formData.get('price')),
            sector: formData.get('sector'),
            supplier: formData.get('supplier'),
            unit: formData.get('unit'),
            description: formData.get('description'),
            lastUpdated: new Date().toISOString(),
        };

        console.log(updatedItem);



        setIsEditDialogOpen(false);
        setEditingItem(null);


    };


    const handleStringToInt = (value) => {
        console.log(value);

        setTipoSelect((value))
    }

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
                        <SelectItem value="servicio y impuestos">Servicios</SelectItem>
                        <SelectItem value="sueldos">Sueldos</SelectItem>
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

                <Select value={filterCaja} onValueChange={setFilterCaja}>
                    <SelectTrigger className="md:w-1/4">
                        <SelectValue placeholder="Filtrar por caja" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas las cajas</SelectItem>
                        <SelectItem value="1">Caja 1</SelectItem>
                        <SelectItem value="2">Caja 2</SelectItem>
                        <SelectItem value="3">Caja 3</SelectItem>
                        <SelectItem value="4">Caja 4</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Fecha de Registro</TableHead>
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
                                <TableCell className="font-medium">{item.created_at.substr(0, 10).split('-').reverse().join('/')}</TableCell>
                                <TableCell>{item.tipo === 'producto' ? 'Producto' : 'Servicio'}</TableCell>
                                <TableCell>{item.cantidad} {item.unit}</TableCell>
                                <TableCell>{item.precioUnitario}</TableCell>
                                <TableCell>{item.sector}</TableCell>
                                <TableCell>{item.proveedor}</TableCell>
                                <TableCell>{item.caja}</TableCell>

                                <TableCell>
                                    <div className="flex gap-2">

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

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Editar Item</DialogTitle>
                    </DialogHeader>
                    {editingItem && (
                        <form onSubmit={handleEditSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre del Item</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        defaultValue={editingItem.name}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Tipo</Label>
                                    <Select onSelect={(value) => console.log(value)
                                    } onValueChange={handleStringToInt} >

                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione el tipo" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="producto">Producto</SelectItem>
                                            <SelectItem value="servicio y impuestos">Servicio</SelectItem>
                                            <SelectItem value="sueldos">Sueldos</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>


                                <div className={`space-y-2  ${tipoSelect == 'producto' ? 'visible' : 'hidden'}`}>
                                    <Label htmlFor="quantity">Cantidad</Label>
                                    <Input
                                        id="quantity"
                                        name="quantity"
                                        type="number"
                                        defaultValue={editingItem.quantity}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="price">Precio Unitario</Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        defaultValue={editingItem.price}
                                        required
                                    />
                                </div>

                                <div className={`space-y-2  ${tipoSelect == 'producto' ? 'visible' : 'hidden'}`}>
                                    <Label htmlFor="sector">Sector</Label>
                                    <Select name="sector" defaultValue={editingItem.sector}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione un sector" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="baño">Baño</SelectItem>
                                            <SelectItem value="buffet">Buffet</SelectItem>
                                            <SelectItem value="imprenta">Imprenta</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className={`space-y-2  ${tipoSelect == 'producto' ? 'visible' : 'hidden'}`}>
                                    <Label htmlFor="supplier">Proveedor</Label>
                                    <Input
                                        id="supplier"
                                        name="supplier"
                                        defaultValue={editingItem.supplier}
                                        required
                                    />
                                </div>





                                <div className={`space-y-2  ${tipoSelect == 'producto' ? 'visible' : 'hidden'}`}>
                                    <Label htmlFor="unit">Unidad de Medida</Label>
                                    <Select name="unit" id="unit" defaultValue={editingItem.unit}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione unidad" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="unidad">Unidad</SelectItem>
                                            <SelectItem value="pack">Pack</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className={`space-y-2  ${tipoSelect == 'producto' ? 'visible' : 'hidden'}`}>
                                    <Label htmlFor="caja">Caja</Label>
                                    <Select name="caja" id="caja" >

                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione el tipo" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="1">Caja 1</SelectItem>
                                            <SelectItem value="2">Caja 2</SelectItem>
                                            <SelectItem value="3">Caja 3</SelectItem>
                                            <SelectItem value="4">Caja 4</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsEditDialogOpen(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit">
                                    Guardar Cambios
                                </Button>
                            </div>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </Card>
    );
}



























// export default function InventoryList({ refreshTrigger }) {
//     const [items, setItems] = useState([]);
//     const [filteredItems, setFilteredItems] = useState([]);
//     const [search, setSearch] = useState('');
//     const [filterType, setFilterType] = useState('all');
//     const [filterSector, setFilterSector] = useState('all');
//     const [editingItem, setEditingItem] = useState(null);
//     const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//     const { toast } = useToast();

//     useEffect(() => {
//         const storedItems = JSON.parse(localStorage.getItem('inventoryItems') || '[]');
//         setItems(storedItems);
//         setFilteredItems(storedItems);
//     }, [refreshTrigger]);

//     useEffect(() => {
//         let filtered = items;

//         if (search) {
//             filtered = filtered.filter(item =>
//                 item.name.toLowerCase().includes(search.toLowerCase()) ||
//                 item.supplier.toLowerCase().includes(search.toLowerCase())
//             );
//         }

//         if (filterType !== 'all') {
//             filtered = filtered.filter(item => item.type === filterType);
//         }

//         if (filterSector !== 'all') {
//             filtered = filtered.filter(item => item.sector === filterSector);
//         }

//         setFilteredItems(filtered);
//     }, [search, filterType, filterSector, items]);

//     const handleDelete = (id) => {
//         if (window.confirm('¿Está seguro de que desea eliminar este item?')) {
//             const updatedItems = items.filter(item => item.id !== id);
//             localStorage.setItem('inventoryItems', JSON.stringify(updatedItems));
//             setItems(updatedItems);
//             toast({
//                 title: "Item eliminado",
//                 description: "El item ha sido eliminado exitosamente.",
//             });
//         }
//     };

//     const handleEdit = (item) => {
//         setEditingItem(item);
//         setIsEditDialogOpen(true);
//     };

//     const handleEditSubmit = (e) => {
//         e.preventDefault();
//         if (!editingItem) return;

//         const formData = new FormData(e.currentTarget);
//         const updatedItem = {
//             ...editingItem,
//             name: formData.get('name'),
//             type: formData.get('type'),
//             quantity: Number(formData.get('quantity')),
//             price: Number(formData.get('price')),
//             sector: formData.get('sector'),
//             supplier: formData.get('supplier'),
//             minStock: Number(formData.get('minStock')),
//             reorderPoint: Number(formData.get('reorderPoint')),
//             unit: formData.get('unit'),
//             description: formData.get('description'),
//             lastUpdated: new Date().toISOString(),
//         };

//         const updatedItems = items.map(item =>
//             item.id === editingItem.id ? updatedItem : item
//         );

//         localStorage.setItem('inventoryItems', JSON.stringify(updatedItems));
//         setItems(updatedItems);
//         setIsEditDialogOpen(false);
//         setEditingItem(null);

//         toast({
//             title: "Item actualizado",
//             description: "Los cambios han sido guardados exitosamente.",
//         });
//     };

//     return (
//         <Card className="p-6">
//             <div className="flex flex-col md:flex-row gap-4 mb-6">
//                 <Input
//                     placeholder="Buscar por nombre o proveedor..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="md:w-1/3"
//                 />
//                 <Select value={filterType} onValueChange={setFilterType}>
//                     <SelectTrigger className="md:w-1/4">
//                         <SelectValue placeholder="Filtrar por tipo" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectItem value="all">Todos los tipos</SelectItem>
//                         <SelectItem value="product">Productos</SelectItem>
//                         <SelectItem value="service">Servicios</SelectItem>
//                     </SelectContent>
//                 </Select>
//                 <Select value={filterSector} onValueChange={setFilterSector}>
//                     <SelectTrigger className="md:w-1/4">
//                         <SelectValue placeholder="Filtrar por sector" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectItem value="all">Todos los sectores</SelectItem>
//                         <SelectItem value="production">Producción</SelectItem>
//                         <SelectItem value="sales">Ventas</SelectItem>
//                         <SelectItem value="logistics">Logística</SelectItem>
//                         <SelectItem value="administration">Administración</SelectItem>
//                         <SelectItem value="maintenance">Mantenimiento</SelectItem>
//                     </SelectContent>
//                 </Select>
//             </div>

//             <div className="rounded-md border">
//                 <Table>
//                     <TableHeader>
//                         <TableRow>
//                             <TableHead>Nombre</TableHead>
//                             <TableHead>Tipo</TableHead>
//                             <TableHead>Cantidad</TableHead>
//                             <TableHead>Precio</TableHead>
//                             <TableHead>Sector</TableHead>
//                             <TableHead>Proveedor</TableHead>
//                             <TableHead>Estado</TableHead>
//                             <TableHead>Acciones</TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {filteredItems.map((item) => (
//                             <TableRow key={item.id}>
//                                 <TableCell className="font-medium">{item.name}</TableCell>
//                                 <TableCell>{item.type === 'product' ? 'Producto' : 'Servicio'}</TableCell>
//                                 <TableCell>{item.quantity} {item.unit}</TableCell>
//                                 <TableCell>${item.price.toFixed(2)}</TableCell>
//                                 <TableCell>{item.sector}</TableCell>
//                                 <TableCell>{item.supplier}</TableCell>
//                                 <TableCell>
//                                     {item.quantity <= item.minStock ? (
//                                         <span className="text-red-500 font-medium">Stock Bajo</span>
//                                     ) : item.quantity <= item.reorderPoint ? (
//                                         <span className="text-yellow-500 font-medium">Reordenar</span>
//                                     ) : (
//                                         <span className="text-green-500 font-medium">OK</span>
//                                     )}
//                                 </TableCell>
//                                 <TableCell>
//                                     <div className="flex gap-2">
//                                         <Button
//                                             variant="ghost"
//                                             size="icon"
//                                             onClick={() => handleEdit(item)}
//                                         >
//                                             <Edit2 className="h-4 w-4" />
//                                         </Button>
//                                         <Button
//                                             variant="ghost"
//                                             size="icon"
//                                             onClick={() => handleDelete(item.id)}
//                                         >
//                                             <Trash2 className="h-4 w-4" />
//                                         </Button>
//                                     </div>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </div>

//             <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//                 <DialogContent className="max-w-2xl">
//                     <DialogHeader>
//                         <DialogTitle>Editar Item</DialogTitle>
//                     </DialogHeader>
//                     {editingItem && (
//                         <form onSubmit={handleEditSubmit} className="space-y-6">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div className="space-y-2">
//                                     <Label htmlFor="name">Nombre del Item</Label>
//                                     <Input
//                                         id="name"
//                                         name="name"
//                                         defaultValue={editingItem.name}
//                                         required
//                                     />
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label>Tipo</Label>
//                                     <RadioGroup
//                                         name="type"
//                                         defaultValue={editingItem.type}
//                                         className="flex gap-4"
//                                     >
//                                         <div className="flex items-center space-x-2">
//                                             <RadioGroupItem value="product" id="edit-product" />
//                                             <Label htmlFor="edit-product">Producto</Label>
//                                         </div>
//                                         <div className="flex items-center space-x-2">
//                                             <RadioGroupItem value="service" id="edit-service" />
//                                             <Label htmlFor="edit-service">Servicio</Label>
//                                         </div>
//                                     </RadioGroup>
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="quantity">Cantidad</Label>
//                                     <Input
//                                         id="quantity"
//                                         name="quantity"
//                                         type="number"
//                                         defaultValue={editingItem.quantity}
//                                         required
//                                     />
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="price">Precio Unitario</Label>
//                                     <Input
//                                         id="price"
//                                         name="price"
//                                         type="number"
//                                         step="0.01"
//                                         defaultValue={editingItem.price}
//                                         required
//                                     />
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="sector">Sector</Label>
//                                     <Select name="sector" defaultValue={editingItem.sector}>
//                                         <SelectTrigger>
//                                             <SelectValue placeholder="Seleccione un sector" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             <SelectItem value="production">Producción</SelectItem>
//                                             <SelectItem value="sales">Ventas</SelectItem>
//                                             <SelectItem value="logistics">Logística</SelectItem>
//                                             <SelectItem value="administration">Administración</SelectItem>
//                                             <SelectItem value="maintenance">Mantenimiento</SelectItem>
//                                         </SelectContent>
//                                     </Select>
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="supplier">Proveedor</Label>
//                                     <Input
//                                         id="supplier"
//                                         name="supplier"
//                                         defaultValue={editingItem.supplier}
//                                         required
//                                     />
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="minStock">Stock Mínimo</Label>
//                                     <Input
//                                         id="minStock"
//                                         name="minStock"
//                                         type="number"
//                                         defaultValue={editingItem.minStock}
//                                         required
//                                     />
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="reorderPoint">Punto de Reorden</Label>
//                                     <Input
//                                         id="reorderPoint"
//                                         name="reorderPoint"
//                                         type="number"
//                                         defaultValue={editingItem.reorderPoint}
//                                         required
//                                     />
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="unit">Unidad de Medida</Label>
//                                     <Select name="unit" defaultValue={editingItem.unit}>
//                                         <SelectTrigger>
//                                             <SelectValue placeholder="Seleccione unidad" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             <SelectItem value="units">Unidades</SelectItem>
//                                             <SelectItem value="kg">Kilogramos</SelectItem>
//                                             <SelectItem value="liters">Litros</SelectItem>
//                                             <SelectItem value="meters">Metros</SelectItem>
//                                             <SelectItem value="hours">Horas</SelectItem>
//                                         </SelectContent>
//                                     </Select>
//                                 </div>
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="description">Descripción</Label>
//                                 <Textarea
//                                     id="description"
//                                     name="description"
//                                     defaultValue={editingItem.description}
//                                 />
//                             </div>

//                             <div className="flex justify-end gap-4">
//                                 <Button
//                                     type="button"
//                                     variant="outline"
//                                     onClick={() => setIsEditDialogOpen(false)}
//                                 >
//                                     Cancelar
//                                 </Button>
//                                 <Button type="submit">
//                                     Guardar Cambios
//                                 </Button>
//                             </div>
//                         </form>
//                     )}
//                 </DialogContent>
//             </Dialog>
//         </Card>
//     );
// }