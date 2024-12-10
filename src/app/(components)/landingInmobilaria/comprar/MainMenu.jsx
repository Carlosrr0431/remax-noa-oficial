import React from 'react';
import { cn } from "@/lib/utils";

const MainMenu = ({ activeSection, onSectionChange }) => {
    return (
        <nav className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ul className="flex justify-center space-x-8 h-14">
                    <li>
                        <button
                            onClick={() => onSectionChange('why')}
                            className={cn(
                                "h-full px-4 text-sm font-medium transition-colors relative",
                                activeSection === 'why'
                                    ? "text-red-600 border-b-2 border-red-600"
                                    : "text-gray-700 hover:text-red-600"
                            )}
                        >
                            ¿Por qué Remax NOA?
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => onSectionChange('buy')}
                            className={cn(
                                "h-full px-4 text-sm font-medium transition-colors relative",
                                activeSection === 'buy'
                                    ? "text-red-600 border-b-2 border-red-600"
                                    : "text-gray-700 hover:text-red-600"
                            )}
                        >
                            Comprar en Remax NOA
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default MainMenu;