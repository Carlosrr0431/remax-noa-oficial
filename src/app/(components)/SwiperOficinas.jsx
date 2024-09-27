import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { Navigation, Pagination, Autoplay, Scrollbar } from "swiper/modules";
import Image from 'next/image';
import { useAppContext } from '../(context)/AppWrapper';


import img2 from '../public/0193 - _F6_0986 B.jpg'
import img3 from '../public/0220 - _F6_1138 B.jpg'
import img4 from '../public/0155 - DSC_5731 B (1).jpg'
import img5 from '../public/0145 - 7H1A0377 B.jpg'

import Link from 'next/link';

export const SwiperOficina = () => {

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

    return (
        <>
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
                className="h-[80%] w-[100%] sm:rounded-b-[150px] rounded-b-[100px] relative"
            >

                <SwiperSlide>

                    {ancho > 500 || ancho <= 400 ? <div className="h-full  w-full  relative">
                        <Image

                            src={img4}
                            alt="image 2"
                            className="h-full  w-full object-cover brightness-75"
                            width={1500}
                            height={1500}

                        />


                        <button
                            className=" bg-black /90  font-semibold text-white sm:py-0.5 sm:px-4  text-[20px] hover:border-transparent hover:bg-sky-900  rounded-sm absolute translate-z-50 top-[80%] left-[15%] sm:left-[36%] items-center sm:w-[350px] px-2 py-2 sm:h-[50px] w-[250px]">
                            SUMATE AL EQUIPO
                        </button>
                    </div> : <Image

                        src={img4}
                        alt="image 2"
                        className="h-full  w-full object-cover"
                        width={2000}
                        height={2000}
                    />}


                </SwiperSlide>

                <SwiperSlide>

                    {ancho > 500 || ancho <= 400 ? <div className="h-full  w-full  relative">
                        <Image
                            src={img2}
                            alt="image 2"
                            className="h-full  w-full object-cover brightness-75"
                            width={2000}
                            height={2000}

                        />

                        <Link href={'/contactanos'}>
                            <button
                                className=" bg-black /90  font-semibold text-white sm:py-0.5 sm:px-4  text-[20px] hover:border-transparent hover:bg-sky-900  rounded-sm absolute translate-z-50 top-[80%] left-[15%] sm:left-[36%] items-center sm:w-[350px] p-2 sm:h-[50px] w-[250px]">
                                SUMATE AL EQUIPO
                            </button></Link>
                    </div> : <Image
                        src={img2}
                        alt="image 2"
                        className="h-full  w-full object-cover"
                        width={2000}
                        height={2000}

                    />}


                </SwiperSlide>

                <SwiperSlide>

                    {ancho > 500 || ancho <= 400 ? <div className="h-full  w-full  relative">
                        <Image
                            src={img3}
                            alt="image 2"
                            className="h-full  w-full object-cover brightness-75"
                            width={2000}
                            height={2000}

                        />

                        <Link href={'/contactanos'}>
                            <button
                                className=" bg-black /90  font-semibold text-white sm:py-0.5 sm:px-4  text-[20px] hover:border-transparent hover:bg-sky-900  rounded-sm absolute translate-z-50 top-[80%] left-[15%] sm:left-[36%] items-center sm:w-[350px] p-2 sm:h-[50px] w-[250px]">
                                SUMATE AL EQUIPO
                            </button></Link>
                    </div> : <Image
                        src={img3}
                        alt="image 2"
                        className="h-full  w-full object-cover"
                        width={2000}
                        height={2000}

                    />}


                </SwiperSlide>

                <SwiperSlide>

                    {ancho > 500 || ancho <= 400 ? <div className="h-full  w-full  relative">
                        <Image
                            src={img5}
                            alt="image 2"
                            className="h-full  w-full object-cover brightness-75"
                            width={2000}
                            height={2000}

                        />

                        <Link href={'/contactanos'}>
                            <button
                                className=" bg-black /90  font-semibold text-white sm:py-0.5 sm:px-4  text-[20px] hover:border-transparent hover:bg-sky-900  rounded-sm absolute translate-z-50 top-[80%] left-[15%] sm:left-[36%] items-center sm:w-[350px] p-2 sm:h-[50px] w-[250px]">
                                SUMATE AL EQUIPO
                            </button></Link>
                    </div> : <Image
                        src={img5}
                        alt="image 2"
                        className="h-full  w-full object-cover"
                        width={2000}
                        height={2000}

                    />}


                </SwiperSlide>

            </Swiper >

        </>
    );
}
