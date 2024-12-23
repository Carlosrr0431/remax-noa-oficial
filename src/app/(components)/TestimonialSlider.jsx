// testimonial data

import Jimena from '../public/JIMENA CORNEJO (1).jpg'
import Alejandro from '../public/ALEJANDRO 2 (1).jpg'
import Alberto from '../public/ALBERTO (1).jpg'
import Silvana from '../public/Silvana Paz.jpeg'
import JuanPablo from '../public/JUAN PABLO 1 (usar esta) (1).jpg'
import NicoPacheco from '../public/NICO PACHECO 3 (1).jpg'
import FatimaCamusso from '../public/Fatima Camusso.jpg'
import TomasMallagray from '../public/Tomas Mallagray.jpg'
import MatiasMiño from '../public/Matias Miño.jpeg'
import DaianaGarcia from '../public/Daiana Garcia.jpg'
// Desde que conocí REMAX sentí que era la oportunidad de realizar mis sueños. Me dedico a ayudar a otros y generó ingresos por eso, mientras puedo pasar más tiempo con mis hijos gracias a la flexibilidad del modelo

const testimonialData = [

    {
        image: Jimena,
        name: "JIMENA CORNEJO LLORCA",
        position: "Corredora Inmobilaria",
        oficina: "Salta",
        message:
            "Trabajar en RE/MAX NOA es pasión, simplemente pasión. Amo mi trabajo y eso me lleva a dar lo mejor de mí. Estoy constantemente acompañada por todo un equipo de agentes, staff y brokers. ",
    },
    {
        image: Alejandro,
        name: "ALEJANDRO RODRIGUEZ",
        position: "Agente Inmobilario",
        oficina: "Salta",
        message:
            "Mi experiencia desde el primer momento en RE/MAX NOA fue transformadora. El ambiente de colaboración y apoyo constante me permitió desarrollar mi pasión por el servicio inmobiliario al máximo. ",
    },
    {
        image: MatiasMiño,
        name: "MATIAS MIÑO",
        position: "Agente Inmobilario",
        oficina: "Jujuy",
        message:
            "Desde que conocí REMAX sentí que era la oportunidad de realizar mis sueños. Me dedico a ayudar a otros y generó ingresos por eso, mientras puedo pasar más tiempo con mis hijos gracias a la flexibilidad del modelo. ",
    },
    // {
    //     image: Matias,
    //     name: "MATIAS FRADEJAS",
    //     position: "Agente Inmobilario",
    //     oficina: "Salta",
    //     message:
    //         "En RE/MAX NOA encontré un espacio de desafío y crecimiento personal, donde puedo desarrollarme profesionalmente y formar parte de un equipo comprometido con altos valores.",
    // },
    {
        image: Alberto,
        name: "ALBERTO NANTERNE",
        position: "Agente Inmobilario",
        oficina: "Salta",
        message:
            "Es un trabajo individual en equipo, donde cada uno hace lo que mejor sabe hacer y se complementa con los demás para sinergizar relaciones de confianza y concretar sueños.",
    },

    {
        image: Silvana,
        name: "AGUSTINA ORTIZ",
        position: "Agente Inmobilario",
        oficina: "Salta",
        message:
            "En RE/MAX NOA, tengo la oportunidad de gestionar mis horarios y disfrutar de la independencia financiera, sabiendo que siempre cuento con un equipo de trabajo dispuesto a apoyarme.",
    },

    {
        image: JuanPablo,
        name: "JUAN PABLO",
        position: "Agente Inmobilario",
        oficina: "Salta",
        message:
            "Mi experiencia en RE/MAX NOA ha sido muy positiva, con un crecimiento exponencial tanto en mi negocio como en lo personal. Lo que más me gusta de trabajar aquí es la flexibilidad.",
    },

    {
        image: DaianaGarcia,
        name: "DAIANA GARCIA",
        position: "Agente Inmobilario",
        oficina: "Jujuy",
        message:
            "REMAX implicó un cambio 100% en mi, logrando confianza y disciplina. Aprendí a conocerme a mi misma para poder conocer a otros. Eso es REMAX en mi vida: una red mundial que ayuda a la gente a cumplir sus sueños.",
    },

    {
        image: NicoPacheco,
        name: "NICOLAS PACHECO",
        position: "Agente Inmobilario",
        oficina: "Salta",
        message:
            "Ser parte del equipo RE/MAX NOA ha transformado mi vida personal y profesional. Desde el primer día, me sentí bienvenido en un ambiente laboral muy positivo. "
    },

    {
        image: FatimaCamusso,
        name: "FATIMA CAMUSSO",
        position: "Agente Inmobilario",
        oficina: "Jujuy",
        message:
            "REMAX me permitió ser independiente junto a una marca sólida y una red enorme. Puedo equilibrar mi vida personal y profesional, generando muy buenos ingresos."
    },

    {
        image: TomasMallagray,
        name: "TOMAS MALLAGRAY",
        position: "Agente Inmobilario",
        oficina: "Jujuy",
        message:
            "REMAX es gran parte de mi vida. Tuve la oportunidad de crecer en lo personal y en lo profesional. Fue una de las cosas más importantes y positivas que me pasaron."
    },
];

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { useAppContext } from '../(context)/AppWrapper';
import { useEffect } from 'react';
import { FaQuoteLeft } from 'react-icons/fa'

const TestimonialSlider = () => {

    const { ancho, setAncho } = useAppContext()

    useEffect(() => {
        window?.addEventListener("resize", () => {
            setAncho(window.innerWidth);
        });
    })

    return (
        <Swiper
            // navigation={true}
            pagination={{
                clickable: true,

            }}
            spaceBetween={100}
            slidesPerView={ancho < 950 ? 1 : 2}
            autoplay={{
                delay: 5000
            }}
            modules={[Pagination, Autoplay]}
            className="sm:h-full  w-[100%] md:w-[80%] relative items-center flex justify-center sm:bottom-[80px] mb-[100px] bottom-[100px] h-[80%]"
        >

            {testimonialData.map((person, index) => {

                return (
                    <SwiperSlide key={index} >

                        <div className="flex flex-col space-x-6 items-center md:flex-row  h-full w-full px-28 ">

                            <div className=" w-full flex flex-col xl:justify-center items-center relative  mx-auto xl:mx-0 ">

                                <div className="mb-2 mx-auto">
                                    <Image
                                        src={person.image}
                                        alt=""
                                        width={100}
                                        height={100}
                                        className='imagenTestimonios'
                                    />
                                </div>

                                <div className="text-lg text-black text-center w-[400px]  mb-4">{person.name}</div>


                                <div className="text-[12px] w-[400px]  mb-[20px] text-black uppercase font-normal tracking-widest flex justify-center text-center">{person.position}</div>
                                <div className="text-[12px] w-[400px]  bottom-[20px] relative text-black uppercase font-normal tracking-widest flex justify-center text-center">{person.oficina}</div>

                                <div className="flex-1 flex flex-col justify-center before:w-[1px] xl:before:bg-white/20 xl:before:absolute xl:before:left-0 xl:before:h-[200px] relative xl:pl-20">
                                    <div className="mb-2 right-[100px] relative sm:right-0 sm:mb-4">
                                        <FaQuoteLeft className="text-2xl xl:text-4xl text-black/20 mx-auto md:mx-0 " />
                                    </div>

                                    <div className="w-[300px] text-sm xl:w-[400px] xl:text-lg text-center md:text-left text-black">
                                        {person.message}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper >
    );
};

export default TestimonialSlider;