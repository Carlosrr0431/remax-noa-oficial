"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, Menu, X, LayoutDashboard, Users, DollarSign, CheckSquare, CalendarClockIcon, ChartColumnDecreasingIcon } from "lucide-react"
import SideBarRRHH from "@/app/(components)/SideBarRRHH"

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Users, label: "Captaciones", href: "/clientes" },
    { icon: ChartColumnDecreasingIcon, label: "Resumenes", href: "/ventas" },
    { icon: CalendarClockIcon, label: "Calendario", href: "/tareas" },
]

export default function Layout({ children }) {

    return (
        <div className='bg-slate-800 w-full h-full relative overflow-y-scroll '>

        {/* <div className='fixed left-[55%] md:left-[85%] top-[20px]  z-20'>
            <Loguear />
        </div> */}
        <SideBarRRHH />

    </div>
    )
}