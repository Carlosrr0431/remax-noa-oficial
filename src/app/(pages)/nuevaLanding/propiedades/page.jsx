"use client"


import { ListaPropiedades } from '@/app/(components)/landingInmobilaria/landingPropiedades/ListaPropiedades';
import { PropiedadInformacion } from '@/app/(components)/landingInmobilaria/landingPropiedades/PropiedadInformacion';
import { Sidebar } from '@/app/(components)/landingInmobilaria/landingPropiedades/SideBar';
import { useAppContext } from '@/app/(context)/AppWrapper';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';

const MOCK_PROPERTIES = [
  {
    id: 1,
    price: 850000,
    currency: 'USD',
    location: {
      city: 'Los Angeles',
      area: 'Beverly Hills',
      province: 'California',
      address: '123 Luxury Avenue',
      neighborhood: 'Golden Triangle'
    },
    features: {
      area: 450,
      bedrooms: 5,
      bathrooms: 4,
      parking: 2,
      amenities: 12
    },
    description: 'Espectacular residencia de lujo en Beverly Hills con acabados de primera calidad. La propiedad cuenta con amplios espacios, piscina infinity con vista panorámica, cocina gourmet, y sistema de domótica integrado.\n\nCaracterísticas destacadas:\n- Piscina infinity\n- Cocina gourmet\n- Sala de cine\n- Gimnasio equipado\n- Bodega climatizada\n- Sistema de seguridad 24/7',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=80',

    ],
    category: 'Casas',
    highlighted: true,
    estimatedPayment: 4500,
    totalViews: 2840,
    agent: {
      id: 1,
      name: 'Sarah Johnson',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&q=80',
      phone: '(310) 555-0123',
      agency: 'Luxury Real Estate',
      title: 'Senior Real Estate Agent',
      agencyLogo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 2,
    price: 425000,
    currency: 'USD',
    location: {
      city: 'Miami',
      area: 'Brickell',
      province: 'Florida',
      address: '789 Skyline Drive',
      neighborhood: 'Financial District'
    },
    features: {
      area: 120,
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      amenities: 8
    },
    description: 'Moderno apartamento en el corazón de Brickell con impresionantes vistas al mar y la ciudad. Ubicado en un edificio de lujo con amenidades de primer nivel.\n\nCaracterísticas destacadas:\n- Vistas panorámicas\n- Balcón privado\n- Cocina italiana\n- Amenidades de lujo\n- Seguridad 24/7',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80'
    ],
    category: 'Departamentos',
    highlighted: true,
    estimatedPayment: 2200,
    totalViews: 1560,
    agent: {
      id: 2,
      name: 'Michael Rodriguez',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
      phone: '(786) 555-0456',
      agency: 'Miami Luxury Properties',
      title: 'Real Estate Consultant',
      agencyLogo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 3,
    price: 1250000,
    currency: 'USD',
    location: {
      city: 'Aspen',
      area: 'Snowmass',
      province: 'Colorado',
      address: '456 Mountain View Road',
      neighborhood: 'Ski Resort Area'
    },
    features: {
      area: 325,
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      amenities: 10
    },
    description: 'Exclusiva cabaña de montaña con acceso directo a las pistas de esquí. Construcción con materiales nobles y vistas panorámicas a las montañas.\n\nCaracterísticas destacadas:\n- Acceso ski-in/ski-out\n- Chimenea de piedra\n- Jacuzzi exterior\n- Sala de juegos\n- Garage calefaccionado',
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1461988091159-192b6df7054f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1600&q=80'
    ],
    category: 'Casas',
    highlighted: true,
    estimatedPayment: 6800,
    totalViews: 3420,
    agent: {
      id: 3,
      name: 'Emily Wilson',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      phone: '(970) 555-0789',
      agency: 'Mountain Luxury Realty',
      title: 'Luxury Property Specialist',
      agencyLogo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80'
    }
  }
];

const CATEGORIES = ['Todas', 'Casas', 'Departamentos', 'Terrenos', 'Locales', 'Oficinas'];

function App() {
  const { selectedCategory, setSelectedCategory, setSelectedProperty, selectedProperty } = useAppContext();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const router = useRouter()

  const filteredProperties = MOCK_PROPERTIES.filter((property) => {
    const matchesCategory = selectedCategory === 'Todas' || property.category === selectedCategory;
    const matchesPrice = property.price >= minPrice && property.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-y-scroll h-full w-full">
      <div className="flex w-full">
        <Sidebar
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            setSelectedProperty(null);
          }}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={(value) => {
            setMinPrice(value);
            setSelectedProperty(null);
          }}
          onMaxPriceChange={(value) => {
            setMaxPrice(value);
            setSelectedProperty(null);
          }}
        />
        <main className="flex-1 lg:ml-[280px]">
          {selectedProperty ? (
            <PropiedadInformacion
              property={selectedProperty}
              onBack={() => {
                setSelectedProperty(null)
                router.push(`/nuevaLanding/propiedades`)
              }}
            />
          ) : (
            <ListaPropiedades
              properties={filteredProperties}
              onPropertyClick={setSelectedProperty}
            />
          )}
        </main>
      </div>
    </div>
  );
}
export default App;