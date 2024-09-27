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
import { useSession } from 'next-auth/react';


const SideNav = () => {

    const [usuarios, setUsuarios] = useState([])
    const [usuario, setUsuario] = useState()
    const [usuariosFilter, setUsuariosFilter] = useState([])
    const [opcion, setOpcion] = useState("Todos")
    const { data: session } = useSession()

    const menus = [
        { name: "Todos", link: "/", icon: LuDumbbell },
        { name: "Piernas", link: "/", icon: GiHieroglyphLegs },
        { name: "Brazos", link: "/", icon: BsPersonArmsUp },
        { name: "Espalda", link: "/", icon: BsPersonStanding },


        // { name: "analytics", link: "/", icon: MdOutlineDashboard, margin: true },
        // { name: "File Manager", link: "/", icon: MdOutlineDashboard },
        // { name: "Cart", link: "/", icon: MdOutlineDashboard },
        // { name: "Saved", link: "/", icon: MdOutlineDashboard, margin: true },
        { name: "Mis Cursos", link: "/", icon: MdOutlineDashboard },
    ];
    const [open, setOpen] = useState(false);


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
                    }}>Elija una categoria</h2>
                    <HiMenuAlt3
                        size={26}
                        className="cursor-pointer overflow-hidden  duration-700"
                        onClick={() => setOpen(!open)}
                    />
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
                </div>
            </div>

            <div className={`relative duration-500 transition-all  md:flex  md:flex-wrap md:gap-x-8 left-[100px]  mb-20 md:left-[300px] -mx-6 mt-[20px]  max-w-[80%] h-full ${open ? '' : 'md:-ml-[120px] md:gap-x-12 '} mt-[50px] `}>


                {
                    usuario != undefined && opcion == "Todos" ?
                        (usuarios.map((elem, index) => {

                            if (usuario?.cursos?.includes(elem.id)) {
                                return <CardCursos adquirido={true} elem={elem} key={index} />
                            } else
                                return <CardCursos adquirido={false} elem={elem} key={index} />


                        }
                        )) : usuario != undefined && opcion == "Mis Cursos" ? (usuarios.map((elem, index) => {

                            if (usuario?.cursos?.includes(elem.id)) {
                                return <CardCursos adquirido={true} elem={elem} key={index} />
                            } else
                                return null


                        }
                        )) : opcion == "Piernas" ? (usuarios.map((elem, index) => {
                            if (usuario != undefined) {
                                if (usuario?.cursos?.includes(elem.id) && elem.tipo == "Piernas") {
                                    return <CardCursos adquirido={true} elem={elem} key={index} />
                                } else if (elem.tipo == "Piernas") {
                                    return <CardCursos adquirido={false} elem={elem} key={index} />
                                }
                            } else if (elem.tipo == "Piernas") {
                                return <CardCursos adquirido={false} elem={elem} key={index} />
                            }


                        }
                        )) : opcion == "Brazos" ? (usuarios.map((elem, index) => {
                            if (usuario != undefined) {
                                if (usuario?.cursos?.includes(elem.id) && elem.tipo == "Brazos") {
                                    return <CardCursos adquirido={true} elem={elem} key={index} />
                                } else if (elem.tipo == "Brazos") {
                                    return <CardCursos adquirido={false} elem={elem} key={index} />
                                }
                            } else if (elem.tipo == "Brazos") {
                                return <CardCursos adquirido={false} elem={elem} key={index} />
                            }

                        }
                        )) : opcion == "Espalda" ? (usuarios.map((elem, index) => {
                            if (usuario != undefined) {
                                if (usuario?.cursos?.includes(elem.id) && elem.tipo == "Espalda") {
                                    return <CardCursos adquirido={true} elem={elem} key={index} />
                                } else if (elem.tipo == "Espalda") {
                                    return <CardCursos adquirido={false} elem={elem} key={index} />
                                }
                            } else if (elem.tipo == "Espalda") {
                                return <CardCursos adquirido={false} elem={elem} key={index} />
                            }

                        }
                        )) : (usuarios.map((elem, index) => {
                            return <CardCursos adquirido={false} elem={elem} key={index} />

                        }
                        ))
                }

            </div>
        </section>
    );
};
export default SideNav;



