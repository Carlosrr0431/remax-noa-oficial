"use client"

import React, { useState } from 'react';
import { Building2, Bell } from 'lucide-react';
import { ReferralList } from '@/app/(components)/comunidadAgentesReferidos/ReferralList';
import ListaReferidos from '@/app/(components)/comunidadAgentesReferidos/ListaReferidos';

const initialReferrals = [
    {
        id: '1',
        name: 'Ale Rodriguez',
        email: 'john@example.com',
        phone: '+1234567890',
        type: 'buyer',
        status: 'pending',
        notes: '',
        assignedAgent: 'Agent Smith',
        createdAt: '2024-03-10T10:00:00Z',
        updatedAt: '2024-03-10T10:00:00Z'
    },
    {
        id: '2',
        name: 'Nicolas Pacheco',
        email: 'jane@example.com',
        phone: '+1987654321',
        type: 'seller',
        status: 'in_negotiation',
        notes: '',
        assignedAgent: 'Agent Smith',
        createdAt: '2024-03-09T15:30:00Z',
        updatedAt: '2024-03-10T09:00:00Z',
        propertyDetails: {
            address: '123 Luxury Ave, Downtown',
            price: 500000,
            propertyType: 'Apartment'
        }
    },
    {
        id: '3',
        name: 'Jimena',
        email: 'robert@example.com',
        phone: '+1122334455',
        type: 'buyer',
        status: 'contacted',
        notes: '',
        assignedAgent: 'Agent Smith',
        createdAt: '2024-03-08T14:20:00Z',
        updatedAt: '2024-03-09T11:30:00Z'
    }
];

const AgentesReferidos = () => {
    const [referrals, setReferrals] = useState(initialReferrals);

    const handleStatusChange = (id, newStatus) => {
        setReferrals(prevReferrals =>
            prevReferrals.map(referral =>
                referral.id === id
                    ? { ...referral, status: newStatus, updatedAt: new Date().toISOString() }
                    : referral
            )
        );
    };

    return (
        <div className=" bg-gray-50 w-full h-full relative overflow-y-scroll">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Building2 className="h-8 w-8 text-blue-600" />
                            <h1 className="ml-3 text-xl font-semibold text-gray-900">
                                Portal de Referidos
                            </h1>
                        </div>
                        <div className="flex items-center gap-6">
                            <button className="relative text-gray-400 hover:text-gray-500">
                                <Bell className="h-6 w-6" />
                                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 text-xs text-white flex items-center justify-center">
                                    3
                                </span>
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
                                    AR
                                </div>
                                <span className="text-sm text-gray-600">Alejandro Rodriguez</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="pb-12">
                <ListaReferidos
                // referrals={referrals}
                // onStatusChange={handleStatusChange}
                />
            </main>
        </div>
    );
}

export default AgentesReferidos
