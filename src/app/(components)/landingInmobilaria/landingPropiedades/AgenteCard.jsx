import React from 'react';
import { Phone, Mail } from 'lucide-react';

export function AgenteCard({ agent }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
                <img
                    src={agent.photo}
                    alt={agent.name}
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                    <h3 className="font-semibold text-lg">{agent.name}</h3>
                    <p className="text-gray-600">{agent.title}</p>
                </div>
            </div>



            <div className="space-y-3">
                <button className="w-full bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600">
                    <Phone className="w-5 h-5" />
                    {agent.phone}
                </button>
                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600">
                    <Mail className="w-5 h-5" />
                    Enviar mensaje
                </button>
            </div>
        </div>
    );
}