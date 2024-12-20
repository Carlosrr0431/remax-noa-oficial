import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import { CarouselNavigation } from './CarouselNavigation';
import VisionSection from './VisionSection';
import WhySection from './WhySection';
import AgentSection from './AgentSection';

function SeccionAgente() {
    const [activeSection, setActiveSection] = useState('vision');

    const sections = [
        { id: 'vision', component: VisionSection },
        { id: 'why', component: WhySection },
        { id: 'agent', component: AgentSection },
    ];

    const currentIndex = sections.findIndex(section => section.id === activeSection);

    const navigate = (direction) => {
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < sections.length) {
            setActiveSection(sections[newIndex].id);
        }
    };

    const handleDragEnd = (event, info) => {
        if (Math.abs(info.offset.x) < 50) return;
        const direction = info.offset.x > 0 ? -1 : 1;
        navigate(direction);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <div className="container mx-auto px-4 hidden sm:block">
                <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSection}
                    className="w-full touch-pan-x"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                    }}
                >
                    {sections.map(section => (
                        section.id === activeSection && <section.component key={section.id} />
                    ))}
                </motion.div>
            </AnimatePresence>

            <CarouselNavigation
                currentIndex={currentIndex}
                totalSections={sections.length}
                onNavigate={navigate}
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                sections={sections}
            />
        </div>
    );
}

export default SeccionAgente;