"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from './Hero';
import { CVUploadForm } from './CVUploadForm';
import { Features } from './Features';

export function CVUploadSection() {
    return (
        <div className="relative min-h-screen bg-gray-50">
            <Hero />

            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
            >
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mt-[-3rem] sm:mt-[-5rem] lg:mt-[-6rem] backdrop-blur-sm bg-white/95"
                >
                    <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                            Sube tu Currículum
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 px-4">
                            Comparte tu experiencia profesional con nosotros. Sube tu CV en formato PDF
                            y nos pondremos en contacto contigo pronto.
                        </p>
                    </div>

                    <CVUploadForm />
                </motion.div>

                <Features />
            </motion.section>
        </div>
    );
}
// "use client"
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Globe, Trophy, Users, Building2 } from 'lucide-react';

// const highlights = [
//     {
//         icon: Globe,
//         text: 'Red Global #1',
//     },
//     {
//         icon: Trophy,
//         text: 'Líder Mundial',
//     },
//     {
//         icon: Users,
//         text: '+140,000 Agentes',
//     },
//     {
//         icon: Building2,
//         text: '+8,000 Oficinas',
//     },
// ];

// export function CVUploadSection() {
//     return (
//         <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] ">
//             <motion.div
//                 initial={{ scale: 1.1 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 1.5 }}
//                 className="absolute inset-0"
//             >
//                 <img
//                     src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
//                     alt="Modern office workspace"
//                     className="w-full h-full object-cover"
//                 />
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 1 }}
//                     className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/85 to-blue-900/75"
//                 />
//             </motion.div>

//             <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between py-6 sm:py-8">
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8 }}
//                     className="max-w-2xl pt-2 sm:pt-4"
//                 >
//                     <motion.h1
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8, delay: 0.2 }}
//                         className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-white"
//                     >
//                         Únete al Líder Inmobiliario Mundial
//                     </motion.h1>
//                     <motion.p
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8, delay: 0.4 }}
//                         className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200"
//                     >
//                         Forma parte de RE/MAX, la red inmobiliaria más grande del mundo
//                     </motion.p>
//                 </motion.div>

//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 0.6 }}
//                     className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6"
//                 >
//                     {highlights.map((item, index) => (
//                         <motion.div
//                             key={index}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.5, delay: 0.2 * index }}
//                             className="flex items-center justify-center sm:justify-start space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3"
//                         >
//                             <item.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white flex-shrink-0" />
//                             <span className="text-xs sm:text-sm lg:text-base font-medium text-white whitespace-nowrap">{item.text}</span>
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             </div>


//         </div>
//     );
// }