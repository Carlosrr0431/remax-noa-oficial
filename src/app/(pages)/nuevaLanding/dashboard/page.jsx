import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, BarChart, Users, PlusCircle } from 'lucide-react'
import { PropiedadCard } from "@/app/(components)/landingInmobilaria/dashboard/componentes/PropiedadCard"
import { Sidebar } from "@/app/(components)/landingInmobilaria/dashboard/componentes/SideBar"

const DashboardLanding = () => {
    // In a real application, you would fetch this data from an API
    const property = {
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

    return (
        <div className="space-y-6">
            <Sidebar />
            {/* <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Propiedades Totales</CardTitle>
                        <Building className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,284</div>
                        <p className="text-xs text-muted-foreground">+20% desde el mes pasado</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$5.2M</div>
                        <p className="text-xs text-muted-foreground">+15% desde el mes pasado</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Nuevos Clientes</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">+201 desde la última semana</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Visitas Activas</CardTitle>
                        <PlusCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+89</div>
                        <p className="text-xs text-muted-foreground">+7% desde ayer</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Propiedad Destacada</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PropiedadCard property={property} />
                    </CardContent>
                </Card>

            </div> */}
        </div>
    )
}
export default DashboardLanding
