import React from 'react';
import { Menu } from 'lucide-react';



export function MobileToggle({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="fixed top-4 left-4 z-50 lg:hidden bg-white text-gray-700 p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Toggle Filters"
        >
            <Menu className="w-6 h-6" />
        </button>
    );
}