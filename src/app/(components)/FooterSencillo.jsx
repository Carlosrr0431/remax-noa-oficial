// import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Logo from '../public/LOGO REMAX.svg'
import Facebook from '../public/facebook.svg'
import Instagram from '../public/instagram.svg'
import Tiktok from '../public/tik tok icono.svg'
import WhatsApp from '../public/whatsapp.svg'


// https://www.facebook.com/remaxnoasalta
// https://www.instagram.com/remaxnoa.arg/
// https://wa.me/+5493876852073?text=Quiero mas info...
// https://www.linkedin.com/company/64931051/admin/dashboard/     **falta el icono

export const FooterSencillo = () => {
    return (

        // bg-[#082f49]
        <footer className="bg-black/80 text-gray-600 py-4 px-6 ">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="font-bold text-xl text-gray-800 sm:-translate-x-[50px]">

                        <Image
                            src={Logo}
                            width={120}
                            height={80}
                            alt=""
                        /></Link>

                    <nav className="hidden sm:flex space-x-4">
                        <Link href={'/#nosotros'} className="duration-300 transition-all hover:scale-105  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] text-white  text-md font-light montserrat hover:font-medium "> Nosotros  </Link>

                        <Link href={'/#inicio'} className="duration-300 transition-all hover:scale-105  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] text-white font-light text-md montserrat hover:font-medium"> Inicio </Link>
                        <Link href={'/#testimonios'} className="duration-300 transition-all hover:scale-105  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] text-white font-light montserrat text-md hover:font-medium"> Testimonios</Link>
                    </nav>
                </div>

                <div className="flex items-center space-x-4">
                    <Link href={'https://www.facebook.com/remaxnoasalta'} className="duration-300 transition-all hover:scale-110  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]"> <Image src={Facebook} width={10} height={10} alt="" /> </Link>
                    <Link href={'https://www.instagram.com/remaxnoa.arg/'} className="duration-300 transition-all hover:scale-110  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]"> <Image src={Instagram} width={20} height={20} alt="" /> </Link>
                    <Link href={''} className="duration-300 transition-all hover:scale-110  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]"> <Image src={Tiktok} width={20} height={20} alt="" /> </Link>
                    <Link href={'https://wa.me/+5493876852073?text=Quiero mas info...'} className="duration-300 transition-all hover:scale-110  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]"> <Image src={WhatsApp} width={20} height={20} alt="" /> </Link>
                    {/* <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Image src={Facebook} width={0} height={0} alt="" className="max-w-11 max-h-11" />
                        <span className="sr-only">Facebook</span>
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Image src={WhatsApp} width={0} height={0} alt="" className="max-w-11 max-h-11" />
                        <span className="sr-only">WhatsApp</span>
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Image src={Instagram} width={0} height={0} alt="" className="max-w-11 max-h-11" />
                        <span className="sr-only">Instagram</span>
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Image src={Tiktok} width={0} height={0} alt="" className="max-w-11 max-h-11" />
                        <span className="sr-only">Tiktok</span>
                    </Link> */}
                </div>

                <div className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} REMAX NOA SLA
                </div>
            </div>
        </footer>
    )
}