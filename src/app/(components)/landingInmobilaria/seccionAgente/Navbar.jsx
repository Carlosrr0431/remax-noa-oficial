import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Target, Users } from 'lucide-react';


const menuItems = [
    { id: 'vision', icon: Building2, text: 'Visión y Valores' },
    { id: 'why', icon: Target, text: '¿Por qué RE/MAX NOA?' },
    { id: 'agent', icon: Users, text: 'Ser Agente Inmobiliario' }
];

const Navbar = ({ activeSection, onSectionChange }) => {
    return (
        <nav className="w-full bg-white shadow-md rounded-lg my-4">
            <div className="max-w-7xl mx-auto px-4 py-2">
                <motion.div
                    className="flex flex-row items-center justify-center gap-4 lg:gap-8 py-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {menuItems.map((item) => (
                        <motion.button
                            key={item.id}
                            onClick={() => onSectionChange(item.id)}
                            className={`flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 text-sm lg:text-base
                ${activeSection === item.id
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <item.icon className="w-5 h-5 mr-2" />
                            <span>{item.text}</span>
                        </motion.button>
                    ))}
                </motion.div>
            </div>
        </nav>
    );
};

export default Navbar;