"use client"
import {SessionProvider} from 'next-auth/react'

const Providers = ({children}) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default Providers


{/* <nav className=" justify-between  flex items-center w-full py-3  px-24 text-white ">

<div className='items-start'>
  <Socials />
</div>


<div>
  {session?.user ? (
    <button
      type='button'
      className='bg-sky-400 px-4 py-1 rounded-2xl z-100'
      onClick={async () => {
        await signOut({
          callbackUrl: "/radio",
        })
      }}
    >
      Salir
    </button>

  ) : (
    <button
      onClick={() => signIn('google')}
      type='button'
      className="bg-sky-400 px-3 py-2 -mx-12 rounded-2xl"
    >
      Unirse
    </button>
  )}
</div>
</nav> */}