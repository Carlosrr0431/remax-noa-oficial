import React, { useState } from 'react'

import Image from 'next/image'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { LuShoppingCart } from "react-icons/lu";

export const CardCursos = ({ elem, adquirido }) => {

    const { data: session } = useSession()
    const router = useRouter()

    const handleSubmit = async (plan, id, monto) => {

        await createPreferenc(plan, id, monto)
    }

    const createPreferenc = async (plan, id, monto) => {

        try {

            const response = await axios.post(
                "/api/create_preferenceCursos",

                {
                    title: plan,
                    quantity: 1,
                    price: 10,
                    name: id,
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


    return (
        <div class="group my-10 h-auto flex w-full justify-between max-w-[270px] md:max-w-[300px] flex-col overflow-hidden  bg-white shadow-md">

            <Image class=" w-full h-full max-h-[200px] min-w-[320px]  object-cover" src={elem.imagen} alt="product image" width={800} height={800} />





            <div className='flex mt-5 h-[150px] flex-col'><h5 class="text-[15px] montserrat font-semibold md:text-xl  px-5  tracking-tight text-slate-900 text-wrap">{elem.titulo}</h5>

                <p class="text-[15px]  px-5  tracking-tight text-slate-900 text-wrap">{elem.descripcion}</p></div>






            {session?.user?.name == undefined ? <button onClick={async () => {
                await signIn('google', {
                    callbackUrl: "/cursos"
                })


            }} href="#" class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-xl font-medium text-white mx-auto mb-4 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 w-[80%]">

                Ingresá para avanzar</button> : adquirido ? <button href="#" onClick={() => { return handleSubmit(elem.titulo, elem.id.toString(), 100) }} class="flex items-center justify-center rounded-md bg-slate-900 mx-auto mb-4 py-2.5 text-center text-xl font-medium text-white hover:bg-gray-700 w-[80%] focus:outline-none focus:ring-4 focus:ring-blue-300 ">

                    Ir al curso</button> : <button href="#" onClick={() => { return handleSubmit(elem.titulo, elem.id.toString(), 100) }} class="flex items-center justify-center rounded-md bg-slate-900 mx-auto mb-4  py-2.5 text-center text-[17px] font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 w-[80%]">
                <LuShoppingCart className='w-5 mb-1 relative h-5 mr-1 items-center' color='white' width={8} height={8} />
                Comprar <span className="ml-2  text-[17px] font-bold text-white">{elem.precio}</span></button>}




        </div>

    )
}
