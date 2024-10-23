import { supabaseClient } from '@/supabase/client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export const Ingresos = () => {
    const [ingresos, setIngresos] = useState();
    const pathname = usePathname();

    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("formularioIngreso")
                .select("*").order('id', { ascending: true })

            setIngresos(data.data)
        }


        getSupabaseOficial()
    }, [])


    return (
        <div className='w-full h-full container '>

            <div class="p-6 px-0 overflow-scroll h-auto">
                <table class="w-full mt-4 text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Datos del usuario
                                </p>
                            </th>
                            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Oficina
                                </p>
                            </th>

                            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Telefono
                                </p>
                            </th>
                            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Fecha de Ingreso
                                </p>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {ingresos && ingresos.filter((e) => {
                            if (pathname == '/dashboard/administrador') {
                                return e.oficina == "salta"
                            } else if (pathname == '/dashboard/jujuy')
                                return e.oficina == "jujuy"
                        }).map((user, index) => {
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
                                                {user.oficina}
                                            </p>

                                        </div>
                                    </td>

                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex flex-col">
                                            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                {user.telefono}
                                            </p>

                                        </div>
                                    </td>


                                    <td class="p-4 border-b border-blue-gray-50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            {user.created_at.substr(0, 10).split('-').reverse().join('/')}
                                        </p>
                                    </td>



                                </tr>

                            )

                        })}




                    </tbody>
                </table>
            </div>



        </div>
    )
}


