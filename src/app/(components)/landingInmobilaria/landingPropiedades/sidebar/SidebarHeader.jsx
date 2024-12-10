import React from 'react';
import { Home, X } from 'lucide-react';



export function SidebarHeader({ onToggle }) {
    return (
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-white/95 backdrop-blur-sm">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <Home className="w-5 h-5 text-blue-600" />
                </div>
                <h1 className="font-semibold text-gray-900">RE/MAX NOA</h1>
            </div>
            <button
                onClick={onToggle}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close sidebar"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    );
}