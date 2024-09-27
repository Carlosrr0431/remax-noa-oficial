"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ModalEvento from './ModalEvento'
import { TbCalendarPlus } from "react-icons/tb";
import { supabaseClient } from '@/supabase/client'
import { ModalConfirmar } from './ModalConfirmar'
import { ModalBanner } from './ModalBanner'

const DashBoardInfoContenido = ({ tipo }) => {

    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [showModal3, setShowModal3] = useState(false)
    const [contenido, setContenido] = useState()
    const [idEvento, setIdEvento] = useState()
    const [operacion, setOperacion] = useState("")
    const [banner, setBanner] = useState()
    const [info, setInfo] = useState({})

    useEffect(() => {

        const getSupabaseOficial = async () => {
            let { data: cursos, error } = await supabaseClient
                .from('cursos')
                .select('*')


            setContenido(cursos)
        }

        const getBannersHome = async () => {
            let { data: banners, error } = await supabaseClient
                .from('banners')
                .select('*')


            setBanner(banners)
        }


        getSupabaseOficial()
        getBannersHome()

        const channelOficial = supabaseClient
            .channel('cursos')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'cursos' }, (payload) => {


                if (payload.eventType == "INSERT") {

                    return setContenido((antContenido) => [...antContenido, payload.new])
                } else if (payload.eventType == 'UPDATE') {
                    return setContenido((antContenido) => antContenido.map((elem) => {
                        if (elem.id == payload.new.id) {
                            elem = payload.new
                        }

                        return elem;
                    }))
                } else if (payload.eventType == 'DELETE') {

                    return setContenido(antContenido => antContenido.filter((elem, index) => elem.id !== payload.old.id))
                }

            })
            .subscribe()

        const channelBanners = supabaseClient
            .channel('banners')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'banners' }, (payload) => {


                if (payload.eventType == "INSERT") {

                    return setBanner((antContenido) => [...antContenido, payload.new])
                } else if (payload.eventType == 'UPDATE') {

                    console.log("Entro a update" + payload.new.id);
                    return setBanner((antContenido) => antContenido.map((elem) => {

                        if (elem.id == payload.new.id) {
                            elem = payload.new
                        }

                        return elem;
                    }))
                } else if (payload.eventType == 'DELETE') {

                    return setBanner(antContenido => antContenido.filter((elem, index) => elem.id !== payload.old.id))
                }

            })
            .subscribe()

        return () => {

            supabaseClient.removeChannel(supabaseClient.channel(channelOficial))
            supabaseClient.removeChannel(supabaseClient.channel(channelBanners))

        }


    }, [banner, contenido])


    return (
        <div className='h-full w-full flex gap-x-5 flex-wrap ml-10'>

            {
                tipo == 'Cursos' ? (<button className='flex justify-center border-white/5 border-solid border-2 rounded-full  items-center gap-x-1 fixed z-50 text-sm top-0 right-0 text-black m-4 ' onClick={() => {
                    setOperacion("Crear Curso"); setShowModal(true); setInfo({
                        titulo: "",
                        descripcion: "",
                        precio: "",
                        tipo: ""

                    })
                }}> <TbCalendarPlus className='w-12 h-12  p-2  text-green-500 ' /></button>) : tipo == 'Banners Home' ? (<button className='flex justify-center border-white/5  border-solid border-2 rounded-full  items-center gap-x-1 fixed z-50 text-sm top-0 right-0 text-black m-4 ' onClick={() => {
                    setOperacion("Crear Banner"); setShowModal2(true);
                }}> <TbCalendarPlus className='w-12 h-12 p-2  text-green-500 ' /></button>) : null
            }

            {(contenido && tipo == 'Cursos') ? contenido.map((elem, index) => {


                return (
                    <>
                        <div class="group my-10 h-[500px] flex w-full justify-between max-w-xs flex-col overflow-hidden  bg-white shadow-md mb-[50px]">

                            <Image class=" w-full h-full  max-h-[200px]  object-cover" src={elem.imagen} alt="product image" width={800} height={800} />

                            <div className='flex h-[150px] flex-col'><h5 class="text-xl  px-5  tracking-tight text-slate-900 mb-5 text-wrap">{elem.titulo}</h5>

                                <p class="text-[15px]  px-5  tracking-tight text-slate-900 text-wrap">{elem.descripcion}</p></div>

                            <div class=" px-5  flex items-center justify-between">
                                <p>
                                    <span class="text-3xl font-bold text-slate-900">{elem.precio}</span>

                                </p>
                            </div>

                            <div className="flex  gap-x-4 mx-auto mb-4 mt-2" >
                                <button
                                    className="self-end flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center border-[1px] border-gray-800 align-middle font-sans text-xs font-bold uppercase text-white transition-all hover:bg-pink-500/10 hover:text-slate-900 bg-slate-900 active:bg-pink-500/30   disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    onClick={() => {
                                        setShowModal(true)
                                        setIdEvento(elem.id)
                                        setOperacion("Modificar")
                                        setInfo({
                                            titulo: elem.titulo,
                                            descripcion: elem.descripcion,
                                            precio: elem.precio,
                                            tipo: elem.tipo

                                        })
                                    }}
                                >
                                    Modificar

                                </button>
                                <button
                                    className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-slate-800 transition-all hover:bg-red-800/80 hover:text-white active:bg-red-600 disabled:pointer-events-none disabled:opacity-50 border-[1px] border-gray-800  disabled:shadow-none outline-none"
                                    type="button"
                                    // onClick={() => EliminarEvento(elem.id)
                                    // }

                                    onClick={() => {
                                        setShowModal3(true), setIdEvento(elem.id)
                                    }}
                                >
                                    Eliminar

                                </button>

                            </div>




                        </div >

                    </>


                )
            }


            ) : (banner && tipo == 'Banners Home') && banner.map((elem, index) => {


                return (
                    <>

                        <div

                            key={index} className="relative  flex flex-col  rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mt-4 w-[500px] h-[200px]">

                            <div className="relative m-0 shrink-0 overflow-hidden   rounded-r-none bg-white bg-clip-border text-gray-700 w-full h-full flex">
                                <div className='w-[70%]'>
                                    <Image
                                        src={elem.imagenUrl}
                                        alt="image"
                                        className="h-full w-full object-fill"
                                        width={800}
                                        height={800}
                                    />
                                </div>

                                <div className='w-[30%]'>
                                    <Image
                                        src={elem.imagenUrlCelular}
                                        alt="image"
                                        className="h-full w-full object-cover"
                                        width={2000}
                                        height={2000}
                                    />
                                </div>
                            </div>
                            <div className="p-6 bg-gray-100 w-full mx-auto">


                                <a class="flex mt-14 mx-auto justify-around items-center" >
                                    <button
                                        class="self-end flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center border-[1px] border-gray-800 align-middle font-sans text-xs font-bold uppercase text-white transition-all hover:bg-pink-500/10 hover:text-slate-900 bg-slate-900 active:bg-pink-500/30   disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="button"
                                        onClick={() => {
                                            setShowModal2(true)
                                            setIdEvento(elem.id)
                                            setOperacion("Modificar")
                                        }}
                                    >
                                        Modificar

                                    </button>
                                    <button
                                        class="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-slate-800 transition-all hover:bg-red-800/80 hover:text-white active:bg-red-600 disabled:pointer-events-none disabled:opacity-50 border-[1px] border-gray-800  disabled:shadow-none outline-none"
                                        type="button"
                                        onClick={() => {
                                            setShowModal3(true), setIdEvento(elem.id)
                                        }}
                                    // onClick={() => EliminarEvento(tipo, elem._id)
                                    // }
                                    >
                                        Eliminar

                                    </button>

                                </a>

                            </div>

                        </div>
                    </>


                )
            }


            )
            }

            {
                showModal && <ModalEvento operacion={operacion} idEvento={idEvento} showModal={showModal} setShowModal={setShowModal} info={info} />
            }

            {
                showModal3 && <ModalConfirmar tipo={tipo} setShowModal3={setShowModal3} idEvento={idEvento} />
            }

            {
                showModal2 && <ModalBanner operacion={operacion} idEvento={idEvento} setShowModal2={setShowModal2} />
            }

        </div >
    )
}

export default DashBoardInfoContenido
