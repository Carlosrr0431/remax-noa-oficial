import React from 'react';
import { Award, Users, TrendingUp, Clock } from 'lucide-react';


const features = [
    {
        name: 'Experiencia Comprobada',
        description: 'Más de 20 años en el mercado inmobiliario con resultados excepcionales.',
        icon: Award,
    },
    {
        name: 'Red de Agentes',
        description: 'Acceso a la red más grande de agentes inmobiliarios profesionales.',
        icon: Users,
    },
    {
        name: 'Mejor Precio',
        description: 'Estrategias de marketing efectivas para maximizar el valor de tu propiedad.',
        icon: TrendingUp,
    },
    {
        name: 'Proceso Eficiente',
        description: 'Vendemos tu propiedad en el menor tiempo posible con el mejor resultado.',
        icon: Clock,
    },
];

export default function PorqueRemax() {
    return (
        <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">¿Por qué elegirnos?</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        La mejor opción para vender tu propiedad
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        En Remax NOA nos dedicamos a ofrecer el mejor servicio inmobiliario con resultados comprobados.
                    </p>
                </div>

                <div className="mt-10">
                    <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white">
                                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                                <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}







