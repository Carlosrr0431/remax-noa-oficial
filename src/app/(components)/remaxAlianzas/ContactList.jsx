"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ContactCard from './ContactCard';
import Jimena from '../../public/JIMENA CORNEJO (1).jpg'
import Alejandro from '../../public/ALEJANDRO 2 (1).jpg'
import Silvana from '../../public/Silvana Paz.jpeg'
import JuanPablo from '../../public/JUAN PABLO 1 (usar esta) (1).jpg'

const contacts = [
    {
        id: 1,
        name: 'Jimena',
        dni: '34567890',
        image: Jimena,
        company: {
            name: 'RE/MAX NOA',
            logo: 'https://res.cloudinary.com/dlxwkq6bm/image/upload/v1729100848/favicon_256x256-02_1_axwlc0.ico'
        }
    },
    {
        id: 2,
        name: 'Alejandro',
        dni: '45678901',
        image: Alejandro,
        company: {
            name: 'RE/MAX NOA',
            logo: 'https://res.cloudinary.com/dlxwkq6bm/image/upload/v1729100848/favicon_256x256-02_1_axwlc0.ico'
        }
    },
    {
        id: 3,
        name: 'Agustina',
        dni: '56789012',
        image: Silvana,
        company: {
            name: 'RE/MAX NOA',
            logo: 'https://res.cloudinary.com/dlxwkq6bm/image/upload/v1729100848/favicon_256x256-02_1_axwlc0.ico'
        }
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        dni: 'Juan Pablo',
        image: JuanPablo,
        company: {
            name: 'RE/MAX NOA',
            logo: 'https://res.cloudinary.com/dlxwkq6bm/image/upload/v1729100848/favicon_256x256-02_1_axwlc0.ico'
        }
    }
];

export default function ContactList() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredContacts = contacts.filter(contact => {
        const searchLower = searchTerm.toLowerCase();
        return (
            contact.name.toLowerCase().includes(searchLower) ||
            contact.dni.includes(searchTerm)
        );
    });

    return (
        <div className="space-y-8">
            <div className="relative max-w-md mx-auto">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 h-5 w-5" />
                    <Input
                        type="text"
                        placeholder="Buscar por Nombre o DNI..."
                        className="pl-10 w-full text-gray-800 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
                {filteredContacts.map((contact) => (
                    <ContactCard key={contact.id} contact={contact} />
                ))}
            </div>

            {filteredContacts.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                    El contacto no fue encontrado.
                </div>
            )}
        </div>
    );
}