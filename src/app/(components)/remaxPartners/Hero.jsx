import React from 'react';
import { ArrowRight } from 'lucide-react';

import Video from '../../public/landingComunidad.mp4'

export default function Hero() {
    return (
        <div className="relative min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto section-padding container-padding">
                <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                    <div className="lg:col-span-6 xl:col-span-5">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                            <span className=" mb-2 block bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">Únete a la comunidad de</span>
                            <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                referidores inmobiliarios
                            </span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
                            Forma parte de la red más grande de referidores inmobiliarios. Gana puntos,
                            obtén reconocimiento y accede a premios exclusivos por tus referencias exitosas.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <a
                                href="#"
                                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Comenzar ahora
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </a>
                            <a
                                href="#features"
                                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                            >
                                Conoce más
                            </a>
                        </div>
                    </div>
                    <div className="mt-12 lg:mt-0 lg:col-span-6 xl:col-span-7">
                        <div className="relative">
                            <video
                                src={Video}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full rounded-2xl shadow-2xl ring-1 ring-gray-900/10"
                            >

                            </video>
                            {/* <img
                                className="w-full rounded-2xl shadow-2xl ring-1 ring-gray-900/10"
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80"
                                alt="Real Estate Community"
                            /> */}
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}