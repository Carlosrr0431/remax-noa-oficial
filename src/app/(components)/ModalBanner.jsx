import React, { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files';
import { HiOutlineXMark } from 'react-icons/hi2';
import { toast } from 'sonner';
import { actualizarBanner, crearBanner } from '../action';
import DotLoader from "react-spinners/DotLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const fileTypes = ["JPG", "PNG", "SVG", "JPEG"];

export const ModalBanner = ({ setShowModal2, operacion, idEvento }) => {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)
    let [color, setColor] = useState("#000000");


    const handleChange = (file) => {

        console.log(file);
        setFile(file);
    };

    return (
        <div className={`fixed inset-0  z-50 
             flex items-center justify-center h-full w-full  
             `}>
            <div className="rounded-[10px]  shadow-2xl bg-white/80 shadow-black/20 p-8 m-4 md:max-w-2xl md:mx-auto">

                <div className={`flex justify-center mb-4 ${loading ? "hidden" : "block"}`}>
                    <h1 className="w-full text-center text-black items-center text-grey-darkest ">{operacion} </h1>

                    <div className="" onClick={() => setShowModal2(false)}>
                        <HiOutlineXMark className="text-black w-[30px] h-[30px] cursor-pointer hover:scale-110" color="black" />
                    </div>
                </div>
                <form className="mb-4 md:flex  md:flex-wrap md:justify-between" action={async (formData) => {
                    if (operacion == 'Modificar') {


                        await actualizarBanner(formData, idEvento)
                        toast.success('El banner fue actualizado!!!')

                    }
                    else if (operacion == "Crear Banner") {

                        await crearBanner(formData)
                        toast.success('El banner fue creado!!!')
                    }


                    return (setShowModal2(false), setLoading(false))

                }} >

                    <div className={`w-full h-[100px] ${loading ? "hidden" : "block"}`}>

                        <h2 className='text-black text-md'>Banner para escritorio</h2>
                        <FileUploader className="custom-fileUploader w-[200px] h-[200px]" handleChange={handleChange} label="Arrastra o carga la imagen." name="imagen" id="imagen" types={fileTypes} multiple="false" hoverTitle="Arrastra Aqui" maxSize={4} />


                    </div>

                    <div className={`w-full h-[100px] ${loading ? "hidden" : "block"}`}>
                        <h2 className='text-black text-md'>Banner para celular</h2>
                        <FileUploader className="custom-fileUploader w-[200px] h-[200px]" handleChange={handleChange} label="Arrastra o carga la imagen." name="imagenCelular" id="imagenCelular" types={fileTypes} multiple="false" hoverTitle="Arrastra Aqui" maxSize={4} />

                    </div>

                    <button onClick={() => setLoading(true)} className={`block bg-slate-700 text-white uppercase text-lg mx-auto p-2 rounded-[5px]  hover:bg-slate-900 w-full mt-4 ${loading ? "hidden" : "block"}`} type="submit"  >

                        Enviar</button>

                    {
                        loading && <div className='w-[200px] items-center flex justify-center h-[200px]'>
                            <DotLoader
                                color={color}
                                loading={loading}
                                cssOverride={override}
                                size={50}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    }

                </form>


            </div>
        </div>

    )
}
