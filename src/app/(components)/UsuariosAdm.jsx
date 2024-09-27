"use client"

import { supabaseClient } from '@/supabase/client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getUsuarios } from '../lib/data'
import { ModalUsuario } from './ModalUsuario'
import { TiUserDelete } from "react-icons/ti";
import { userAdmin } from '../action'
import { ModalConfirmar } from './ModalConfirmar'



export const UsuariosAdm = () => {

    const [usuarios, setUsuarios] = useState()
    const [showModal, setShowModal] = useState(false)
    const [info, setInfo] = useState({})
    const [tipo, setTipo] = useState()
    const [showModal3, setShowModal3] = useState(false)
    const [idEvento, setIdEvento] = useState()

    useEffect(() => {

        const getUsuarios2 = async () => {
            const datos = await getUsuarios();
            setUsuarios(datos);
        }





        getUsuarios2();


        const channelUsuarios = supabaseClient
            .channel('usuarios')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'usuarios' }, (payload) => {

                if (payload.eventType == "INSERT") {

                    if (payload.new.role == 'user admin' || payload.new.role == 'admin') {
                        return setUsuarios((antContenido) => [payload.new, ...antContenido])
                    } else
                        return null


                } else if (payload.eventType == 'UPDATE') {

                    if (payload.new.role == 'user admin' || payload.new.role == 'admin') {
                        return setUsuarios((antContenido) => antContenido.map((elem) => {
                            if (elem.id == payload.new.id) {
                                elem = payload.new
                            }

                            return elem;
                        }))
                    } else
                        return null


                } else if (payload.eventType == 'DELETE') {
                    if (payload.new.role == 'user admin' || payload.new.role == 'admin') {
                        return setUsuarios(antContenido => antContenido.filter((elem) => elem.id !== payload.old.id))

                    } else
                        return null
                }
            })
            .subscribe()

        return () => {

            supabaseClient.removeChannel(supabaseClient.channel(channelUsuarios))
        }

    }, [])


    return (




        <div class="relative flex flex-col w-[80%] h-full text-gray-700  bg-clip-border   ">
            <div class="mr-10 relative overflow-hidden text-gray-700 rounded-none bg-clip-border ">
                <div class="flex mx-8 my-2 items-center justify-between gap-8 mb-8">
                    <div>
                        <h5
                            class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-white">
                            Lista de Miembros
                        </h5>

                    </div>
                    <div class="flex flex-col gap-2 shrink-0 sm:flex-row">

                        <button
                            onClick={() => {
                                setShowModal(true), setInfo({
                                    tipo: "Agregar",
                                    nombre: "",
                                    email: "",
                                    role: ""
                                })
                            }}
                            class="flex select-none items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                stroke-width="2" class="w-4 h-4">
                                <path
                                    d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z">
                                </path>
                            </svg>
                            Agregar Miembro
                        </button>
                    </div>
                </div>

            </div>
            <div class="p-6 px-0 overflow-scroll h-auto">
                <table class="w-full mt-4 text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Miembro
                                </p>
                            </th>
                            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Tipo
                                </p>
                            </th>

                            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Ingreso
                                </p>
                            </th>
                            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                </p>
                            </th>
                            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios && usuarios.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex items-center gap-3">
                                            <img width={0} height={0} src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                                                alt="John Michael" class="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
                                            <div class="flex flex-col">
                                                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {user.nombre}
                                                </p>
                                                <p
                                                    class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex flex-col">
                                            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                {user.role}
                                            </p>

                                        </div>
                                    </td>

                                    <td class="p-4 border-b border-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            23/04/18
                                        </p>
                                    </td>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <button

                                            onClick={() => {
                                                setShowModal(true),
                                                    setInfo({
                                                        tipo: "Modificar",
                                                        nombre: String(user.nombre),
                                                        email: String(user.email),
                                                        role: String(user.role),
                                                        id: user.id
                                                    })
                                            }}



                                            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                                    class="w-4 h-4">
                                                    <path
                                                        d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
                                                    </path>
                                                </svg>
                                            </span>
                                        </button>
                                    </td>

                                    <td class="p-4 border-b border-blue-gray-50">
                                        <button

                                            onClick={() => {
                                                setShowModal3(true)
                                                setTipo("Eliminar Usuario Admin")
                                                setIdEvento(user.id)
                                            }
                                            }



                                            class="relative h-10 max-h-[40px] align-middle w-10 max-w-[40px] select-none rounded-lg text-center  font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button">
                                            <TiUserDelete className='items-center absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[20px] h-[20px] text-red-800' />
                                        </button>
                                    </td>
                                </tr>

                            )

                        })}




                    </tbody>
                </table>
            </div>

            {
                showModal && <ModalUsuario info={info} setShowModal={setShowModal} />
            }

            {
                showModal3 && <ModalConfirmar tipo={tipo} setShowModal3={setShowModal3} idEvento={idEvento} />
            }
        </div>
    )
}