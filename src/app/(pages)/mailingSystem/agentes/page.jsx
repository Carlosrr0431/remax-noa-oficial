"use client"
import FormularioMailingOfrecer from '@/app/(components)/FormularioMailingOfrecer'
import { LeerCSV } from '@/app/(components)/LeerCSV'
import { ModalUser } from '@/app/(components)/ModalUser'
import { signOut } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { Bell, Search, Menu, X, LayoutDashboard, Users, MailIcon, CheckSquare, CalendarClockIcon, ChartColumnDecreasingIcon, UserMinus, UserCircle, ChartCandlestick, ChartBar, Receipt, ContactRound } from "lucide-react"
import { useSession } from 'next-auth/react'

import { HiMenuAlt3 } from 'react-icons/hi'
import FormularioPropiedades from '@/app/(components)/mailingAgentes/FormularioPropiedades'
import { supabaseClient } from '@/supabase/client'

const menus = [
  { name: "Mailing/Visualización", link: "/", icon: LayoutDashboard },

];

const AgentesMailing = () => {

  const [opcion, setOpcion] = useState("Todos")
  const [open, setOpen] = useState(false);
  const { data: session } = useSession()
  const [agente, setAgente] = useState()

  useEffect(() => {
    const getSupabaseOficial = async () => {
      let data = await supabaseClient
        .from("correosEnviadosAgentes")
        .select("*")
        .match({ email: session.user.email }).single();

      console.log("correo: " + session?.user?.email);

      console.log("data: " + JSON.stringify(data.data));

      setAgente(data.data)
    }


    if (session?.user?.email != undefined)
      getSupabaseOficial()

    const channelUsuarios = supabaseClient
      .channel('correosEnviadosAgentes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'correosEnviadosAgentes' }, (payload) => {

        if (payload.eventType == 'UPDATE' && session?.user?.email == payload.new.email) {
          return setAgente(payload.new)
        }
      })
      .subscribe()


    return () => {

      supabaseClient.removeChannel(supabaseClient.channel(channelUsuarios))
    }


  }, [session?.user.email])


  useEffect(() => {

    console.log("agente email: " + agente?.email);

  }, [agente?.email])

  const handleClick = (info) => {
    setOpcion(info)
  }

  return (
    <div className="montserrat w-full h-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% overflow-y-auto relative" >
      <button type='button'
        onClick={async () => {
          await signOut({
            callbackUrl: "/mailingSystem/agentes",
          })
        }}
        className={`flex absolute text-lg w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 text-white focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900  mx-auto ml-8 font-semibold left-[90%]`}>
        <div className="grid mr-2 place-items-center ">
          <BiLogOut className="w-5 h-5" />
        </div>
        Salir
      </button>

      <section className="flex overflow-x-hidden z-20 mb-20">
        <div
          className={`bg-[#0e0e0e] min-h-screen ${open ? "w-[220px]" : "w-16"
            } duration-500 text-gray-100 px-4 fixed z-40  shadow-md shadow-black/50 `}
        >

          <div className={`py-3 flex fixed    ${!open ? 'justify-end' : 'justify-between space-x-8 '} whitespace-pre duration-500`}>

            <h2 className={`text-white whitespace-pre duration-500  overflow-hidden transition-all text-[15px] ${!open ? 'hidden' : 'block'}`} style={{
              transitionDelay: `${1000}00ms`,
            }}>Elegir una opción</h2>
            <HiMenuAlt3
              size={26}
              className="cursor-pointer overflow-hidden  duration-700"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className={`top-[60px] flex flex-col gap-4 fixed ${open ? 'w-[200px]' : 'w-[110px]'}`}>
            {menus?.map((menu, i) => {
              if (menu.name != "Mis Cursos") {
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

        <div className={`relative duration-500 transition-all  md:flex  md:flex-wrap md:gap-x-8 left-[100px]  mb-20 md:left-[300px] -mx-6   max-w-[80%] h-full ${open ? '' : 'md:-ml-[120px] md:gap-x-12 '}  `}>

          {
            opcion == "Mailing/Visualización" && <FormularioPropiedades agente={agente} />
          }










        </div>
      </section>


    </div>
  )
}

export default AgentesMailing