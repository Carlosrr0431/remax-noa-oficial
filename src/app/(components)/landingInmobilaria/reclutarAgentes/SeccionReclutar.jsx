import { motion } from 'framer-motion';
import { Building2, Target, Users, Heart, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

export default function SeccionReclutar() {
    return (
        <div className="bg-gradient-to-b from-white to-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div

                className="max-w-7xl mx-auto text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Tu Futuro en REMAX NOA
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Únete al equipo líder en bienes raíces y descubre un mundo de oportunidades ilimitadas
                </p>
            </div>

            {/* Why REMAX NOA Section */}
            <div

                className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
                <div

                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-black">Marca Líder Mundial</h3>
                    <p className="text-gray-600">Forma parte de la red inmobiliaria más grande del mundo, con presencia en más de 110 países.</p>
                </div>

                <div

                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                    <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <Target className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-black">Desarrollo Profesional</h3>
                    <p className="text-gray-600">Accede a capacitación continua y las mejores herramientas tecnológicas del mercado.</p>
                </div>

                <div

                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-black">Ambiente Colaborativo</h3>
                    <p className="text-gray-600">Trabaja en un entorno dinámico y profesional con los mejores agentes del mercado.</p>
                </div>
            </div>

            {/* Vision and Values */}
            <div

                className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mb-16"
            >
                <div className="grid md:grid-cols-2">
                    <div className="p-8 lg:p-12">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Nuestra Visión</h2>
                        <p className="text-gray-600 mb-6">
                            Ser la inmobiliaria líder en el NOA, reconocida por su excelencia en servicio,
                            innovación constante y compromiso con el desarrollo profesional de nuestros agentes.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Heart className="w-5 h-5 text-red-500" />
                                <span className='text-gray-700 font-regular'>Pasión por el servicio al cliente</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Award className="w-5 h-5 text-yellow-500" />
                                <span className='text-gray-700 font-regular'>Excelencia en cada operación</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <TrendingUp className="w-5 h-5 text-green-500" />
                                <span className='text-gray-700 font-regular'>Crecimiento continuo</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-64 md:h-auto">
                        <img
                            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                            alt="Oficina REMAX NOA"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div

                className="max-w-7xl mx-auto text-center"
            >
                <h2 className="text-3xl font-bold mb-6">¿Listo para dar el siguiente paso?</h2>
                <Link href={'/nuevaLanding/forma-parte'} className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors">
                    Únete a REMAX NOA
                </Link>
            </div>
        </div>
    );
}