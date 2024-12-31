import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarRail,
    useSidebar
} from '@/components/ui/sidebar'
import { Home, BarChart2, Users, Settings, LogOut, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Calendario', color: 'bg-blue-500 text-white' },
    { id: 'analytics', icon: BarChart2, label: 'Estadistica', color: 'bg-green-500 text-white' },
    { id: 'customers', icon: Users, label: 'Calendario Broker', color: 'bg-yellow-500 text-white' },
    { id: 'settings', icon: Settings, label: 'Reprogramación', color: 'bg-purple-500 text-white' },
]

export function AppSidebar({ setActiveItem, activeItem }) {
    const { toggleSidebar, state } = useSidebar()
    const isExpanded = state === 'expanded'

    return (
        <Sidebar collapsible="icon" className="border-r">
            <SidebarHeader className="flex items-center justify-between p-4">
                <h2 className={`text-xl font-bold transition-opacity duration-300 text-red-400 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                    CRM RRHH
                </h2>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    aria-label={isExpanded ? "Cerrar menú" : "Abrir menú"}
                    className={`absolute  top-2 ${isExpanded ? 'right-2' : 'right-1'}`}
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.id} className={`${isExpanded ? 'ml-0' : 'ml-2'}`}>
                            <SidebarMenuButton
                                onClick={() => setActiveItem(item.id)}
                                tooltip={item.label}
                                className={`flex items-center w-full ${activeItem === item.id ? item.color : ''} `}
                            >
                                <item.icon className="min-h-[20px] min-w-[20px] -ml-1" />
                                <span className="flex-grow text-left">{item.label}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="flex items-center justify-start w-full">
                            <LogOut className="h-5 w-5 mr-4" />
                            <span className="flex-grow text-left">Cerrar sesión</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>

    )
}
