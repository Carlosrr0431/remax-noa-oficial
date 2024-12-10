import React from 'react';
import { Award, Users, TrendingUp, Clock, Shield, Globe, HandshakeIcon, Trophy } from 'lucide-react';

const features = [
    {
        name: 'Experiencia Global',
        description: 'Más de 45 años de experiencia internacional y presencia en más de 110 países nos respaldan.',
        icon: Globe,
    },
    {
        name: 'Red de Agentes Elite',
        description: 'Acceso a la red más grande de agentes inmobiliarios profesionales, capacitados constantemente.',
        icon: Users,
    },
    {
        name: 'Tecnología Avanzada',
        description: 'Utilizamos las últimas tecnologías para una mejor exposición y comercialización de tu propiedad.',
        icon: TrendingUp,
    },
    {
        name: 'Seguridad Garantizada',
        description: 'Todas nuestras operaciones están respaldadas legalmente, brindándote total tranquilidad.',
        icon: Shield,
    },
];

export default function PorqueRemax() {
    return (
        <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        ¿Por qué elegir Remax NOA?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Somos líderes en el mercado inmobiliario con un compromiso inquebrantable
                        con la excelencia y el servicio al cliente.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
                    {features.map((feature) => (
                        <div
                            key={feature.name}
                            className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                        >
                            <div className="flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-full mb-4">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.name}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-red-50 rounded-2xl p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Compromiso con la Excelencia
                            </h3>
                            <p className="text-gray-600 mb-6">
                                En Remax NOA, no solo vendemos propiedades, construimos relaciones duraderas
                                basadas en la confianza y el profesionalismo. Nuestro compromiso es
                                brindarte:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center text-gray-700">
                                    <Trophy className="h-5 w-5 text-red-600 mr-2" />
                                    Resultados comprobables y medibles
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <HandshakeIcon className="h-5 w-5 text-red-600 mr-2" />
                                    Asesoramiento personalizado
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <Clock className="h-5 w-5 text-red-600 mr-2" />
                                    Disponibilidad y respuesta rápida
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Oficina Remax"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};







