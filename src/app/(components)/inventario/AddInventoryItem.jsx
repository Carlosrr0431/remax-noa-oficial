'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ComboBox } from './combobox'
import { guardarItem } from '@/app/action'


const sectoresEmpresa = [
    "Ventas",
    "Marketing",
    "Finanzas",
    "Recursos Humanos",
    "Producción",
    "Tecnología",
    "Logística",
    "Atención al Cliente",
    "Investigación y Desarrollo",
    "Administración"
]



const formSchema = z.object({
    nombre: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres.",
    }),
    tipo: z.enum(["producto", "servicio"], {
        required_error: "Debes seleccionar un tipo.",
    }),
    cantidad: z.coerce.number().min(0, {
        message: "La cantidad no puede ser negativa.",
    }),
    precioUnitario: z.coerce.number().min(0, {
        message: "El precio no puede ser negativo.",
    }),
    sector: z.enum(["baño", "buffet", "imprenta"], {
        required_error: "Debes seleccionar un tipo.",
    }),
    caja: z.enum(["caja1", "caja2", "caja3", "caja4"], {
        required_error: "Debes seleccionar un tipo.",
    }),
    proveedor: z.string().min(2, {
        message: "El proveedor debe tener al menos 2 caracteres.",
    }),
    unidadMedida: z.enum(["pack", "unidad"], {
        required_error: "Debes seleccionar un tipo.",
    }),
    descripcion: z.string().max(500, {
        message: "La descripción no puede exceder los 500 caracteres.",
    }),
    fechaVencimiento: z.string().optional(),
})

export default function InventarioForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [nombreItem, setNombreItem] = useState("")
    const [itemsExistentes, setItemsExistentes] = useState([
        { value: "laptop", label: "Laptop" },
        { value: "monitor", label: "Monitor" },
        { value: "teclado", label: "Teclado" },
        { value: "mouse", label: "Mouse" },
        { value: "impresora", label: "Impresora" },
        { value: "escritorio", label: "Escritorio" },
        { value: "silla", label: "Silla de oficina" },
    ])

    const [proveedoresExistentes, setProveedoresExistentes] = useState([
        { value: "pagofacil", label: "PagoFacil" },

    ])
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: "",
            tipo: "producto",
            cantidad: 0,
            precioUnitario: 0,
            sector: "",
            proveedor: "",
            unidadMedida: "",
            descripcion: "",
            fechaVencimiento: "",
            caja: "caja1"
        },
    })

    async function onSubmit(values) {
        console.log("ENTRO");

        setIsLoading(true)
        // Aquí normalmente enviarías los datos a tu API

        guardarItem(values)

        console.log(values)
        setIsLoading(false)

        form.reset()
        setNombreItem("")
    }


    const handleCreateNewItem = (newItemName) => {
        if (!itemsExistentes.some(item => item.value.toLowerCase() === newItemName.toLowerCase())) {
            const newItem = { value: newItemName.toLowerCase(), label: newItemName }
            setItemsExistentes(prevItems => [...prevItems, newItem])
            form.setValue('nombre', newItemName)
        }
    }

    const handleCreateNewProveedor = (newItemName) => {
        if (!itemsExistentes.some(item => item.value.toLowerCase() === newItemName.toLowerCase())) {
            const newItem = { value: newItemName.toLowerCase(), label: newItemName }
            setProveedoresExistentes(prevItems => [...prevItems, newItem])
            form.setValue('nombre', newItemName)
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Agregar Producto al Inventario</CardTitle>
                <CardDescription>Complete el formulario para agregar un nuevo producto o servicio al inventario.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="nombre"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre del Item</FormLabel>
                                        <FormControl>
                                            <ComboBox
                                                options={itemsExistentes}
                                                value={field.value}
                                                onChange={field.onChange}
                                                onCreateNew={handleCreateNewItem}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tipo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione el tipo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="producto">Producto</SelectItem>
                                                <SelectItem value="servicio">Servicio</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <div className="grid grid-cols-2 gap-4">

                            <FormField
                                control={form.control}
                                name="cantidad"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cantidad</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={(e) => field.onChange(e.target.value)} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="unidadMedida"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Unidad de Medida</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione el tipo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="unidad">Unidad</SelectItem>
                                                <SelectItem value="pack">Pack</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="precioUnitario"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Precio Unitario</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="0.01" {...field} onChange={(e) => field.onChange(e.target.value)} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="caja"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Caja</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione el tipo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="caja1">Caja 1</SelectItem>
                                                <SelectItem value="caja2">Caja 2</SelectItem>
                                                <SelectItem value="caja3">Caja 3</SelectItem>
                                                <SelectItem value="caja4">Caja 4</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">

                            <FormField
                                control={form.control}
                                name="sector"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sector</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione el area" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="baño">Baño</SelectItem>
                                                <SelectItem value="buffet">Buffet</SelectItem>
                                                <SelectItem value="imprenta">Imprenta</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="proveedor"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Proveedor</FormLabel>
                                        <FormControl>
                                            <ComboBox
                                                options={proveedoresExistentes}
                                                value={field.value}
                                                onChange={field.onChange}
                                                onCreateNew={handleCreateNewProveedor}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="descripcion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Describa el producto" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Máximo 500 caracteres.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">

                            <FormField
                                control={form.control}
                                name="fechaVencimiento"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de Vencimiento (opcional)</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Agregando..." : "Agregar al Inventario"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}