"use client"

import React, { useState } from 'react';
import { Save } from 'lucide-react';


export default function Profile() {
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        company: '',
        bio: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically make an API call to update the user's profile

    };

    return (
        <div className="max-w-3xl mx-auto z-50">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Mi Perfil</h1>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex items-center space-x-4 mb-6">
                    {/* <img
                        src={user?.picture}
                        alt={user?.name}
                        className="h-20 w-20 rounded-full"
                    /> */}
                    <div>
                        <h2 className="text-xl font-semibold">Carlos RR</h2>
                        <p className="text-gray-600">carlos.facundo.rr@gmail.com</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Dirección
                        </label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Empresa
                        </label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Biografía
                        </label>
                        <textarea
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </div>
    );
}