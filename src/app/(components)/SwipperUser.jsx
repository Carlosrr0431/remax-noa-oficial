// testimonial data


import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay, Scrollbar } from "swiper/modules";

import { FaQuoteLeft } from "react-icons/fa";

import { BsArrowRight } from "react-icons/bs";
import Image from "next/image";
import { supabaseClient } from '@/supabase/client';
import { useEffect, useState } from 'react';
import { useAppContext } from '../(context)/AppWrapper';

const SwipperUser = () => {

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
            className={`${ancho > 600 ? "w-[60%]" : "w-[100%]"} h-[70%]  mb-[100px]`}
        >

            {
                contenido?.map((elem, index) => {


                    return (<SwiperSlide key={index}>







                    </SwiperSlide>)
                })
            }


        </Swiper>
    );
};

export default SwipperUser;