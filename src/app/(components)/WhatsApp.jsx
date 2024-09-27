"use client"

import React from 'react'

import { usePathname } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import Whatsapp from "../public/boton de whatsapp.svg";

const WhatsApp = () => {

    const pathname = usePathname()

    return (
        // fixed right-0 bottom-0 z-50 mb-8 mr-8
        <div className={`${pathname == '/dashboard' || pathname == '/contactanos' || pathname == '/dashboard/administrador' || pathname == '/dashboard/user' || pathname == '/mailingSystem' || pathname == '/login' ? 'hidden' : 'block'} `}>
            <Link

                rel="noopener noreferrer"
                target="_blank"
                href="https://wa.me/+5493876852073?text=Quiero mas info..."
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
        </div>
    )
}

export default WhatsApp
