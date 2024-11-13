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

export const DashboardHome = () => {


    const { data: session } = useSession()
    const [usuario, setUsuario] = useState()
    const [mounted, setMounted] = useState(false);



    const topReferrers = [
        { name: 'Ana García', points: 1850, badge: 'Diamante', avatar: 'https://i.pravatar.cc/150?img=1' },
        { name: 'Carlos Ruiz', points: 1650, badge: 'Platino', avatar: 'https://i.pravatar.cc/150?img=2' },
        { name: 'María López', points: 1450, badge: 'Oro', avatar: 'https://i.pravatar.cc/150?img=3' },
        { name: 'Juan Pérez', points: 1250, badge: 'Plata', avatar: 'https://i.pravatar.cc/150?img=4' },
        { name: 'Laura Torres', points: 1050, badge: 'Bronce', avatar: 'https://i.pravatar.cc/150?img=5' },
    ];

    const rewards = [
        {
            name: 'iPhone 15 Pro',
            points: 5000,
            image: 'https://img.freepik.com/foto-gratis/maqueta-telefono-inteligente-mesa-marmol-blanco-espacio-copiar_1142-40728.jpg?ga=GA1.1.1434243888.1730995910&semt=ais_hybrid',
            progress: 25,
        },
        {
            name: 'MacBook Air',
            points: 8000,
            image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=60',
            progress: 15,
        },
        {
            name: 'Viaje a Cancún',
            points: 12000,
            image: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=800&auto=format&fit=crop&q=60',
            progress: 10,
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
                <div className="w-full min-w-full mx-auto p-4">
                    <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white p-4 sm:p-6">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="referral-dashboard">
                                <AccordionTrigger className="hover:no-underline" >
                                    <div className="flex flex-col items-start text-left w-full">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mb-4">
                                            <div className="mb-4 sm:mb-0 w-[70%]">
                                                <h2 className="text-2xl sm:text-3xl font-bold">¡Bienvenido, {session?.user?.name}!</h2>
                                                <p className="text-sm sm:text-base text-blue-100 mt-2">
                                                    Continúa refiriendo y gana increíbles premios. Invita a tus amigos y familiares, para sumar mayores puntos.
                                                </p>
                                            </div>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="w-full sm:w-auto mt-2 sm:mt-0"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Add your logic for adding a new referral here
                                                    console.log("Agregar nuevo referido");
                                                }}
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Agregar Nuevo Referido
                                            </Button>
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
                            {topReferrers.map((referrer, index) => (
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
                                                style={{ width: `${reward.progress}%` }}></div>


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
                            <ChatComponent />
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