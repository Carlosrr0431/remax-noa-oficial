import React from 'react';
import { Star, TrendingUp, Award } from 'lucide-react';

export default function Rankings() {
    const topReferrers = [
        { name: 'Ana García', points: 1250, referrals: 25 },
        { name: 'Carlos Rodríguez', points: 980, referrals: 19 },
        { name: 'María López', points: 850, referrals: 17 },
        { name: 'Juan Martínez', points: 720, referrals: 14 },
        { name: 'Laura Torres', points: 650, referrals: 13 },
    ];

    return (
        <section id="rankings" className="section-padding bg-blue-50">
            <div className="max-w-7xl mx-auto container-padding">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
                        Rankings
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Nuestros mejores referidores
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {topReferrers.map((referrer, index) => (
                        <div
                            key={referrer.name}
                            className="bg-white rounded-2xl shadow-lg p-6 card-hover"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    {index === 0 ? (
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 flex items-center justify-center">
                                            <Award className="h-6 w-6 text-white" />
                                        </div>
                                    ) : (
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-gray-200 to-gray-100 flex items-center justify-center">
                                            <span className="text-gray-600 font-bold text-lg">{index + 1}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-lg font-semibold text-gray-900 truncate">
                                        {referrer.name}
                                    </p>
                                    <div className="flex items-center mt-1 space-x-4">
                                        <div className="flex items-center text-blue-600">
                                            <Star className="h-4 w-4 mr-1" />
                                            <span className="text-sm">{referrer.points} puntos</span>
                                        </div>
                                        <div className="flex items-center text-green-600">
                                            <TrendingUp className="h-4 w-4 mr-1" />
                                            <span className="text-sm">{referrer.referrals} referidos</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}