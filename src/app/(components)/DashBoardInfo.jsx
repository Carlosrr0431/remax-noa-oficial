"use client"

import React, { useEffect, useState } from 'react'
import { UsuariosAdm } from './UsuariosAdm'
import { PreciosPlanes } from './PreciosPlanes'
import { Ingresos } from './Ingresos'
import { ControlIngresos } from './ControlIngresos'
import { FormulariosCVDashboard } from './FormulariosCVDashboard'


const DashBoardInfo = ({ tipo }) => {

    const [contenido, setContenido] = useState()

    useEffect(() => {


    }, [contenido])

    return (
        <div className='h-full w-full'>


            {
                tipo == "Control de Precios" && (
                    <PreciosPlanes />
                )

            }


            {
                tipo == "Formularios Web" && (
                    <Ingresos />
                )

            }


            {
                tipo == "Cv" && (
                    <FormulariosCVDashboard />
                )

            }

            {
                tipo == "Control De Ingresos" && (
                    <ControlIngresos />
                )

            }



            {
                tipo == "Configurar" && (
                    <UsuariosAdm />
                )

            }



        </div>
    )
}

export default DashBoardInfo
