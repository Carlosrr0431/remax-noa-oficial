import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Trophy, TrendingUp, Users } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Statistics() {
    const stats = [
        {
            name: 'Total de Puntos',
            value: '1,250',
            icon: Trophy,
            change: '+12%',
            changeType: 'increase',
        },
        {
            name: 'Referidos Exitosos',
            value: '25',
            icon: Users,
            change: '+5%',
            changeType: 'increase',
        },
        {
            name: 'Posición Ranking',
            value: '#3',
            icon: TrendingUp,
            change: '+2',
            changeType: 'increase',
        },
    ];

    const lineChartData = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Puntos Mensuales',
                data: [150, 280, 420, 390, 500, 550],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
            },
        ],
    };

    const barChartData = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Referidos por Mes',
                data: [3, 5, 8, 7, 9, 11],
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
            },
        ],
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Estadísticas</h1>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
                {stats.map((item) => (
                    <div
                        key={item.name}
                        className="bg-white overflow-hidden shadow rounded-lg"
                    >
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <item.icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            {item.name}
                                        </dt>
                                        <dd className="flex items-baseline">
                                            <div className="text-2xl font-semibold text-gray-900">
                                                {item.value}
                                            </div>
                                            <div
                                                className={`ml-2 flex items-baseline text-sm font-semibold ${item.changeType === 'increase'
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                                    }`}
                                            >
                                                {item.change}
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Progreso de Puntos</h2>
                    <Line data={lineChartData} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Referidos por Mes</h2>
                    <Bar data={barChartData} />
                </div>
            </div>
        </div>
    );
}