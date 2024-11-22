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
        <div className={`${pathname == '/dashboard' || pathname == '/comunidadRemax/dashboard/profile' || pathname == '/contactanos' || pathname == '/dashboard/administrador' || pathname == '/dashboard/jujuy' || pathname == '/login' || pathname == '/mailingSystem' || pathname == '/mailingSystem/rrhh' || pathname == '/comunidadRemax/dashboard' || pathname == '/inventarioRemax' || pathname == '/alianzas/agentes' || pathname == '/dashboard/rrhh' || pathname == '/comunidadRemax/agentes' || pathname == '/mailingSystem/agentes' ? 'hidden' : 'block'} `}>
            <Link

                rel="noopener noreferrer"
                target="_blank"
                href="https://wa.me/+5493876852073?text=Hola!!! Te escribo desde la Landing Page, y quiero saber más información sobre trabajar en RE/MAX NOA."
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
