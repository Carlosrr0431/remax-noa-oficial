import { supabaseClient } from '@/supabase/client'
import React, { useEffect, useState } from 'react'
import { IoLogoWhatsapp } from "react-icons/io";
import { ModalUsuarioAdm } from './ModalUsuarioAdm';
import Link from 'next/link';
import { actualizarNotificacion, registrarIngreso } from '../action';
import { ModalRenovar } from './ModalRenovar';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'sonner';
import moment from 'moment-timezone';
import { TiUserDelete } from 'react-icons/ti';
import { useSession } from 'next-auth/react';
import { ModalConfirmar } from './ModalConfirmar';
import Image from 'next/image';
import { Usuario } from './Usuario';

export const Usuarios = () => {

    const [estado, setEstado] = useState("Todos")
    const [usuarios, setUsuarios] = useState()
    const [usuariosFilter, setUsuariosFilter] = useState()
    const [usuario, setUsuario] = useState()
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [showModal3, setShowModal3] = useState(false)
    const [idEvento, setIdEvento] = useState()
    const [tipo, setTipo] = useState()
    const [info, setInfo] = useState({})
    const [hora, setHora] = useState(new Date().getHours())
    const { data: session } = useSession()
    const [autorizado, setAutorizado] = useState(false)
    const [listaEspera, setListaEspera] = useState(0)


    useEffect(() => {

        const tamaño = usuariosFilter?.filter(e => {
            if (e.ingresoApp == "Solicitar Ingreso") {
                // setListaEspera(ant => ant + 1)
                return true
            } else return false
        }).length

        setListaEspera(tamaño);
    }, [usuariosFilter])



    useEffect(() => {

        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("usuarios")
                .select("*")
                .match({ email: session?.user?.email }).single();

            setUsuario(data.data);
        }

        getSupabaseOficial()
    }, [session?.user?.email, usuario])

    useEffect(() => {

        if (usuario?.role == "admin") {
            setAutorizado(true)
        }
    }, [usuario?.role])




    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("usuarios")
                .select("*").order('id', { ascending: true })


            setUsuarios(data.data)
            setUsuariosFilter(data.data)
        }


        getSupabaseOficial()

        const channelUsuarios = supabaseClient
            .channel('usuarios')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'usuarios' }, (payload) => {

                if (payload.eventType == "INSERT") {


                    return setUsuariosFilter((antContenido) => [payload.new, ...antContenido])


                } else if (payload.eventType == 'UPDATE') {


                    return setUsuariosFilter((antContenido) => antContenido.map((elem) => {
                        if (elem.id == payload.new.id) {
                            elem = payload.new
                        }

                        return elem;
                    }))



                } else if (payload.eventType == 'DELETE') {

                    return setUsuariosFilter(antContenido => antContenido.filter((elem) => elem.id !== payload.old.id))

                }
            })
            .subscribe()


        return () => {

            supabaseClient.removeChannel(supabaseClient.channel(channelUsuarios))
        }

    }, [])

    const getUsuarios = async () => {
        let data = await supabaseClient
            .from("usuarios")
            .select("*").order('id', { ascending: true })


        setUsuarios(data.data)
    }

    const establecerFecha = (fecha1) => {

        console.log("FECHA" + moment().tz("America/Argentina/Salta").format("DD/MM/yyyy"));

        if (fecha1 != null) {

            var fecha2 = moment(new Date().toLocaleDateString().split('/').reverse().join('/'));

            return Math.abs(fecha2.diff(fecha1.split('/').reverse().join('/'), 'days'))
        } else
            return 1
    }

    let inputHandler = (e) => {

        getUsuarios()

        const searchUser = usuarios.filter((el) => {

            let regexp = /[0-9]/gi;

            let regexp2 = /[a-zA-Z]/gi;
            let matches = e.target.value.match(regexp);
            let matches2 = e.target.value.match(regexp2);

            // console.log(matches);
            console.log(matches2);

            //if no input the return the original
            if (e.target.value === '') {
                return el;
            }
            //return the item which contains the user input
            else {

                if (matches == null || matches2 != null) {
                    return el.nombre.toLowerCase().includes(e.target.value.toLowerCase())
                } else
                    return String(el.dni).includes(e.target.value)


            }
        })

        setUsuariosFilter(searchUser)
    };



    return (
        <div class="relative flex flex-col w-full h-full text-gray-700 bg-gray-600 shadow-md  bg-clip-border ">
            <div class="relative  text-gray-700 bg-gray-600 rounded-none bg-clip-border ">
                <div class="flex mx-8 my-2 items-center justify-between gap-8  h-full">
                    <div>
                        <h5
                            class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-white">
                            Lista de Miembros
                        </h5>
                    </div>
                    <div class="flex flex-col gap-2 shrink-0 sm:flex-row">
                        <button
                            class="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            onClick={() => window.location.reload()}
                        >
                            Refrescar
                        </button>
                        <button
                            onClick={() => {
                                setShowModal(true), setInfo({
                                    tipo: "Agregar",
                                    nombre: "",
                                    email: "",
                                    plan: "Elige el Plan"

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
                <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div class="w-full overflow-hidden md:w-max ml-[25px]">
                        <nav>
                            <ul role="tablist" class="relative flex flex-row p-1 rounded-lg bg-blue-gray-50 bg-opacity-60 w-full">
                                <li role="tab"
                                    onClick={() => setEstado("Todos")}
                                    className={`relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer      select-none text-black ${estado == 'Todos' ? 'bg-white/80 font-semibold' : 'bg-white/10'}`}
                                    data-value="all">

                                    <div class="z-20 text-inherit">
                                        &nbsp;&nbsp;Todos&nbsp;&nbsp;
                                    </div>


                                </li>
                                <li role="tab"
                                    onClick={() => setEstado("Activos")}
                                    className={`relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer  select-none text-black ${estado == 'Activos' ? 'bg-white/80 font-semibold' : 'bg-white/10'}`}
                                    data-value="all">

                                    <div class="z-20 text-inherit">
                                        &nbsp;&nbsp;Activos&nbsp;&nbsp;
                                    </div>


                                </li>
                                <li role="tab"
                                    onClick={() => setEstado("Inactivos")}
                                    className={`relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer  select-none text-black ${estado == 'Inactivos' ? 'bg-white/80 font-semibold' : 'bg-white/10'}`}
                                    data-value="all">

                                    <div class="z-20 text-inherit">
                                        &nbsp;&nbsp;Inactivos&nbsp;&nbsp;
                                    </div>


                                </li>

                                <li role="tab"
                                    onClick={() => setEstado("Lista")}
                                    className={`relative flex items-center justify-center w-full  text-nowrap h-full   font-sans text-base antialiased font-normal leading-relaxed ml-[100px] bg-transparent cursor-pointer  select-none text-black ${estado == 'Lista' ? 'bg-white/80 font-semibold' : 'bg-white/10'}`}
                                    data-value="all">
                                    <h2 type="text" id="hs-trailing-button-add-on" name="hs-trailing-button-add-on" className="py-2 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" >
                                        Lista de Ingreso
                                    </h2>
                                    <button type="button" className={`py-2  px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold  border border-transparent  text-white  focus:outline-none  disabled:opacity-50 disabled:pointer-events-none ${listaEspera == 0 ? 'bg-black/30 font-semibold' : 'bg-blue-600 animate-ping2'}`}>
                                        {listaEspera}
                                    </button>
                                    {/* 
                                    Lista de Ingreso <span className='border-[2px] border-black translate-x-1/2 relative px-2 h-full w-full'> {listaEspera}</span> */}



                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div class="w-full md:w-72 mr-4">
                        <div class="relative h-10 w-full min-w-[100px] ">
                            <div class="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" aria-hidden="true" class="w-5 h-5 text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                                </svg>
                            </div>
                            <input
                                class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                onChange={inputHandler}
                                placeholder=" " />
                            <label
                                class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Buscar
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" px-0 overflow-scroll h-auto mt-[90px] ">
                <table class="w-full  text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Miembro
                                </p>
                            </th>
                            <th className={`p-4 border-y border-blue-gray-100 bg-blue-gray-50/50 `}>
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70  ">
                                    {estado == "Lista" ? "" : "Plan"}
                                </p>
                            </th>
                            <th className={`p-4 border-y border-blue-gray-100 bg-blue-gray-50/50 `}>
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    {estado == "Lista" ? "" : "Estado"}
                                </p>
                            </th>
                            <th className={`p-4 border-y border-blue-gray-100 bg-blue-gray-50/50 `}>
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    {estado == "Lista" ? "" : "Ingreso"}
                                </p>
                            </th>
                            <th className={`p-4 border-y border-blue-gray-100 bg-blue-gray-50/50 `}>
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                </p>
                            </th>
                            <th className={`p-4 border-y border-blue-gray-100 bg-blue-gray-50/50 `}>
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                </p>
                            </th>
                            <th className={`p-4 border-y border-blue-gray-100 bg-blue-gray-50/50 `}>
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                </p>
                            </th>
                            <th className={`p-4 border-y border-blue-gray-100 bg-blue-gray-50/50 `}>
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosFilter && estado == 'Activos' ? (usuariosFilter?.filter(e => {
                            if (e.tipoPlan == "Plan x2") {
                                if (e.dias < 8)
                                    return true
                                else return false
                            } else if (e.tipoPlan == "Plan x3") {
                                if (e.dias < 12)
                                    return true
                                else return false
                            } else if (e.tipoPlan == "Plan Libre") {
                                if (e.dias < 16)
                                    return true
                                else return false
                            }
                        }).map((elem, index) => (
                            <Usuario key={index} elem={elem} setShowModal3={setShowModal3} setTipo={setTipo} setIdEvento={setIdEvento} setShowModal2={setShowModal2} setInfo={setInfo} autorizado={autorizado} setShowModal={setShowModal} />
                        ))) : estado == 'Inactivos' ? (usuariosFilter?.filter(e => {
                            if (e.tipoPlan == "Plan x2") {
                                if (e.dias >= 8)
                                    return true
                                else return false
                            } else if (e.tipoPlan == "Plan x3") {
                                if (e.dias >= 12)
                                    return true
                                else return false
                            } else if (e.tipoPlan == "Super Intenso") {
                                if (e.dias >= 16)
                                    return true
                                else return false
                            }
                        }).map((elem, index) => (
                            <Usuario key={index} elem={elem} setShowModal3={setShowModal3} setTipo={setTipo} setIdEvento={setIdEvento} setShowModal2={setShowModal2} setInfo={setInfo} autorizado={autorizado} setShowModal={setShowModal} />
                        ))) : estado == "Lista" ? (usuariosFilter?.filter(e => {
                            if (e.ingresoApp == "Solicitar Ingreso") {
                                return true
                            } else return false
                        }).map((elem, index) => (
                            <tr key={index}>
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
                                <td class="p-4 border-b border-blue-gray-50 ">
                                    <button
                                        onClick={async () => {
                                            await actualizarNotificacion("Confirmar Ingreso", elem.id, elem.dias + 1), toast.custom((t) => (
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
                                            Permitir Ingreso
                                        </span>
                                    </button>
                                </td>
                                <td class="p-4 border-b border-blue-gray-50 ">
                                    <button
                                        onClick={async () => {
                                            await actualizarNotificacion(elem.dias + 1, elem.id), toast.custom((t) => (
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
                                            Rechazar Ingreso
                                        </span>
                                    </button>
                                </td>
                                <td class="p-4 border-b border-blue-gray-50 invisible">
                                    <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                        23/04/18
                                    </p>
                                </td>
                                <td class="p-4 border-b border-blue-gray-50 invisible">
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
                                                    plan: String(elem.tipoPlan),
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

                                <td class="p-4 border-b border-blue-gray-50 invisible">
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

                                <td class="p-4 border-b border-blue-gray-50 invisible">

                                    {
                                        (elem.tipoPlan == 'Plan x2' && elem.dias < 8 && establecerFecha(elem.fechaIngreso) >= 1) ? (<button
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
                                        </button>) : (elem.tipoPlan == 'Plan x2' && elem.dias < 8 && establecerFecha(elem.fechaIngreso) == 0) ? ((<button
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


                                        </button>)) : (elem.dias >= 8 && elem.tipoPlan == 'Plan x2') ? (<button
                                            onClick={() => {
                                                setShowModal2(true),
                                                    setInfo({

                                                        nombre: String(elem.nombre),
                                                        id: elem.id,
                                                        dni: elem.dni,
                                                        plan: String(elem.tipoPlan)
                                                    })
                                            }}
                                            class="relative  right-[5%] min-h-[50px]  min-w-[70px] select-none  font-sans text-xs font-medium uppercase  text-green-500 border-[1px]  rounded-md border-gray-800 p-2  transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none items-center text-center"
                                            type="button">

                                            Renovar Plan     <span className={`text-white ${elem.ingreso == true ? 'block mt-1' : 'hidden'}`}>{(elem.horaIngreso)}</span>
                                        </button>) : null
                                    }

                                    {
                                        (elem.tipoPlan == 'Plan x3' && elem.dias < 12 && establecerFecha(elem.fechaIngreso) >= 1) ? (<button
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
                                        </button>) : (establecerFecha(elem.fechaIngreso) == 0 && elem.tipoPlan == 'Plan x3' && elem.dias < 12 ? ((<button
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


                                        </button>)) : (elem.dias >= 12 && elem.tipoPlan == 'Plan x3') ? (<button
                                            onClick={() => {
                                                setShowModal2(true),
                                                    setInfo({

                                                        nombre: String(elem.nombre),
                                                        id: elem.id,
                                                        dni: elem.dni,
                                                        plan: String(elem.tipoPlan)
                                                    })
                                            }}
                                            class="relative  right-[5%] min-h-[50px]  min-w-[70px] select-none  font-sans text-xs font-medium uppercase  text-green-500 border-[1px]  rounded-md border-gray-800 p-2  transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none items-center text-center"
                                            type="button">

                                            Renovar Plan     <span className={`text-white ${establecerFecha(elem.fechaIngreso) == 0 ? 'block mt-1' : 'hidden'}`}>{(elem.horaIngreso)}</span>
                                        </button>) : null
                                        )
                                    }

                                    {
                                        (elem.tipoPlan == 'Super Intenso' && elem.dias < 16 && establecerFecha(elem.fechaIngreso) >= 1) ? (<button
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
                                        </button>) : (establecerFecha(elem.fechaIngreso) == 0 && elem.tipoPlan == 'Super Intenso' && elem.dias < 16 ? ((<button
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


                                        </button>)) : (elem.dias >= 16 && elem.tipoPlan == 'Super Intenso') ? (<button
                                            onClick={() => {
                                                setShowModal2(true),
                                                    setInfo({

                                                        nombre: String(elem.nombre),
                                                        id: elem.id,
                                                        dni: elem.dni,
                                                        plan: String(elem.tipoPlan)
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
                        ))) : usuariosFilter?.map((elem, index) => (

                            <Usuario key={index} elem={elem} setShowModal3={setShowModal3} setTipo={setTipo} setIdEvento={setIdEvento} setShowModal2={setShowModal2} setInfo={setInfo} autorizado={autorizado} setShowModal={setShowModal} />

                        ))
                        }

                    </tbody>
                </table>
                {/* <div class="flex items-center w-full justify-center   p-4 border-b border-blue-gray-50">

                    <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        23/04/18
                    </p>
                    <p class="block font-sans ml-[150px] text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        23/04/18
                    </p>
                </div> */}
            </div>

            {
                showModal && <ModalUsuarioAdm info={info} setShowModal={setShowModal} />
            }


            {
                showModal2 && <ModalRenovar info={info} setShowModal2={setShowModal2} />
            }

            {
                showModal3 && <ModalConfirmar tipo={tipo} setShowModal3={setShowModal3} idEvento={idEvento} />
            }
        </div >
    )
}
