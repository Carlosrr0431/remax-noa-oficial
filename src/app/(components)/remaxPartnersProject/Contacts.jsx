"use client"
import React, { useState } from 'react';
import { UserPlus, Search, Phone, Mail, Building } from 'lucide-react';

export default function Contacts() {
    const [newContact, setNewContact] = useState({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        budget: '',
        notes: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically make an API call to save the contact

        setNewContact({
            name: '',
            email: '',
            phone: '',
            propertyType: '',
            budget: '',
            notes: '',
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Contactos</h1>
                <button
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    onClick={() => document.getElementById('newContactForm')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Nuevo Contacto
                </button>
            </div>

            {/* Search and filters */}
            <div className="bg-white p-4 rounded-lg shadow mb-8">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar contactos..."
                        className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Contact list */}
            <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Contacto
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tipo de Propiedad
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Presupuesto
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estado
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {/* Example contact rows */}
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">Juan Pérez</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center text-sm text-gray-500">
                                    <Phone className="h-4 w-4 mr-1" />
                                    +52 123 456 7890
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">Casa</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">$500,000</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Activo
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* New contact form */}
            <div id="newContactForm" className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-6">Agregar Nuevo Contacto</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={newContact.name}
                            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={newContact.email}
                            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                        <input
                            type="tel"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={newContact.phone}
                            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo de Propiedad</label>
                        <select
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={newContact.propertyType}
                            onChange={(e) => setNewContact({ ...newContact, propertyType: e.target.value })}
                        >
                            <option value="">Seleccionar...</option>
                            <option value="casa">Casa</option>
                            <option value="departamento">Departamento</option>
                            <option value="terreno">Terreno</option>
                            <option value="local">Local Comercial</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Presupuesto</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={newContact.budget}
                            onChange={(e) => setNewContact({ ...newContact, budget: e.target.value })}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Notas</label>
                        <textarea
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={newContact.notes}
                            onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Agregar Contacto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}