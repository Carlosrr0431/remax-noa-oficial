import Facebook from '../public/facebook.svg'
import Instagram from '../public/instagram.svg'
import Tiktok from '../public/tik tok icono.svg'
import WhatsApp from '../public/whatsapp.svg'
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAppContext } from "../(context)/AppWrapper";
import Link from 'next/link'

const Redes = () => {

    const { cambioHeader } = useAppContext()

    const pathname = usePathname();

    return <div className={`-translate-x-[250px] flex gap-x-7 items-center justify-center`}>

        <Link href={''} className="duration-300 transition-all hover:scale-110  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]"> <Image src={Facebook} width={10} height={10} alt="" /> </Link>
        <Link href={''} className="duration-300 transition-all hover:scale-110  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]"> <Image src={Instagram} width={20} height={20} alt="" /> </Link>
        <Link href={''} className="duration-300 transition-all hover:scale-110  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]"> <Image src={Tiktok} width={20} height={20} alt="" /> </Link>
        <Link href={''} className="duration-300 transition-all hover:scale-110  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]"> <Image src={WhatsApp} width={20} height={20} alt="" /> </Link>
    </div>;
};

export default Redes;