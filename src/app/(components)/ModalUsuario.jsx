"use client"
import { HiOutlineXMark } from 'react-icons/hi2';
import { userAdmin } from '../action';
import { useState } from 'react';
import { toast } from 'sonner';

export const ModalUsuario = ({ setShowModal, info }) => {



    const [datos, setDatos] = useState({
        name: info.nombre,
        email: info.email,
        role: info.role
    })


    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)

        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }
    return (

        <div className={`fixed inset-0  z-50  bg-opacity-100 backdrop-blur-sm
        flex items-center justify-center h-full w-full  
        `}>
            <div className={`rounded-[10px] shadow-2xl  shadow-black/20 p-8 m-4 md:max-w-2xl md:mx-auto bg-slate-800 `}>
                <div className="flex justify-center">
                    <h1 className="w-full text-center text-white items-center text-grey-darkest ">{info.tipo} Usuario</h1>

                    <div className="" onClick={() => setShowModal(false)}>
                        <HiOutlineXMark className="text-white w-[30px] h-[30px] cursor-pointer hover:scale-110" color="white" />
                    </div>
                </div>
                <form className="mb-4 py-4 md:flex  md:flex-wrap md:justify-between" action={async () => {
                    await userAdmin(datos, info.tipo, info.id);


                    if (info.tipo == "Modificar")
                        toast.success('El usuario se modifico correctamente!')
                    else if (info.tipo == "Agregar")
                        toast.success('El usuario se agrego correctamente!')

                    return setShowModal(false)

                }} >
                    <div className="flex flex-col mb-4 md:w-1/2">

                        <input value={datos.name} required className="border py-2 px-3 text-grey-darkest md:mr-2 focus:outline-none focus:bg-white/90 text-black text-lg focus:text-black rounded-[5px]" placeholder='Nombre' type="text" name="name" id="name" onChange={handleInputChange} />
                    </div>

                    <div className="flex flex-col mb-4 md:w-1/2">

                        {/* <input value={datos.role} className="border py-2 px-3 text-grey-darkest md:mr-2 focus:outline-none focus:bg-white/90 text-black text-lg focus:text-black rounded-[5px]" placeholder='Role' type="text" name="role" id="role" onChange={handleInputChange} /> */}

                        <select onChange={handleInputChange} required id="role" name='role' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>{datos.role || "Elige el role"}  </option>
                            <option value="user admin" className='font-bold'>User Admin</option>
                            <option value="admin" className='font-bold'>Admin</option>

                        </select>
                    </div>
                    <div className="flex flex-col mb-4 md:w-[60%]">

                        <input value={datos.email} required className="border text-lg py-2 px-3 text-grey-darkest md:ml-0  focus:outline-none focus:bg-white/90 text-black focus:text-black rounded-[5px]" placeholder='Email' type="text" name="email" id="email" onChange={handleInputChange} />
                    </div>




                    <button className="block bg-teal hover:bg-teal-dark border-[2px]  border-solid border-white text-white uppercase text-lg mx-auto p-2 rounded-[5px] hover:bg-white hover:text-black w-full" type="submit"  >Enviar </button>

                </form>


            </div>
        </div>
    )
}
