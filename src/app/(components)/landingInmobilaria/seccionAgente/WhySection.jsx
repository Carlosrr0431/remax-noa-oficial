import React from 'react';
import { motion } from 'framer-motion';
import { Target, Award, TrendingUp } from 'lucide-react';

const benefits = [
    {
        icon: Target,
        title: 'Alcance Global',
        description: 'Accede a una red internacional de más de 130,000 agentes en más de 110 países.'
    },
    {
        icon: Award,
        title: 'Marca Reconocida',
        description: 'Forma parte de la marca inmobiliaria más reconocida a nivel mundial.'
    },
    {
        icon: TrendingUp,
        title: 'Crecimiento Profesional',
        description: 'Capacitación continua y herramientas de última generación para tu desarrollo.'
    }
];

const WhySection = () => {
    return (
        <section className="min-h-screen  bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Target className="w-12 h-12 text-red-600 mb-4" />
                        </motion.div>
                        <h2 className="text-4xl font-bold text-gray-900">¿Por qué RE/MAX NOA?</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Únete a la red inmobiliaria más grande del mundo y potencia tu carrera profesional
                            con el respaldo de una marca líder en el mercado.
                        </p>

                        <div className="space-y-8 mt-8">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.2 }}
                                    className="flex items-start space-x-4"
                                >
                                    <benefit.icon className="w-6 h-6 text-red-500 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">{benefit.title}</h3>
                                        <p className="text-gray-600 mt-1 text-[17px]">{benefit.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                                alt="¿Por qué RE/MAX NOA?"
                                className="w-full h-[600px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                <div className="p-8 text-white">
                                    <h3 className="text-3xl font-bold mb-2">Únete a RE/MAX NOA</h3>
                                    <p className="text-lg opacity-90">
                                        Descubre por qué somos la mejor opción para tu carrera inmobiliaria.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhySection;