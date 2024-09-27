import { supabaseClient } from '@/supabase/client';
import React, { useEffect, useState } from 'react'

export const ControlIngresos = () => {
    const [ingresos, setIngresos] = useState();
    const [basico, setBasico] = useState({})
    const [semiIntenso, setSemiIntenso] = useState({})
    const [superIntenso, setSuperIntenso] = useState({})
    const [ total, setTotal ] = useState()
    const [cursos, setCursos] = useState({})

    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("pagos")
                .select("*").order('id', { ascending: true })

            setIngresos(data.data)
        }


        getSupabaseOficial()
    }, [])

    useEffect(() => {

        if (ingresos != undefined) {

            let montoBasico = 0;
            let cantidadBasico = 0;
            let montoSemiIntenso = 0;
            let cantidadSemiIntenso = 0;
            let montoSuperIntenso = 0;
            let cantidadSuperIntenso = 0;
            let montoCursos = 0;
            let cantidadCursos = 0;

            ingresos.filter((elem, index) => {
                if (elem.tipoPlan == "Basico") {
                    montoBasico = montoBasico + Number(elem.monto.replace(/\./g, '').replace(/\$/g, '').replace(/[^0-9\.]/g, ''))
                    cantidadBasico++;
                }
            })


            ingresos.filter((elem, index) => {
                if (elem.tipoPlan == "Semi Intenso") {
                    montoSemiIntenso = montoSemiIntenso + Number(elem.monto.replace(/\./g, '').replace(/\$/g, '').replace(/[^0-9\.]/g, ''))
                    cantidadSemiIntenso++;
                }
            })

            ingresos.filter((elem, index) => {
                if (elem.tipoPlan == "Super Intenso") {
                    montoSuperIntenso = montoSuperIntenso + Number(elem.monto.replace(/\./g, '').replace(/\$/g, '').replace(/[^0-9\.]/g, ''))
                    cantidadSuperIntenso++;
                }
            })


            ingresos.filter((elem, index) => {
                if (elem.tipoPlan != "Super Intenso" && elem.tipoPlan != "Semi Intenso" && elem.tipoPlan != "Basico") {
                    montoCursos = montoCursos + Number(elem.monto.replace(/\./g, '').replace(/\$/g, '').replace(/[^0-9\.]/g, ''))
                    cantidadCursos++;
                }
            })

            setTotal( currencyFormatter(montoBasico + montoSemiIntenso + montoSuperIntenso + montoCursos))

            setBasico({
                monto: currencyFormatter(montoBasico),
                cantidad: cantidadBasico
            })

            setSemiIntenso({
                monto: currencyFormatter(montoSemiIntenso),
                cantidad: cantidadSemiIntenso
            })

            setSuperIntenso({
                monto: currencyFormatter(montoSuperIntenso),
                cantidad: cantidadSuperIntenso
            })

            setCursos({
                monto: currencyFormatter(montoCursos),
                cantidad: cantidadCursos
            })
        }

    }, [ingresos])



    function currencyFormatter(value) {
        const formatter = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            minimumFractionDigits: 0,
            currency: 'ARS'
        })
        return formatter.format(Number(value))
    }


    return (
        <div className='w-full h-full container '>
            <div className=' grid grid-cols-3  gap-x-2  my-10'>



                <div class="bg-white max-w-[250px] h-[250px] shadow overflow-hidden sm:rounded-lg mb-4">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                            Plan Basico
                        </h3>

                    </div>
                    <div class="border-t border-gray-200">
                        <dl>

                            <div class="bg-gray-50 px-4 justify-center items-center py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Cantidad de inscriptos
                                </dt>
                                <dd class="mt-1 text-sm text-center items-center text-gray-900 sm:mt-0 sm:col-span-2">
                                    {basico.cantidad}
                                </dd>
                            </div>
                            <div class="bg-white px-4  justify-center items-center backdrop:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Monto Total
                                </dt>
                                <dd class="mt-1 text-sm text-center  items-center text-gray-900 sm:mt-0 sm:col-span-2">
                                    {basico.monto}
                                </dd>
                            </div>

                        </dl>
                    </div>
                </div>

                <div class="bg-white max-w-[250px]  h-[250px] shadow overflow-hidden sm:rounded-lg mb-4">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                            Plan Semi Intenso
                        </h3>

                    </div>
                    <div class="border-t border-gray-200">
                        <dl>

                            <div class="bg-gray-50 px-4 justify-center items-center py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Cantidad de inscriptos
                                </dt>
                                <dd class="mt-1 text-sm text-center items-center text-gray-900 sm:mt-0 sm:col-span-2">
                                    {semiIntenso.cantidad}
                                </dd>
                            </div>
                            <div class="bg-white px-4  justify-center items-center backdrop:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Monto Total
                                </dt>
                                <dd class="mt-1 text-sm text-center  items-center text-gray-900 sm:mt-0 sm:col-span-2">
                                    {semiIntenso.monto}
                                </dd>
                            </div>

                        </dl>
                    </div>
                </div>


                <div class="bg-white max-w-[250px]  h-[250px] shadow overflow-hidden sm:rounded-lg mb-4">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                            Plan Super Intenso
                        </h3>

                    </div>
                    <div class="border-t border-gray-200">
                        <dl>

                            <div class="bg-gray-50 px-4 justify-center items-center py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Cantidad de inscriptos
                                </dt>
                                <dd class="mt-1 text-sm text-center items-center text-gray-900 sm:mt-0 sm:col-span-2">
                                    {superIntenso.cantidad}
                                </dd>
                            </div>
                            <div class="bg-white px-4  justify-center items-center backdrop:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Monto Total
                                </dt>
                                <dd class="mt-1 text-sm text-center  items-center text-gray-900 sm:mt-0 sm:col-span-2">
                                    {superIntenso.monto}
                                </dd>
                            </div>

                        </dl>
                    </div>
                </div>

                <div class="bg-white max-w-[250px]  h-[250px] shadow overflow-hidden sm:rounded-lg mb-4">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                            Cursos
                        </h3>

                    </div>
                    <div class="border-t border-gray-200">
                        <dl>

                            <div class="bg-gray-50 px-4 justify-center items-center py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Cantidad de cursos comprados
                                </dt>
                                <dd class="mt-1 text-sm text-center items-center text-gray-900 sm:mt-0 sm:col-span-2">
                                    {cursos.cantidad}
                                </dd>
                            </div>
                            <div class="bg-white px-4  justify-center items-center backdrop:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Monto Total
                                </dt>
                                <dd class="mt-1 text-sm text-center  items-center text-gray-900 sm:mt-0 sm:col-span-2">
                                    {cursos.monto}
                                </dd>
                            </div>

                        </dl>
                    </div>
                </div>


                <div class="bg-white max-w-[250px]  h-[250px] shadow overflow-hidden sm:rounded-lg mb-4">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                            Totales
                        </h3>

                    </div>
                    <div class="border-t border-gray-200">
                        <dl>

                            {/* <div class="bg-gray-50 px-4 justify-center items-center py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Cantidad de cursos comprados
                                </dt>
                                <dd class="mt-1 text-sm text-center items-center text-gray-900 sm:mt-0 sm:col-span-2">
                                    {cursos.cantidad}
                                </dd>
                            </div> */}
                            <div class="bg-white px-4  justify-center items-center backdrop:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Monto Total
                                </dt>
                                <dd class="mt-1 text-sm text-center  items-center text-gray-900 sm:mt-0 sm:col-span-2">
                                    {total}
                                </dd>
                            </div>

                        </dl>
                    </div>
                </div>



            </div>
        </div>
    )
}

