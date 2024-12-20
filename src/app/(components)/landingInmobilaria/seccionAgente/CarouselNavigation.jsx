import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CarouselNavigation = ({
    currentIndex,
    totalSections,
    onNavigate,
    activeSection,
    onSectionChange,
    sections,
}) => {
    return (
        <>
            {/* Navigation Arrows */}
            {currentIndex > 0 && (
                <motion.button
                    key="prev"
                    className="fixed left-4 top-1/2 -translate-y-1/2 z-10 sm:hidden"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onClick={() => onNavigate(-1)}
                >
                    <div className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg">
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </div>
                </motion.button>
            )}

            {currentIndex < totalSections - 1 && (
                <motion.button
                    key="next"
                    className="fixed right-4 top-1/2 -translate-y-1/2 z-10 sm:hidden"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onClick={() => onNavigate(1)}
                >
                    <div className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg">
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                    </div>
                </motion.button>
            )}

            {/* Progress Indicators */}
            <div className="fixed bottom-6 left-0 right-0 flex justify-center space-x-2 sm:hidden z-10">
                {sections.map((section) => (
                    <motion.button
                        key={section.id}
                        onClick={() => onSectionChange(section.id)}
                        className="relative w-6 h-1.5 rounded-full overflow-hidden"
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="absolute inset-0"
                            initial={false}
                            animate={{
                                backgroundColor: activeSection === section.id ? '#2563eb' : 'rgba(255,255,255,0.5)',
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>
                ))}
            </div>
        </>
    );
};