"use client"

import React from 'react'

import { Usuarios } from '@/app/(components)/Usuarios';

const User = () => {



  return (
    <div className='h-full w-full bg-slate-700'>


      <div className='w-full h-full  overflow-y-auto overflow-x-hidden'>
        {
          <Usuarios />
        }
      </div>





    </div>
  )
}

export default User

