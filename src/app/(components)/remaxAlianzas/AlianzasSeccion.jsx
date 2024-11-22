"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingBag, Utensils, Plane, Dumbbell, CheckCircle, Facebook, Instagram, MessageCircle, MapPin } from 'lucide-react'
import { useState } from 'react'

import BodegonHotel from '../../public/elbodegon.png'
import HerClub from '../../public/Logo the her club-05 (1) (1).png'
import AmberSpa from '../../public/amberspa.png'
import BenditoCafe from '../../public/benditoCafe.jpg'

import Gilberto from '../../public/Logo-gilberto-2.png'

import Image from 'next/image'




export default function AlianzasSeccion() {
    const [showForm, setShowForm] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 ">
            <div className="min-w-full mx-auto bg-white shadow-2xl  overflow-hidden">
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
                            icon={BodegonHotel}
                            title="El Bodeguero Hotel"
                            description="Cafe & Resto Bar"
                            discount="5% de descuento en almuerzos y cenas."
                            discount1="5% de descuento en gift cards de almuerzos y cenas, para disfrutar o regalar."
                            discount2="Descuento aplicable solo en pagos en efectivo."
                            discount3=""
                            color="bg-blue-600"
                            socialLinks={{
                                facebook: "https://facebook.com/megamart",
                                instagram: "https://www.instagram.com/elbodeguerohotel?igsh=dmNpMzJoODl3OWU4",
                                whatsapp: "https://wa.me/+5493872582022",
                                location: "https://maps.app.goo.gl/YkBffAjLpCgzGpBRA"
                            }}
                        />
                        <DiscountCard
                            icon={HerClub}
                            title="The Her Club"
                            description="Cafe & Resto Bar"
                            discount="20% de descuento en gift cards empresariales."
                            discount1="20% de descuento en todos los servicios y combos."
                            discount2="Descuento válido únicamente en efectivo. No acumulable con otras promociones."
                            discount3=""
                            color="bg-green-50"
                            socialLinks={{
                                facebook: "https://facebook.com/saborgourmet",
                                instagram: "https://www.instagram.com/herclub.ok?igsh=eG1mb2tmcnJqZmN2",
                                whatsapp: "https://wa.me/+5493875494142",
                                location: "https://maps.app.goo.gl/ua5zeYnmPGPAMBAC6"
                            }}
                        />
                        <DiscountCard
                            icon={AmberSpa}
                            title="Amber Spa"
                            description="Spa"
                            discount="20% de descuento en todos los servicios del spa pagando en efectivo."
                            discount1="15% de descuento en todos los servicios del spa pagando con medios bancarizados (tarjetas de crédito/débito y transferencia."
                            discount2=""
                            discount3=""
                            color="bg-purple-50"
                            socialLinks={{
                                facebook: "https://facebook.com/viajesfelices",
                                instagram: "https://www.instagram.com/amberspasalta?igsh=NTJwOHdpY3A2Z2Rm",
                                whatsapp: "https://wa.me/+5493874681921",
                                location: "https://maps.app.goo.gl/yddPxqhLLyyJoebn7"
                            }}
                        />
                        <DiscountCard
                            icon={BenditoCafe}
                            title="Bendito Cafe"
                            description="Cafe & Resto Bar"
                            discount="12% de descuento en todos los productos de la carta."
                            discount1="12% de descuento en gift cards, para que puedas regalar una experiencia o disfrutarla vos mismo."
                            discount2=""
                            discount3=""
                            color="bg-red-50"
                            socialLinks={{
                                facebook: "https://facebook.com/fitlifegym",
                                instagram: "https://www.instagram.com/benditocafe.salta?igsh=c3g0cDRwZjZtOHJn",
                                whatsapp: "https://wa.me/1234567893",
                                location: "https://maps.app.goo.gl/CTPWKTh5fG1mE12T8"
                            }}
                        />

                        <DiscountCard
                            icon={Gilberto}
                            title="Gilberto"
                            description="Decoraciones"
                            discount="10% de descuento en productos al pagar con transferencia bancaria."
                            discount1="20% de descuento en productos al pagar en efectivo."
                            discount2=""
                            discount3="5% de descuento pagando con tarjeta de débito o crédito (en un solo pago)."
                            color="bg-red-50"
                            socialLinks={{
                                facebook: "https://facebook.com/fitlifegym",
                                instagram: "https://www.instagram.com/gilbertocasaartedeco?igsh=MWt0enZzbjNpNHBrZA==",
                                whatsapp: "https://wa.me/+5493873116510",
                                location: "https://maps.app.goo.gl/B7FbbbFPtkMTpy1u5"
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

function DiscountCard({ icon, title, description, discount, discount1, discount2, discount3, color, socialLinks }) {
    return (

        <Card className={`flex flex-col h-full bg-gradient-to-r from-blue-500 to-blue-600 border-none shadow-lg hover:shadow-xl transition duration-300`}>
            <CardHeader className="pb-2 sm:pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <Image
                            src={icon}
                            alt=""
                            width={100}
                            height={100}
                            className={`object-content  max-w-[100px] max-h-[100px] ${title == 'El Bodeguero Hotel' ? 'max-w-[60px] max-h-[60px]' : 'max-w-[100px] max-h-[100px]'}`}
                        />

                        <div>
                            <CardTitle className="text-lg sm:text-xl text-white md:text-2xl font-semibold">{title}</CardTitle>
                            <CardDescription className="text-sm sm:text-base md:text-lg text-gray-200">{description}</CardDescription>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between pt-2 sm:pt-4">
                <div>
                    <Badge variant="secondary" className="text-lg font-medium px-4 mb-2  text-black py-2  self-start">
                        {discount}
                    </Badge>

                    <Badge variant="secondary" className="text-lg font-medium px-4 py-2 mb-2 text-black self-start">
                        {discount1}
                    </Badge>
                    <Badge variant="secondary" className={`text-lg font-medium px-4 py-2 self-start text-gray-600 ${discount2 != '' ? 'visible' : 'hidden'}`}>
                        {discount2}
                    </Badge>
                    <Badge variant="secondary" className={`text-lg font-medium px-4 py-2 mb-2 text-black self-start ${discount3 != '' ? 'visible' : 'hidden'}`}>
                        {discount3}
                    </Badge>
                </div>
                {/* <div className="relative w-full h-32 sm:h-40 mb-4 rounded-lg overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={`Imagen de ${title}`}
                        layout="fill"
                        objectFit="cover"
                    />
                </div> */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
                    <div className="flex space-x-4">
                        <IconButton href={socialLinks.facebook} icon={<Facebook className="h-5 w-5 sm:h-6 sm:w-6" />} label="Facebook" />
                        <IconButton href={socialLinks.instagram} icon={<Instagram className="h-5 w-5 sm:h-6 sm:w-6" />} label="Instagram" />
                        <IconButton href={socialLinks.whatsapp} icon={<MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />} label="WhatsApp" />
                    </div>
                    <LocationButton href={socialLinks.location} />
                </div>
            </CardContent>
        </Card>
        // <Card className={`flex flex-col h-full ${color} border-none shadow-lg hover:shadow-xl transition duration-300`}>
        //     <CardHeader className="pb-4">
        //         <div className="flex items-center justify-between">
        //             <div className="flex items-center space-x-4">

        // <Image
        //     src={icon}
        //     alt=""
        //     width={100}
        //     height={100}
        //     className='object-cover'
        // />

        //                 <div>
        //                     <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
        //                     <CardDescription className="text-lg text-gray-600">{description}</CardDescription>
        //                 </div>
        //             </div>
        //             <a
        //                 href={socialLinks.location}
        //                 target="_blank"
        //                 rel="noopener noreferrer"
        //                 className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
        //                 aria-label="Ubicación"
        //             >
        //                 <MapPin className="h-8 w-8 text-gray-600" />
        //             </a>
        //         </div>
        //     </CardHeader>
        //     <CardContent className="flex-grow flex flex-col justify-between pt-4">
        // <Badge variant="secondary" className="text-lg font-medium px-4 text-blue-800 py-2  self-start">
        //     {discount}
        // </Badge>

        // <Badge variant="secondary" className="text-lg font-medium px-4 py-2 text-blue-900 self-start">
        //     {discount1}
        // </Badge>
        // <Badge variant="primary" className="text-lg font-medium px-4 py-2 self-start text-gray-600">
        //     {discount2}
        // </Badge>
        //         <div className="flex justify-center items-center space-x-6 mt-4">
        //             <IconButton href={socialLinks.facebook} icon={<Facebook className="h-6 w-6" />} label="Facebook" />
        //             <IconButton href={socialLinks.instagram} icon={<Instagram className="h-6 w-6" />} label="Instagram" />
        //             <IconButton href={socialLinks.whatsapp} icon={<MessageCircle className="h-6 w-6" />} label="WhatsApp" />
        //         </div>
        //     </CardContent>
        // </Card>
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

function LocationButton({ href }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition duration-300 shadow-md hover:shadow-lg"
            aria-label="Ver ubicación"
        >
            <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="font-semibold text-sm sm:text-base">Ver ubicación</span>
        </a>
    )
}