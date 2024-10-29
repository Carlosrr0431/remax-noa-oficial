import React from 'react';
import { DollarSign, Home, Users, Target } from 'lucide-react';
import { agents } from '../data/agents';

export const Stats = () => {
    const totalRevenue = agents.reduce((sum, agent) => sum + agent.revenue, 0);
    const totalSales = agents.reduce((sum, agent) => sum + agent.sales, 0);
    const totalProperties = agents.reduce((sum, agent) => sum + agent.properties, 0);

    const stats = [
        {
            icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
            label: 'Ingresos Totales',
            value: `$${(totalRevenue / 1000000).toFixed(1)}M`,
            color: 'bg-blue-500'
        },
        {
            icon: <Home className="w-6 h-6 sm:w-8 sm:h-8" />,
            label: 'Propiedades Vendidas',
            value: totalProperties,
            color: 'bg-green-500'
        },
        {
            icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
            label: 'Ventas Totales',
            value: totalSales,
            color: 'bg-purple-500'
        },
        {
            icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
            label: 'Rendimiento Promedio',
            value: '91.6%',
            color: 'bg-orange-500'
        }
    ];

    return (
        <section className="py-8 sm:py-12 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}

                            className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
                        >
                            <div className={`inline-flex p-2 sm:p-3 rounded-lg ${stat.color} text-white mb-3 sm:mb-4`}>
                                {stat.icon}
                            </div>
                            <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                                {stat.value}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};