"use client"

import Header from '@/app/(components)/landingInmobilaria/comprar/Header'
import SeccionReclutar from '@/app/(components)/landingInmobilaria/reclutarAgentes/SeccionReclutar'
import React from 'react'

const Reclutamiento = () => {
    return (

        <div className="min-h-screen bg-white w-full h-full overflow-y-auto">
            <Header />
            <div className="pt-16"> {/* Add padding to account for fixed header */}

                <main>
                    <div className="min-h-screen bg-white">
                        <SeccionReclutar />
                    </div>

                </main>
            </div>
        </div>
    )

}

export default Reclutamiento
