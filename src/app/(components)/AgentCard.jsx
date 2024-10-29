import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Award, ChevronRight } from 'lucide-react';


export const AgentCard = ({ agent, index, onClick }) => {
    const trendIcon = {
        up: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />,
        down: <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />,
        stable: <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
    };

    return (
        <div

            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all cursor-pointer group"
            onClick={onClick}
        >
            <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative">
                    <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                    />
                    {agent.rank <= 3 && (
                        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-yellow-400 rounded-full p-1">
                            <Award className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-1 sm:gap-2 truncate">
                        {agent.name}
                        <ChevronRight className="w-4 h-4 text-gray-400 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                    </h3>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                        {trendIcon[agent.trend]}
                        <span>Ranking #{agent.rank}</span>
                    </div>
                </div>

                <div className="text-right flex-shrink-0">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">
                        ${(agent.revenue / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">Ganancia</div>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t">
                <div>
                    <div className="text-xs sm:text-sm text-gray-500">Ventas</div>
                    <div className="text-base sm:text-lg font-semibold text-black/80">{agent.sales}</div>
                </div>
                <div>
                    <div className="text-xs sm:text-sm text-gray-500">Propiedades</div>
                    <div className="text-base sm:text-lg font-semibold text-black/80">{agent.properties}</div>
                </div>
                <div>
                    <div className="text-xs sm:text-sm text-gray-500">Performance</div>
                    <div className="text-base sm:text-lg font-semibold text-blue-600">{agent.performance}%</div>
                </div>
            </div>

            <div className="mt-4 flex gap-2 items-center">
                {agent.achievements.slice(0, 3).map(achievement => (
                    <span
                        key={achievement.id}
                        className="text-xl sm:text-2xl"
                        title={achievement.name}
                    >
                        {achievement.icon}
                    </span>
                ))}
                {agent.achievements.length > 3 && (
                    <span className="text-xs sm:text-sm text-gray-500 self-end">
                        +{agent.achievements.length - 3} more
                    </span>
                )}
            </div>
        </div>
    );
};