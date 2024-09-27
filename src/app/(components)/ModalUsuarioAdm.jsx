"use client"
import { HiOutlineXMark } from 'react-icons/hi2';
import { adminUser, userAdmin } from '../action';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { supabaseClient } from '@/supabase/client';

export const ModalUsuarioAdm = ({ setShowModal, info }) => {


    const [errorDni, setErrorDni] = useState("")
    const [errorTelefono, setErrorTelefono] = useState("")
    const [listaPrecios, setListaPrecios] = useState();

    const [datos, setDatos] = useState({
        name: info.nombre,
        email: info.email,
        plan: info.plan,
        edad: info.edad,
        telefono: info.telefono,
        dni: info.dni,
        dias: info.dias

    })

    const handleError = (errores) => {

        console.log("ERROR: " + errores[1]);


        setErrorDni(errores[1
        ])

        if (errores[0
        ] == "No responde a la plantilla")
            setErrorTelefono(errores[0]); else setErrorTelefono("")

    }

    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)

        if (event.target.name == "dias") {
            if (event.target.value <= 8 && datos.plan == "Plan x2") {
                setDatos({
                    ...datos,
                    [event.target.name]: event.target.value
                })
            }
            else if (datos.plan == "Plan x3" && event.target.name == "dias") {
                if (event.target.value <= 12) {
                    setDatos({
                        ...datos,
                        [event.target.name]: event.target.value
                    })
                }
            } else if (datos.plan == "Plan Libre" && event.target.name == "dias") {
                if (event.target.value <= 31) {
                    setDatos({
                        ...datos,
                        [event.target.name]: event.target.value
                    })
                }
            }
        } else {
            setDatos({
                ...datos,
                [event.target.name]: event.target.value
            })
        }



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

                    <div className="" onClick={() => setShowModal(false)}>
                        <HiOutlineXMark className="text-white w-[30px] h-[30px] cursor-pointer hover:scale-110" color="white" />
                    </div>
                </div>
                <form className="mb-4 py-4   w-full" action={async () => {

                    let result;
                    let precio;

                    if (datos.plan == "Plan x2") {
                        precio = (listaPrecios[0].precio)
                    } else if (datos.plan == "Plan x3") {
                        precio = (listaPrecios[1].precio)
                    } else if (datos.plan == "Plan Libre") {
                        precio = (listaPrecios[2].precio)
                    }


                    result = await adminUser(datos, info.tipo, info.id, precio)
                    console.log(result.message)

                    if (result.message == "Se agrego correctamente") {
                        toast.success('Se agrego correctamente!!!')

                        return setShowModal(false)
                    } else if (result.message == "Se actualizo correctamente") {
                        toast.success('Se actualizo correctamente!!!')

                        return setShowModal(false)
                    } else
                        return handleError(result.error)


                    // handleError(result.error)
                    // return (
                    //     result = await adminUser(datos, info.tipo, info.id), result.error.length > 0 ? console.log(result.message) : console.log(result.message)
                    // )
                }} >

                    <div className='md:justify-center gap-y-2 md:grid md:grid-cols-2 md:gap-x-4 w-full'>
                        <div className="flex flex-col mb-4  relative">
                            <label for="name" class="absolute left-0 ml-1 -translate-y-3 bg-black rounded-md  px-2 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 text-white peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">Nombre</label>
                            <input value={datos.name} required className="border text-lg py-2 px-3 text-grey-darkest md:ml-0  focus:outline-none focus:bg-white/90 text-black focus:text-black rounded-[5px]" placeholder='Nombre' type="text" name="name" id="name" onChange={handleInputChange} />
                        </div>

                        <div className="flex flex-col mb-4  relative">
                            <h1 className='text-red-500 text-[15px] absolute w-full bottom-[50px] font-bold left-[80px]'>{errorDni}</h1>
                            <label for="dni" class="absolute left-0 ml-1 -translate-y-3 bg-black rounded-md  px-2 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 text-white peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">Dni </label>
                            <input value={datos.dni} required className="border text-lg py-2 px-3 text-grey-darkest md:ml-0  focus:outline-none focus:bg-white/90 text-black focus:text-black rounded-[5px]" placeholder='Dni' type="number" name="dni" id="dni" onChange={handleInputChange} />
                        </div>

                        <div className="flex flex-col mb-4  relative">

                            <h1 className='text-red-500 text-[15px] absolute w-full bottom-[45px] font-bold left-[95px]'>{errorDni}</h1>
                            <label for="email" class="absolute left-0 ml-1 -translate-y-3 bg-black rounded-md  px-2 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 text-white peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">Email</label>
                            <input value={datos.email} className="border text-lg py-2 px-3 text-grey-darkest md:ml-0  focus:outline-none focus:bg-white/90 text-black focus:text-black rounded-[5px]" placeholder='Email' type="text" name="email" id="email" onChange={handleInputChange} />
                        </div>

                        <div className="flex flex-col mb-4 relative">
                            <label for="plan" class="absolute left-0 ml-1 -translate-y-3 bg-black rounded-md  px-2 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 text-white peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">Plan</label>
                            <select onChange={handleInputChange} required id="plan" name='plan' class="bg-gray-50 border ease-linear  border-gray-300 text-black text-grey-darkest  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block py-3 px-3  w-full dark:bg-gray-700 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>{datos.plan} | {datos.plan == 'Plan x2' ? listaPrecios != undefined && listaPrecios[0]?.precio : datos.plan == 'Plan x3' ? listaPrecios != undefined && listaPrecios[1]?.precio : datos.plan == 'Plan Libre' ? listaPrecios != undefined && listaPrecios[2]?.precio : null} </option>
                                <option value="Plan x2" className={`font-bold ${datos.plan == 'Plan x2' ? 'hidden' : 'block'}`}>Plan x2 |  {listaPrecios != undefined && listaPrecios[0]?.precio}</option>
                                <option value="Plan x3" className={`font-bold ${datos.plan == 'Plan x3' ? 'hidden' : 'block'}`}>Plan x3 | {listaPrecios != undefined && listaPrecios[1]?.precio}</option>
                                <option value="Plan Libre" className={`font-bold ${datos.plan == 'Plan Libre' ? 'hidden' : 'block'}`}>Plan Libre | {listaPrecios != undefined && listaPrecios[2]?.precio}</option>


                            </select>
                        </div>




                        <div className="flex flex-col mb-4 relative">

                            <label for="edad" class="absolute left-0 ml-1 -translate-y-3 bg-black rounded-md  px-2 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 text-white peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">Edad</label>
                            <input value={datos.edad} className="border text-lg py-2 px-3 text-grey-darkest md:ml-0  focus:outline-none focus:bg-white/90 text-black focus:text-black rounded-[5px]" placeholder='Edad' type="text" name="edad" id="edad" onChange={handleInputChange} />
                        </div>

                        <div className="flex flex-col mb-4 relative">

                            <h1 className='text-red-500 text-[15px] absolute w-full bottom-[45px] font-bold left-[95px]'>{errorTelefono}</h1>

                            <label for="telefono" class="absolute left-0 ml-1 -translate-y-3 bg-black rounded-md  px-2 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 text-white peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">Telefono</label>
                            <input value={datos.telefono} required className="border text-lg py-2 px-3 text-grey-darkest md:ml-0  focus:outline-none focus:bg-white/90 text-black focus:text-black rounded-[5px]" placeholder='Número de telefono' type="tel" name="telefono" id="telefono" onChange={handleInputChange} />
                        </div>

                        <div className="flex flex-col mb-4 relative">

                            <label for="dias" class="absolute left-0 ml-1 -translate-y-3 bg-black rounded-md  px-2 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 text-white peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">Dia | opcional</label>
                            <input value={datos.dias} className="border text-lg py-2 px-3 text-grey-darkest md:ml-0  focus:outline-none focus:bg-white/90 text-black focus:text-black rounded-[5px]" placeholder='Dias del plan' type="number" name="dias" id="dias" onChange={handleInputChange} />
                        </div>



                    </div>


                    <button className="block bg-teal hover:bg-teal-dark border-[2px]  border-solid border-white text-white uppercase text-lg mx-auto p-2 rounded-[5px] hover:bg-white hover:text-black w-full" type="submit"  >{info.tipo} </button>

                </form>


            </div>
        </div >
    )
}