import { supabaseClient } from '@/supabase/client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { DowloadPDF } from './DowloadPDF';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

export const FormulariosCVDashboard = () => {
    const [contactos, setContactos] = useState();
    const pathname = usePathname();
    const [correosMasivos, setCorreosMasivos] = useState();

    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("formularioCV")
                .select("*").order('id', { ascending: true })

            setContactos(data.data)
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
                                    Fuente
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
                        {contactos && contactos.filter((e) => {
                            if (pathname == '/dashboard/administrador') {
                                return e.oficina == "salta"
                            } else if (pathname == '/dashboard/jujuy')
                                return e.oficina == "jujuy"
                        }).map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex items-center gap-3">
                                            {/* <img width={0} height={0} src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                                                alt="John Michael" class="relative inline-block h-9 w-9 !rounded-full object-cover object-center" /> */}

                                            <FaUser class="relative inline-block h-7 w-7 !rounded-full object-cover object-center" />
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
                                                <Link href={user.cv} download='cv.pdf' target='_blank'>
                                                    <Button

                                                        className="flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90"
                                                    >
                                                        <FileDown className="w-4 h-4" />
                                                        Descargar PDF
                                                    </Button>
                                                </Link>
                                            </p>

                                        </div>
                                    </td>

                                    <td class="p-4 border-b border-blue-gray-50">
                                        <div class="flex flex-col">
                                            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                {user.fuente}
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
