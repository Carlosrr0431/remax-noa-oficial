import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Trophy, Briefcase } from 'lucide-react';

export const AgentModal = ({ agent, isOpen, onClose }) => {
    if (!agent) return null;

    const progressToGoal = (agent.revenue / agent.monthlyGoal) * 100;

    return (

        <>

            {isOpen && (
                <div

                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
                    onClick={onClose}
                >
                    <div

                        className="bg-white rounded-2xl w-full max-w-2xl p-4 sm:p-6 relative my-8"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-gray-100"
                        >
                            <X className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
                            <img
                                src={agent.avatar}
                                alt={agent.name}
                                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                            />
                            <div className="text-center sm:text-left">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{agent.name}</h2>
                                <p className="text-sm sm:text-base text-gray-600 mt-1">{agent.bio}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8">
                            <div className="bg-blue-50 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Target className="w-5 h-5 text-blue-600" />
                                    <h3 className="font-semibold text-blue-900">
                                        Progreso de la meta mensual</h3>
                                </div>
                                <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                        <div className="text-xs font-semibold text-blue-700">
                                            ${agent.revenue.toLocaleString()}
                                        </div>
                                        <div className="text-xs font-semibold text-blue-700">
                                            ${agent.monthlyGoal.toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                        <div

                                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-purple-50 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <Trophy className="w-5 h-5 text-purple-600" />
                                    <h3 className="font-semibold text-purple-900">Logros</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {agent.achievements.map(achievement => (
                                        <div
                                            key={achievement.id}

                                            className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow-sm"
                                        >
                                            <span className="text-lg text-black/80 sm:text-xl">{achievement.icon}</span>
                                            <span className="text-xs text-black/80 sm:text-sm font-medium">{achievement.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Briefcase className="w-5 h-5 text-gray-600" />
                                <h3 className="font-semibold text-gray-900">Especialidades</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {agent.specialties.map((specialty, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-xs sm:text-sm"
                                    >
                                        {specialty}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
};