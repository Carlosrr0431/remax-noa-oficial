"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail, FileText, Check, X, MessageCircle, UserIcon, Calendar, Clock, ChevronRightCircle } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@radix-ui/react-select"
import { Badge } from "@/components/ui/badge"
import { supabaseClient } from "@/supabase/client"
import { FeedbackTextbox } from "./FeedbackTextbox"
import { generateUniqueId } from "../landingInmobilaria/plataforma-reclutamiento/segundaEntrevista/RandomLinks"

export default function InterviewModal2({ user, setOpen, dia, hora }) {

    const [userSelect, setUserSelect] = useState(user)

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setOpen(false)
            }
        }

        const actualizarInterview = async () => {

            const { data, error } = await supabaseClient
                .from('cuposDisponibles')
                .select().eq('date', dia).eq('time', hora)

            if (data[0] !== undefined && data[0]?.segundaEntrevista == true) {


                const object = {
                    nombre: data[0].nombreCompleto,
                    email: data[0].email,
                    telefono: data[0].telefono,
                    cv: data[0].cv,
                    status: data[0].status,
                    rescheduleDate: null,
                    feedBack: data[0].feedBack,
                    interviewPassed: data[0].interviewPassed,
                    diaPrimeraEntrevista: data[0].diaPrimeraEntrevista,
                    horaPrimeraEntrevista: data[0].horaPrimeraEntrevista,
                    diaSegundaEntrevista: data[0].date,
                    fuente: data[0].fuente,
                    horaSegundaEntrevista: data[0].time,
                    pasoSegundaEntrevista: data[0].pasoSegundaEntrevista,
                    pasoTerceraEntrevista: data[0].pasoTerceraEntrevista,
                    horaTerceraEntrevista: data[0].horaTerceraEntrevista,
                    diaTerceraEntrevista: data[0].diaTerceraEntrevista
                }

                setUserSelect(object)

            }
        }





        const channelUsuarios = supabaseClient
            .channel('cuposDisponibles')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'cuposDisponibles' }, async (payload) => {

                if (payload.eventType == "UPDATE") {
                    actualizarInterview()
                }

            })
            .subscribe()


        window.addEventListener('keydown', handleEscape)

        return () => {
            supabaseClient.removeChannel(supabaseClient.channel(channelUsuarios))
            window.removeEventListener('keydown', handleEscape)
        }
    }, [])

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
    }

    const updateInterviewStatus = async (userSelect, dec) => {

        console.log("SELECT: " + JSON.stringify(userSelect));

        const result5 = await supabaseClient.from("cuposDisponibles").select('*').eq('date', userSelect.diaPrimeraEntrevista).eq('time', userSelect.horaPrimeraEntrevista);

        let nuevosReclutados = []

        result5?.data[0]?.reclutados.map((elem) => {

            if (elem.nombre == userSelect.nombre && elem.telefono == userSelect.telefono) {
                const object = {
                    nombre: elem.nombre,
                    email: elem.email,
                    telefono: elem.telefono,
                    cv: elem.cv,
                    status: elem.status,
                    rescheduleDate: null,
                    feedBack: elem.feedBack,
                    fuente: elem.fuente,
                    interviewPassed: elem.interviewPassed,
                    diaPrimeraEntrevista: elem.diaPrimeraEntrevista,
                    horaPrimeraEntrevista: elem.horaPrimeraEntrevista,
                    diaSegundaEntrevista: elem.diaSegundaEntrevista,
                    horaSegundaEntrevista: elem.horaSegundaEntrevista,
                    pasoSegundaEntrevista: `${dec ? 'paso' : 'no paso'}`
                }

                nuevosReclutados.push(object)

            } else
                nuevosReclutados.push(elem)

        })

        const result7 = await supabaseClient
            .from("cuposDisponibles")
            .update({
                reclutados: nuevosReclutados,
            })
            .eq("time", userSelect.horaPrimeraEntrevista)
            .eq("date", userSelect.diaPrimeraEntrevista)

        console.log("USER SELECCIONADO: " + JSON.stringify(userSelect));


        // const result4 = await supabaseClient
        //     .from("cuposDisponibles")
        //     .update({
        //         pasoSegundaEntrevista: `${dec ? 'paso' : 'no paso'}`,

        //     })
        //     .eq("time", hora)
        //     .eq("date", dia).eq('nombreCompleto', userSelect.nombre).eq('telefono', userSelect.telefono)
    }

    const sendWhatsAppMessage = (phone) => {
        window.open(`https://wa.me/+549${userSelect.telefono}?text=Hola!!!`, "_blank")
    }

    return (
        <div>
            {/* <Button onClick={openModal} className="mb-4">Ver Entrevistas Programadas</Button> */}

            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                    <div className="p-6 flex-grow overflow-y-auto">
                        <h2 className="text-2xl font-bold  text-center text-black">Segunda Entrevista </h2>
                        <div className="flex items-center justify-center text-muted-foreground mb-4">
                            <Calendar className="mr-2 h-5 w-5" />
                            <span className="mr-4">{dia}</span>
                            <Clock className="mr-2 h-5 w-5" />
                            <span>{hora}</span>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">

                            <Card key={userSelect.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <UserIcon className="h-6 w-6 text-primary" />
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-black">{userSelect.nombre}</h3>
                                            <Badge variant={userSelect.interviewPassed === undefined ? "secondary" : userSelect.interviewPassed == "paso" ? "default" : "destructive"}>
                                                {userSelect.interviewPassed === undefined ? "Pendiente" : userSelect.pasoTerceraEntrevista == "paso" ? "Reclutado" : userSelect.pasoSegundaEntrevista == "paso" ? "Paso 1° Entrevista Individual" : userSelect.interviewPassed === "paso" ? "Paso 1° Entrevista Grupal" : "No paso"}
                                            </Badge>
                                        </div>

                                    </div>
                                    <Separator className="my-4" />
                                    <div className="space-y-2">
                                        <p className="flex items-center text-sm">
                                            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">Email: </span>
                                            <span className="ml-2 text-black">{userSelect.email}</span>
                                        </p>
                                        <p className="flex items-center text-sm">
                                            <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">Teléfono:</span>
                                            <span className="ml-2 text-black">{userSelect.telefono}</span>
                                        </p>
                                        <p className="flex items-center text-sm">
                                            <ChevronRightCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">Fuente:</span>
                                            <span className="ml-2 text-black">{userSelect.fuente}</span>
                                        </p>
                                        <p className="flex items-center text-sm">
                                            <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">CV:</span>
                                            <a href={userSelect.cv} target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">
                                                Ver CV
                                            </a>
                                        </p>
                                        <FeedbackTextbox user={userSelect} />
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-muted/50 p-4 flex flex-wrap gap-2 justify-end">

                                    {userSelect.pasoSegundaEntrevista !== 'paso' && userSelect.pasoSegundaEntrevista !== 'nopaso' ? (
                                        <>
                                            <Button
                                                size="sm"
                                                variant="default"
                                                onClick={() => updateInterviewStatus(userSelect, true)}
                                            >
                                                <Check className="mr-2 h-4 w-4" />
                                                Pasó
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => updateInterviewStatus(userSelect, false)}
                                            >
                                                <X className="mr-2 h-4 w-4" />
                                                No pasó
                                            </Button>
                                        </>
                                    ) : null}
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => sendWhatsAppMessage(userSelect.phone)}
                                    >
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        WhatsApp
                                    </Button>
                                </CardFooter>
                            </Card>

                        </div>
                    </div>
                    <div className="bg-muted px-6 py-4 flex justify-end text-black">
                        <Button variant="outline" onClick={closeModal}>
                            Cerrar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}