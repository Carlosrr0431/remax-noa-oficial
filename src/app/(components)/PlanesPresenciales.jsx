"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { signIn, useSession, signOut } from 'next-auth/react'
import { supabaseClient } from '@/supabase/client'
import { useRouter } from "next/navigation";
import axios from 'axios'

import DotLoader from "react-spinners/DotLoader";
import Link from 'next/link'

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};


export const PlanesPresenciales = () => {

    const [planes, setPlanes] = useState("Plan x2")
    const [listaPrecios, setListaPrecios] = useState();
    let [color, setColor] = useState("#000000");
    const router = useRouter()

    const { data: session } = useSession()


    const handlePlan = (plan) => {
        setPlanes(plan)
    }

    const handleSubmit = async (plan, monto) => {

        await createPreferenc(plan, monto)
    }

    const createPreferenc = async (plan, monto) => {

        try {

            const response = await axios.post(
                "/api/create_preference",

                {
                    title: planes,
                    quantity: 1,
                    price: 10,
                    name: session?.user.name,
                    description: session?.user.email
                    // price: monto,
                },

            );

            const { result } = response.data
            // router.replace(result.sandbox_init_point)
            router.replace(result.init_point)

        } catch (error) {
            console.log("El error es: " + error);
        }
    };

    // useEffect(() => {


    //     if (session?.user?.name != undefined) {

    //         setTimeout(async () => {
    //             await signOut({
    //                 callbackUrl: "/",
    //             })
    //         }, 600000000);

    //     }
    // }, [session])

    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("planes")
                .select("*").order('id', { ascending: true })

            setListaPrecios(data.data)
        }


        getSupabaseOficial()


    }, [])

    return (
        <div class="relative w-full h-full">
            <div class="my-10 xl:my-0 mx-auto px-2 py-8 z-40 relative w-full h-full">

                <div class="container mx-auto grid grid-cols-1 gap-8 mt-6 xl:mt-[150px] xl:gap-12 md:grid-cols-2 lg:grid-cols-2 w-full z-40">
                    <div class="w-full bg-white p-8 space-y-8 text-center border border-gray-200 rounded-lg dark:border-gray-700">
                        <div class="grid justify-center  w-full place-items-center overflow-x-scroll rounded-lg  lg:overflow-visible">
                            <div class="flex divide-x divide-gray-800 row w-full">
                                <button
                                    onClick={() => handlePlan("Plan x2")}
                                    className={`${planes == 'Plan x2' ? 'bg-gray-400' : ''} align-middle  font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs px-2 md:px-6     shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-r-none border-r-0 text-black `}
                                    type="button">
                                    Plan x2
                                </button>
                                <button
                                    onClick={() => handlePlan("Plan x3")}
                                    className={`${planes == 'Plan x3' ? 'bg-gray-400' : ''} align-middle  font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-2 md:px-6    shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-r-none border-r-0 text-black `}
                                    type="button">
                                    Plan x3
                                </button>
                                <button
                                    onClick={() => handlePlan("Plan Libre")}
                                    className={`${planes == 'Plan Libre' ? 'bg-gray-400' : ''} align-middle  font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-2 md:px-6    shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-r-none border-r-0 text-black `}
                                    type="button">
                                    Plan Libre
                                </button>
                            </div>
                        </div>
                        <p class="mt-2 sm:mt-4">

                            {listaPrecios != undefined ? <div>
                                <strong class="text-3xl font-bold text-gray-900 sm:text-4xl"> {planes == 'Plan x2' ? listaPrecios != undefined && listaPrecios[0].precio : planes == "Plan x3" ? listaPrecios != undefined && listaPrecios[1].precio : planes == 'Plan Libre' ? listaPrecios != undefined && listaPrecios[2].precio : ''} </strong>

                                <span class="text-sm font-medium text-gray-700">/mes</span></div> : <DotLoader
                                color={color}
                                loading={true}
                                cssOverride={override}
                                size={25}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />}

                        </p>



                        <p class="font-medium text-gray-500 dark:text-gray-300">{planes == 'Plan x2' ? "Incluye 8 clases por mes" : planes == "Plan x3" ? 'Incluye 12 clases por mes' : planes == 'Plan Libre' ? 'Incluye todos los dias' : ''}</p>
                        {/* <Link

                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://wa.me/+543876364202?text=Necesito renovar mi plan..."
                            className={``}
                        >
                            <button class="w-full px-4 py-2 mt-10 tracking-wide text-black capitalize transition-colors duration-300 transform bg-fondo1 rounded-md hover:bg-black hover:text-yellow-500 focus:outline-none focus:bg-black focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                Mas info...
                            </button>
                        </Link> */}
                        {
                            session?.user?.name == undefined ? <button onClick={() => {
                                signIn('google', {
                                    callbackUrl: "/planes"
                                })
                            }} class="w-full px-4 py-2 mt-10 tracking-wide text-black capitalize transition-colors duration-300 transform bg-fondo1 rounded-md hover:bg-black hover:text-yellow-500 focus:outline-none focus:bg-black focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                Ingresá para avanzar (Gmail)
                            </button> : <button onClick={() => {
                                let precio;

                                if (planes == "Plan x2") {
                                    precio = Number((listaPrecios[0].precio.replace(/\s+/g, '')).replace(/[$.]/g, ''))
                                } else if (planes == "Plan x3") {
                                    precio = Number((listaPrecios[1].precio.replace(/\s+/g, '')).replace(/[$.]/g, ''))
                                } else if (planes == "Plan Libre") {
                                    precio = Number((listaPrecios[2].precio.replace(/\s+/g, '')).replace(/[$.]/g, ''))
                                }

                                return handleSubmit(planes, precio)
                            }} class="w-full px-4 py-2 mt-10 tracking-wide text-black capitalize transition-colors duration-300 transform bg-fondo1 rounded-md hover:bg-black hover:text-yellow-500 focus:outline-none focus:bg-black focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                Comprar
                            </button>
                        }

                    </div>

                    <div class="w-full mb-[180px]  sm:mb-0 p-8 space-y-8 text-center bg-white rounded-lg">
                        <p class="font-medium text-gray-800 uppercase text-center">Lesiones</p>

                        <p class="mt-2 sm:mt-4">
                            <strong class="text-3xl font-bold text-center text-gray-900 sm:text-4xl"> $34300 </strong>

                            <span class="text-sm font-medium text-gray-700">/mes</span>
                        </p>

                        <p class="font-medium text-gray-500 dark:text-gray-300">Incluye 2 clases por semana</p>
                        <Link

                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://wa.me/+543876364202?text=Necesito renovar mi plan..."
                            className={``}
                        >
                            <button class="w-full px-4 py-2 mt-10 tracking-wide text-black capitalize transition-colors duration-300 transform bg-fondo1 rounded-md hover:bg-black hover:text-yellow-500 focus:outline-none focus:bg-black focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                Consultar por Bases y Condiciones
                            </button>
                        </Link>
                        {/* 
                        {
                            session?.user?.name == undefined ? <button onClick={() => {
                                signIn('google', {
                                    callbackUrl: "/planes"
                                })
                            }} class="w-full px-4 py-2 mt-10 tracking-wide text-black capitalize transition-colors duration-300 transform bg-fondo1 rounded-md hover:bg-black hover:text-yellow-500 focus:outline-none focus:bg-black focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                Ingresá para avanzar (Gmail)
                            </button> : <button onClick={() => {


                                return handleSubmit("Combinado", 34000)
                            }} class="w-full px-4 py-2 mt-10 tracking-wide text-black capitalize transition-colors duration-300 transform bg-fondo1 rounded-md hover:bg-black hover:text-yellow-500 focus:outline-none focus:bg-black focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                Enviar
                            </button>
                        } */}

                    </div>




                </div>

            </div>

        </div>
    )
}



