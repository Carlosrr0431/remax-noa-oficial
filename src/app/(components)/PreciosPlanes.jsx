import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../(context)/AppWrapper';
import { toast } from 'sonner';
import { supabaseClient } from '@/supabase/client';

export const PreciosPlanes = () => {

  const [listaPrecios, setListaPrecios] = useState();
  const input1Ref = useRef()
  const [datos, setDatos] = useState()


  function currencyFormatter(value) {
    const formatter = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      minimumFractionDigits: 0,
      currency: 'ARS'
    })
    return formatter.format(Number(value))
  }


  const handleInputChange = (event) => {

    const value = (event.target.value).replace(/\./g, '').replace(/\$/g, '').replace(/[^0-9\.]/g, '')

    const valor = currencyFormatter(value)

    console.log(valor);
    setDatos({
      ...datos,
      [event.target.name]: {
        ['plan']: event.target.name,
        ['precio']: valor
      }
    })


  }

  const actionForm = () => {

    for (let clave in datos) {


      listaPrecios.map(async (elem) => {
        if (datos[clave].plan == elem.tipo) {

          

          const result = await supabaseClient.from("planes")
            .update({
              precio: datos[clave].precio,
            })
            .eq("tipo", datos[clave].plan)


          console.log(result);
        }
        return elem;
      })
    }

  }




  useEffect(() => {
    const getSupabaseOficial = async () => {
      let data = await supabaseClient
        .from("planes")
        .select("*").order('id', { ascending: true })

      setListaPrecios(data.data)
    }


    getSupabaseOficial()



  }, [])

  useEffect(() => {


    if (listaPrecios != undefined)
      setDatos({
        'Basico': {
          plan: 'Basico',
          precio: listaPrecios[0]?.precio
        },
        'Semi Intenso': {
          plan: 'Semi Intenso',
          precio: listaPrecios[1]?.precio
        },
        'Super Intenso': {
          plan: 'Super Intenso',
          precio: listaPrecios[2]?.precio
        }
      })


  }, [listaPrecios])


  return (
    <div className='w-full h-full container '>
      <div className=' flex flex-col justify-center my-[10%]'>
        <div className='flex  mx-[15%] items-start justify-start  w-full relative'>

          <div className='w-[250px] border text-center text-lg py-2 px-3 text-grey-darkest md:ml-0  focus:outline-none focus:bg-white/90 text-white focus:text-black '>Basico</div>

          <div className='border w-[250px] text-center text-lg py-2 px-3 text-grey-darkest md:ml-0  focus:outline-none focus:bg-white/90 text-white focus:text-black '>Semi Intenso</div>

          <div className='border w-[250px] text-center text-lg py-2 px-3 text-grey-darkest md:ml-0  focus:outline-none focus:bg-white/90 text-white focus:text-black '>Super Intenso</div>


        </div>

        <form className="  w-full" action={() => (actionForm(), toast.success('El evento fue agregado con exito!!!'))} >
          <div className='flex  mx-[15%] items-start justify-start  w-full relative'>
            {/* (currencyFormatter(Number(datos['Basico'].precio))) */}
            <input ref={input1Ref} value={datos && datos['Basico']?.precio} className="w-[250px] border items-start text-lg py-2 px-3 text-grey-darkest md:ml-0  focus:outline-none focus:bg-white/90 text-black focus:text-black  " placeholder='$' type="text" name="Basico" id="basico" onChange={handleInputChange} />
            <input className="w-[250px] border items-start text-lg py-2 px-3 text-grey-darkest md:ml-0  focus:outline-none focus:bg-white/90 text-black focus:text-black  " placeholder='$' type="text" value={datos && datos['Semi Intenso']?.precio} name="Semi Intenso" id="semiIntenso" onChange={handleInputChange} />
            <input className="w-[250px] border items-start text-lg py-2 px-3 text-grey-darkest md:ml-0  focus:outline-none focus:bg-white/90 text-black focus:text-black  " placeholder='$' type="text" value={datos && datos['Super Intenso']?.precio} name="Super Intenso" id="superIntenso" onChange={handleInputChange} />


          </div>

          <button className="mt-4 w-[750px] relative right-1 items-start  block bg-teal hover:bg-teal-dark border-[2px]  border-solid border-white text-white uppercase text-lg mx-auto p-2 rounded-[2px] hover:bg-white hover:text-black " type="submit"  >Modificar precios de planes  </button>

        </form>

      </div>
    </div>
  )
}
