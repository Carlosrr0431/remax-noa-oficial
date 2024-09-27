"use client"
import Image from 'next/image'
import React, { Suspense, useEffect } from 'react'

import { signIn, useSession, signOut } from 'next-auth/react'
import Logo from '../../public/LOGO REMAX.svg'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const Login = () => {

    const searchParams = useSearchParams()

    const search = searchParams.get('callbackUrl')

    const { data: session } = useSession()

    console.log(search);

    useEffect(() => {



        if (session?.user?.name != undefined) {

            setTimeout(async () => {
                await signOut({
                    callbackUrl: "/",
                })
            }, 600000);

        }
    }, [session])


    return (
        <Suspense>
            <div className='w-full h-full bg-slate-800'>
                <div
                    className="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
                    <div className="relative container m-auto px-6">
                        <div className="m-auto md:w-[50%]">
                            <div className="rounded-xl bg-slate-900 dark:bg-gray-800 shadow-xl">
                                <div className="p-8">
                                    <div className="space-y-12 w-full items-center flex flex-col justify-center">

                                        <Image
                                            src={Logo}
                                            width={220}
                                            height={100}
                                            alt=""
                                            priority={true}
                                            // lg:mx-0 lg:start-1 lg:translate-y-14 lg:items-start lg:-translate-x-[80px]
                                            className={``}
                                        />

                                        <h2 className="text-center  mb-8 text-2xl  w-[360px] px-4 text-white dark:text-white font-bold">Ingresa con tu usario autorizado para mayor información
                                        </h2>
                                    </div>
                                    <div className="mt-10 grid space-y-4">
                                        <button
                                            className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 hover:bg-blue-50    ">
                                            <div className="relative flex items-center space-x-4 justify-center" onClick={() => {


                                                signIn('google', { search, callbackUrl: search })

                                            }}>
                                                <Image src="https://www.svgrepo.com/show/475656/google-color.svg"
                                                    className="absolute left-0 w-5" alt="google logo" width={0} height={0} />
                                                <span
                                                    className="block w-max font-semibold tracking-wide text-white dark:text-white text-sm transition duration-300 group-hover:text-blue-600 sm:text-base hover:text-black">Continuar con Google
                                                </span>
                                            </div>
                                        </button>

                                    </div>
                                    <div className="mt-14 space-y-4 py-3 text-gray-600 dark:text-gray-400 text-center">
                                        <p className="text-xs">By proceeding, you agree to our
                                            <a href="/privacy-policy/" className="underline">Terms of Use</a>
                                            and confirm you have read our
                                            <a href="/privacy-policy/" className="underline">Privacy and Cookie Statement</a>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    )
}

export default Login