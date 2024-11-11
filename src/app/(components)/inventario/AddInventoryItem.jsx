'use client'

import { useEffect, useState } from 'react'
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
import { ComboBox } from './Combobox'
import { guardarItem } from '@/app/action'
import { supabaseClient } from '@/supabase/client'


export default function InventarioForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [nombreItem, setNombreItem] = useState("")
    const [tipoSelect, setTipoSelect] = useState("producto")
    const [itemsExistentes, setItemsExistentes] = useState([

    ])

    const [monto, setMonto] = useState("")

    const [proveedoresExistentes, setProveedoresExistentes] = useState([])
    const form = useForm({
        defaultValues: {
            nombre: "",
            tipo: "",
            cantidad: "",
            sector: "",
            proveedor: "",
            unidadMedida: "",
            descripcion: "",
            fechaVencimiento: "",
            caja: "1"
        },
    })


    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("item")
                .select("*")


            const searchArray = []



            data.data.map((elem) => {
                searchArray.push({
                    value: elem.nombre.toLowerCase(),
                    label: elem.nombre
                })
            }
            )


            let set2 = new Set(searchArray.map(JSON.stringify))
            let arrSinDuplicaciones2 = Array.from(set2).map(JSON.parse);


            const searchArray2 = []

            data.data.map((elem) => {
                searchArray2.push({
                    value: elem.proveedor.toLowerCase(),
                    label: elem.proveedor
                })
            }
            )

            let set = new Set(searchArray2.map(JSON.stringify))
            let arrSinDuplicaciones = Array.from(set).map(JSON.parse);

            setItemsExistentes(arrSinDuplicaciones2)
            setProveedoresExistentes(arrSinDuplicaciones)

        }

        getSupabaseOficial()
    }, [])


    async function onSubmit(values) {
        setIsLoading(true)

        await guardarItem(values, tipoSelect, monto)

        setIsLoading(false)

        form.reset()
        setNombreItem("")
    }




    // const handleCreateNewItem = (newItemName) => {
    //     if (!itemsExistentes.some(item => item.value.toLowerCase() === newItemName.toLowerCase())) {
    //         const newItem = { value: newItemName.toLowerCase(), label: newItemName }
    //         setItemsExistentes(prevItems => [...prevItems, newItem])
    //     }
    // }

    // const handleCreateNewProveedor = (newItemName) => {
    //     if (!itemsExistentes.some(item => item.value.toLowerCase() === newItemName.toLowerCase())) {
    //         const newItem = { value: newItemName.toLowerCase(), label: newItemName }
    //         setProveedoresExistentes(prevItems => [...prevItems, newItem])
    //         form.setValue('nombre', newItemName)
    //     }
    // }

    const handleStringToInt = (value) => {
        console.log(value);

        setTipoSelect((value))
    }


    const handleMonto = (e) => {

        const value = (e.target.value).replace(/\./g, '').replace(/\$/g, '').replace(/[^0-9\.]/g, '')

        const valor = currencyFormatter(value)

        setMonto(valor)
    }

    function currencyFormatter(value) {
        const formatter = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            minimumFractionDigits: 0,
            currency: 'ARS'
        })
        return formatter.format(Number(value))
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
                                            // onCreateNew={handleCreateNewItem}
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
                                        <Select onSelect={(value) => console.log(value)
                                        } onValueChange={handleStringToInt} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione el tipo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="producto">Producto</SelectItem>
                                                <SelectItem value="servicio y impuestos">Servicio</SelectItem>
                                                <SelectItem value="sueldos">Sueldos</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <div className={`grid grid-cols-2 gap-4 ${tipoSelect == 'producto' ? 'visible' : 'hidden'}`}>

                            <FormField
                                control={form.control}
                                name="cantidad"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cantidad</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} onChange={(e) => field.onChange(e.target.value)} />
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
                                        <FormLabel>Monto</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="$" onChange={handleMonto} value={monto} />
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
                                                <SelectItem value="1">Caja 1</SelectItem>
                                                <SelectItem value="2">Caja 2</SelectItem>
                                                <SelectItem value="3">Caja 3</SelectItem>
                                                <SelectItem value="4">Caja 4</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <div className={`grid grid-cols-2 gap-4 ${tipoSelect == 'producto' ? 'visible' : 'hidden'}`}>

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
                                            // onCreateNew={handleCreateNewProveedor}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <div className={`grid grid-cols-2 gap-4 
                        ${tipoSelect == 'producto' ? 'visible' : 'hidden'}`}>

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