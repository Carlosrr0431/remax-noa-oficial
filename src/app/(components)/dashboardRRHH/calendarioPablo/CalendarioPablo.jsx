'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Clock, CalendarIcon, Plus } from 'lucide-react'
import moment from "moment-timezone";
import { supabaseClient } from '@/supabase/client'
import { format, startOfWeek, endOfWeek, getMonth, getYear, isSaturday, isSunday, addDays } from 'date-fns'
import { es } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/app/(context)/AppWrapper'
import InterviewModalProgramar from './InterviewModalProgramar'
import InterviewModalCalendar from './InterviewModalCalendar'
// AZUL PRIMERA ENTREVISTA, VERDE SEGUNDA Y ROJO LA ENTREVISTA PROXIMA

// Unite a la red inmobiliaria N°1 
// 8:20 primera entrevista hasta 15:20 ultima entrevista - lunes a viernes - PABLO
moment.locale('es-AR')
const localizer = momentLocalizer(moment)

export default function CalendarioPablo() {
    const { interviews, setInterviews } = useAppContext()
    const [selectedInterview, setSelectedInterview] = useState([])
    const [selectedInterview2, setSelectedInterview2] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [nextInterviewView, setNextInterviewView] = useState()
    const [isModalOpen2, setIsModalOpen2] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date())
    const [isSchedulerModalOpen, setIsSchedulerModalOpen] = useState(false)

    const [workingHours, setWorkingHours] = useState({
        availableSlots: [
            { hour: 8, minute: 0 },
            { hour: 8, minute: 30 },
            { hour: 9, minute: 0 },
            { hour: 9, minute: 30 },
            { hour: 10, minute: 0 },
            { hour: 10, minute: 30 },
            { hour: 11, minute: 0 },
            { hour: 11, minute: 30 },
            { hour: 12, minute: 0 },
            { hour: 12, minute: 30 },
            { hour: 13, minute: 0 },
            { hour: 13, minute: 20 },
            { hour: 14, minute: 0 },
            { hour: 14, minute: 20 },
            { hour: 15, minute: 0 },
            { hour: 15, minute: 20 },
            { hour: 16, minute: 0 },
            { hour: 16, minute: 20 },
            { hour: 17, minute: 0 },
            { hour: 17, minute: 20 },
        ]
    })
    const [isWorkingHoursModalOpen, setIsWorkingHoursModalOpen] = useState(false)
    const [diaSelect, setDiaSelect] = useState(null)
    const [horaSelect, setHoraSelect] = useState(null)

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {

        let channelUsuarios;

        const obtenerEntrevistas = async () => {
            const { data, error } = await supabaseClient
                .from('cuposDisponibles')
                .select('*').neq('diaTerceraEntrevista', undefined)

            let entrevistas = []

            data?.map((elem, index) => {
                const date = elem.diaTerceraEntrevista.split('/').reverse().join('-') + " " + elem.horaTerceraEntrevista;


                if (elem.diaTerceraEntrevista != undefined) {

                    const object = {
                        start: elem.start || moment(date).tz("America/Argentina/Salta").toDate(),
                        name: elem.nombreCompleto,
                        end: elem.end || moment(date).add(20, 'minutes').toDate(),
                        email: elem.email,
                        phone: elem.telefono,
                        cv: elem.cv,
                        status: "pendiente",
                        rescheduleDate: null,
                        diaPrimeraEntrevista: elem.diaPrimeraEntrevista,
                        horaPrimeraEntrevista: elem.horaPrimeraEntrevista,
                        segundaEntrevista: elem.segundaEntrevista,
                        horaSegundaEntrevista: elem.horaSegundaEntrevista,
                        diaSegundaEntrevista: elem.diaSegundaEntrevista,
                        isUrgent: elem.isUrgent,
                        feedBack: elem.feedBack,
                        fuente: elem.fuente,
                        displayContent: `${elem.segundaEntrevista ? `${elem.nombreCompleto}` : `${elem.cantidadGrupo} Entrevistas programadas`} `,
                        pasoSegundaEntrevista: elem.pasoSegundaEntrevista,
                        pasoTerceraEntrevista: elem.pasoTerceraEntrevista,
                        horaTerceraEntrevista: elem.pasoTerceraEntrevista,
                        diaTerceraEntrevista: elem.diaTerceraEntrevista
                    }
                    entrevistas.push(object)
                }
            })

            setInterviews([...entrevistas])

        }


        async function setupSubscription() {


            try {
                await obtenerEntrevistas()


                channelUsuarios = supabaseClient
                    .channel('cuposDisponibles')
                    .on('postgres_changes', { event: '*', schema: 'public', table: 'cuposDisponibles' }, async (payload) => {

                        if (payload.eventType == "INSERT") {

                            return await obtenerEntrevistas()

                        } else if (payload.eventType == 'UPDATE') {


                            return await obtenerEntrevistas()


                        }
                    })
                    .subscribe()
            } catch (error) {
                console.log(error ? error.message : 'An unknown error occurred')
            }
        }
        setupSubscription()

        return () => {
            channelUsuarios?.unsubscribe()
            // supabaseClient.removeChannel(supabaseClient.channel(channelUsuarios))
        }
    }, [setInterviews])


    const isSlotAvailable = useCallback((date) => {
        return workingHours.availableSlots.some(slot =>
            slot.hour === date.getHours() && slot.minute === date.getMinutes()
        )
    }, [workingHours])

    const handleSelectSlot = useCallback(async ({ start }) => {
        if (isSlotAvailable(start)) {
            const existingInterview = interviews.find(
                i => moment(i.start).isSame(start, 'minute')
            )
            if (!existingInterview) {
                const { data, error } = await supabaseClient
                    .from('cuposDisponibles')
                    .select('*')



                setIsModalOpen(true)
            }
        }
    }, [interviews, isSlotAvailable])

    const handleSelectEvent = useCallback(async (interview) => {

        const dia = moment(interview.start).tz("America/Argentina/Salta").format("DD/MM/yyyy HH:mm").substr(0, 10)
        const hora = moment(interview.start).tz("America/Argentina/Salta").format("DD/MM/yyyy HH:mm").substr(11, 5)

        const { data, error } = await supabaseClient
            .from('cuposDisponibles')
            .select().eq('diaTerceraEntrevista', dia).eq('horaTerceraEntrevista', hora)

        console.log("DATOS DEL SELECT 222: " + JSON.stringify(data[0]));


        if (data[0] != undefined && data[0]?.segundaEntrevista == true) {

            const object2 = {
                nombre: data[0]?.nombreCompleto,
                email: data[0]?.email,
                telefono: data[0]?.telefono,
                cv: data[0]?.cv,
                status: "pendiente",
                feedBack: data[0]?.feedBack,
                rescheduleDate: null,
                fuente: data[0]?.fuente,
                interviewPassed: data[0]?.interviewPassed,
                diaPrimeraEntrevista: data[0]?.diaPrimeraEntrevista,
                horaPrimeraEntrevista: data[0]?.horaPrimeraEntrevista,
                diaSegundaEntrevista: data[0]?.diaSegundaEntrevista,
                horaSegundaEntrevista: data[0]?.horaSegundaEntrevista,
                pasoSegundaEntrevista: data[0]?.pasoSegundaEntrevista,
                pasoTerceraEntrevista: data[0]?.pasoTerceraEntrevista,
                horaTerceraEntrevista: data[0]?.horaTerceraEntrevista,
                diaTerceraEntrevista: data[0]?.diaTerceraEntrevista
            }

            setSelectedInterview2(object2)
            setIsModalOpen2(true)
        }

        setDiaSelect(dia)
        setHoraSelect(hora)
    }, [])

    const handleSaveInterview = useCallback((interview) => {

        console.log("ENTREVISTAS: " + JSON.stringify(interviews));

        setInterviews(prevInterviews => {
            const index = prevInterviews.findIndex(i => moment(i.start).isSame(interview.start, 'minute'))
            if (index !== -1) {
                return prevInterviews.map((i, idx) => idx === index ? interview : i)
            } else {
                return [...prevInterviews, interview]
            }
        })
        setIsModalOpen(false)
    }, [])

    const handleDeleteInterview = useCallback((interview) => {
        setInterviews(prevInterviews =>
            prevInterviews.filter(i => !moment(i.start).isSame(interview.start, 'minute'))
        )
        setIsModalOpen(false)
    }, [])

    const handleCompleteInterview = useCallback((interview, passed) => {
        setInterviews(prevInterviews =>
            prevInterviews.map(i =>
                moment(i.start).isSame(interview.start, 'minute')
                    ? { ...i, status: passed ? 'aprobado' : 'rechazado' }
                    : i
            )
        )
    }, [])

    const handleRescheduleInterview = useCallback((interview, newDate) => {
        if (isSlotAvailable(newDate)) {
            setInterviews(prevInterviews =>
                prevInterviews.map(i =>
                    moment(i.start).isSame(interview.start, 'minute')
                        ? { ...i, start: newDate, rescheduleDate: newDate }
                        : i
                )
            )
        }
    }, [isSlotAvailable])

    const handleSaveWorkingHours = useCallback((hours) => {
        setWorkingHours(hours)
        setIsWorkingHoursModalOpen(false)
    }, [])

    // const nextInterview = useMemo(() =>
    //     interviews.find(i => moment(i.start).isAfter(currentTime)),
    //     [interviews, currentTime]
    // )

    const nextInterview = useMemo(() => {
        const now = moment(currentTime)

        // Buscar la primera entrevista en curso
        const currentInterview = interviews.find(interview =>
            moment(interview.start).isSameOrBefore(now) && moment(interview.end).isAfter(now)
        )

        if (currentInterview) {
            return currentInterview
        }

        // Si no hay entrevista en curso, buscar la próxima entrevista
        return interviews
            .filter(interview => moment(interview.start).isAfter(now))
            .sort((a, b) => moment(a.start).diff(moment(b.start)))[0] || null
    }, [interviews, currentTime])

    const eventStyleGetter = useCallback((event, start, end, isSelected) => {
        const now = moment(currentTime)

        console.log("estado: " + event.horaTerceraEntrevista);

        const isNextInterview = event.email === nextInterview?.email && event.name === nextInterview?.name && event.start === nextInterview?.start
        let className = 'interview-event '

        if (isNextInterview && event.diaTerceraEntrevista != undefined && event.horaTerceraEntrevista != undefined) {
            className += 'upcoming'
        } else if (event.diaTerceraEntrevista == undefined && event.horaTerceraEntrevista == undefined) {
            className += 'sinProgramar'
        } else if (event.diaTerceraEntrevista != undefined && event.horaTerceraEntrevista != undefined) {
            className += 'urgent'
        } else {
            className += 'sinProgramar'
        }

        return {
            className: className
        }
    }, [currentTime, nextInterview])


    const customEventWrapper = useCallback(({ event }) => {
        return (
            <div className="interview-event-content">
                {event.displayContent}
            </div>
        )
    }, [])



    const formats = {
        timeGutterFormat: (date, culture, localizer) =>
            localizer?.format(date, 'HH:mm', culture),
        eventTimeRangeFormat: () => '',
        dayFormat: (date, culture, localizer) =>
            localizer?.format(date, 'ddd', culture).toUpperCase()
    }

    const CustomHeader = ({ date }) => {
        const isToday = moment(date).isSame(moment(), 'day');
        const dayName = localizer.format(date, 'ddd', 'es').toUpperCase();
        const dayNumber = localizer.format(date, 'DD', 'es');

        return (
            <div>
                <span className="rbc-header-day">{dayName}</span>
                <span className={`rbc-header-date${isToday ? ' rbc-today' : ''}`}>
                    {dayNumber}
                </span>
            </div>
        );
    };


    const CustomToolbar = (toolbar) => {
        const goToBack = () => {
            toolbar.onNavigate('PREV');
        };

        const goToNext = () => {
            toolbar.onNavigate('NEXT');
        };

        const goToCurrent = () => {
            toolbar.onNavigate('TODAY');
        };

        const formatWeekRange = (date) => {
            let start = startOfWeek(date, { locale: es, weekStartsOn: 1 });
            let end = endOfWeek(date, { locale: es, weekStartsOn: 1 });

            // Ajustar el rango para mostrar solo de lunes a viernes
            if (isSunday(start)) start = addDays(start, 1);
            if (isSaturday(end)) end = addDays(end, -1);

            const formatDate = (d) => format(d, 'd', { locale: es });
            const formatMonth = (d) => format(d, 'MMMM', { locale: es });
            const formatYear = (d) => format(d, 'yyyy', { locale: es });

            if (getMonth(start) === getMonth(end)) {
                return `${formatDate(start)} - ${formatDate(end)} de ${formatMonth(start)} de ${formatYear(start)}`;
            } else if (getYear(start) === getYear(end)) {
                return `${formatDate(start)} de ${formatMonth(start)} - ${formatDate(end)} de ${formatMonth(end)} de ${formatYear(start)}`;
            } else {
                return `${formatDate(start)} de ${formatMonth(start)} de ${formatYear(start)} - ${formatDate(end)} de ${formatMonth(end)} de ${formatYear(end)}`;
            }
        };

        return (
            <div className="rbc-toolbar">
                <span className="rbc-btn-group">
                    <button type="button" onClick={goToBack}>Anterior</button>
                    <button type="button" onClick={goToCurrent}>Hoy</button>
                    <button type="button" onClick={goToNext}>Siguiente</button>
                </span>
                <span className="rbc-toolbar-label">
                    {formatWeekRange(toolbar.date)}
                </span>
                {/* Eliminamos los botones de cambio de vista ya que solo tenemos una */}
            </div>
        );
    };

    const workWeekRange = (date) => {
        let start = startOfWeek(date, { weekStartsOn: 1 });
        let end = addDays(start, 4);
        return { start, end };
    };

    const minTime = useMemo(() => {
        const firstSlot = workingHours.availableSlots[0]
        return moment().set({ hour: firstSlot.hour, minute: firstSlot.minute }).toDate()
    }, [workingHours])

    const maxTime = useMemo(() => {
        const lastSlot = workingHours.availableSlots[workingHours.availableSlots.length - 1]
        return moment().set({ hour: lastSlot.hour, minute: lastSlot.minute }).add(40, 'minutes').toDate()
    }, [workingHours])

    return (
        <div className="w-full   bg-gradient-to-b from-gray-100 to-gray-200 max-h-screen overflow-y-hidden">

            <div className="bg-white rounded-lg shadow-xl p-6">
                <div className="mb-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                    <Button
                        onClick={() => setIsSchedulerModalOpen(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        aria-label="Programar entrevista"
                    >
                        <Plus className="inline-block mr-2" size={20} />
                        Programar Entrevista
                    </Button>
                    <div className="text-blue-600  flex items-center space-x-4">
                        <div className='items-center space-x-2 flex justify-center bg-blue-50 p-2 '>
                            <Clock className="text-blue-500" size={20} />
                            <span>{moment(currentTime).format('HH:mm')}</span>

                        </div>
                        <button type='button' className='bg-blue-50 p-2 rounded-[45px] shadow' onClick={() => {
                            return handleSelectEvent(nextInterview)
                        }}>
                            <span className="hidden sm:inline">
                                Próxima entrevista: {nextInterview
                                    ? moment(nextInterview.start).format('HH:mm')
                                    : 'No hay entrevistas pendientes'}
                            </span>
                        </button>
                    </div>
                </div>
                <Calendar
                    localizer={localizer}
                    events={interviews}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    eventPropGetter={eventStyleGetter}
                    selectable
                    views={['week']}
                    defaultView={Views.WEEK}
                    min={minTime}
                    max={maxTime}
                    workDays={[1, 2, 3, 4, 5]}
                    length={5}
                    step={20}
                    // formats={{
                    //     eventTimeRangeFormat: () => '', 
                    //     timeGutterFormat: (date, culture, localizer) =>
                    //         localizer?.format(date, 'HH:mm', culture)
                    // }}
                    formats={formats}
                    range={workWeekRange}
                    components={{
                        event: customEventWrapper,
                        toolbar: CustomToolbar,
                        header: CustomHeader
                    }}

                    dayPropGetter={(date) => {
                        if (date.getDay() === 0 || date.getDay() === 6) {
                            return { className: 'rbc-off-range-bg' };
                        }
                        return {};
                    }}
                    timeslots={1}
                    // components={{
                    //     event: customEventWrapper
                    // }}
                    messages={{
                        next: "Siguiente",
                        previous: "Anterior",
                        today: "Hoy",
                        week: "Semana",
                        work_week: "Semana laboral",
                        day: "Día",
                        agenda: "Agenda",
                        date: "Fecha",
                        time: "Hora",
                        event: "Evento",
                        noEventsInRange: "No hay entrevistas programadas en este rango.",
                    }}
                    className="rounded-lg overflow-hidden shadow-lg calendar-container"
                    dayLayoutAlgorithm="no-overlap"
                // style={{ height: 700, width: full}}
                />
            </div>

            {isModalOpen2 && (
                <InterviewModalCalendar
                    user={selectedInterview2}
                    setOpen={setIsModalOpen2}
                    dia={diaSelect}
                    hora={horaSelect}

                />
            )}

            {isSchedulerModalOpen && (
                <InterviewModalProgramar
                    setOpen={setIsSchedulerModalOpen}
                    dia={diaSelect}
                    hora={horaSelect}

                />
            )}


        </div>
    )
}