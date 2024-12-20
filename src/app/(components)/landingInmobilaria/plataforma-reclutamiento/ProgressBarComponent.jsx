import { motion } from 'framer-motion'
import { CheckIcon, FileText, Calendar, User, CheckCircle } from 'lucide-react'

export default function ProgressBarComponent({ currentStep, totalSteps }) {
    const steps = [
        { name: 'Recordatorio', icon: FileText },
        { name: 'Programación', icon: Calendar },
        { name: 'Datos Personales', icon: User },
        { name: 'Confirmación', icon: CheckCircle }
    ];

    return (
        <div className="mb-6 sm:mb-8 relative">
            <div className="flex justify-between items-center">
                {steps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                        <motion.div
                            key={i}
                            className="flex flex-col items-center relative z-10"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <motion.div
                                className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-white border-2 ${i + 1 <= currentStep ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-400'
                                    }`}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.2 + 0.2, type: 'spring', stiffness: 260, damping: 20 }}
                            >
                                {i + 1 < currentStep ? (
                                    <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                                ) : (
                                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                                )}
                            </motion.div>
                            <span className="mt-2 text-xs sm:text-sm text-gray-500 text-center hidden sm:block">
                                {step.name}
                            </span>
                        </motion.div>
                    );
                })}
            </div>
            <motion.div
                className="absolute top-5 sm:top-6 md:top-7 left-0 right-0 h-0.5 bg-gray-200"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="h-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                />
            </motion.div>
        </div>
    )
}
