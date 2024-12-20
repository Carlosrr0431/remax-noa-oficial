import { supabaseClient } from '@/supabase/client'
import React, { useEffect, useState } from 'react'

const ReMailing = () => {

    const [correos, setCorreos] = useState()
    const [formularioCV, setFormulariosCV] = useState()
    const [values, setValues] = useState([]);

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

                const nuevoArray = [...correos[0].correos]

                formularioCV.map((elem) => {
                    nuevoArray.push(elem.mail)
                })


                const sinDuplicados = [...new Set(nuevoArray)];

                formularioCV.forEach((item) => {
                    for (let index in sinDuplicados) {

                        if (sinDuplicados[index] == item.email) {
                            sinDuplicados.splice(index, 1);
                        }
                    }
                });

                setValues(sinDuplicados)

                console.log("values: " + values);

            }

        }
        getMailSinCaptar()

    }, [correos, formularioCV])

    const sendMail = async (htmlContent) => {


        const response = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                listaEmail: [...values, 'carlos.facundo.rr@gmail.com', 'giu40150135@gmail.com'],
                // listaEmail: arrayEmail,
                htmlContenido: htmlContent
            })
        })
        return await response.json()
    }

    return (
        <div>
            {


            }
        </div>
    )
}

export default ReMailing

