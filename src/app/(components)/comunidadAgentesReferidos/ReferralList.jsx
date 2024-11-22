"use client"

import React, { useState } from 'react';
import { Search, Filter, ListFilter } from 'lucide-react';
import { ReferralCard } from './ReferralCard';
import TarjetaReferido from './TarjetaReferido';

export const ReferralList = ({
    referrals,
    onStatusChange,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');

    const filteredReferrals = referrals.filter((referral) => {
        const matchesSearch = referral.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            referral.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || referral.status === statusFilter;
        const matchesType = typeFilter === 'all' || referral.type === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-black border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative">
                            <ListFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm min-w-[180px] text-black"
                            >
                                <option value="all">Todos</option>
                                <option value="pending">Pending</option>
                                <option value="contacted">Contacted</option>
                                <option value="validated">Validated</option>
                                <option value="in_negotiation">In Negotiation</option>
                                <option value="contract_signed">Contract Signed</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm min-w-[140px] text-black"
                        >
                            <option value="all">Todos</option>
                            <option value="buyer">Comprador</option>
                            <option value="seller">Vendedor</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredReferrals.map((referral) => (
                    <TarjetaReferido
                        key={referral.id}
                        referral={referral}
                        onStatusChange={onStatusChange}
                    />
                ))}
            </div>

            {filteredReferrals.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                        <Filter className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg">No referrals found matching your criteria</p>
                    <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search terms</p>
                </div>
            )}
        </div>
    );
};