import React from 'react';
import { Building2, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        {/* <div className="flex items-center space-x-2">
                            <Building2 className="h-8 w-8 text-blue-500" />
                            <span className="text-xl font-bold text-white">PropConnect</span>
                        </div> */}
                        <p className="text-gray-400 text-sm">
                            Conectando referidores inmobiliarios con oportunidades únicas.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Compañía</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                    Acerca de
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                    Empleos
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                    Prensa
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Recursos</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                    Guías
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                    Documentación
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                    Tutoriales
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                    Privacidad
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                    Términos
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                    Cookies
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                                    Licencias
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800">
                    <p className="text-center text-gray-400 text-sm">
                        &copy; 2024 RE/MAX NOA. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}