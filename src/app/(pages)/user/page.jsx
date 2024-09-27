"use client"
import Accordion from '@/app/(components)/Accordion'
import SwipperUser from '@/app/(components)/SwipperUser'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { supabaseClient } from '@/supabase/client'

const User = () => {

  const { data: session } = useSession()
  const [usuario, setUsuario] = useState()
  const [diasPlan, setDiasPlan] = useState()
  const [cantDias, setCantDias] = useState(0)

  const divRef = useRef()
  const divRef2 = useRef()

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
    if (usuario?.tipoPlan == "Plan x2") {
      setDiasPlan((usuario?.dias / 8) * 100)

      divRef.current.style.width = `${diasPlan}%`
    } else if (usuario?.tipoPlan == "Plan x3") {
      setDiasPlan((usuario?.dias / 12) * 100)

      divRef.current.style.width = `${diasPlan}%`
    } else if (usuario?.tipoPlan == "Plan Libre") {
      setDiasPlan((usuario?.dias / 31) * 100)

      divRef.current.style.width = `${diasPlan}%`
    } else
      divRef.current.style.width = `0%`
  }, [usuario?.tipoPlan, usuario, usuario?.dias, diasPlan])


  useEffect(() => {

    if (usuario?.puntos <= 2500) {
      const porcentaje = (usuario?.puntos / 2500) * 100;
      divRef2.current.style.width = `${porcentaje}%`
    }
  }, [usuario?.puntos])

  useEffect(() => {

    if (usuario?.tipoPlan == "Plan x2") {
      setCantDias(8)
    } else if (usuario?.tipoPlan == "Plan x3") {
      setCantDias(12)
    } else if (usuario?.tipoPlan == "Plan Libre") {
      setCantDias(31)
    }

  }, [usuario?.tipoPlan])

  return (
    <div className='w-full h-full bg-slate-900 overflow-x-scroll'>

      <div className="p-4 bg-gradient-to-r relative top-[5%] from-cyan-500 to-blue-500  rounded-lg xl:w-[50%] px-4 w-[95%] mx-auto ">
        <Accordion
          title="Do you prefer Android or iOS"
          answer="I like to use iOS products"
          usuario={usuario}
        />

      </div>



      <div className='md:flex md:flex-row justify-center mx-auto items-center w-full gap-x-8 mt-10 h-auto flex-col flex'>

        <div className='w-[320px]  md:w-[350px] min-h-[50px]  mt-10 '>
          <div className="p-5 py-2 text-left transform duration-500 hover:-translate-y-1 hover:shadow-xl cursor-pointer bg-black/50">
            <div className='flex justify-start gap-x-4'>
              <h2 className="font-semibold mb-2 mt-4 w-full text-white/70 text-[20px]">Dias cumplidos</h2>
            </div>

            <h2 className="font-semibold mb-2 mx-auto text-center  w-full text-yellow-500 text-[30px]">{usuario?.dias}</h2>
            {
              usuario?.dias >= cantDias && usuario?.tipoPlan !== "" ? (
                <h2 className="font-semibold mb-2 mx-auto text-center  w-full text-red-400 text-[15px]">Necesitas renovar tu plan</h2>
              ) : usuario?.dias < cantDias && usuario?.tipoPlan !== "" ? (
                <h2 className="font-semibold mb-2 mx-auto text-center  w-full text-green-400 text-[15px]">¡Estas al dia!</h2>
              ) : (
                <h2 className="font-semibold mb-2 mx-auto text-center  w-full text-gray-400 text-[15px]">No cuentas con un plan...</h2>
              )
            }
            <div className="progress mt-10 w-full">

              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div ref={divRef} className={`bg-blue-600 h-2.5 rounded-full `}  ></div>
              </div>
            </div>
            <div className="flex flex-row justify-between mt-2 font-semibold text-xl text-gray-600">
              <span>0</span>

              <span>{cantDias}</span>
            </div>

          </div>
        </div>

        <div className='w-[320px]  md:w-[350px] min-h-[50px]  mt-10 '>
          <div className="p-5 py-2 text-left transform duration-500 hover:-translate-y-1 hover:shadow-xl cursor-pointer bg-black/50">
            <div className='flex  gap-x-4'>
              <h2 className="font-semibold mb-2 mt-4 mx-auto w-full text-white/70 text-[20px]">Puntos obtenidos</h2>
            </div>

            <h2 className="font-semibold mb-2 mx-auto text-center  w-full text-yellow-500 text-[30px]">{usuario?.puntos}</h2>
            {/* <h2 className="font-semibold mb-2 mx-auto text-center  w-full text-green-400 text-[15px]">¡Sigue así!</h2> */}

            {
              usuario?.dias >= cantDias && usuario?.tipoPlan !== "" ? (
                <h2 className="font-semibold mb-2 mx-auto text-center  w-full text-green-400 text-[15px]">Necesitas renovar tu plan</h2>
              ) : usuario?.dias < cantDias && usuario?.tipoPlan !== "" ? (
                <h2 className="font-semibold mb-2 mx-auto text-center  w-full text-green-400 text-[15px]">¡Sigue así!</h2>
              ) : (
                <h2 className="font-semibold mb-2 mx-auto text-center  w-full text-gray-400 text-[15px]">No cuentas con un plan...</h2>
              )
            }


            <div className="progress mt-10 w-full">
              <div className="bg-gray-300 h-2 rounded-md "></div>
              <div ref={divRef2} className="bg-green-500  h-2 rounded-md -mt-2"></div>
            </div>

            <div className="flex flex-row justify-between mt-2 font-semibold text-xl text-gray-600">
              <span>0pts</span>

              <span>2500pts</span>
            </div>

          </div>
        </div>

        {/* <div className='w-[350px] max-h-[50px] mt-10 '>
          <div className="p-5 py-2 text-left transform duration-500 hover:-translate-y-1 hover:shadow-xl cursor-pointer bg-black/50">
            <Image className="w-20 " src={tasas} alt="" width={0} height={0} />

            <h2 className="font-semibold mb-2 mt-11 text-white text-3xl">Puntos: 1500</h2>
            <div className="progress mt-10 w-full">
              <div className="bg-gray-300 h-2 rounded-md "></div>
              <div className="bg-green-500 w-3/4 h-2 rounded-md -mt-2"></div>
            </div>
            <div className="flex flex-row justify-between mt-2 font-semibold text-xl text-gray-600">
              <span>0pts</span>

              <span>2500pts</span>
            </div>

          </div>
        </div> */}



      </div>

      <div className='w-full h-[40%] mt-10 mb-[100px] '>
        <SwipperUser />
      </div>

    </div>
  )
}

export default User