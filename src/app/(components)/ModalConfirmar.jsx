import React from 'react'
import { HiOutlineXMark } from 'react-icons/hi2';
import { EliminarEvento } from '../lib/data';

export const ModalConfirmar = ({ setShowModal3, idEvento, tipo }) => {
    return (
        <div className={`fixed inset-0  z-50  bg-opacity-100 backdrop-blur-sm
        flex items-center justify-center h-full w-full  
        `}>
            <div className={`rounded-[10px] shadow-2xl  shadow-black/20 p-8 m-4 md:min-w-[200px] md:mx-auto bg-slate-800 `}>
                <div className="flex justify-center">
                    <h1 className="w-full text-md text-center text-white items-center text-grey-darkest "> ¿Seguro que deseas eliminar?</h1>

                    <div className="relative bottom-[20px] left-[20px]" onClick={() => setShowModal3(false)}>
                        <HiOutlineXMark className="text-white w-[30px] h-[30px] cursor-pointer hover:scale-110" color="white" />
                    </div>
                </div>







                <div className="flex w-full justify-center  gap-x-4 mx-auto mb-4 mt-4" >
                    <button
                        className="self-end flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center border-[1px] border-gray-800 align-middle font-sans text-xs font-bold uppercase text-white transition-all hover:bg-red-900 hover:text-white bg-red-700 active:bg-pink-500/30   disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={async () => {
                            await EliminarEvento(idEvento, tipo),
                                setShowModal3(false)
                        }}

                    >
                        Eliminar

                    </button>
                    <button
                        onClick={() => setShowModal3(false)}
                        className="self-end flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center border-[1px] border-gray-800 align-middle font-sans text-xs font-bold uppercase text-white transition-all hover:bg-slate-700 hover:text-white bg-slate-900 active:bg-pink-500/30   disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"

                    >
                        Cancelar

                    </button>

                </div>




            </div>
        </div >
    )
}
