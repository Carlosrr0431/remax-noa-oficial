import { supabaseClient } from '@/supabase/client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { DowloadPDF } from './DowloadPDF';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import fileDownload from "js-file-download";

export const FormulariosCVDashboard = () => {
    const [ingresos, setIngresos] = useState();

    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("formularioCV")
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
                                    CV
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
                        {ingresos && ingresos.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex items-center gap-3">
                                            <Image width={0} height={0} src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                                                alt="John Michael" class="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
                                            <div class="flex flex-col">
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

                                                <button 
                                                    onClick={() => fileDownload(user.cv, "cv.pdf")}
                                                    className="flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90"
                                                >
                                                    <FileDown className="w-4 h-4" />
                                                    Descargar PDF
                                                </button>

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
