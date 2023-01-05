import React, {useState} from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { localizer } from '../helpers/calendarioLocalizer'
import { getMessagesES } from '../helpers/getMessages.js'
import { CalendarioEvent } from '../components/CalendarioEvent'
import { ModalFormularioCalendario } from '../components/ModalFormularioCalendario'


const events = [{
  title: 'Servicio Cancun',
  notes: 'Limpieza de cisternas',
  start: new Date(),
  end: addHours( new Date(), 1),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Cesar'
  }
}]

const CalendarioPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lasView') || 'week' )

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '2px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    console.log({ doubleClick: event })
  }

  const onSelect = ( event ) => {
    console.log({ click: event })
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event)
    setLastView( event )
  }
  return (
    <>
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarioEvent
        }}
        onDoubleClickEvent = {onDoubleClick}
        onSelectEvent = { onSelect }
        onView = { onViewChanged }
      />

      <ModalFormularioCalendario />

    </>
  )
}

export default CalendarioPage
