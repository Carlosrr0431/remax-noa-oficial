import Sidebar from '@/app/(components)/SideBar'
import { LayoutDashboard, LifeBuoy, Package, Receipt } from 'lucide-react'
import Loguear from '@/app/(components)/Loguear'
import React from 'react'


const Cursos = () => {
    return (
        <div className='bg-slate-800 w-full h-full relative overflow-y-scroll '>

            <div className='fixed left-[55%] md:left-[85%] top-[20px]  z-20'>
                <Loguear />
            </div>
            <Sidebar />

        </div>
    )
}

export default Cursos