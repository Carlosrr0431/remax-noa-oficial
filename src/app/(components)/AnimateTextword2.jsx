import React, { useEffect } from "react";
import { motion } from "framer-motion";

import UniteRemaxLogo from '../public/LOGO PARA UNITE A REMAX EN BLANCO.svg'
import Image from "next/image";
import { useAppContext } from "../(context)/AppWrapper";


export const AnimatedTextword = ({ text }) => {

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
    // function numberOfCharacters(string1) {
    //     let string = string1.toLowerCase()
    //     let resultado = {}

    //     for ( let char of string)
    //         resultado[char] = (resultado[char] ?? 0) + 1

    //     return resultado[0]
    // }

    const words = text.split(" ");

    // Variants for Container of words.
    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
        }),
    };

    // Variants for each word.

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            x: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            style={{ fontSize: `${ancho <= 600 ? "2rem" : "3rem"}` }}
            variants={container}
            initial="hidden"
            animate="visible"
            className="font-normal sm:flex"
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    style={{ marginRight: "7px" }}
                    key={index}
                    className={`${index == 4 ? 'relative  flex justify-center items-center ml-[5px]' : word == '|' ? 'bottom-1 relative' : ''}`}
                >
                    {index == 4 ? <Image src={UniteRemaxLogo} width={`${ancho <= 600 ? "200" : "300"}`} height={`${ancho <= 600 ? "200" : "300"}`} alt="" /> : index == 5  ? '' : word}

                    {/* {numberOfCharacters(word)} */}
                </motion.span>
            ))}
        </motion.div>
    );
};