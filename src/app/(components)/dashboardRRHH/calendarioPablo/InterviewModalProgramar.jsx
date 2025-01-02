"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail, FileText, Check, X, MessageCircle, UserIcon, Calendar, Clock, CalendarCheck, CloverIcon } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@radix-ui/react-select"
import { Badge } from "@/components/ui/badge"
import { supabaseClient } from "@/supabase/client"
import { useAppContext } from "@/app/(context)/AppWrapper"
import ScheduleInterview2 from "./ScheduleInterview2"
import { FeedbackTextbox2 } from "./FeedbackTextBox2"


export default function InterviewModalProgramar({ setOpen, dia, hora }) {

    const [schedulingUser, setSchedulingUser] = useState(false)
    const [userSelect, setUserSelect] = useState()
    const [users, setUsers] = useState()
    const [currentDateTime, setCurrentDateTime] = useState(new Date())
    const { interviews, setInterviews } = useAppContext()

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setOpen(false)
            }
        }


        const obtenerEntrevistas = async () => {
            const { data, error } = await supabaseClient
                .from('cuposDisponibles')
                .select('*').eq('pasoSegundaEntrevista', 'paso')


            setUsers(data)

        }

        obtenerEntrevistas()

        // const channelUsuarios = supabaseClient
        //     .channel('cuposDisponibles')
        //     .on('postgres_changes', { event: '*', schema: 'public', table: 'cuposDisponibles' }, async (payload) => {

        //         if (payload.eventType == "UPDATE") {


        //             const actualizarInterview = async () => {

        //                 const { data, error } = await supabaseClient
        //                     .from('cuposDisponibles')
        //                     .select().eq('date', dia).eq('time', hora)

        //                 if (data[0] !== undefined && data[0]?.segundaEntrevista == false) {
        //                     let listaReclutados = []

        //                     data[0]?.reclutados.map((elem, index) => {

        //                         const object = {
        //                             nombre: elem.nombre,
        //                             email: elem.email,
        //                             telefono: elem.telefono,
        //                             cv: elem.cv,
        //                             status: elem.status,
        //                             rescheduleDate: null,
        //                             interviewPassed: elem.interviewPassed,
        //                             diaPrimeraEntrevista: elem.diaPrimeraEntrevista,
        //                             horaPrimeraEntrevista: elem.horaPrimeraEntrevista,
        //                             diaSegundaEntrevista: elem.diaSegundaEntrevista,
        //                             horaSegundaEntrevista: elem.horaSegundaEntrevista
        //                         }

        //                         listaReclutados.push(object)
        //                     })

        //                     setUsers(listaReclutados)

        //                 }
        //             }
        //             actualizarInterview()



        //             const obtenerEntrevistas = async () => {
        //                 const { data, error } = await supabaseClient
        //                     .from('cuposDisponibles')
        //                     .select('*')

        //                 let entrevistas = []

        //                 data?.map((elem, index) => {
        //                     const date = elem.date.split('/').reverse().join('-') + " " + elem.time;


        //                     if (elem.segundaEntrevista) {

        //                         const object = {
        //                             start: elem.start || moment(date).tz("America/Argentina/Salta").toDate(),
        //                             name: elem.nombreCompleto,
        //                             end: elem.end || moment(date).add(20, 'minutes').toDate(),
        //                             email: elem.email,
        //                             phone: elem.telefono,
        //                             cv: elem.cv,
        //                             status: "pendiente",
        //                             rescheduleDate: null,
        //                             diaPrimeraEntrevista: elem.diaPrimeraEntrevista,
        //                             horaPrimeraEntrevista: elem.horaPrimeraEntrevista,
        //                             segundaEntrevista: elem.segundaEntrevista,
        //                             horaSegundaEntrevista: elem.horaSegundaEntrevista,
        //                             isUrgent: elem.isUrgent,
        //                             feedBack: elem.feedBack,
        //                             displayContent: `${elem.segundaEntrevista ? `${elem.nombreCompleto}` : `${elem.cantidadGrupo} Entrevistas programadas`} `
        //                         }
        //                         entrevistas.push(object)
        //                     } else {
        //                         const object = {
        //                             start: elem.start || moment(date).tz("America/Argentina/Salta").toDate(),
        //                             name: elem.nombreCompleto,
        //                             end: elem.end || moment(date).add(40, 'minutes').toDate(),
        //                             email: elem.email,
        //                             phone: elem.telefono,
        //                             cv: elem.cv,
        //                             status: "pendiente",
        //                             rescheduleDate: null,
        //                             feedBack: elem.feedBack,
        //                             segundaEntrevista: elem.segundaEntrevista,
        //                             diaPrimeraEntrevista: elem.diaPrimeraEntrevista,
        //                             horaPrimeraEntrevista: elem.horaPrimeraEntrevista,
        //                             horaSegundaEntrevista: elem.horaSegundaEntrevista,
        //                             isUrgent: elem.isUrgent,
        //                             displayContent: `${elem.segundaEntrevista ? `${elem.nombreCompleto}` : `${elem.cantidadGrupo} Entrevistas programadas`} `
        //                         }
        //                         entrevistas.push(object)
        //                     }

        //                 })

        //                 setInterviews([...entrevistas])

        //             }

        //             obtenerEntrevistas()
        //         }


        //     })
        //     .subscribe()


        window.addEventListener('keydown', handleEscape)

        return () => {
            // supabaseClient.removeChannel(supabaseClient.channel(channelUsuarios))
            window.removeEventListener('keydown', handleEscape)
        }
    }, [])

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
    }

    const handleInterviewScheduled = async (datos) => {

        setSchedulingUser(false)


        console.log("Datos: " + JSON.stringify(userSelect));


        const result4 = await supabaseClient.from("cuposDisponibles").select('*').eq('date', userSelect.diaPrimeraEntrevista).eq('time', userSelect.horaPrimeraEntrevista)


        console.log("fecha " + datos.hora + " " + datos.dia);

        let nuevosReclutados = []

        result4?.data[0]?.reclutados.map((elem) => {

            if (elem.nombre == userSelect.nombreCompleto && elem.telefono == userSelect.telefono) {
                const object = {
                    horaTerceraEntrevista: datos.hora,
                    diaTerceraEntrevista: datos.dia,
                    nombre: elem.nombre,
                    email: elem.email,
                    telefono: elem.telefono,
                    fuente: elem.fuente,
                    cv: elem.cv,
                    status: elem.status,
                    rescheduleDate: null,
                    feedBack: elem.feedBack,
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

        console.log("PABLO CALENDAR: " + JSON.stringify(userSelect));


        const result7 = await supabaseClient
            .from("cuposDisponibles")
            .update({
                reclutados: nuevosReclutados,

            })
            .eq("time", userSelect.horaPrimeraEntrevista)
            .eq("date", userSelect.diaPrimeraEntrevista)

        const result6 = await supabaseClient
            .from("cuposDisponibles")
            .update({
                horaTerceraEntrevista: datos.hora,
                diaTerceraEntrevista: datos.dia,

            })
            .eq("time", userSelect.time)
            .eq("date", userSelect.date).eq('nombreCompleto', userSelect.nombreCompleto).eq('telefono', userSelect.telefono)


        // const result3 = await supabaseClient.from("cuposDisponibles").insert({
        //     horaTerceraEntrevista: datos.hora,
        //     diaTerceraEntrevista: datos.dia
        // });

        // aqui va el mandar el mensaje automatico
        // window.open(`https://wa.me/+549${userSelect.telefono}?text=Hola ${userSelect.nombre}, ¡Felicidades! Nos comunicamos para invitarte a la última entrevista del proceso de selección con nuestro corredor inmobiliario, Pablo Castañeda. Te esperamos el ${datos.dia} a las ${datos.hora} en Pueyrredón 608.`, "_blank")
        // setStep(3)
    }

    const updateInterviewStatus = async (user, dec) => {

        // interviewPassed = "paso"
        const result3 = await supabaseClient.from("cuposDisponibles").select('*').eq('date', dia).eq('time', hora);

        let nuevosReclutados = []

        result3.data[0].reclutados.map((elem) => {
            if (elem.nombre == user.nombre && elem.email == user.email) {
                const object = {
                    cv: elem.cv,
                    email: elem.email,
                    nombre: elem.nombre,
                    telefono: elem.telefono,
                    feedBack: elem.feedBack,
                    diaPrimeraEntrevista: elem.diaPrimeraEntrevista,
                    horaPrimeraEntrevista: elem.horaPrimeraEntrevista,
                    interviewPassed: `${dec ? 'paso' : 'no paso'}`,
                    segundaEntrevista: true,
                    interviewPassed: elem.interviewPassed,
                    diaPrimeraEntrevista: elem.diaPrimeraEntrevista,

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
            .eq("time", hora)
            .eq("date", dia);
    }

    const sendWhatsAppMessage = (phone) => {
        window.open(`https://wa.me/+549${phone}?text=Hola!!!`, "_blank")
    }

    const handleScheduleInterview = (userId) => {
        setSchedulingUser(userId)
    }

    return (
        <div>

            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                    <div className="p-6 flex-grow overflow-y-auto">
                        <h2 className="text-2xl font-bold  text-center text-black">Primer Entrevista </h2>
                        <div className="flex items-center justify-center text-muted-foreground mb-4">
                            <Calendar className="mr-2 h-5 w-5" />
                            <span className="mr-4">{dia}</span>
                            <Clock className="mr-2 h-5 w-5" />
                            <span>{hora}</span>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            {users !== null && users?.map((user, index) => (
                                <Card key={index} className="overflow-hidden transition-shadow hover:shadow-lg">
                                    <CardContent className="p-6">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                <UserIcon className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-black">{user.nombreCompleto}</h3>
                                                <Badge variant={user.interviewPassed === undefined ? "secondary" : user.interviewPassed == "paso" ? "default" : "destructive"}>
                                                    {user.interviewPassed === undefined ? "Pendiente" : user.pasoTerceraEntrevista == "paso" ? "Reclutado" : user.pasoSegundaEntrevista == "paso" ? "Paso 1° Entrevista Individual" : user.interviewPassed === "paso" ? "Paso 1° Entrevista Grupal" : "No paso"}
                                                </Badge>
                                            </div>
                                        </div>
                                        <Separator className="my-4" />
                                        <div className="space-y-2">
                                            <p className="flex items-center text-sm">
                                                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">Email:</span>
                                                <span className="ml-2 text-black">{user.email}</span>
                                            </p>
                                            <p className="flex items-center text-sm">
                                                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">Teléfono:</span>
                                                <span className="ml-2 text-black">{user.telefono}</span>
                                            </p>
                                            <p className="flex items-center text-sm">
                                                <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">CV:</span>
                                                <a href={user.cv} target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">
                                                    Ver CV
                                                </a>
                                            </p>

                                            <p className="flex items-center text-sm">
                                                <CloverIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">Fuente:</span>
                                                <span className="ml-2 text-black">{user.fuente}</span>
                                            </p>
                                            {user.diaSegundaEntrevista != null && (
                                                <p className="flex items-center text-sm">
                                                    <CalendarCheck className="mr-2 h-4 w-4 text-muted-foreground" />
                                                    <span className="text-muted-foreground">2da Entrevista:</span>
                                                    <span className="ml-2 text-black">{user.diaSegundaEntrevista}</span>
                                                    <span className="ml-2 text-black">{user.horaSegundaEntrevista}</span>
                                                </p>
                                            )}

                                            {users != undefined && <FeedbackTextbox2 user={user} dec={true} />}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="bg-muted/50 p-4 flex flex-wrap gap-2 justify-end">

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => sendWhatsAppMessage(user.telefono)}
                                        >
                                            <MessageCircle className="mr-2 h-4 w-4" />
                                            WhatsApp
                                        </Button>

                                        {user.pasoSegundaEntrevista == 'paso' && user.horaTerceraEntrevista == undefined && (
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => {

                                                    setUserSelect(user)
                                                    setSchedulingUser(true)


                                                }}
                                            >

                                                <CalendarCheck className="mr-2 h-4 w-4" />
                                                Programar 2da Entrevista
                                                {user.diaSegundaEntrevista}
                                            </Button>
                                        )}


                                    </CardFooter>
                                </Card>
                            ))}
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