"use client"

import React, { useState, useRef } from "react";




import { initMercadoPago } from "@mercadopago/sdk-react";




import axios from "axios";
import { useRouter } from 'next/navigation'


const Modal = ({ setShowModal, nameCard }) => {

    const router = useRouter()

    initMercadoPago(process.env.MERCADO_PAGO_PUBLIC_KEY, {
        locale: "es-AR",
    });


    const handleSubmit = async (e) => {
        e.preventDefault()

        await createPreferenc(e.target[2].value, e.target[1].value)
    }

    const createPreferenc = async (monto, descripcion) => {
        try {

            const response = await axios.post(
                "/api/create_preference",
                {
                    title: nameCard,
                    quantity: 1,
                    price: monto,
                    description: descripcion
                }
            );

            const { result } = response.data;



            router.replace(result.sandbox_init_point)

        } catch (error) {
            console.log(error);
        }
    };

    return (


        <div className={`fixed inset-0 bg-[#005B82] z-20 bg-opacity-100 backdrop-blur-sm flex items-center justify-center h-full w-full`}>
            <form onSubmit={handleSubmit} class="w-full md:w-1/2   p-6  rounded-[5px]">

                <div>
                    <div class="flex flex-col mb-3">

                        <input
                            type="text" id="name"
                            class="px-3 py-2 bg-white border-gray-900 focus:border-red-500 focus:outline-none focus:bg-white/90 text-black focus:text-black rounded-[5px]"
                            autocomplete="off"
                            placeholder="Nombre"

                        />
                    </div>

                    <div class="flex flex-col mb-3">

                        <textarea
                            placeholder="Mensaje"
                            rows="4" id="mensaje"
                            class="px-3 py-2 bg-white border-gray-900 focus:border-red-500 focus:outline-none focus:bg-white/90 text-black focus:text-black rounded-[5px]"
                        ></textarea>
                    </div>
                </div>
                <div class="w-full pt-1 flex gap-x-8 justify-between">


                    <span class="inline-flex  items-center px-3  text-md text-black  bg-white border rounded-e-0 border-gray-300 rounded-[5px] dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        $  <input
                            name="monto"
                            type="number"
                            id="monto"
                            placeholder="Monto"
                            className="px-3 py-2 font-semibold text-lg bg-white border-gray-900  focus:outline-none focus:bg-white/90  text-black"
                        />
                    </span>

                    <div className="space-x-2">  <button onClick={setShowModal} type="button" class="px-3 py-2 bg-red-500 border-gray-900  hover:bg-red-600  focus:outline-none   text-black  rounded-[5px]">
                        Cancelar
                    </button>
                        <button type="submit" class="px-3 py-2  bg-gradient-to-r from-green-500 to-green-600  focus:outline-none  hover:bg-gradient-to-r hover:from-green-700 hover:to-green-700   text-white  rounded-[5px]">
                            Enviar
                        </button></div>

                </div>
            </form>
        </div>





    );
};

export default Modal;


