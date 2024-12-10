import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalenderEvent = ({orders,newEvent,setNewEvent,events,setEvents,calendarDate,setCalendarDate}) => {

 

  useEffect(() => {
    const currentMonth = moment().month();
    const currentYear = moment().year();

    setEvents(orders);
  }, []);

 

  return (
    <div style={{ padding: '20px' }}>
     
      <div style={{ height: '500px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={calendarDate} // Set the calendar date to the start date
          onNavigate={date => setCalendarDate(date)} // Update calendarDate on manual navigation
          style={{ height: '100%', width: '100%' }}
          views={['month', 'week']}
          defaultView="month"
          onSelectEvent={event => alert(`Shift Detail: ${event.title || 'N/A'}`)}
        />
      </div>
    </div>
  );
};

export default CalenderEvent;
