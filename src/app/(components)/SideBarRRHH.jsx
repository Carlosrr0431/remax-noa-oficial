'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { KeyIcon } from 'lucide-react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdOutlineDashboard } from 'react-icons/md';
import { BsPersonArmsUp } from "react-icons/bs";
import { BsPersonStanding } from "react-icons/bs";
import { CardCursos } from './CardCursos';
import { LuDumbbell } from "react-icons/lu";
import { GiHieroglyphLegs } from "react-icons/gi";
import { supabaseClient } from '@/supabase/client';
import { signOut, useSession } from 'next-auth/react';
import { Bell, Search, Menu, X, LayoutDashboard, Users, DollarSign, CheckSquare, CalendarClockIcon, ChartColumnDecreasingIcon, UserMinus, UserCircle, ChartCandlestick, ChartBar, Receipt, ContactRound } from "lucide-react"
import { FormularioBaja } from './FomularioBaja';
import { BigCalendar } from './BigCalendar';
import { UsuariosRRHH } from './UsuariosRRHH';
import Empleados from './Empleados';
import Evaluaciones from './Evaluaciones';
import Reportes from './Reportes';
import { BiLogOut } from 'react-icons/bi';
import Reclutamiento from './Reclutamiento';
import Tracking from './Tracking';


const SideBarRRHH = () => {

    const [usuarios, setUsuarios] = useState([])
    const [usuario, setUsuario] = useState()
    const [usuariosFilter, setUsuariosFilter] = useState([])
    const [opcion, setOpcion] = useState("Todos")
    const { data: session } = useSession()

    const menus = [
        { name: "Empleados", link: "/", icon: UserCircle },
        { name: "Evaluaciones", link: "/", icon: ChartCandlestick },
        { name: "Reportes", link: "/", icon: ChartBar },
        { name: "Reclutamiento", link: "/", icon: ContactRound },
        { name: "Calendario", link: "/", icon: CalendarClockIcon },
        { name: "Bajas", link: "/", icon: UserMinus },
        { name: "Tracking", link: "/", icon: LayoutDashboard },


        // { name: "analytics", link: "/", icon: MdOutlineDashboard, margin: true },
        // { name: "File Manager", link: "/", icon: MdOutlineDashboard },
        // { name: "Cart", link: "/", icon: MdOutlineDashboard },
        // { name: "Saved", link: "/", icon: MdOutlineDashboard, margin: true },

    ];
    const [open, setOpen] = useState(true);


    const handleClick = (info) => {
        setOpcion(info)
    }

    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("usuarios")
                .select("*")
                .match({ email: session?.user?.email }).single();


            setUsuario(data.data)



        }



        if (session?.user?.email != undefined)
            getSupabaseOficial()

        const channelUsuarios = supabaseClient
            .channel('usuarios')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'usuarios' }, (payload) => {

                if (payload.eventType == 'UPDATE') {
                    return setUsuario(payload.new)
                }
            })
            .subscribe()


        return () => {

            supabaseClient.removeChannel(supabaseClient.channel(channelUsuarios))
        }


    }, [session?.user.email])

    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("cursos")
                .select("*").order('id', { ascending: true })


            setUsuarios(data.data)
            setUsuariosFilter(data.data)
        }

        getSupabaseOficial()
    }, [])


    return (
        <section className="flex overflow-x-hidden z-20 mb-20">
            <div
                className={`bg-[#0e0e0e] min-h-screen ${open ? "w-[220px]" : "w-16"
                    } duration-500 text-gray-100 px-4 fixed z-40  shadow-md shadow-black/50 `}
            >

                <div className={`py-3 flex fixed    ${!open ? 'justify-end' : 'justify-between space-x-8 '} whitespace-pre duration-500`}>

                    <h2 className={`text-white whitespace-pre duration-500  overflow-hidden transition-all text-[15px] ${!open ? 'hidden' : 'block'}`} style={{
                        transitionDelay: `${1000}00ms`,
                    }}>Elija una opción</h2>
                    {/* <HiMenuAlt3
                        size={26}
                        className="cursor-pointer overflow-hidden  duration-700"
                        onClick={() => setOpen(!open)}
                    /> */}
                </div>
                <div className={`top-[60px] flex flex-col gap-4 fixed ${open ? 'w-[200px]' : 'w-[110px]'}`}>
                    {menus?.map((menu, i) => {
                        if (usuario == undefined && menu.name != "Mis Cursos") {
                            return (<button
                                onClick={() => handleClick(menu?.name)}
                                key={i}
                                className={` ${menu?.margin && "mt-5"
                                    } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md ${open ? 'max-w-[200px] ' : 'max-w-[70px]'}`}
                            >
                                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                                <h2
                                    style={{
                                        transitionDelay: `${i + 3}00ms`,
                                    }}
                                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                        }`}
                                >
                                    {menu?.name}

                                </h2>
                                <h2
                                    className={`${open && "hidden"
                                        } absolute  bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-20  `}
                                >
                                    {menu?.name}

                                </h2>
                            </button>)
                        } else if (usuario != undefined) {
                            return (<button
                                onClick={() => handleClick(menu?.name)}
                                key={i}
                                className={` ${menu?.margin && "mt-5"
                                    } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md ${open ? 'max-w-[200px] ' : 'max-w-[70px] '}`}
                            >
                                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                                <h2
                                    style={{
                                        transitionDelay: `${i + 3}00ms`,
                                    }}
                                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                        }`}
                                >
                                    {menu?.name}

                                </h2>
                                <h2
                                    className={`${open && "hidden"
                                        } absolute  bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-20  `}
                                >
                                    {menu?.name}

                                </h2>
                            </button>)
                        }
                    })}

                    {/* <button type='button'
                        onClick={async () => {
                            await signOut({
                                callbackUrl: "/dashboard",
                            })
                        }}
                        className={`flex   text-lg w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 text-white focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 mt-[220px] mx-auto ml-8 font-semibold `}>
                        <div className="grid mr-2 place-items-center ">
                            <BiLogOut className="w-5 h-5" />
                            Salir
                        </div>
                   
                    </button> */}
                </div>


            </div>

            <div className={`relative duration-500 transition-all  md:flex  md:flex-wrap md:gap-x-8 left-[100px]   md:left-[300px] -mx-6   max-w-[80%] h-full ${open ? '' : 'md:-ml-[120px] md:gap-x-12 '}  `}>

                {
                    opcion == "Bajas" && <FormularioBaja />
                }

                {
                    opcion == "Empleados" && <Empleados />
                }

                {
                    opcion == "Calendario" && <BigCalendar />
                }

                {
                    opcion == "Reclutamiento" && <Reclutamiento />
                }


                {
                    opcion == "Reportes" && <Reportes />
                }

                {
                    opcion == "Evaluaciones" && <Evaluaciones />
                }

                {
                    opcion == "Tracking" && <Tracking />
                }
            </div>
        </section>
    );
};
export default SideBarRRHH;
