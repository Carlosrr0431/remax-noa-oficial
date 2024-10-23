"use client"

import React from 'react'

import DashBoardInfo from "../../../(components)/DashBoardInfo";

import { useEffect } from 'react'

import { useState } from 'react';
import { GiPrayer } from "react-icons/gi";
import DashBoardInfoContenido from '@/app/(components)/DashBoardInfoContenido';
import { TbChartInfographic } from "react-icons/tb";
import { FaBalanceScale } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";
import { TbFileCv } from "react-icons/tb";
import { BiLogOut, BiMoneyWithdraw } from "react-icons/bi";
import { HiCog } from 'react-icons/hi2';

import { signOut, useSession } from 'next-auth/react';

const DashBoard = () => {

  const [tipo, setTipo] = useState("")
  const [panel, setPanel] = useState("Datos")

  const { data: session } = useSession()

  useEffect(() => {


    if (session?.user?.name != undefined) {

      setTimeout(async () => {
        await signOut({
          callbackUrl: "/",
        })
      }, 600000000);

    }
  }, [session])


  const handleClick = (info) => {
    setTipo(info)
  }

  return (
    <div className='h-full w-full z-120 bg-slate-700'>

      <div className='flex justify-between w-full h-full '>

        <div
          className="relative flex h-full w-1/2 max-w-[15rem] flex-col  bg-clip-border p-4 text-gray-700 shadow-sm shadow-blue-gray-900/5 bg-slate-800 shadow-black">
          <div class="flex divide-x divide-gray-800 row">
            <button
              onClick={() => setPanel("Datos")}
              className={`px-6 py-3 font-sans text-xs font-bold text-center text-white uppercase align-middle transition-all border-r-0 rounded-lg  rounded-l-none rounded-r-none select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20 ${panel == 'Datos' ? 'font-extrabold text-2xl' : ''}`}
              type="button">
              Datos
            </button>
            <div className='text-white'>|</div>
            <button
              onClick={() => setPanel("Contenido")}
              className={`px-6 py-3 font-sans text-xs font-bold text-center text-white uppercase align-middle transition-all border-r-0  rounded-lg rounded-l-none rounded-r-none select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20 ${panel == 'Contenido' ? 'font-extrabold text-2xl' : ''}`}
              type="button">
              Contenido
            </button>

          </div>

          <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 ">
            <hr
              className="my-2 mr-10 h-px border-t-0 bg-white bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-100" />
            {
              panel == 'Datos' ? (
                <>
                  <div role="button"
                    onClick={() => handleClick("Formularios Web")}
                    className={`flex text-white items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900  gap-x-4 ${tipo == 'Ingresos' ? 'font-bold' : ''}`}>
                    <div className="grid mr-6 place-items-center">
                      {/* <Image src={Ofrenda} alt="" width={0} height={0} className="w-6 h-6 mr-2  fill-black" /> */}

                      <FaWpforms  className="w-6 h-6 -mr-4" />
                    </div>
                    Formularios Web
                  </div>

                  <div role="button"
                    onClick={() => handleClick("Cv")}
                    className={`flex text-white items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900  gap-x-4 ${tipo == 'Cv' ? 'font-bold' : ''}`}>
                    <div className="grid mr-6 place-items-center">
                      {/* <Image src={Ofrenda} alt="" width={0} height={0} className="w-6 h-6 mr-2  fill-black" /> */}

                      <TbFileCv className="w-6 h-6 -mr-4" />
                    </div>
                    Formularios CV
                  </div>
                  {/* <div role="button"
                    onClick={() => handleClick("Control De Ingresos")}
                    className={`flex items-center text-white w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 gap-x-4 ${tipo == 'Control De Ingresos' ? 'font-bold' : ''}`}>
                    <div className="grid mr-2 place-items-center">

                      <TbChartInfographic className="w-6 h-6  " />
                    </div>
                    Control De Ingresos
                  </div>
                  <div role="button"
                    onClick={() => handleClick("Control de Precios")}
                    className={`flex items-center text-white w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 gap-x-4 ${tipo == 'Control de Precios' ? 'font-bold' : ''}`}>
                    <div className="grid mr-2 place-items-center">
                      <FaBalanceScale className="w-6 h-6" />
                    </div>
                    Control de Precios
                  </div> */}

                  <div role="button"
                    onClick={() => handleClick("Configurar")}
                    className={`flex items-center text-white w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 gap-x-4 ${tipo == 'Configurar' ? 'font-bold' : ''}`}>
                    <div className="grid mr-2 place-items-center">
                      <HiCog className="w-5 h-5 text-white" color='#FFFFFF' />
                    </div>
                    Configurar Admin
                  </div></>
              ) : panel == "Contenido" ? (
                <>
                  <div role="button"

                    onClick={() => handleClick("Cursos")
                    }
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 text-white focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 gap-x-4 ${tipo == 'Cursos' ? 'font-bold' : ''}`}>
                    <div className="grid mr-4 place-items-center">
                      <GiPrayer className="w-5 h-5" />
                    </div>
                    Banners
                  </div>
                  <div role="button"
                    onClick={() => handleClick("Banners Home")
                    }
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 text-white focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 gap-x-4 ${tipo == 'Banners Home' ? 'font-bold' : ''}`}>
                    <div className="grid mr-4 place-items-center">
                      <GiPrayer className="w-5 h-5" />
                    </div>
                    Banners Home
                  </div></>
              ) : null
            }


            <button type='button'
              onClick={async () => {
                await signOut({
                  callbackUrl: "/dashboard",
                })
              }}
              className={`flex  text-lg w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 text-white focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 mt-[220px] mx-auto ml-8 font-semibold ${panel == 'Datos' ? 'mt-[350px]' : 'mt-[400px]'}`}>
              <div className="grid mr-2 place-items-center ">

                <BiLogOut className="w-5 h-5" />
              </div>
              Salir
            </button>

          </nav>
        </div>


        <div className='w-full h-full  overflow-y-auto overflow-x-hidden'>
          {
            panel == 'Datos' ? (<DashBoardInfo tipo={tipo} />) : null
          }


        </div>


      </div>


    </div>
  )
}

export default DashBoard
