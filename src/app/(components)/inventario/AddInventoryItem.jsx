'use client'

import { useEffect, useMemo, useState } from 'react'
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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Search } from 'lucide-react'
import { toast } from 'sonner'

const suggestions = [
    "Argentina", "Bolivia", "Brasil", "Chile", "Colombia",
    "Ecuador", "Paraguay", "Perú", "Uruguay", "Venezuela",
    "México", "Cuba", "República Dominicana", "Puerto Rico",
    "Panamá", "Costa Rica", "Nicaragua", "Honduras", "El Salvador", "Guatemala"
]



export default function InventarioForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [nombreItem, setNombreItem] = useState("")
    const [tipoSelect, setTipoSelect] = useState("producto")
    const [itemsExistentes, setItemsExistentes] = useState([

    ])


    const [monto, setMonto] = useState("")

    const [proveedoresExistentes, setProveedoresExistentes] = useState([])
    const form = useForm({


    })

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const [open2, setOpen2] = useState(false)
    const [value2, setValue2] = useState("")

    // const filteredSuggestions = useMemo(() => {
    //     if (!value) return itemsExistentes
    //     return itemsExistentes.filter(item =>
    //         item.toLowerCase().includes(value.toLowerCase())
    //     )
    // }, [value, itemsExistentes])

    const handleInputFocus = () => {
        setOpen(true)
    }

    const handleInputBlur = () => {
        // Delay closing to allow for item selection
        setTimeout(() => setOpen(false), 200)
    }

    const handleInputFocus2 = () => {
        setOpen2(true)
    }

    const handleInputBlur2 = () => {
        // Delay closing to allow for item selection
        setTimeout(() => setOpen2(false), 200)
    }



    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("item")
                .select("*")


            let searchArray = []
            let searchArray2 = []


            data?.data?.map((elem) => {
                if (elem.nombre !== null)
                    searchArray.push(elem.nombre)
            }
            )


            data?.data?.map((elem) => {
                if (elem.proveedor !== null)
                    searchArray2.push(elem.proveedor)
            }
            )


            const sinDuplicados = [...new Set(searchArray)];
            const sinDuplicados2 = [...new Set(searchArray2)];

            console.log("arreglo: " + sinDuplicados);
            setItemsExistentes(sinDuplicados)
            setProveedoresExistentes(sinDuplicados2)
            // let set2 = new Set(searchArray.map(JSON.stringify))
            // let arrSinDuplicaciones2 = Array.from(set2).map(JSON.parse);


            // const searchArray2 = []

            // data?.data?.map((elem) => {
            //     searchArray2.push({
            //         value: elem?.proveedor?.toLowerCase(),
            //         label: elem?.proveedor
            //     })
            // }
            // )

            // let set = new Set(searchArray2.map(JSON.stringify))
            // let arrSinDuplicaciones = Array.from(set).map(JSON.parse);

            // setItemsExistentes(arrSinDuplicaciones2)
            // setProveedoresExistentes(arrSinDuplicaciones)

        }

        getSupabaseOficial()
    }, [])


    async function onSubmit(values) {
        setIsLoading(true)

        console.log("El valor del nombre es: " + value);


        await guardarItem(values, tipoSelect, monto, value, value2)


        setIsLoading(false)
        toast.success(`El item ${value} fue cargado exitosamente.`)

        setValue('')
        form.setValue('cantidad', '');
        setValue2('')
        setMonto('')

        // Mantener el resto de los valores

        form.setValue('tipo', values.tipo);
        form.setValue('unidadMedida', values.unidadMedida);
        form.setValue('caja', values.caja);
        form.setValue('sector', values.sector);




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
                            <div className="relative w-full max-w-[500px] mt-[35px]">
                                <Command className="rounded-lg  ">
                                    <div className="flex items-center rounded-md border-[1px] border-gray-400 px-3  ">

                                        <CommandInput
                                            placeholder="Nombre del item..."
                                            value={value}
                                            name="nombre"
                                            id="nombre"
                                            onValueChange={setValue}
                                            onFocus={handleInputFocus}
                                            onBlur={handleInputBlur}
                                            className="flex h-11 w-full rounded-md bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 "
                                        />
                                    </div>
                                    {open && (
                                        <CommandList>
                                            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                                            <CommandGroup>
                                                {itemsExistentes != null && itemsExistentes.map((item, index) => (
                                                    <CommandItem
                                                        key={index}
                                                        onSelect={(currentValue) => {
                                                            console.log("seleccionado: " + currentValue);

                                                            setValue(currentValue)
                                                            setOpen(false)
                                                        }}
                                                    >
                                                        {item}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    )}
                                </Command>
                            </div>

                            <FormField
                                control={form.control}
                                name="tipo"


                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo</FormLabel>
                                        <Select onValueChange={handleStringToInt} defaultValue={field.value}>
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
                                rules={{
                                    required: tipoSelect == 'producto' ? 'La cantidad es obligatoria' : false,
                                    minLength: {
                                        value: 1,
                                        message: 'La cantidad debe tener al menos un digito.'
                                    }
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cantidad</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Cantidad" type="text" {...field} onChange={(e) => field.onChange(e.target.value)} />
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
                                            <Input type="text" {...field} placeholder="$" onChange={handleMonto} value={monto} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="caja"
                                rules={{
                                    required: 'La caja es obligatoria',
                                    minLength: {
                                        value: 1,
                                        message: 'Debes seleccionar una opción.'
                                    }
                                }}
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
                            <div className="relative w-full max-w-[500px] mt-[35px]">
                                <Command className="rounded-lg  ">
                                    <div className="flex items-center rounded-md border-[1px] border-gray-400 px-3  ">

                                        <CommandInput
                                            placeholder="Nombre del proveedor..."
                                            value={value2}
                                            onValueChange={setValue2}
                                            onFocus={handleInputFocus2}
                                            onBlur={handleInputBlur2}
                                            name="proveedor"
                                            id="proveedor"
                                            className="flex h-11 w-full rounded-md bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 "
                                        />
                                    </div>
                                    {open2 && (
                                        <CommandList>
                                            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                                            <CommandGroup>
                                                {proveedoresExistentes != null && proveedoresExistentes.map((item, index) => (
                                                    <CommandItem
                                                        key={index}
                                                        onSelect={(currentValue) => {
                                                            console.log("seleccionado: " + currentValue);

                                                            setValue2(currentValue)
                                                            setOpen2(false)
                                                        }}
                                                    >
                                                        {item}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    )}
                                </Command>
                            </div>
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