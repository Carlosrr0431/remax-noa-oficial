import { motion } from 'framer-motion';
import { Award, TrendingUp, Users, Briefcase, Globe, Headphones } from 'lucide-react';

const benefits = [
    {
        title: "Marca reconocida",
        description: "Forma parte de una de las marcas inmobiliarias más reconocidas a nivel mundial.",
        icon: Globe,
        color: "bg-blue-500"
    },
    {
        title: "Formación continua",
        description: "Accede a programas de capacitación y desarrollo profesional de primer nivel.",
        icon: TrendingUp,
        color: "bg-green-500"
    },
    {
        title: "Red de contactos",
        description: "Conéctate con una amplia red de profesionales y clientes potenciales.",
        icon: Users,
        color: "bg-purple-500"
    },
    {
        title: "Herramientas avanzadas",
        description: "Utiliza tecnología de punta y herramientas de marketing innovadoras.",
        icon: Briefcase,
        color: "bg-orange-500"
    },
    {
        title: "Reconocimiento",
        description: "Participa en programas de incentivos y reconocimientos por tus logros.",
        icon: Award,
        color: "bg-yellow-500"
    },
    {
        title: "Soporte integral",
        description: "Recibe apoyo constante en todas las etapas de tu carrera inmobiliaria.",
        icon: Headphones,
        color: "bg-red-500"
    }
];

export function ListaBeneficiosAgentes() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                    <div className={`p-3 rounded-full ${benefit.color} mb-4`}>
                        <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
            ))}
        </div>
    );
}