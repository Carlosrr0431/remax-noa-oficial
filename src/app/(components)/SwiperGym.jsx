// testimonial data

import Imagen1 from '../public/pexels-victorfreitas-841130.jpg'
import Imagen2 from '../public/pexels-victorfreitas-949131.jpg'
import Imagen3 from '../public/t-avt-3.png'

const testimonialData = [

    {
        image: Imagen1,
        name: "Silvia Loaza",
        position: "Apostol",
        message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum expedita odit beatae, cupiditate saepe quam officia aut placeat quas neque!",
    },
    {
        image: Imagen2,
        name: "Silvia Loaza",
        position: "Apostol",
        message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum expedita odit beatae, cupiditate saepe quam officia aut placeat quas neque!",
    },
    // {
    //     image: Imagen3,
    //     name: "Claudio Loaza",
    //     position: "Apostol",
    //     message:
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum expedita odit beatae, cupiditate saepe quam officia aut placeat quas neque!",
    // },
    // {
    //     image: Imagen2,
    //     name: "Silvia Loaza",
    //     position: "Apostol",
    //     message:
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum expedita odit beatae, cupiditate saepe quam officia aut placeat quas neque!",
    // },
];

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay, Scrollbar } from "swiper/modules";

import Image from "next/image";
import { supabaseClient } from '@/supabase/client';
import { useEffect, useState } from 'react';
import { useAppContext } from '../(context)/AppWrapper';

const SwiperGym = () => {

    const [contenido, setContenido] = useState([])
    const { ancho, setAncho } = useAppContext()

    useEffect(() => {
        window?.addEventListener("resize", () => {
            setAncho(window.innerWidth);
        });
        // return () => {
        //   window?.removeEventListener("resize", () => {
        //     setAncho(window?.innerWidth);
        //   });
        // };

        console.log(ancho);
    }, [setAncho, ancho])

    useEffect(() => {

        const getSupabaseOficial = async () => {
            const data = await supabaseClient
                .from('banners')
                .select('*')


            setContenido(data.data)
        }



        getSupabaseOficial()

        const channelOficial = supabaseClient
            .channel('banners')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'banners' }, (payload) => {


                if (payload.eventType == "INSERT") {

                    return setContenido((antContenido) => [...antContenido, payload.new])
                } else if (payload.eventType == 'UPDATE') {
                    return setContenido((antContenido) => antContenido.map((elem) => {
                        if (elem.id == payload.new.id) {
                            elem = payload.new
                        }

                        return elem;
                    }))
                } else if (payload.eventType == 'DELETE') {

                    return setContenido(antContenido => antContenido.filter((elem, index) => elem.id !== payload.old.id))
                }

            })
            .subscribe()

        return () => {

            supabaseClient.removeChannel(supabaseClient.channel(channelOficial))

        }


    }, [])


    return (
        <Swiper
            // navigation={true}
            pagination={{
                clickable: true,

            }}
            autoplay={{
                delay: 3000
            }}
            scrollbar={{ draggable: true }}
            modules={[Navigation, Pagination, Autoplay, Scrollbar]}
            className="h-[80%] w-[100%] "
        >

            {
                contenido?.map((elem, index) => {


                    return (<SwiperSlide key={index}>




                        {ancho > 500 ? <Image
                            src={elem.imagenUrl}
                            alt="image 2"
                            className="h-full  w-full object-cover"
                            width={2000}
                            height={2000}

                        /> : <Image
                            src={elem.imagenUrlCelular}
                            alt="image 2"
                            className="h-full  w-full object-cover"
                            width={2000}
                            height={2000}

                        />}


                    </SwiperSlide>)
                })
            }




        </Swiper>
    );
};

export default SwiperGym;