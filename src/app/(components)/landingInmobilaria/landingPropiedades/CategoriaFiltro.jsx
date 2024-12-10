import React from 'react';
import { ListFilter } from 'lucide-react';
import { useRouter } from 'next/navigation';



export function CategoriaFiltro({ categories, selectedCategory, onSelectCategory }) {

    const router = useRouter()

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <ListFilter className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Categorías</h3>
            </div>
            <div className="space-y-1">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => {
                            onSelectCategory(category)
                            router.push(`/nuevaLanding/propiedades`)
                        }
                        }
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-md font-regular transition-all ${selectedCategory === category
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'hover:bg-gray-50 text-gray-700'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}
