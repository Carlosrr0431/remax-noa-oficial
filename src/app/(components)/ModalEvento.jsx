"use client"

import React, { useState, useRef } from "react";


import { Toaster, toast } from 'sonner'
import { actualizarDatos, crearEvento, sendForm } from "../action.js";
import { FileUploader } from "react-drag-drop-files";
import { HiOutlineXMark } from "react-icons/hi2";
const fileTypes = ["JPG", "PNG", "SVG", "JPEG"];

const ModalEvento = ({ setShowModal, idEvento, operacion, info }) => {

    const [file, setFile] = useState(null);
    const [datos, setDatos] = useState({
        titulo: info.titulo,
        descripcion: info.descripcion,
        precio: info.precio,
        tipo: info.tipo

    })

    function currencyFormatter(value) {
        const formatter = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            minimumFractionDigits: 0,
            currency: 'ARS'
        })
        return formatter.format(Number(value))
    }



    const handleChange = (file) => {

        console.log(file);
        setFile(file);
    };

    // const handleInputChange = (event) => {

    //     const value = (event.target.value).replace(/\./g, '').replace(/\$/g, '').replace(/[^0-9\.]/g, '')

    //     const valor = currencyFormatter(value)

    //     console.log(valor);
    //     setPrecio(valor)


    // }

    const handleInputChange = (event) => {

        if (event.target.name == "precio") {

            const value = (event.target.value).replace(/\./g, '').replace(/\$/g, '').replace(/[^0-9\.]/g, '')

            const valor = currencyFormatter(value)

            setDatos({
                ...datos,
                [event.target.name]: valor
            })
        } else {
            setDatos({
                ...datos,
                [event.target.name]: event.target.value
            })
        }


    }

    return (


        <div className={`fixed inset-0  z-50 
             flex items-center justify-center h-full w-full  
             `}>
            <div className="rounded-[10px]  shadow-2xl bg-white/80 shadow-black/20 p-8 m-4 md:max-w-2xl md:mx-auto">

                <div className="flex justify-center mb-4">
                    <h1 className="w-full text-center text-black items-center text-grey-darkest ">{operacion} </h1>

                    <div className="" onClick={() => setShowModal(false)}>
                        <HiOutlineXMark className="text-black w-[30px] h-[30px] cursor-pointer hover:scale-110" color="black" />
                    </div>
                </div>


                <form className="mb-4 md:flex  md:flex-wrap md:justify-between"
                    action={async (formData) => {
                        if (operacion == 'Modificar') {
                            await actualizarDatos(formData, idEvento)

                        }
                        else if (operacion == "Crear Curso")
                            await crearEvento(formData)

                        return setShowModal(false)
                    }}>
                    <div className="flex flex-col mb-4 md:w-1/2">
                        <input className="border py-2 px-3 text-grey-darkest md:mr-2 focus:outline-none focus:bg-white/90 text-black text-lg focus:text-black rounded-[5px]" type="text" name="titulo" id="titulo" value={datos.titulo} onChange={handleInputChange} placeholder="Titulo" />
                    </div>
                    <div className="flex flex-col mb-4 md:w-1/2">
                        <textarea className="border resize  py-2 px-3 text-grey-darkest md:mr-2 focus:outline-none focus:bg-white/90 text-black text-lg focus:text-black rounded-[5px]" type="text" name="descripcion" id="descripcion" value={datos.descripcion} onChange={handleInputChange} placeholder="Descripcion" ></textarea>
                    </div>

                    <div className="flex flex-col mb-4 md:w-1/2">

                        <select onChange={handleInputChange} required id="tipo" name='tipo' class="bg-gray-50 border ease-linear  border-gray-300 text-black text-grey-darkest  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block py-3 px-3  w-full dark:bg-gray-700 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>{datos.tipo}  </option>
                            <option value="Piernas" className={`font-bold ${datos.tipo == 'Piernas' ? 'hidden' : 'block'}`}>Piernas</option>
                            <option value="Brazos" className={`font-bold ${datos.tipo == 'Brazos' ? 'hidden' : 'block'}`}>Brazos</option>
                            <option value="Espalda" className={`font-bold ${datos.tipo == 'Super Intenso' ? 'hidden' : 'block'}`}>Espalda </option>
                        </select>
                    </div>

                    <div className="flex flex-col mb-4 md:w-1/2">
                        <input className="w-[250px] border items-start text-lg py-2 px-3 text-grey-darkest md:ml-0  focus:outline-none focus:bg-white/90 text-black focus:text-black  " placeholder='$' type="text" value={datos.precio} name="precio" id="precio" onChange={handleInputChange} />
                    </div>
                    <div className="w-full h-[100px]">
                        <FileUploader className="custom-fileUploader" handleChange={handleChange} label="Arrastra o carga la imagen." name="imagen" id="imagen" types={fileTypes} multiple="false" hoverTitle="Arrastra Aqui" maxSize={4} />
                    </div>


                    <button onClick={() => toast.success('El pedido de oración fue enviado con exito!!!', {
                        description: "Estaremos orando por ti y tu familia."
                    })} className="block bg-slate-700     text-white uppercase text-lg mx-auto p-2 rounded-[5px]  hover:bg-slate-900 w-full mt-4" type="submit"  >Enviar</button>

                </form>


            </div>
        </div>





    );
};

export default ModalEvento;