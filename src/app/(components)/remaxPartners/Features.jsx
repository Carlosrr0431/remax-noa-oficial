import React from 'react';
import { UserCircle2, Trophy, Gift, Users } from 'lucide-react';

export default function Features() {
    const features = [
        {
            name: 'Perfil Personalizado',
            description: 'Crea tu perfil único y rastrea tu progreso como referidor.',
            icon: UserCircle2,
            color: 'from-blue-600 to-blue-400',
        },
        {
            name: 'Sistema de Puntos',
            description: 'Gana puntos por cada referido exitoso que aportes.',
            icon: Trophy,
            color: 'from-purple-600 to-purple-400',
        },
        {
            name: 'Premios Exclusivos',
            description: 'Canjea tus puntos por premios y beneficios especiales.',
            icon: Gift,
            color: 'from-pink-600 to-pink-400',
        },
        {
            name: 'Comunidad Activa',
            description: 'Conecta con otros referidores y amplía tu red de contactos.',
            icon: Users,
            color: 'from-green-600 to-green-400',
        },
    ];

    return (
        <section id="features" className="section-padding">
            <div className="max-w-7xl mx-auto container-padding">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
                        Características
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Todo lo que necesitas para crecer
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <div
                            key={feature.name}
                            className="relative p-6 bg-white rounded-2xl shadow-xl card-hover"
                        >
                            <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color}`}>
                                <feature.icon className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="mt-4 text-xl font-semibold text-gray-900">
                                {feature.name}
                            </h3>
                            <p className="mt-2 text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}