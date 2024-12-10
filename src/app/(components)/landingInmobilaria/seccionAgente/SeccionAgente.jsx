import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import VisionSection from './VisionSection';
import WhySection from './WhySection';
import AgentSection from './AgentSection';

function SeccionAgente() {
    const [activeSection, setActiveSection] = useState('vision');

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4">
                <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }} 
                >
                    {activeSection === 'vision' && <VisionSection />}
                    {activeSection === 'why' && <WhySection />}
                    {activeSection === 'agent' && <AgentSection />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default SeccionAgente;