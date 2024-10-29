import React from 'react';
import { Trophy, TrendingUp } from 'lucide-react';

export const HeaderRanking = () => {
    return (
        <header

            className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 sm:py-20 px-4 sm:px-6 rounded-b-[2.5rem] sm:rounded-b-3xl overflow-hidden"
        >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center" />

            <div className="relative max-w-6xl mx-auto">
                <div

                    className="flex items-center justify-center mb-4 sm:mb-6"
                >
                    <Trophy className="w-12 h-12 sm:w-16 sm:h-16" />
                </div>

                <h1

                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4"
                >
                    Ranking de Mejores Agentes
                </h1>

                <p

                    className="text-lg sm:text-xl text-center text-blue-100 max-w-2xl mx-auto"
                >
                    Reconociendo la excelencia en el desempeño inmobiliario y celebrando a nuestros mejores empleados del mes.
                </p>

                <div

                    className="flex items-center justify-center gap-3 mt-6 sm:mt-8"
                >
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-base sm:text-lg">Clasificaciones mensuales</span>
                </div>
            </div>
        </header>
    );
};