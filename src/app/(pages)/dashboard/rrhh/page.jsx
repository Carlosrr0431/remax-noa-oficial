'use client'

import { useState } from 'react'
import { SidebarProvider, SidebarInset, useSidebar } from '@/components/ui/sidebar'
import { AppSidebar } from '@/app/(components)/dashboardRRHH/AppSidebar'
import { DashboardContent } from '@/app/(components)/dashboardRRHH/DashboardContent'

function Dashboard() {
    const [activeItem, setActiveItem] = useState('dashboard')
    const { state, toggleSidebar } = useSidebar()

    const isExpanded = state === 'expanded'

    return (
        <div className="flex h-screen overflow-hidden bg-background w-full">
            <AppSidebar setActiveItem={setActiveItem} activeItem={activeItem} />
            <SidebarInset className="flex-grow transition-all duration-300 ease-in-out w-full h-full">
                <DashboardContent
                    activeItem={activeItem}
                    isExpanded={isExpanded}
                    toggleSidebar={toggleSidebar}
                />
            </SidebarInset>
        </div>
    )
}

export default function Page() {
    return (
        <SidebarProvider>
            <Dashboard />
        </SidebarProvider>
    )
}