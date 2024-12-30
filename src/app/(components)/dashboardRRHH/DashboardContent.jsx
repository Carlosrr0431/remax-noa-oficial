import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import CalendarioEntrevistas from './CalendarioEntrevistas'
import EstadisticaReclutados from './tablaCandidatos/EstadisticaReclutados'
import CalendarioPablo from './calendarioPablo/CalendarioPablo'


const components = {
    dashboard: CalendarioEntrevistas,
    analytics: EstadisticaReclutados,
    customers: CalendarioPablo
    // customers: CustomersComponent,
    // settings: SettingsComponent,
}

export function DashboardContent({ activeItem, isExpanded, toggleSidebar }) {
    const ActiveComponent = components[activeItem] || components.dashboard

    return (
        <div className="flex flex-col h-full">
            {/* <div className="flex items-center justify-between p-4 bg-background border-b">
                <h1 className="text-3xl font-bold text-primary">
                    {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}
                </h1>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleSidebar}
                    className="md:hidden"
                    aria-label={isExpanded ? "Cerrar menú" : "Abrir menú"}
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </div> */}
            <div className="flex-1 w-full h-full overflow-y-scroll">
                <ActiveComponent />
            </div>
        </div>
    )
}