import { useState, useCallback, useEffect } from 'react'
import { Calendar, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import dayjs from 'dayjs'
import moment from 'moment'
import 'moment-timezone'


export const BigCalendar = () => {

    moment.tz.setDefault('America/Argentina/Salta')

    const [CalendarReady, setCalendarReady] = useState(false)
    const localizer = momentLocalizer(moment)

    useEffect(() => {
        setCalendarReady(true)
    }, [])


    const [events, setEvents] = useState([])

    const handleSelect = useCallback(
        ({ start, end }) => {
            const title = window.prompt('New Event name')
            if (title) {
                setEvents([...events, { start, end, title }])
            }
        },
        [events]
    )

    if (!CalendarReady) {
        return <div>Loading calendar...</div>
    }

    return (
        <div style={{ height: '500px' }} className='bg-white'>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                selectable
                onSelectSlot={handleSelect}
            />
        </div>
    )
}