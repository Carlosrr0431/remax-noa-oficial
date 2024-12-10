'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from 'lucide-react'
import { AgregarPropiedadModal } from '../componentes/AgregarPropiedadModal'
import { PropiedadCard } from '../componentes/PropiedadCard'

export default function Propiedades() {
    const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false)
    const [properties, setProperties] = useState([
        {
            id: 1,
            price: 500000,
            currency: 'USD',
            location: {
                city: 'New York',
                area: 'Manhattan',
                address: '123 Main St',
            },
            features: {
                area: 100,
                bedrooms: 2,
                bathrooms: 1,
                parking: 0,
            },
            description: 'Moderno apartamento en el corazón de Manhattan...',
            images: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80'],
            category: 'Apartamentos',
            highlighted: false,
            totalViews: 0,
            agentId: 1,
        },
        {
            id: 2,
            price: 750000,
            currency: 'USD',
            location: {
                city: 'Los Angeles',
                area: 'Beverly Hills',
                address: '456 Elm St',
            },
            features: {
                area: 200,
                bedrooms: 3,
                bathrooms: 2,
                parking: 1,
            },
            description: 'Elegante casa con vistas panorámicas en Beverly Hills...',
            images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80'],
            category: 'Casas',
            highlighted: true,
            totalViews: 0,
            agentId: 2,
        },
        {
            id: 3,
            price: 1250000,
            currency: 'USD',
            location: {
                city: 'Aspen',
                area: 'Snowmass',
                address: '789 Mountain View Rd',
            },
            features: {
                area: 325,
                bedrooms: 4,
                bathrooms: 3,
                parking: 2,
            },
            description: 'Lujosa cabaña de esquí con acceso directo a las pistas...',
            images: ['https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=80'],
            category: 'Casas',
            highlighted: true,
            totalViews: 0,
            agentId: 3,
        },
    ])

    const addProperty = (newProperty) => {
        setProperties([...properties, { ...newProperty, id: properties.length + 1, totalViews: 0 }])
        setIsAddPropertyModalOpen(false)
    }

    const incrementViews = (id) => {
        setProperties(properties.map(property =>
            property.id === id ? { ...property, totalViews: property.totalViews + 1 } : property
        ))
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold">Propiedades</h1>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input className="pl-8 w-full" placeholder="Buscar propiedades..." />
                    </div>
                    <Button onClick={() => setIsAddPropertyModalOpen(true)} className="w-full sm:w-auto">
                        <Plus className="mr-2 h-4 w-4" /> Añadir Propiedad
                    </Button>
                </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                    <PropiedadCard key={property.id} property={property} onViewClick={incrementViews} />
                ))}
            </div>
            <AgregarPropiedadModal isOpen={isAddPropertyModalOpen} onClose={() => setIsAddPropertyModalOpen(false)} onAddProperty={addProperty} />
        </div>
    )
}

