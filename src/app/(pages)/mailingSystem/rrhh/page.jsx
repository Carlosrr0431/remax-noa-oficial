"use client"
import { LeerCSV } from '@/app/(components)/LeerCSV'
import { ModalUser } from '@/app/(components)/ModalUser'
import React from 'react'

const RRHHMail = () => {
    return (
        <div className=" montserrat w-full h-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  relative overflow-y-auto mb-[100px]" >

            <div className="flex min-h-screen flex-col items-center justify-center p-24">
                <LeerCSV />
            </div>



        </div>
    )
}

export default RRHHMail


// "use client"

// import React from 'react'
// import { ModalUser } from '@/app/(components)/ModalUser'

// const Planes = () => {
//   return (
//     <div className=" montserrat w-full h-full bg-black/80  relative overflow-y-auto mb-[100px]" >

//       <ModalUser />

//     </div>
//   )
// }

// export default Planes