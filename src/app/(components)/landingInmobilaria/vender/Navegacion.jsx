"use client"

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Phone, Menu, X } from 'lucide-react';
import PorqueRemax from './secciones/PorqueRemax';
import VenderEnRemax from './secciones/VenderEnRemax';
import Header from '../comprar/Header';
import MainMenu from './MainMenu';


const Navegacion = () => {
    const [activeSection, setActiveSection] = useState('why');

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="pt-16"> {/* Add padding to account for fixed header */}
                <MainMenu
                    activeSection={activeSection}
                    onSectionChange={setActiveSection}
                />
                <main>
                    {activeSection === 'why' && <PorqueRemax />}
                    {activeSection === 'buy' && <VenderEnRemax />}
                </main>
            </div>
        </div>
    );
}

export default Navegacion;