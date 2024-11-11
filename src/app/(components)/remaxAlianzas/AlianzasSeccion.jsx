"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingBag, Utensils, Plane, Dumbbell, CheckCircle, Facebook, Instagram, MessageCircle, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function AlianzasSeccion() {
    const [showForm, setShowForm] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 ">
            <div className="min-w-full mx-auto bg-white shadow-2xl rounded-t-[70px] overflow-hidden">
                <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 lg:p-12">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">
                        Descuentos Exclusivos para Agentes
                    </h1>
                    <p className="text-center text-xl lg:text-2xl max-w-3xl mx-auto">
                        Aprovecha nuestras nuevas alianzas estratégicas y ahorra en tus compras y servicios favoritos
                    </p>
                </header>
                <main className="p-8 lg:p-12">
                    <section className="mb-12 text-center">
                        <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-gray-800">
                            Estimado Agente,
                        </h2>
                        <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto">
                            Nos complace anunciar nuestras nuevas alianzas estratégicas que te brindarán acceso a descuentos exclusivos en una variedad de productos y servicios. ¡No te pierdas estas ofertas increíbles!
                        </p>
                    </section>
                    <section className="grid gap-8 lg:grid-cols-2 mb-12">
                        <DiscountCard
                            icon={<ShoppingBag className="h-10 w-10 text-blue-500" />}
                            title="MegaMart"
                            description="Supermercado"
                            discount="10% de descuento en todas tus compras"
                            color="bg-blue-50"
                            socialLinks={{
                                facebook: "https://facebook.com/megamart",
                                instagram: "https://instagram.com/megamart",
                                whatsapp: "https://wa.me/1234567890",
                                location: "https://maps.google.com/?q=MegaMart"
                            }}
                        />
                        <DiscountCard
                            icon={<Utensils className="h-10 w-10 text-green-500" />}
                            title="Sabor Gourmet"
                            description="Restaurantes"
                            discount="15% de descuento en cenas"
                            color="bg-green-50"
                            socialLinks={{
                                facebook: "https://facebook.com/saborgourmet",
                                instagram: "https://instagram.com/saborgourmet",
                                whatsapp: "https://wa.me/1234567891",
                                location: "https://maps.google.com/?q=SaborGourmet"
                            }}
                        />
                        <DiscountCard
                            icon={<Plane className="h-10 w-10 text-purple-500" />}
                            title="Viajes Felices"
                            description="Agencia de viajes"
                            discount="5% de descuento en paquetes turísticos"
                            color="bg-purple-50"
                            socialLinks={{
                                facebook: "https://facebook.com/viajesfelices",
                                instagram: "https://instagram.com/viajesfelices",
                                whatsapp: "https://wa.me/1234567892",
                                location: "https://maps.google.com/?q=ViajesFelices"
                            }}
                        />
                        <DiscountCard
                            icon={<Dumbbell className="h-10 w-10 text-red-500" />}
                            title="FitLife Gym"
                            description="Gimnasio"
                            discount="20% de descuento en membresías anuales"
                            color="bg-red-50"
                            socialLinks={{
                                facebook: "https://facebook.com/fitlifegym",
                                instagram: "https://instagram.com/fitlifegym",
                                whatsapp: "https://wa.me/1234567893",
                                location: "https://maps.google.com/?q=FitLifeGym"
                            }}
                        />
                    </section>
                    {!showForm && !submitted && (
                        <section className="text-center">
                            <Button
                                onClick={() => setShowForm(true)}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-8 rounded-full text-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition duration-300 shadow-lg hover:shadow-xl "
                            >
                                Adherirme a las Alianzas
                            </Button>
                        </section>
                    )}
                    {showForm && !submitted && (
                        <section className="max-w-2xl mx-auto">
                            <form onSubmit={handleSubmit} className="space-y-6 text-black/80 bg-gray-50 p-8 rounded-xl shadow-lg">
                                <h3 className="text-2xl font-semibold mb-6 text-center">Formulario de Adhesión</h3>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="nombre" className="text-lg">Nombre</Label>
                                        <Input id="nombre" required className="text-lg p-3" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="apellido" className="text-lg">Apellido</Label>
                                        <Input id="apellido" required className="text-lg p-3" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="telefono" className="text-lg">Teléfono</Label>
                                    <Input id="telefono" type="tel" required className="text-lg p-3" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dni" className="text-lg">DNI</Label>
                                    <Input id="dni" required className="text-lg p-3" />
                                </div>
                                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white text-xl py-4 transition duration-300 shadow-md hover:shadow-lg">
                                    Enviar Solicitud
                                </Button>
                            </form>
                        </section>
                    )}
                    {submitted && (
                        <section className="max-w-2xl mx-auto text-center p-8 bg-green-50 rounded-xl shadow-lg">
                            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                            <h3 className="text-3xl font-semibold text-green-700 mb-4">¡Solicitud Enviada!</h3>
                            <p className="text-xl text-green-600">Gracias por adherirte a nuestras alianzas estratégicas. Pronto recibirás más información.</p>
                        </section>
                    )}
                </main>
                <footer className="bg-gray-50 p-8 text-center">
                    <p className="text-gray-600">
                        Para más información, contacta a Recursos Humanos.
                    </p>
                </footer>
            </div>
        </div>
    )
}

function DiscountCard({ icon, title, description, discount, color, socialLinks }) {
    return (
        <Card className={`flex flex-col h-full ${color} border-none shadow-lg hover:shadow-xl transition duration-300`}>
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-full bg-white shadow-md">{icon}</div>
                        <div>
                            <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
                            <CardDescription className="text-lg text-gray-600">{description}</CardDescription>
                        </div>
                    </div>
                    <a
                        href={socialLinks.location}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                        aria-label="Ubicación"
                    >
                        <MapPin className="h-8 w-8 text-gray-600" />
                    </a>
                </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between pt-4">
                <Badge variant="secondary" className="text-lg font-medium px-4 py-2 mb-6 self-start">
                    {discount}
                </Badge>
                <div className="flex justify-center items-center space-x-6 mt-4">
                    <IconButton href={socialLinks.facebook} icon={<Facebook className="h-6 w-6" />} label="Facebook" />
                    <IconButton href={socialLinks.instagram} icon={<Instagram className="h-6 w-6" />} label="Instagram" />
                    <IconButton href={socialLinks.whatsapp} icon={<MessageCircle className="h-6 w-6" />} label="WhatsApp" />
                </div>
            </CardContent>
        </Card>
    )
}

function IconButton({ href, icon, label }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
            aria-label={label}
        >
            {icon}
        </a>
    )
}