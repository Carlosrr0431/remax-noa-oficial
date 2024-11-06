import { supabaseClient } from '@/supabase/client'
import React, { useEffect, useState } from 'react'

const ReMailing = () => {

    const [correos, setCorreos] = useState()
    const [formularioCV, setFormulariosCV] = useState()

    useEffect(() => {
        const getSupabaseOficial = async () => {
            let data = await supabaseClient
                .from("correosEnviados")
                .select("*")

            setCorreos(data.data);
        }

        const getSupabaseOficial2 = async () => {
            let data = await supabaseClient
                .from("formularioCV")
                .select("*").order('id', { ascending: true })

            setFormulariosCV(data.data)
        }


        getSupabaseOficial()
        getSupabaseOficial2()


    }, [])

    useEffect(() => {
        const getMailSinCaptar = () => {
            if (correos != undefined && formularioCV != undefined) {
                console.log((correos[0].correos.length));

                const nuevoArray = [...correos[0].correos, ...formularioCV]

                console.log(formularioCV.map((elem) => console.log(elem.email)
                ))


                const sinDuplicados = [...new Set(nuevoArray)];


                // console.log("sin duplicados: " + sinDuplicados.length);

                // if (correos[0].correos.find(elem => elem.email == 'andreeavega95@hotmail.com')) {
                //     console.log("Entro1");

                // }

                // if (sinDuplicados.find(elem => elem.email == 'andreeavega95@hotmail.com')) {
                //     console.log("Entro2");

                // }

                // console.log("arreglo sin duplicados: " + sinDuplicados);


            }




            // if (formularioCV != undefined && correos != undefined) {
            //     const nuevoArray = correos.map((elem) => {
            //         if (formularioCV.includes(elem)) {
            //             console.log("Entro");

            //         }
            //     })

            //     console.log(JSON.stringify(nuevoArray.length));
            // }

        }
        getMailSinCaptar()

    }, [correos, formularioCV])


    return (
        <div>
            {


            }
        </div>
    )
}

export default ReMailing

