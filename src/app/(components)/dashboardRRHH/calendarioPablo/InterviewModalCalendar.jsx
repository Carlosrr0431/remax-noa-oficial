"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail, FileText, Check, X, MessageCircle, UserIcon, Calendar, Clock, CalendarCheck, CloverIcon } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@radix-ui/react-select"
import { Badge } from "@/components/ui/badge"
import { supabaseClient } from "@/supabase/client"
import ScheduleInterview2 from "./ScheduleInterview2"
import { FeedbackTextbox2 } from "./FeedbackTextBox2"

export default function InterviewModalCalendar({ user, setOpen, dia, hora }) {

    const [userSelect, setUserSelect] = useState(user)
    const [schedulingUser, setSchedulingUser] = useState(false)

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
                    fuente: data[0].fuente,
                    interviewPassed: data[0].interviewPassed,
                    diaPrimeraEntrevista: data[0].diaPrimeraEntrevista,
                    horaPrimeraEntrevista: data[0].horaPrimeraEntrevista,
                    diaSegundaEntrevista: data[0].diaSegundaEntrevista,
                    horaSegundaEntrevista: data[0].horaSegundaEntrevista,
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

        const result5 = await supabaseClient.from("cuposDisponibles").select('*').eq("time", userSelect.horaPrimeraEntrevista).eq("date", userSelect.diaPrimeraEntrevista);


        let nuevosReclutados = []

        result5?.data[0]?.reclutados.map((elem) => {

            if (elem.nombre == userSelect.nombre && elem.email == userSelect.email) {
                const object = {
                    horaTerceraEntrevista: elem.diaTerceraEntrevista,
                    diaTerceraEntrevista: elem.horaTerceraEntrevista,
                    nombre: elem.nombre,
                    email: elem.email,
                    telefono: elem.telefono,
                    cv: elem.cv,
                    status: elem.status,
                    rescheduleDate: null,
                    fuente: elem.fuente,
                    interviewPassed: elem.interviewPassed,
                    diaPrimeraEntrevista: elem.diaPrimeraEntrevista,
                    horaPrimeraEntrevista: elem.horaPrimeraEntrevista,
                    diaSegundaEntrevista: elem.diaSegundaEntrevista,
                    horaSegundaEntrevista: elem.horaSegundaEntrevista,
                    pasoSegundaEntrevista: elem.pasoSegundaEntrevista,
                    pasoTerceraEntrevista: `${dec ? 'paso' : 'no paso'}`,
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

        console.log("SELECT: " + JSON.stringify(userSelect));


        const result4 = await supabaseClient
            .from("cuposDisponibles")
            .update({
                pasoTerceraEntrevista: `${dec ? 'paso' : 'no paso'}`,
            }).eq("horaTerceraEntrevista", userSelect.horaTerceraEntrevista)
            .eq("diaTerceraEntrevista", userSelect.diaTerceraEntrevista).eq('email', userSelect.email).eq('telefono', userSelect.telefono)

    }

    const sendWhatsAppMessage = (phone) => {
        window.open(`https://wa.me/+549${userSelect.telefono}?text=Hola!!!`, "_blank")
    }


    const handleInterviewScheduled = async (datos) => {


        setSchedulingUser(false)


        const result4 = await supabaseClient.from("cuposDisponibles").select('*').eq('date', userSelect.diaSegundaEntrevista).eq('time', userSelect.horaSegundaEntrevista);


        let nuevosReclutados = []



        result4?.data[0]?.reclutados.map((elem) => {

            if (elem.nombre == userSelect.nombreCompleto && elem.email == userSelect.email) {
                const object = {
                    horaTerceraEntrevista: datos.hora,
                    diaTerceraEntrevista: datos.dia,
                    nombre: elem.nombre,
                    email: elem.email,
                    telefono: elem.telefono,
                    cv: elem.cv,
                    status: elem.status,
                    rescheduleDate: null,
                    interviewPassed: elem.interviewPassed,
                    diaPrimeraEntrevista: elem.diaPrimeraEntrevista,
                    horaPrimeraEntrevista: elem.horaPrimeraEntrevista,
                    diaSegundaEntrevista: elem.diaSegundaEntrevista,
                    horaSegundaEntrevista: elem.horaSegundaEntrevista,
                    pasoSegundaEntrevista: elem.pasoSegundaEntrevista
                }

                nuevosReclutados.push(object)

            } else
                nuevosReclutados.push(elem)

        })

        // const result7 = await supabaseClient
        //     .from("cuposDisponibles")
        //     .update({
        //         reclutados: nuevosReclutados,

        //     })
        //     .eq("time", userSelect.horaPrimeraEntrevista)
        //     .eq("date", userSelect.diaPrimeraEntrevista);

        const result6 = await supabaseClient
            .from("cuposDisponibles")
            .update({
                horaTerceraEntrevista: datos.hora,
                diaTerceraEntrevista: datos.dia,
                pasoTerceraEntrevista: 'paso'

            })
            .eq("time", dia)
            .eq("date", hora);


        // const result3 = await supabaseClient.from("cuposDisponibles").insert({
        //     horaTerceraEntrevista: datos.hora,
        //     diaTerceraEntrevista: datos.dia
        // });

        // aqui va el mandar el mensaje automatico
        window.open(`https://wa.me/+549${userSelect.telefono}?text=Hola!!!`, "_blank")
        // setStep(3)
    }

    return (
        <div>
            {/* <Button onClick={openModal} className="mb-4">Ver Entrevistas Programadas</Button> */}

            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                    <div className="p-6 flex-grow overflow-y-auto">
                        <h2 className="text-2xl font-bold  text-center text-black">Entrevista Con Pablo </h2>
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
                                            <Badge variant={userSelect.pasoTerceraEntrevista != 'paso' && userSelect.pasoTerceraEntrevista != 'nopaso' ? "secondary" : userSelect.pasoTerceraEntrevista == "paso" ? "default" : "destructive"}>
                                                {userSelect.pasoTerceraEntrevista != 'paso' && userSelect.pasoTerceraEntrevista != 'nopaso' ? "Pendiente" : userSelect.pasoTerceraEntrevista == "paso" ? "Reclutado" : "No aprobado"}
                                            </Badge>
                                        </div>

                                    </div>
                                    <Separator className="my-4" />
                                    <div className="space-y-2">
                                        <p className="flex items-center text-sm">
                                            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">Email: {userSelect.interviewPassed}</span>
                                            <span className="ml-2 text-black">{userSelect.email}</span>
                                        </p>
                                        <p className="flex items-center text-sm">
                                            <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">Teléfono:</span>
                                            <span className="ml-2 text-black">{userSelect.telefono}</span>
                                        </p>
                                        <p className="flex items-center text-sm">
                                            <CloverIcon className="mr-2 h-4 w-4 text-muted-foreground" />
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
                                        {userSelect != undefined && <FeedbackTextbox2 user={userSelect} dec={false} />}
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-muted/50 p-4 flex flex-wrap gap-2 justify-end">

                                    {userSelect.pasoTerceraEntrevista !== 'paso' && userSelect.pasoTerceraEntrevista !== 'nopaso' ? (
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

            {schedulingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <ScheduleInterview2
                        onSchedule={handleInterviewScheduled}
                        setSchedulingUser={setSchedulingUser}
                        userSelect={userSelect}
                    />
                </div>
            )}
        </div>
    )
}