"use client"

import Image from "next/image";
import Link from "next/link";

import Socials from "./Socials";
import { usePathname } from "next/navigation";

import Loguear from './Loguear';
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

import Logo from '../public/LOGO REMAX.svg'
import { useAppContext } from "../(context)/AppWrapper";
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useState } from "react";
// import Logo from '../public/logo_remax noa blanco y color.svg'


const Header = () => {

  const pathname = usePathname();
  const { cambioHeader } = useAppContext()
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimationControls()

  useEffect(() => {
    controls.start({
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "linear"
      }
    })
  }, [controls])

  return (


    <div>





      <header className={`${pathname == '/user' || pathname == '/nuevaLanding/forma-parte' || pathname == '/nuevaLanding/porque-vender' || pathname == '/nuevaLanding/dashboard' || pathname == '/alianzas/agentes' || pathname == '/comunidadRemax/dashboard/profile' || pathname == '/ranking' || pathname == '/cursos' || pathname == '/contactanos' || pathname == '/mailingSystem' || pathname == '/inventarioRemax' || pathname == '/dashboard/administrador' || pathname == '/dashboard' || pathname == '/nuevaLanding' || pathname == '/nuevaLanding/propiedades' || pathname == '/dashboard/jujuy' || pathname == '/alianzas/negocios' || pathname == '/dashboard/rrhh' || pathname == '/nuevaLanding/porque-comprar' || pathname == '/mailingSystem/rrhh' || pathname == '/comunidadRemax/agentes' || pathname == '/comunidadRemax' || pathname == '/mailingSystem/agentes' || pathname == '/eventos' || pathname == '/nuevaLanding/reclutamiento' || pathname == '/comunidadRemax/dashboard' || pathname == '/comunidadRemax' || pathname == '/login' ? 'hidden' : ''} absolute  z-50  w-full flex items-center xl:h-[100px]`}>
        <div className="container mx-auto">
          <div className="items-center relative flex flex-col sm:flex-row sm:justify-between sm:items-center gap-y-8 py-8">
            <div className="">
              <Link href="/#inicio" >

                <Image
                  src={Logo}
                  width={180}
                  height={160}
                  alt=""
                  priority={true}
                  // lg:mx-0 lg:start-1 lg:translate-y-14 lg:items-start lg:-translate-x-[80px]
                  className={`${pathname == '/cursos' || pathname == '/planes' || pathname == '/about' || cambioHeader ? 'hidden -z-20' : ''} object-cover relative right-0 bottom-[50px] sm:bottom-0 sm:right-[70px]`}

                />




              </Link>
            </div>

            <Socials />

            {/* <div className="order-first relative left-[85px] sm:left-[70px]  sm:order-none">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  className="bg-gradient-to-r from-red-400 to-blue-600 text-white rounded-full px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 text-base font-semibold"
                >
                  Contactanos
                </Button>
              </motion.div>
            </div> */}

            <div className="invisible sm:visible order-first relative left-[85px]  sm:left-[50px]  sm:order-none">
              <motion.div
                className="relative p-[0.5px] overflow-hidden rounded-full"
                style={{
                  // background: 'linear-gradient(90deg, #ff0000, #3333ff, #ffffff)',
                  background: 'linear-gradient(90deg, #ff0000,  #ffffff)',
                  backgroundSize: '300% 300%',
                }}
                animate={controls}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    filter: 'blur(5px)',
                  }}
                  animate={{
                    opacity: isHovered ? 0.5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <Link href="/contactanos">

                  <Button
                    className="relative       bg-gradient-to-r from-red-500 to-blue-600 text-white rounded-full px-6 py-3 text-base font-semibold transition-shadow duration-300 hover:shadow-lg"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    Enviar CV
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* <div className="order-first relative left-[85px] sm:left-[70px]  sm:order-none">
              <Link href="/contactanos">
                <Button variant="default" className="flex items-center space-x-2 rounded-[20px]">
                  <MessageCircle className="w-4 h-4" />
                  <span>Contáctanos</span>
                </Button></Link>
            </div> */}

          </div>
        </div>
      </header>

    </div >
  );
};

export default Header;
