"use client"

import React, { useState, useRef } from "react";

import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'
import { sendForm } from "../action.js";
import Image from "next/image.js";
import Cancel from '../public/cancel.svg'
import Accordion from "./Accordion.jsx";

// import { useFormState } from "react-dom";


export const ModalArea = ({ setShowModal, tipoArea }) => {

    const router = useRouter()
    // const [state, formAction] = useFormState(sendForm, {
    //     errors: {
    //         text: undefined
    //     },
    // })


    return (


        <div className={`fixed inset-0  z-50 
             flex items-center justify-center h-full w-full  bg-opacity-100  backdrop-blur-sm
             `}>
            <div className="rounded-[10px]  shadow-2xl bg-black/70 shadow-black/20 p-8 m-4 md:max-w-2xl md:mx-auto">
                <div className="flex">
                    <h1 className=" w-full text-center text-white mb-6">{tipoArea}</h1>
                    <div className="" onClick={() => setShowModal(false)}>
                        <button className="cursor-pointer">
                            <Image src={Cancel} height={40} width={40} alt="" className="hover:scale-110 text-white fill-white" color="#ffffff"/>
                        </button>
                    </div>
                </div>

                <div className="w-full  grid grid-cols-1 mx-auto md:grid md:grid-cols-2 gap-x-4 items-center  ">

                    <div className="md:w-[50%] -ml-4 md:-ml-0" >
                        <Accordion
                            title="Do you prefer Android or iOS"
                            answer="I like to use iOS products"

                        />

                    </div>

                    <div className="md:w-[50%] -ml-4 md:-ml-0" >
                        <Accordion
                            title="Do you prefer Android or iOS"
                            answer="I like to use iOS products"

                        />
                    </div>

                    <div className="md:w-[50%] -ml-4 md:-ml-0" >
                        <Accordion
                            title="Do you prefer Android or iOS"
                            answer="I like to use iOS products"

                        />
                    </div>
                    <div className="md:w-[50%] -ml-4 md:-ml-0" >
                        <Accordion
                            title="Do you prefer Android or iOS"
                            answer="I like to use iOS products"

                        />
                    </div>

                    <div className="md:w-[50%] -ml-4 md:-ml-0" >
                        <Accordion
                            title="Do you prefer Android or iOS"
                            answer="I like to use iOS products"

                        />
                    </div>

                    <div className="md:w-[50%] -ml-4 md:-ml-0" >
                        <Accordion
                            title="Do you prefer Android or iOS"
                            answer="I like to use iOS products"

                        />
                    </div>
                </div>

            </div>
        </div>





    );
};
