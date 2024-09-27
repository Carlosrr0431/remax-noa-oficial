"use client"
import { HiOutlineXMark } from 'react-icons/hi2';
import { actualizarPlan, adminUser, userAdmin } from '../action';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AiOutlineClose } from "react-icons/ai";
import { supabaseClient } from '@/supabase/client';

export const ModalRenovar = ({ setShowModal2, info }) => {

    const [listaPrecios, setListaPrecios] = useState();

    const [datos, setDatos] = useState({
        name: info.nombre,
        plan: info.plan,
        modoPago: "Efectivo",
        email: info.email
    })


    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)

        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

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


        <div className={`fixed inset-0  z-50  bg-opacity-100 backdrop-blur-sm
            flex items-center justify-center h-full w-full  
            `}>
            <div className={`rounded-[10px] shadow-2xl  shadow-black/20 p-8 m-4 md:min-w-[700px] md:mx-auto bg-slate-800 `}>
                <div className="flex justify-center">
                    <h1 className="w-full text-center text-white items-center text-grey-darkest ">{info.tipo} Usuario</h1>

                    <div className="" onClick={() => setShowModal2(false)}>
                        <HiOutlineXMark className="text-white w-[30px] h-[30px] cursor-pointer hover:scale-110" color="white" />
                    </div>
                </div>

                {/* toast.success(`¡${datos.name} ya puede ingresar al gym!`, {
                        position: 'top-center',
                    }) */}
                <form className="mb-4 py-4   w-full" action={async () => {

                    let precio;

                    if (datos.plan == "Plan x2") {
                        precio = (listaPrecios[0]?.precio)
                    } else if (datos.plan == "Plan x3") {
                        precio = (listaPrecios[1]?.precio)
                    } else if (datos.plan == "Plan Libre") {
                        precio = (listaPrecios[2]?.precio)
                    }

                    await actualizarPlan(datos, precio, info.id)



                    toast.custom((t) => (
                        <div className='bg-white p-4 rounded-md text-black relative'>
                            <button className='' onClick={() => toast.dismiss(t)}><AiOutlineClose className='w-4 h-4  absolute left-[92%] top-[10%]' /></button>
                            <span className='text-green-800'>{datos.name}</span> ya tiene su plan actualizado
                        </div>
                    ), {
                        position: 'top-center',
                        duration: 5000
                    });

                    return setShowModal2(false)
                }
                } >

                    <div className='flex w-full '>


                        <div class="flex flex-col w-full ">

                            <p
                                class="block font-sans text-[15px] antialiased font-normal leading-normal text-blue-gray-900 opacity-70 ">
                                {datos.name}
                            </p>
                            <p class="block font-sans text-[14px] antialiased font-normal leading-normal text-blue-gray-900 tracking-widest ">
                                {datos.dni}
                            </p>
                        </div>

                        <div className="flex flex-col mb-4 gap-y-4 relative w-full">
                            <label for="plan" class="absolute left-0 ml-1 -translate-y-3 bg-black rounded-md  px-2 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 text-white peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">Plan</label>
                            <select onChange={handleInputChange} required id="plan" name='plan' class="bg-gray-50 border ease-linear  border-gray-300 text-black text-grey-darkest  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block font-bold py-3 px-3  w-full dark:bg-gray-700 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>{datos.plan} | {datos.plan == 'Plan x2' ? listaPrecios != undefined && listaPrecios[0]?.precio : datos.plan == 'Plan x3' ? listaPrecios != undefined && listaPrecios[1]?.precio : datos.plan == 'Plan Libre' ? listaPrecios != undefined && listaPrecios[2]?.precio : null} </option>
                                <option value="Plan x2" className={`font-bold ${datos.plan == 'Plan x2' ? 'hidden' : 'block'}`}>Plan x2 |  {listaPrecios != undefined && listaPrecios[0]?.precio}</option>
                                <option value="Plan x3" className={`font-bold ${datos.plan == 'Plan x3' ? 'hidden' : 'block'}`}>Plan x3 | {listaPrecios != undefined && listaPrecios[1]?.precio}</option>
                                <option value="Plan Libre" className={`font-bold ${datos.plan == 'Plan Libre' ? 'hidden' : 'block'}`}>Plan Libre | {listaPrecios != undefined && listaPrecios[2]?.precio}</option>
                            </select>

                        </div>

                        <div className="flex flex-col mb-4 ml-2 gap-y-4 relative w-full">
                            <label for="modoPago" class="absolute left-0 ml-1 -translate-y-3 bg-black rounded-md  px-2 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 text-white peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">Modo de Pago</label>
                            <select onChange={handleInputChange} required id="modoPago" name='modoPago' class="bg-gray-50 border ease-linear  border-gray-300 text-black text-grey-darkest  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block py-3 px-3  w-full dark:bg-gray-700 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 font-bold dark:focus:border-blue-500">
                                <option selected>{datos.modoPago}  </option>
                                <option value="Efectivo" className={`font-bold ${datos.modoPago == 'Efectivo' ? 'hidden' : 'block'}`}>Efectivo </option>
                                <option value="Transferencia" className={`font-bold ${datos.modoPago == 'Transferencia' ? 'hidden' : 'block'}`}>Transferencia </option>

                            </select>

                        </div>

                    </div>


                    <button className="block bg-teal hover:bg-teal-dark border-[2px]  border-solid border-white text-white uppercase text-lg relative top-[20px] mx-auto p-2 rounded-[5px] hover:bg-white hover:text-black w-full" type="submit"  >Renovar </button>

                </form>


            </div>
        </div>
    )
}