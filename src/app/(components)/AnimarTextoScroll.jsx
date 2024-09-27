import React from "react";
import { motion } from "framer-motion";

import UniteRemaxLogo from '../public/LOGO PARA UNITE A REMAX EN BLANCO.svg'
import Image from "next/image";


export const AnimarTextoScroll = ({ text }) => {

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
            style={{ overflow: "hidden", display: "flex", fontSize: "3rem" }}
            variants={container}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="font-normal"
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    style={{ marginRight: "7px" }}
                    key={index}
                >
                    {word}
                    {/* {numberOfCharacters(word)} */}
                </motion.span>
            ))}
        </motion.div>
    );
};