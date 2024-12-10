import React from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MobileMenu = ({
    activeSection,
    onSectionChange,
    menuItems,
}) => {
    const activeIndex = menuItems.findIndex(item => item.id === activeSection);

    const handleDragEnd = (event, info) => {
        if (Math.abs(info.offset.x) < 30) return;

        const direction = info.offset.x > 0 ? -1 : 1;
        const newIndex = activeIndex + direction;

        if (newIndex >= 0 && newIndex < menuItems.length) {
            onSectionChange(menuItems[newIndex].id);
        }
    };

    const navigate = (direction) => {
        const newIndex = activeIndex + direction;
        if (newIndex >= 0 && newIndex < menuItems.length) {
            onSectionChange(menuItems[newIndex].id);
        }
    };

    return (
        <div className="relative w-full py-4">
            <AnimatePresence mode="wait">
                {activeIndex > 0 && (
                    <motion.div
                        key="left-arrow"
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button
                            onClick={() => navigate(-1)}
                            className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all"
                            disabled={activeIndex === 0}
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                    </motion.div>
                )}

                {activeIndex < menuItems.length - 1 && (
                    <motion.div
                        key="right-arrow"
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button
                            onClick={() => navigate(1)}
                            className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all"
                            disabled={activeIndex === menuItems.length - 1}
                        >
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="flex items-center justify-center w-full overflow-hidden touch-pan-x"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
            >
                <motion.div
                    className="flex items-center justify-center w-full"
                    animate={{ x: `${-activeIndex * 100}%` }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        mass: 0.8
                    }}
                >
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.id}
                                className="w-full flex-shrink-0 px-4"
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.button
                                    onClick={() => onSectionChange(item.id)}
                                    className={`w-full flex items-center justify-center space-x-3 p-4 rounded-xl ${activeSection === item.id
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                        } transition-all duration-300 ease-out`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.text}</span>
                                </motion.button>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>

            <div className="flex justify-center mt-6 space-x-2">
                {menuItems.map((item, index) => (
                    <motion.button
                        key={`indicator-${item.id}`}
                        onClick={() => onSectionChange(item.id)}
                        className="relative w-8 h-2 rounded-full overflow-hidden"
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gray-200"
                            initial={false}
                            animate={{
                                backgroundColor: activeSection === item.id ? '#2563eb' : '#e5e7eb'
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default MobileMenu;