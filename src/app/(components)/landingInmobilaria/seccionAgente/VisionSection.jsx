import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Target, Rocket } from 'lucide-react';

const features = [
    {
        icon: Target,
        title: 'Pasión por el servicio al cliente',
        color: 'text-red-500',
        description: 'La pasión por el servicio al cliente es el corazón de todo lo que hacemos.'
    },
    {
        icon: Building2,
        title: 'Excelencia en cada operación',
        color: 'text-blue-500',
        description: 'Cuidamos cada detalle para ofrecerte servicios de la más alta calidad.'
    },
    {
        icon: Rocket,
        title: 'Crecimiento continuo',
        color: 'text-green-500',
        description: 'Nos adaptamos, aprendemos y mejoramos constantemente.'
    },
];

const VisionSection = () => {
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
                            <Building2 className="w-12 h-12 text-blue-600 mb-4" />
                        </motion.div>
                        <h2 className="text-4xl font-bold text-gray-900">Nuestra Visión</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Ser la inmobiliaria líder en el NOA, reconocida por su excelencia en servicio,
                            innovación constante y compromiso con el desarrollo profesional de nuestros agentes.
                        </p>

                        <div className="space-y-8 mt-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.2 }}
                                    className="flex items-start space-x-4"
                                >
                                    <feature.icon className="w-6 h-6 text-red-500 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                                        <p className="text-gray-600 mt-1 text-[17px]">{feature.description}</p>
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
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                                alt="Vision y Valores"
                                className="w-full h-[600px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                <div className="p-8 text-white">
                                    <h3 className="text-3xl font-bold mb-2">Vision y Valores</h3>
                                    <p className="text-lg opacity-90">
                                        Ser la inmobiliaria líder en el NOA, reconocida por su excelencia en servicio,
                                        innovación constante y compromiso con el desarrollo profesional de nuestros agentes.
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

export default VisionSection;




// import React from 'react';
// import { motion } from 'framer-motion';
// import { Building2, Target, Rocket } from 'lucide-react';

// const features = [
//     {
//         icon: Target,
//         title: 'Pasión por el servicio al cliente',
//         color: 'text-red-500',
//         description: 'Accede a una red internacional de más de 130,000 agentes en más de 110 países.'
//     },
//     {
//         icon: Building2,
//         title: 'Excelencia en cada operación',
//         color: 'text-blue-500',
//         description: 'Accede a una red internacional de más de 130,000 agentes en más de 110 países.'
//     },
//     {
//         icon: Rocket,
//         title: 'Crecimiento continuo',
//         color: 'text-green-500',
//         description: 'Accede a una red internacional de más de 130,000 agentes en más de 110 países.'
//     },
// ];

// const VisionSection = () => {
//     return (
//         <section className="min-h-screen  bg-gradient-to-b from-gray-50 to-white">
//             <div className="max-w-7xl mx-auto px-4 py-16">
//                 <div className="grid md:grid-cols-2 gap-12 items-center">
//                     <motion.div
//                         initial={{ opacity: 0, x: -50 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.8 }}
//                         className="space-y-6 mb-10"
//                     >
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ delay: 0.2 }}
//                             className="inline-block"
//                         >
//                             <Building2 className="w-12 h-12 text-blue-600 mb-4" />
//                         </motion.div>
//                         <h2 className="text-4xl font-bold text-gray-900">Nuestra Visión</h2>
//                         <p className="text-lg text-gray-600 leading-relaxed">
// Ser la inmobiliaria líder en el NOA, reconocida por su excelencia en servicio,
// innovación constante y compromiso con el desarrollo profesional de nuestros agentes.
//                         </p>

//                         <div className="space-y-6 mt-8">
//                             {features.map((feature, index) => (
//                                 <motion.div
//                                     key={index}
//                                     initial={{ opacity: 0, y: 20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: 0.4 + index * 0.2 }}
//                                     className="flex items-center space-x-4"
//                                 >
//                                     <feature.icon className={`w-6 h-6 ${feature.color}`} />
//                                     <div>
//                                         <span className="text-lg text-gray-700">{feature.title}</span>
//                                         <p className="text-gray-600 mt-1">{feature.description}</p>
//                                     </div>
//                                 </motion.div>
//                             ))}
//                         </div>
//                     </motion.div>

//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.8 }}
//                         className="relative"
//                     >
//                         <div className="rounded-2xl overflow-hidden shadow-2xl">
// <img
//     src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
//     alt="Vision y Valores"
//     className="w-full h-[600px] object-cover"
// />
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
//                                 <div className="p-8 text-white">
//                                     <h3 className="text-3xl font-bold mb-2">Visión y Valores</h3>
//                                     <p className="text-lg opacity-90">
// Ser la inmobiliaria líder en el NOA, reconocida por su excelencia en servicio,
// innovación constante y compromiso con el desarrollo profesional de nuestros agentes.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default VisionSection;


// import { Building2, Target, Rocket } from 'lucide-react';

// const features = [
//     {
//         icon: Target,
//         title: 'Pasión por el servicio al cliente',
//         color: 'text-red-500',
//         description: 'Accede a una red internacional de más de 130,000 agentes en más de 110 países.'
//     },
//     {
//         icon: Building2,
//         title: 'Excelencia en cada operación',
//         color: 'text-blue-500',
//         description: 'Accede a una red internacional de más de 130,000 agentes en más de 110 países.'
//     },
//     {
//         icon: Rocket,
//         title: 'Crecimiento continuo',
//         color: 'text-green-500',
//         description: 'Accede a una red internacional de más de 130,000 agentes en más de 110 países.'
//     },
// ];