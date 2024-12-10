import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, GraduationCap } from 'lucide-react';

const steps = [
    {
        icon: Briefcase,
        title: 'Únete al Equipo',
        description: 'Comienza tu carrera como agente inmobiliario con el respaldo de la marca más reconocida.'
    },
    {
        icon: GraduationCap,
        title: 'Capacitación Integral',
        description: 'Recibe formación continua y accede a las mejores herramientas del mercado.'
    },
    {
        icon: Users,
        title: 'Networking Global',
        description: 'Conecta con más de 130,000 agentes en todo el mundo y amplía tus oportunidades.'
    }
];

const AgentSection = () => {
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
                            <Users className="w-12 h-12 text-green-600 mb-4" />
                        </motion.div>
                        <h2 className="text-4xl font-bold text-gray-900">Ser Agente Inmobiliario</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Desarrolla una carrera exitosa en el sector inmobiliario con el respaldo
                            de la red más grande del mundo. Te brindamos todas las herramientas necesarias.
                        </p>

                        <div className="space-y-8 mt-8">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.2 }}
                                    className="flex items-start space-x-4"
                                >
                                    <step.icon className="w-6 h-6 text-green-500 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                                        <p className="text-gray-600 mt-1 text-[17px]">{step.description}</p>
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
                                src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                                alt="Ser Agente Inmobiliario"
                                className="w-full h-[600px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                <div className="p-8 text-white">
                                    <h3 className="text-3xl font-bold mb-2">Tu Futuro Comienza Aquí</h3>
                                    <p className="text-lg opacity-90">
                                        Descubre cómo convertirte en un agente inmobiliario exitoso con RE/MAX NOA.
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

export default AgentSection;