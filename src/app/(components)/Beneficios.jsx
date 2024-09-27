import React, { use, useRef, useState } from 'react'
import { motion } from "framer-motion"
import { ModalArea } from './ModalArea';
import RedInmobilaria from '../public/RED DE INMOBILIARIA.svg'
import MaximizaIngresos from '../public//MAXIMIZA TUS INGRESOS.svg'
import TrabajaAutonomo from '../public/TRABAJA DE FORMA AUTONOMA.svg'
import Capacitaciones from '../public/CAPACITACIONES CONSTANTES.svg'
import NegociosCompartidos from '../public/NEGOCIOS COMPARTIDOS.svg'
import RespaldoMundial from '../public/RESPALDO DE UNA MARCA MUNDIAL.svg'
import RemaxTech from '../public/REMAX TECH.svg'
import Image from 'next/image';




const fadeInAnimationVariants = {
    initial: (i) => ({
        opacity: 0,
        translateX: i % 2 === 0 ? -50 : 50,
        translateY: -50,
    }),
    animate: (i) => (
        {
            opacity: 1, translateX: 0, translateY: 0,
            transition: {
                duration: 0.3,
                delay: i * 0.2,

            }
        }
    )
}



export const Beneficios = ({ scrollNum }) => {

    const [showModal, setShowModal] = useState(false);
    const [tipoArea, setTipoArea] = useState("");


    // Respaldo de una marca mundial N° 1 y que quede el icono de RespaldoMundial
    // Quitar "Red Inmobilaria N°1 del Mundo" para agregar Herramientas Tecnologicas
    const beneficiosArticles = [
        { id: 1, title: "Herramientas Tecnologicas", icon: <Image src={RemaxTech} width={0} height={0} alt='' className='w-[48px] h-[48px] sm:w-[50px] sm:h-[50px] group-hover:scale-105 ' /> },
        { id: 2, title: "Maximizá tus ingresos", icon: <Image src={MaximizaIngresos} width={0} height={0} alt='' className='w-[48px] h-[48px] sm:w-[50px] sm:h-[50px] group-hover:scale-105 ' /> },
        { id: 3, title: "Trabaja en forma autonoma", icon: <Image src={TrabajaAutonomo} width={0} height={0} alt='' className='w-[48px] h-[48px] sm:w-[50px] sm:h-[50px] group-hover:scale-105 ' /> },
        { id: 4, title: "Capacitaciones constantes", icon: <Image src={Capacitaciones} width={0} height={0} alt='' className='w-[48px] h-[48px] sm:w-[50px] sm:h-[50px] group-hover:scale-105 ' /> },
        { id: 5, title: "Negocios Compartidos", icon: <Image src={NegociosCompartidos} width={0} height={0} alt='' className='w-[48px] h-[48px] sm:w-[50px] sm:h-[50px] group-hover:scale-105 ' /> },
        { id: 6, title: "Respaldo de una marca mundial N°1", icon: <Image src={RespaldoMundial} width={0} height={0} alt='' className='w-[48px] h-[48px] sm:w-[50px] sm:h-[50px] group-hover:scale-105 ' /> },
    ];


    return (
        <div className='w-full h-full bg-none ' >
            <div className='w-full h-full left-0 bg-none relative sm:-left-[50px] sm:mb-[100px] sm:bottom-[40px] items-center'  >

                <section className="bg-none  md:mt-0  md:py-0 w-full h-full">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 sm:gap-8 md:grid-cols-3 justify-center items-center mx-auto gap-x-12 ml-2">

                            {beneficiosArticles.map((article, i) => (
                                <motion.div key={article.id}

                                    initial="initial"
                                    onClick={() => (setShowModal(true), setTipoArea(article.title))}
                                    variants={fadeInAnimationVariants}
                                    whileInView="animate"
                                    viewport={{ once: true }}
                                    custom={i}
                                >
                                    <div className="flex flex-col items-center justify-center gap-4 rounded-lg p-0 sm:p-4  group text-center shadow-xl transition-all duration-300 hover:scale-105 w-[150px] h-[180px] text-balance sm:w-[200px] sm:h-[200px] -ml-[15px] sm:mr-0">
                                        {article.icon}
                                        <h3 className="text-[16px] font-medium text-black  group-hover:scale-105">{article.title}</h3>
                                    </div>

                                </motion.div>
                            ))}

                        </div>
                    </div>
                </section>

            </div>
{/* 
            {
                showModal && <ModalArea tipoArea={tipoArea} showModal={showModal} setShowModal={() => setShowModal(false)} />
            } */}
        </div>
    )
}
