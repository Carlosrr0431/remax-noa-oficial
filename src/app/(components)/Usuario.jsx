import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { IoLogoWhatsapp } from 'react-icons/io'
import { TiUserDelete } from 'react-icons/ti'
import { registrarIngreso } from '../action'
import { toast } from 'sonner'
import moment from 'moment-timezone';

export const Usuario = ({ elem, setShowModal3, setTipo, setIdEvento, setShowModal2, setInfo, autorizado, setShowModal }) => {


    const establecerFecha = (fecha1) => {

        // console.log("FECHA" + moment().tz("America/Argentina/Salta").format("DD/MM/yyyy"));



        if (fecha1 != null) {

            var fecha2 = moment(new Date().toLocaleDateString().split('/').reverse().join('/'));

            console.log(Math.abs(fecha2.diff(fecha1.split('/').reverse().join('/'), 'days')));
            return Math.abs(fecha2.diff(fecha1.split('/').reverse().join('/'), 'days'))
        } else
            return 1
    }






    return (
        <tr className=''>
            <td class="p-4 border-b border-blue-gray-50">
                <div class="flex items-center gap-3">
                    <Image width={0} height={0} src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                        alt="John Michael" class="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
                    <div class="flex flex-col">

                        <p
                            class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
                            {elem.nombre}
                        </p>
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {elem.dni}
                        </p>
                    </div>
                </div>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
                <div class="flex flex-col">
                    <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {elem.tipoPlan}
                    </p>
                    <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {elem.dias} / {elem.tipoPlan == 'Plan x2' ? 8 : elem.tipoPlan == "Plan x3" ? 12 : elem.tipoPlan == "Plan Libre" ? 31 : null}
                    </p>

                </div>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
                <div class="w-max">


                    {
                        elem.tipoPlan == 'Plan x2' ? elem.dias < 8 ? (<div
                            class="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-500 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                            <span class="">Activo</span>
                        </div>) : (<div
                            class="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-red-800/20 text-red-800">
                            <span class="">Inactivo</span>
                        </div>) : elem.tipoPlan == 'Plan x3' ? elem.dias < 12 ? (<div
                            class="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-500 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                            <span class="">Activo</span>
                        </div>) : (<div
                            class="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-red-800/20 text-red-800">
                            <span class="">Inactivo</span>
                        </div>) : elem.tipoPlan == 'Plan Libre' ? elem.dias < 16 ? (<div
                            class="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-500 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                            <span class="">Activo</span>
                        </div>) : (<div
                            class="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-red-800/20 text-red-800">
                            <span class="">Inactivo</span>
                        </div>) : null

                    }


                </div>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    23/04/12
                </p>
            </td>
            <td class="p-4 border-b border-blue-gray-50">
                <button
                    onClick={() => {
                        setShowModal(true),
                            setInfo({
                                tipo: "Modificar",
                                nombre: String(elem.nombre),
                                email: String(elem.email),
                                id: elem.id,
                                dni: elem.dni,
                                telefono: elem.telefono,
                                edad: elem.edad,
                                plan: elem.tipoPlan,
                                dias: elem.dias
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
                <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    // href="https://wa.me/+543878256529?text=Escribenos para poder orar por ti"
                    href={`https://wa.me/+54${elem.telefono}`}
                    class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <IoLogoWhatsapp className='w-7 h-7 transition-all hover:scale-110  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]' />
                    </span>
                </Link>
            </td>

            <td class="p-4 border-b border-blue-gray-50">
                <button

                    onClick={() => {
                        setShowModal3(true)
                        setTipo("Eliminar Usuario")
                        setIdEvento(elem.id)
                    }
                    }



                    className={`relative h-10 max-h-[40px] align-middle w-10 max-w-[40px] select-none rounded-lg text-center  font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${autorizado ? 'visible' : "hidden"}`}
                    type="button">
                    <TiUserDelete className='items-center absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[20px] h-[20px] text-red-800' />
                </button>
            </td>
            <td className="p-4 border-b border-blue-gray-50">

                {
                    (elem.tipoPlan == 'Plan x2' && elem.dias < 8 && establecerFecha(elem.fechaIngreso) >= 1 && establecerFecha(elem.fechaPago) < 31) ? (<button
                        onClick={async () => {
                            await registrarIngreso(elem.dias + 1, elem.id), toast.custom((t) => (
                                <div className='bg-white p-4 rounded-md text-black relative'>
                                    <button className='' onClick={() => toast.dismiss(t)}><AiOutlineClose className='w-4 h-4  absolute left-[92%] top-[10%]' /></button>
                                    <span className='text-green-800'>{elem.nombre}</span> Ya puede ingresar al Gym
                                </div>
                            ), {
                                position: 'top-center',
                                duration: 5000
                            })
                        }
                        }
                        className="relative  min-h-[50px]  min-w-[60px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900"
                        type="button">
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-white/80 border-[1px] rounded-md border-gray-800 p-2 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                            Registrar Ingreso
                        </span>
                    </button>) : (elem.tipoPlan == 'Plan x2' && elem.dias < 8 && establecerFecha(elem.fechaIngreso) == 0 && establecerFecha(elem.fechaPago) < 31) ? ((<button
                        onClick={() =>
                            toast.custom((t) => (
                                <div className='bg-white p-4 rounded-md text-black relative'>
                                    <button className='' onClick={() => toast.dismiss(t)}><AiOutlineClose className='w-4 h-4  absolute left-[92%] top-[10%]' /></button>
                                    <span className='text-green-800'>{elem.nombre}</span> Ya ingreso al GYM
                                </div>
                            ), {
                                position: 'top-center',
                                duration: 5000
                            })

                        }
                        class="relative  right-[5%] min-h-[50px]  min-w-[70px] select-none  font-sans text-xs font-medium uppercase  text-green-500 border-[1px]  rounded-md border-gray-800 p-2  transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none items-center text-center"
                        type="button">

                        Ya ingreso  <span className="relative border-l-[1px] border-gray-800 h-full py-4 px-1 text-center items-center"></span>   <span className="text-white">{elem.horaIngreso}</span>


                    </button>)) : (elem.tipoPlan == 'Plan x2' && (establecerFecha(elem.fechaPago) >= 31 || elem.dias >= 8)) ? (<button
                        onClick={() => {
                            setShowModal2(true), 0
                            setInfo({

                                nombre: String(elem.nombre),
                                id: elem.id,
                                plan: String(elem.tipoPlan),
                                email: String(elem.email)
                            })
                        }}
                        class="relative  right-[5%] min-h-[50px]  min-w-[70px] select-none  font-sans text-xs font-medium uppercase  text-green-500 border-[1px]  rounded-md border-gray-800 p-2  transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none items-center text-center"
                        type="button">

                        Renovar Plan     <span className={`text-white ${elem.ingreso == true ? 'block mt-1' : 'hidden'}`}>{(elem.horaIngreso)}</span>
                    </button>) : null
                }

                {
                    (elem.tipoPlan == 'Plan x3' && elem.dias < 12 && establecerFecha(elem.fechaIngreso) >= 1 && establecerFecha(elem.fechaPago) < 31) ? (<button
                        onClick={async () => {
                            await registrarIngreso(elem.dias + 1, elem.id), toast.custom((t) => (
                                <div className='bg-white p-4 rounded-md text-black relative'>
                                    <button className='' onClick={() => toast.dismiss(t)}><AiOutlineClose className='w-4 h-4  absolute left-[92%] top-[10%]' /></button>
                                    <span className='text-green-800'>{elem.nombre}</span> Ya puede ingresar al Gym
                                </div>
                            ), {
                                position: 'top-center',
                                duration: 5000
                            })
                        }
                        }
                        class="relative  min-h-[50px]  min-w-[60px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900"
                        type="button">
                        <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-white/80 border-[1px] rounded-md border-gray-800 p-2 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                            Registrar Ingreso
                        </span>
                    </button>) : ((elem.tipoPlan == 'Plan x3' && elem.dias < 12 && establecerFecha(elem.fechaIngreso) == 0 && establecerFecha(elem.fechaPago) < 31) ? ((<button
                        onClick={() =>
                            toast.custom((t) => (
                                <div className='bg-white p-4 rounded-md text-black relative'>
                                    <button className='' onClick={() => toast.dismiss(t)}><AiOutlineClose className='w-4 h-4  absolute left-[92%] top-[10%]' /></button>
                                    <span className='text-green-800'>{elem.nombre}</span> Ya ingreso al GYM
                                </div>
                            ), {
                                position: 'top-center',
                                duration: 5000
                            })

                        }
                        class="relative  right-[5%] min-h-[50px]  min-w-[70px] select-none  font-sans text-xs font-medium uppercase  text-green-500 border-[1px]  rounded-md border-gray-800 p-2  transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none items-center text-center"
                        type="button">

                        Ya ingreso  <span className="relative border-l-[1px] border-gray-800 h-full py-4 px-1 text-center items-center"></span>   <span className="text-white">{(elem.horaIngreso)}</span>


                    </button>)) : (elem.tipoPlan == 'Plan x3' && (establecerFecha(elem.fechaPago) >= 31 || elem.dias >= 12)) ? (<button
                        onClick={() => {
                            setShowModal2(true),
                                setInfo({

                                    nombre: String(elem.nombre),
                                    id: elem.id,
                                    plan: String(elem.tipoPlan),
                                    email: String(elem.email)
                                })
                        }}
                        class="relative  right-[5%] min-h-[50px]  min-w-[70px] select-none  font-sans text-xs font-medium uppercase  text-green-500 border-[1px]  rounded-md border-gray-800 p-2  transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none items-center text-center"
                        type="button">

                        Renovar Plan     <span className={`text-white ${establecerFecha(elem.fechaIngreso) == 0 ? 'block mt-1' : 'hidden'}`}>{(elem.horaIngreso)}</span>
                    </button>) : null
                    )
                }

                {
                    (elem.tipoPlan == 'Plan Libre' && elem.dias < 31 && establecerFecha(elem.fechaIngreso) >= 1 && establecerFecha(elem.fechaPago) < 31) ? (<button
                        onClick={async () => {
                            await registrarIngreso(elem.dias + 1, elem.id), toast.custom((t) => (
                                <div className='bg-white p-4 rounded-md text-black relative'>
                                    <button className='' onClick={() => toast.dismiss(t)}><AiOutlineClose className='w-4 h-4  absolute left-[92%] top-[10%]' /></button>
                                    <span className='text-green-800'>{elem.nombre}</span> Ya puede ingresar al Gym
                                </div>
                            ), {
                                position: 'top-center',
                                duration: 5000
                            })
                        }
                        }
                        class="relative  min-h-[50px]  min-w-[60px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900"
                        type="button">
                        <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-white/80 border-[1px] rounded-md border-gray-800 p-2 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                            Registrar Ingreso
                        </span>
                    </button>) : ((elem.tipoPlan == 'Plan Libre' && elem.dias < 31 && establecerFecha(elem.fechaIngreso) == 0 && establecerFecha(elem.fechaPago) < 31) ? ((<button
                        onClick={() =>
                            toast.custom((t) => (
                                <div className='bg-white p-4 rounded-md text-black relative'>
                                    <button className='' onClick={() => toast.dismiss(t)}><AiOutlineClose className='w-4 h-4  absolute left-[92%] top-[10%]' /></button>
                                    <span className='text-green-800'>{elem.nombre}</span> Ya ingreso al GYM
                                </div>
                            ), {
                                position: 'top-center',
                                duration: 5000
                            })

                        }
                        class="relative  right-[5%] min-h-[50px]  min-w-[70px] select-none  font-sans text-xs font-medium uppercase  text-green-500 border-[1px]  rounded-md border-gray-800 p-2  transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none items-center text-center"
                        type="button">

                        Ya ingreso  <span className="relative border-l-[1px] border-gray-800 h-full py-4 px-1 text-center items-center"></span>   <span className="text-white">{(elem.horaIngreso)}</span>


                    </button>)) : (elem.tipoPlan == 'Plan Libre' && (establecerFecha(elem.fechaPago) >= 31 || elem.dias > 31)) ? (<button
                        onClick={() => {
                            setShowModal2(true),
                                setInfo({

                                    nombre: String(elem.nombre),
                                    id: elem.id,
                                    plan: String(elem.tipoPlan),
                                    email: String(elem.email)
                                })
                        }}
                        class="relative  right-[5%] min-h-[50px]  min-w-[70px] select-none  font-sans text-xs font-medium uppercase  text-green-500 border-[1px]  rounded-md border-gray-800 p-2  transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none items-center text-center"
                        type="button">

                        Renovar Plan     <span className={`text-white ${establecerFecha(elem.fechaIngreso) == 0 ? 'block mt-1' : 'hidden'}`}>{elem.horaIngreso}</span>
                    </button>) : null
                    )
                }



            </td>

        </tr>
    )
}
