"use client";

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Building2 } from 'lucide-react';



export default function ContactCard({ contact }) {
    return (
        <Card className="group bg-white dark:bg-gray-800 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-64">
            <div className="flex flex-col">
                <div className="relative w-full pt-[100%] bg-gray-100 dark:bg-gray-700">
                    <Image
                        src={contact.image}
                        alt={contact.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 truncate">
                                {contact.name}
                            </h3>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                DNI: {contact.dni}
                            </p>
                        </div>

                        <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm">
                            {contact.company.logo ? (
                                <Image
                                    src={contact.company.logo}
                                    alt={contact.company.name}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                />
                            ) : (
                                <div className="w-full h-full bg-white dark:bg-gray-900 flex items-center justify-center">
                                    <Building2 className="w-6 h-6 text-gray-400" />
                                </div>
                            )}
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-2 truncate">
                        {contact.company.name}
                    </p>
                </div>
            </div>
        </Card>
    );
}