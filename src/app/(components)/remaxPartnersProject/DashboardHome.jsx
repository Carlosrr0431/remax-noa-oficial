import React from 'react';
import { Trophy, TrendingUp, Users, Bell, Gift, Crown, Star, Award, Newspaper } from 'lucide-react';
import Blog from './Blog';

export const DashboardHome = () => {

    const topReferrers = [
        { name: 'Ana García', points: 1850, badge: 'Diamante', avatar: 'https://i.pravatar.cc/150?img=1' },
        { name: 'Carlos Ruiz', points: 1650, badge: 'Platino', avatar: 'https://i.pravatar.cc/150?img=2' },
        { name: 'María López', points: 1450, badge: 'Oro', avatar: 'https://i.pravatar.cc/150?img=3' },
        { name: 'Juan Pérez', points: 1250, badge: 'Plata', avatar: 'https://i.pravatar.cc/150?img=4' },
        { name: 'Laura Torres', points: 1050, badge: 'Bronce', avatar: 'https://i.pravatar.cc/150?img=5' },
    ];

    const rewards = [
        {
            name: 'iPhone 15 Pro',
            points: 5000,
            image: 'https://img.freepik.com/foto-gratis/maqueta-telefono-inteligente-mesa-marmol-blanco-espacio-copiar_1142-40728.jpg?ga=GA1.1.1434243888.1730995910&semt=ais_hybrid',
            progress: 25,
        },
        {
            name: 'MacBook Air',
            points: 8000,
            image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=60',
            progress: 15,
        },
        {
            name: 'Viaje a Cancún',
            points: 12000,
            image: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=800&auto=format&fit=crop&q=60',
            progress: 10,
        },
    ];

    const notifications = [
        {
            id: 1,
            title: 'Nuevo referido registrado',
            message: 'Tu referido Juan Pérez ha sido registrado exitosamente.',
            time: '2 horas',
        },
        {
            id: 2,
            title: 'Puntos acreditados',
            message: 'Has recibido 100 puntos por tu último referido exitoso.',
            time: '5 horas',
        },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                <h1 className="text-3xl font-bold mb-2">¡Bienvenido, Carlos RR!</h1>
                <p className="text-blue-100">Continúa refiriendo y gana increíbles premios.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                        <div className="flex items-center">
                            <Trophy className="h-8 w-8 text-yellow-300" />
                            <div className="ml-4">
                                <p className="text-sm text-blue-100">Puntos Totales</p>
                                <p className="text-2xl font-bold">1,250</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                        <div className="flex items-center">
                            <Users className="h-8 w-8 text-blue-300" />
                            <div className="ml-4">
                                <p className="text-sm text-blue-100">Referidos Activos</p>
                                <p className="text-2xl font-bold">25</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                        <div className="flex items-center">
                            <Crown className="h-8 w-8 text-yellow-400" />
                            <div className="ml-4">
                                <p className="text-sm text-blue-100">Nivel Actual</p>
                                <p className="text-2xl font-bold">Platino</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Rankings Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Top Referidores</h2>
                            <TrendingUp className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="space-y-4">
                            {topReferrers.map((referrer, index) => (
                                <div
                                    key={referrer.name}
                                    className="flex items-center p-4 bg-gray-50 rounded-xl transition-transform hover:scale-[1.02]"
                                >
                                    <div className="flex-shrink-0 relative">
                                        {/* <img
                                            src={referrer.avatar}
                                            alt={referrer.name}
                                            className="h-12 w-12 rounded-full"
                                        /> */}
                                        {index < 3 && (
                                            <div className="absolute -top-1 -right-1 h-6 w-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                {index + 1}
                                            </div>
                                        )}
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <h3 className="text-sm font-semibold text-gray-900">{referrer.name}</h3>
                                        <div className="flex items-center mt-1">
                                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                            <span className="text-sm text-gray-600">{referrer.points} puntos</span>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                    ${index === 0 ? 'bg-blue-100 text-blue-800' :
                                            index === 1 ? 'bg-gray-100 text-gray-800' :
                                                index === 2 ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-600'}`}>
                                        {referrer.badge}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Rewards Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Premios Disponibles</h2>
                            <Gift className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="space-y-4">
                            {rewards.map((reward) => (
                                <div
                                    key={reward.name}
                                    className="group relative overflow-hidden rounded-xl transition-all hover:shadow-md"
                                >
                                    <img
                                        src={reward.image}
                                        alt={reward.name}
                                        className="w-full h-32 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 p-4 flex flex-col justify-end">
                                        <h3 className="text-white font-semibold">{reward.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-white/90">{reward.points} puntos</span>
                                            <Award className="h-5 w-5 text-yellow-400" />
                                        </div>
                                        <div className="mt-2 bg-white/20 rounded-full h-1.5">
                                            <div
                                                className="bg-blue-500 h-full rounded-full"
                                                style={{ width: `${reward.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Notificaciones Recientes</h2>
                    <Bell className="h-5 w-5 text-blue-600" />
                </div>
                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">{notification.title}</p>
                                <p className="text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-sm text-gray-500 mt-2">Hace {notification.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Blog Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Blog Inmobiliario</h2>
                    <Newspaper className="h-5 w-5 text-blue-600" />
                </div>
                <Blog />
            </div>
        </div>
    );
}