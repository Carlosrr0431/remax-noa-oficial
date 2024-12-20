"use client"

import { useState, useEffect } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { MessageSquare } from 'lucide-react'
import { supabaseClient } from '@/supabase/client'

export function FeedbackTextbox({ user }) {
    const [feedback, setFeedback] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setFeedback(user.feedBack)
    }, [])

    const actualizar = async () => {
        // interviewPassed = "paso"
        const result3 = await supabaseClient.from("cuposDisponibles").select('*').eq('date', user.diaPrimeraEntrevista).eq('time', user.horaPrimeraEntrevista);

        let nuevosReclutados = []

        result3.data[0].reclutados.map((elem) => {
            if (elem.nombre == user.nombre && elem.email == user.email) {
                const object = {
                    cv: elem.cv,
                    email: elem.email,
                    nombre: elem.nombre,
                    telefono: elem.telefono,
                    diaPrimeraEntrevista: elem.diaPrimeraEntrevista,
                    horaPrimeraEntrevista: elem.horaPrimeraEntrevista,
                    diaSegundaEntrevista: elem.horaSegundaEntrevista,
                    horaSegundaEntrevista: elem.diaSegundaEntrevista,
                    feedBack: feedback,
                    interviewPassed: elem.interviewPassed

                }
                nuevosReclutados.push(object)

            } else
                nuevosReclutados.push(elem)

        })

        const result4 = await supabaseClient
            .from("cuposDisponibles")
            .update({
                reclutados: nuevosReclutados,

            })
            .eq("time", user.horaPrimeraEntrevista)
            .eq("date", user.diaPrimeraEntrevista);

        return result4.status
    }

    const handleFeedbackChange = async (e) => {

        if (e.target.value === "") {
            setFeedback("")
        } else
            setFeedback(e.target.value)

        const resultado = await actualizar()

        // alert(resultado) 204 exitoso

    }

    return (
        <div className="mt-4">
            <Button
                variant="outline"
                size="sm"
                onClick={() => {
                    actualizar()
                    setIsOpen(!isOpen)
                }}
                className="mb-2"
            >
                <MessageSquare className="mr-2 h-4 w-4" />
                {isOpen ? 'Cerrar feedback' : 'Abrir feedback'}
            </Button>
            {isOpen && (
                <Textarea
                    value={feedback}
                    onChange={handleFeedbackChange}
                    placeholder="Escribe tus notas o feedback aquí..."
                    className="min-h-[100px] transition-all duration-200 ease-in-out focus:min-h-[200px]"
                />
            )}
        </div>
    )
}