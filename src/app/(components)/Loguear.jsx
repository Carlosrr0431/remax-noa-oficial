"use client"

import { signIn, useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useEffect } from 'react'
import { MdAccountCircle } from "react-icons/md";


function SigIn() {

  const { data: session } = useSession()

  // useEffect(() => {


  //   if (session?.user?.name != undefined) {

  //     setTimeout(async () => {
  //       await signOut({
  //         callbackUrl: "/",
  //       })
  //     }, 600000000);

  //   }
  // }, [session])


  return (
    <div className='relative left-12 z-50'>

      {session?.user != undefined ? (

        <div className=' cursor-pointer md:relative md:left-[20px] w-full right-[15px] relative' >

          <Link
            href="/user"
            className=" text-lg hover:bg-blue-500 text-white font-semibold hover:text-white py-0.5 px-2 hover:border-transparent bg-stone-800 z-50 flex justify-center items-center gap-x-2 w-full  h-full "
          >
            <h2 className='border-r-[1px] border-black/40 px-2 h-full'>Entrar</h2>
            <MdAccountCircle />
          </Link>



        </div>

      ) : (


        <div className='  cursor-pointer md:relative md:left-0 w-full left-[15px] relative' >
          {/* text-black  hover:bg-black/90  font-semibold hover:text-white py-0.5 px-4 bg-fondo1 hover:border-transparent rounded */}
          <Link

            href="/user"
            className="bg-stone-800  text-lg hover:bg-black/90 text-white font-semibold hover:text-white py-0.5 px-2 hover:border-transparent z-50 flex w-full h-full"
          >
            <h2>UNIRSE</h2>

          </Link>

        </div>

      )}

    </div>
  )
}

export default SigIn

