import Link from "next/link";


import Facebook from '../public/facebook.svg'
import Instagram from '../public/instagram.svg'
import Youtube from '../public/youtube.svg'
import Tiktok from '../public/tik tok icono.svg'
import WhatsApp from '../public/whatsapp.svg'
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAppContext } from "../(context)/AppWrapper";


// https://www.facebook.com/remaxnoasalta
// https://www.instagram.com/remaxnoa.arg/
// https://wa.me/5493876852073
// https://www.linkedin.com/company/64931051/admin/dashboard/     **falta el icono

// className={`${pathname == '/cursos'   ? 'hidden' : 'block'}`}
const Socials = () => {

  const { cambioHeader } = useAppContext()

  const pathname = usePathname();

  return <div>
    <div className={`${pathname == '/cursos' || pathname == '/planes' || pathname == '/about' || cambioHeader ? 'sm:hidden hidden' : ''} hidden sm:flex gap-x-7 items-center justify-center montserrat relative sm:left-[250px] `}>

      <Link href={'#nosotros'} className="duration-300 transition-all hover:scale-105  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] text-white font-light montserrat hover:font-medium "> Nosotros  </Link>

      <Link href={'#testimonios'} className="duration-300 transition-all hover:scale-105  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] text-white font-light montserrat hover:font-medium"> Testimonios </Link>
      <Link href={'#formulario'} className="duration-300 transition-all hover:scale-105  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] text-white font-light montserrat hover:font-medium"> Sumate </Link>
    </div>

    <div className={`${pathname == '/cursos' || pathname == '/planes' || pathname == '/about' || cambioHeader ? 'hidden' : ''} flex sm:hidden gap-x-12 items-center justify-center bottom-[50px] relative`}>

      <Link href={'https://www.facebook.com/remaxnoasalta'} target="_blank" className="duration-300 transition-all hover:scale-110  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]"> <Image src={Facebook} width={10} height={10} alt="" /> </Link>

      <Link href={'https://www.instagram.com/remaxnoa.arg/'} target="_blank" className="duration-300 transition-all hover:scale-110  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]"> <Image src={Instagram} width={20} height={20} alt="" /> </Link>

      {/* <Link href={''} className="duration-300 transition-all hover:scale-110  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]"> <Image src={Youtube} width={20} height={20} alt="" /> </Link> */}
      {/* <Link href={''} className="duration-300 transition-all hover:scale-110  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]"> <Image src={Telegram} width={20} height={20} alt="" /> </Link> */}
      <Link href={'https://wa.me/+5493876852073?text=Quiero mas info...'} target="_blank" className="duration-300 transition-all hover:scale-110  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]"> <Image src={WhatsApp} width={20} height={20} alt="" /> </Link>
    </div>
  </div>;
};

export default Socials;
