import React from 'react'
import Providers from '../(providers)/Providers'
import { AppWrapper } from '../(context)/AppWrapper'
import { motion } from "framer-motion";

import { fadeIn, variants } from "../variants.js";
import Link from 'next/link';
import Image from 'next/image.js';
import { Toaster } from 'sonner';

export const LayoutNew = () => {
    return (
        <Providers>
            <AppWrapper>
                {children}
                <Toaster position="bottom-center" richColors />

                <motion.div
                    variants={fadeIn("up", 0.8)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className={`${pathname == '/dashboard' ? 'hidden' : 'block'} fixed right-0 bottom-0 z-50 mb-8 mr-8`}
                >
                    <Link
                        rel="noopener noreferrer"
                        target="_blank"
                        href="https://wa.me/+543878256529?text=Escribenos para poder orar por ti"
                        className=""
                    >
                        <Image
                            src={Whatsapp}
                            width={50}
                            height={50}
                            alt=""
                            className="transition-all hover:scale-110  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]"

                        />
                    </Link>
                </motion.div>
            </AppWrapper>
        </Providers>
    )
}
