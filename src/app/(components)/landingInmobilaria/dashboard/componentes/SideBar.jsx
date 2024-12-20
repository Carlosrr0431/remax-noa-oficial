'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Building, Users, BarChart, PlusCircle, Settings, Newspaper, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { User, BarChart2, LogOut, X } from 'lucide-react';
import Agentes from '../agentes/Agentes'
import Noticias from '../noticias/Noticias'
import Inicio from '../inicio/Inicio'
import Propiedades from '../propiedades/Propiedades'
import Estadistica from '../estadistica/Estadistica'

const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: Building, label: 'Propiedades', href: '/properties' },
    { icon: Users, label: 'Agentes', href: '/agents' },
    { icon: BarChart, label: 'Estadísticas', href: '/statistics' },
    { icon: Newspaper, label: 'Noticias', href: '/news' },

]

export function Sidebar() {
    const [currentSection, setCurrentSection] = useState('home');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigation = [
        { id: 'home', name: 'Inicio', icon: Home },
        { id: 'profile', name: 'Agentes', icon: User },
        { id: 'statistics', name: 'Noticias', icon: BarChart2 },
        { id: 'contacts', name: 'Propiedades', icon: Users },
        { id: 'blog', name: 'Estadistica', icon: Newspaper },
    ];

    const renderContent = () => {
        switch (currentSection) {
            case 'home':
                return <Inicio />;
            case 'profile':
                return <Agentes />;

            case 'statistics':
                return <Noticias />;
            case 'contacts':
                return <Propiedades />;
            case 'blog':
                return <Estadistica />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 h-full w-full overflow-y-auto">
            {/* Mobile menu button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-lg bg-white shadow-lg text-gray-600 hover:text-blue-600 transition-colors"
                >
                    {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                <div className="h-full flex flex-col">
                    {/* User Profile Section */}
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center space-x-4">

                            <div className="flex-1 min-w-0">
                                <h2 className="text-sm font-semibold text-gray-900 truncate">
                                    Carlos RR
                                </h2>
                                <p className="text-xs text-gray-500 truncate">carlos.facundo.rr@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        {navigation.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setCurrentSection(item.id);
                                    setIsSidebarOpen(false);
                                }}
                                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                  ${currentSection === item.id
                                        ? 'bg-blue-50 text-blue-600 shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <item.icon className="h-5 w-5 mr-3" />
                                {item.name}
                            </button>
                        ))}
                    </nav>


                    <div className="p-4 border-t border-gray-100">
                        <button

                            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        >
                            <LogOut className="h-5 w-5 mr-3" />
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </aside>

            <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-64'}`}>
                <div className="min-h-screen p-4 lg:p-8 pt-20 lg:pt-8">
                    <div className="max-w-7xl mx-auto">
                        {renderContent()}
                    </div>
                </div>
            </main>
        </div>
    );
}