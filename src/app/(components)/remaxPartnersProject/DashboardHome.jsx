"use client"

import React, { useEffect, useState } from 'react';
import { Trophy, TrendingUp, Users, Bell, Gift, Crown, Star, Award, Newspaper, ChevronDown, Plus, Send } from 'lucide-react';
import Blog from './Blog';
import { Button } from "@/components/ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import NotificationsComponent from './NotificationsComponent';
import ChatComponent from './ChatComponent';
import { supabaseClient } from '@/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import Chat from './Chat';
import Providers from '@/app/(providers)/Providers';

const formSchema = z.object({
    name: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Por favor ingrese un correo electrónico válido.",
    }),
    phone: z.string().regex(/^\+?[0-9]{10,14}$/, {
        message: "Por favor ingrese un número de teléfono válido.",
    }),
    type: z.enum(["comprador", "vendedor"], {
        required_error: "Por favor seleccione un tipo.",
    }),
    property: z.enum(["casa", "departamento", "terreno", "otros"], {
        required_error: "Por favor seleccione un tipo de propiedad.",
    }),
})

export const DashboardHome = () => {


    const { data: session } = useSession()
    const [usuario, setUsuario] = useState()
    const [mounted, setMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [topReferidos, setTopReferidos] = useState([])
    const puntos = 10000

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            type: undefined,
            property: undefined,
        },
    })

    //una casa en un country y otra en zona caliente de 70mil dolares. base de datos de agentes que ya se fueron para mailing.



    function onSubmit(values) {
        console.log(values)
        setIsModalOpen(false)
        form.reset()
    }


    let referrers = [
        { name: 'Ana García', points: 1850, badge: '', avatar: '' },
        { name: 'Carlos Ruiz', points: 1650, badge: '', avatar: '' },
        { name: 'María López', points: 1450, badge: '', avatar: '' },
        { name: 'Juan Pérez', points: 1250, badge: '', avatar: '' },
        { name: 'Laura Torres', points: 1050, badge: '', avatar: '' },
        { name: 'Nicolas Galvez', points: 2500, badge: '', avatar: '' },
        { name: 'Carlos Garcia', points: 2100, badge: '', avatar: '' },
        { name: 'Marta Perez', points: 1000, badge: '', avatar: '' },
        { name: 'Michael Rodriguez', points: 1020, badge: '', avatar: '' },
        { name: 'Cristian Castro', points: 1700, badge: '', avatar: '' },
    ];




    const topReferrers = () => {
        let topRefer = []

        for (let index = 0; index < 5; index++) {

            let referMax = {}
            let puntoMaximo = 0

            referrers.map((elem) => {
                if (elem.points > puntoMaximo) {
                    referMax = elem;
                    puntoMaximo = elem.points
                }
            })

            referrers = referrers.filter((elem) => elem.name != referMax.name)

            if (index == 0) {
                referMax.badge = 'Diamante'
                referMax.avatar = 'https://i.pravatar.cc/150?img=1'
            } else if (index == 1) {
                referMax.badge = 'Platino'
                referMax.avatar = 'https://i.pravatar.cc/150?img=2'
            } else if (index == 2) {
                referMax.badge = 'Oro'
                referMax.avatar = 'https://i.pravatar.cc/150?img=3'
            } else if (index == 3) {
                referMax.badge = 'Plata'
                referMax.avatar = 'https://i.pravatar.cc/150?img=4'
            } else if (index == 4) {
                referMax.badge = 'Bronce'
                referMax.avatar = 'https://i.pravatar.cc/150?img=5'
            }
            topRefer.push(referMax)

        }

        setTopReferidos(topRefer)
    }

    const rewards = [
        {
            name: 'iPhone 15 Pro',
            points: 5000,
            image: 'https://img.freepik.com/foto-gratis/maqueta-telefono-inteligente-mesa-marmol-blanco-espacio-copiar_1142-40728.jpg?ga=GA1.1.1434243888.1730995910&semt=ais_hybrid',
        },
        {
            name: 'MacBook Air',
            points: 8000,
            image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=60',

        },
        {
            name: 'Viaje a Cancún',
            points: 12000,
            image: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=800&auto=format&fit=crop&q=60',
        },
    ];



    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("referidores")
                .select("*")
                .match({ correo: session?.user?.email }).single();


            setUsuario(data.data)
        }

        if (session?.user?.email != undefined) {

            console.log("correo: " + session?.user?.email);

            getSupabaseOficial()
        }

        const channelUsuarios = supabaseClient
            .channel('referidores')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'referidores' }, (payload) => {

                if (payload.eventType == 'UPDATE' && session?.user?.email == payload.new.email) {
                    return setUsuario(payload.new)
                }
            })
            .subscribe()

        topReferrers()

        return () => {

            supabaseClient.removeChannel(supabaseClient.channel(channelUsuarios))
        }
    }, [session?.user.email])


    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="w-full max-w-full mx-auto p-4">
                <div className="w-full max-w-4xl mx-auto p-4">
                    <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white p-4 sm:p-6">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="referral-dashboard">
                                <AccordionTrigger className="hover:no-underline">
                                    <div className="flex flex-col items-start text-left w-full">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mb-4">
                                            <div className="mb-4 sm:mb-0">
                                                <h2 className="text-2xl sm:text-3xl font-bold">¡Bienvenido, {session?.user?.name}!</h2>
                                                <p className="text-sm sm:text-base text-blue-100 mt-2">
                                                    Continúa refiriendo y gana increíbles premios.
                                                </p>
                                            </div>
                                            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        className="w-full sm:w-auto mt-2 sm:mt-0"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setIsModalOpen(true);

                                                        }}
                                                    >
                                                        <Plus className="mr-2 h-4 w-4" />
                                                        Agregar Nuevo Referido
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[500px]" onClick={(e) =>
                                                    e.stopPropagation()
                                                }>
                                                    <DialogHeader>
                                                        <DialogTitle>Agregar Nuevo Referido</DialogTitle>
                                                    </DialogHeader>
                                                    <Form {...form}>
                                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <FormField
                                                                    control={form.control}
                                                                    name="name"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel>Nombre</FormLabel>
                                                                            <FormControl>
                                                                                <Input {...field} className="w-full" />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={form.control}
                                                                    name="email"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel>Correo</FormLabel>
                                                                            <FormControl>
                                                                                <Input type="email" {...field} className="w-full" />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <FormField
                                                                    control={form.control}
                                                                    name="phone"
                                                                    id="phone"
                                                                    render={({ field }) => (
                                                                        <FormItem>

                                                                            <FormLabel>Telefono</FormLabel>

                                                                            <FormControl>

                                                                                <InputOTP {...field} maxLength={10}>
                                                                                    <InputOTPGroup>
                                                                                        <InputOTPSlot index={0} />
                                                                                        <InputOTPSlot index={1} />
                                                                                        <InputOTPSlot index={2} />
                                                                                        <InputOTPSlot index={3} />
                                                                                    </InputOTPGroup>
                                                                                    <InputOTPSeparator />
                                                                                    <InputOTPGroup>
                                                                                        <InputOTPSlot index={4} />
                                                                                        <InputOTPSlot index={5} />
                                                                                        <InputOTPSlot index={6} />
                                                                                        <InputOTPSlot index={7} />
                                                                                        <InputOTPSlot index={8} />
                                                                                        <InputOTPSlot index={9} />
                                                                                    </InputOTPGroup>
                                                                                </InputOTP>

                                                                            </FormControl>

                                                                            <FormMessage />



                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            </div>
                                                            <FormField
                                                                control={form.control}
                                                                name="type"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Tipo</FormLabel>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                            <FormControl>
                                                                                <SelectTrigger className="w-full">
                                                                                    <SelectValue placeholder="Seleccionar tipo" />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                <SelectItem value="comprador">Comprador</SelectItem>
                                                                                <SelectItem value="vendedor">Vendedor</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="property"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Propiedad</FormLabel>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                            <FormControl>
                                                                                <SelectTrigger className="w-full">
                                                                                    <SelectValue placeholder="Seleccionar propiedad" />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent>
                                                                                <SelectItem value="casa">Casa</SelectItem>
                                                                                <SelectItem value="departamento">Departamento</SelectItem>
                                                                                <SelectItem value="terreno">Terreno</SelectItem>
                                                                                <SelectItem value="otros">Otros</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <Button type="submit" className="w-full">Agregar Referido</Button>
                                                        </form>
                                                    </Form>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                        <div className="text-sm text-blue-200 flex items-center">
                                            <span className="mr-2">Ver detalles</span>
                                            <ChevronDown className="h-4 w-4" />
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="pt-4 space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3">
                                                <Trophy className="h-8 w-8 text-yellow-300 flex-shrink-0" />
                                                <div>
                                                    <div className="text-sm text-blue-100">Puntos Totales</div>
                                                    <div className="text-xl sm:text-2xl font-bold">1,250</div>
                                                </div>
                                            </div>

                                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3">
                                                <Users className="h-8 w-8 text-blue-100 flex-shrink-0" />
                                                <div>
                                                    <div className="text-sm text-blue-100">Referidos Activos</div>
                                                    <div className="text-xl sm:text-2xl font-bold">25</div>
                                                </div>
                                            </div>

                                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3">
                                                <Crown className="h-8 w-8 text-yellow-300 flex-shrink-0" />
                                                <div>
                                                    <div className="text-sm text-blue-100">Nivel Actual</div>
                                                    <div className="text-xl sm:text-2xl font-bold">Platino</div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Rankings Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Top Referidores</h2>
                            <TrendingUp className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="space-y-4">
                            {topReferidos.map((referrer, index) => (
                                <div
                                    key={referrer.name}
                                    className="flex items-center p-4 bg-gray-50 rounded-xl transition-transform hover:scale-[1.02]"
                                >
                                    <div className="flex-shrink-0 relative">
                                        {/* <img
                                            src={referrer.avatar}
                                            alt={referrer.name}
                                            className="h-12 w-12 rounded-full"
                                        /> */}
                                        {index < 3 && (
                                            <div className="absolute -top-1 -right-1 h-6 w-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                {index + 1}
                                            </div>
                                        )}
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <h3 className="text-sm font-semibold text-gray-900">{referrer.name}</h3>
                                        <div className="flex items-center mt-1">
                                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                            <span className="text-sm text-gray-600">{referrer.points} puntos</span>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                    ${index === 0 ? 'bg-blue-100 text-blue-800' :
                                            index === 1 ? 'bg-gray-100 text-gray-800' :
                                                index === 2 ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-600'}`}>
                                        {referrer.badge}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Rewards Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Premios Disponibles</h2>
                            <Gift className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="space-y-4">
                            {rewards.map((reward) => (
                                <div
                                    key={reward.name}
                                    className="group relative overflow-hidden rounded-xl transition-all hover:shadow-md"
                                >
                                    <img
                                        src={reward.image}
                                        alt={reward.name}
                                        className="w-full h-32 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 p-4 flex flex-col justify-end">
                                        <h3 className="text-white font-semibold">{reward.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-white/90">{reward.points} puntos</span>
                                            <Award className="h-5 w-5 text-yellow-400" />
                                        </div>
                                        <div className="mt-2 bg-white/20 rounded-full h-1.5">
                                            <div className="bg-blue-500 h-full rounded-full"
                                                style={{ width: `${puntos >= reward.points ? '100' : (puntos / reward.points) * 100}%` }}></div>


                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <Card className="w-full max-w-6xl mx-auto bg-transparent shadow-none border-none">
                <CardContent className="p-6  ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6  bg-none">
                        <div className="w-full">
                            <NotificationsComponent />
                        </div>
                        <div className="w-full">
                            <Providers>         <ChatComponent /></Providers>

                        </div>
                    </div>
                </CardContent>
            </Card>
            {/* <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Notificaciones Recientes</h2>
                    <Bell className="h-5 w-5 text-blue-600" />
                </div>
                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">{notification.title}</p>
                                <p className="text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-sm text-gray-500 mt-2">Hace {notification.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Blog Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Blog Inmobiliario</h2>
                    <Newspaper className="h-5 w-5 text-blue-600" />
                </div>
                <Blog />
            </div>
        </div>
    );
}