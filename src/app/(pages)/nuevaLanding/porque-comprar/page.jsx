"use client"

import Header from '@/app/(components)/landingInmobilaria/comprar/Header';
import MainMenu from '@/app/(components)/landingInmobilaria/comprar/MainMenu';
import PorqueRemax from '@/app/(components)/landingInmobilaria/comprar/secciones/PorqueRemax';
import VenderEnRemax from '@/app/(components)/landingInmobilaria/comprar/secciones/VenderEnRemax';
import React, { useState } from 'react';

function PorqueComprar() {
    const [activeSection, setActiveSection] = useState('why');

    return (
        <div className="min-h-screen bg-white h-full w-full overflow-y-auto">
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

export default PorqueComprar;
