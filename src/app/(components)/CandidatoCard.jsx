import React from 'react';
import { Mail, Phone, Briefcase } from 'lucide-react';



export function CandidatoCard({ candidate, onDragStart }) {
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, candidate.id)}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
        >
            <h3 className="font-semibold text-sm text-gray-800 mb-2 text-wrap max-w-[20px]">{candidate.email}</h3>

            <div className="space-y-2 text-sm text-gray-600">
                {/* <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>{candidate.email}</span>
                </div> */}

                {/* <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <span>{candidate.phone}</span>
                </div> */}

                <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    <span>{candidate.puesto}</span>
                </div>
            </div>

            <div className="mt-3 text-xs text-gray-500">
                {candidate.created_at.substr(0, 10).split('-').reverse().join('/')}
            </div>
        </div>
    );
}