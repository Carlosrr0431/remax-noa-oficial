"use client"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import Image from "next/image";
import Facebook from '../public/facebook.svg'
import Instagram from '../public/instagram.svg'
import Youtube from '../public/youtube.svg'
import Tiktok from '../public/tik tok icono.svg'
import WhatsApp from '../public/whatsapp.svg'
import { useAppContext } from "../(context)/AppWrapper";

import Home from "../public/inicio icono.svg";
import Conocenos from "../public/conocenos icono.svg";
import Testimonios from "../public/feedback-review_13085382.svg";
import Contactar from "../public/curriculum_profile_biodata_resume_portofolio_cv_vitae_icon_232635.svg";



export const navData = [
  { name: "Inicio", path: "/#inicio", icon: Home },
  { name: "Conocenos", path: "/#nosotros", icon: Conocenos },
  { name: "Testimonios", path: "/#testimonios", icon: Testimonios },
  { name: "Enviar CV", path: "/contactanos", icon: Contactar },
]
const Nav = () => {
  const pathname = usePathname();
  const { cambioHeader } = useAppContext()

  // https://www.facebook.com/remaxnoasalta
  // https://www.instagram.com/remaxnoa.arg/
  // https://wa.me/+5493876852073?text=Quiero mas info...
  // https://www.linkedin.com/company/64931051/admin/dashboard/     **falta el icono






  return (
    <nav className={`${pathname == '/dashboard' || pathname == '/nuevaLanding/forma-parte' || pathname == '/nuevaLanding/porque-vender' || pathname == '/nuevaLanding/dashboard' || pathname == '/ranking' || pathname == '/nuevaLanding/porque-comprar' || pathname == '/login' || pathname == '/dashboard/administrador' || pathname == '/dashboard/jujuy' || pathname == '/mailingSystem/rrhh' || pathname == '/mailingSystem/agentes' || pathname == '/nuevaLanding/reclutamiento' || pathname == '/nuevaLanding/propiedades' || pathname == '/mailingSystem' || pathname == '/alianzas/agentes' || pathname == '/comunidadRemax/dashboard/profile' || pathname == '/nuevaLanding' || pathname == '/comunidadRemax/agentes' || pathname == '/alianzas/negocios' || pathname == '/comunidadRemax/dashboard' || pathname == '/inventarioRemax' || pathname == '/dashboard/rrhh' ? 'hidden' : 'flex'} montserrat  flex-col  items-center xl:justify-center gap-y-4  fixed h-max bottom-0 mt-auto xl:right-[2%]  z-50 w-full top-0 xl:w-12 xl:max-w-md xl:h-[60%] xl:bottom-[150px]`}>
      <div className={` w-full xl:flex-col items-center justify-between xl:justify-center gap-y-7 px-4 md:px-40 xl:  h-[80px]  text-3xl xl:text-xl xl:rounded-full xl:h-max py-4  opacity-80 bg-blend-multiply hidden sm:flex`}>

        <Link target="_blank" href={'https://www.facebook.com/remaxnoasalta'} className="duration-300 transition-all hover:scale-110  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]"> <Image src={Facebook} width={10} height={10} alt="" /> </Link>

        <Link target="_blank" href={'https://www.instagram.com/remaxnoa.arg/'} className="duration-300 transition-all hover:scale-110  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]"> <Image src={Instagram} width={20} height={20} alt="" /> </Link>

        <Link target="_blank" href={'https://wa.me/+5493876852073?text=Quiero mas info...'} className="duration-300 transition-all hover:scale-110  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]"> <Image src={WhatsApp} width={20} height={20} alt="" /> </Link>
      </div>

      <div

        className="flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-5 px-4 md:px-40 xl:px-0 h-[80px] backdrop-blur-sm text-3xl xl:text-xl xl:rounded-full xl:h-max py-4 bg-blue-900/90 opacity-80 bg-blend-multiply sm:hidden"
      >
        {navData.map((link, index) => {
          return (
            <Link
              className={`${link.path === pathname && "text-accent"
                } relative items-center flex group hover:text-accent transition-all duration-300`}
              key={index}
              href={link.path}
            >
              <div className="absolute  pr-10 right-0 hidden xl:group-hover:flex">
                <div className=" relative flex bg-black/30  p-2 text-white items-center  rounded-[15px] ">
                  <div className="text-[13px] text-end  font-regular w-auto text-nowrap leading-none   uppercase">
                    {link.name}
                  </div>
                  {/* <div className="border-solid border-l-white border-l-8 border-y-transparent border-y-[10px]border-r-0 absolute -right-2">
                    {" "}
                  </div> */}
                </div>
              </div>

              <div className={`flex  flex-col justify-center items-center gap-y-1  ${link.name == 'Eventos' || link.name == 'Ubicacion' ? 'mt-[2px]' : 'mt-[5px]'} `} >
                <Image src={link.icon} width={0} height={0} alt="" className={`${link.name == 'Mi Semilla' ? 'xl:mb-0' : 'xl:mb-2'} max-w-[25px]  max-h-[25px] transition-all hover:scale-110  focus:opacity-[0.85] focus: shadow-none  active:opacity-[0.85] ${link.name == 'Eventos' || link.name == 'Ubicacion' ? 'max-w-[22px] max-h-[22px]' : ''} `} />
                <p className="text-[11px] text-center  font-bold xl:hidden block">{link.name}</p>
              </div>


            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
