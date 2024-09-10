import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const myEventsList = [
    {
      title: 'Project Kickoff',
      start: new Date(2024, 7, 25, 17, 0), // 5:00 PM August 25, 2024
      end: new Date(2024, 7, 25, 18, 0),   // 6:00 PM August 25, 2024
    },
    {
      title: 'Client Call',
      start: new Date(2024, 7, 26, 10, 0), // 10:00 AM August 26, 2024
      end: new Date(2024, 7, 26, 11, 0),   // 11:00 AM August 26, 2024
    },
    {
      title: 'Development Session',
      start: new Date(2024, 7, 26, 17, 0), // 5:00 PM August 26, 2024
      end: new Date(2024, 7, 26, 19, 0),   // 7:00 PM August 26, 2024
    },
    {
      title: 'Team Stand-up',
      start: new Date(2024, 7, 27, 12, 0), // 12:00 PM August 27, 2024
      end: new Date(2024, 7, 27, 12, 30),  // 12:30 PM August 27, 2024
    },
    {
      title: 'Design Meeting',
      start: new Date(2024, 7, 28, 15, 0), // 3:00 PM August 28, 2024
      end: new Date(2024, 7, 28, 16, 0),   // 4:00 PM August 28, 2024
    },
    {
      title: 'Client Presentation',
      start: new Date(2024, 7, 28, 17, 0), // 5:00 PM August 28, 2024
      end: new Date(2024, 7, 28, 18, 30),  // 6:30 PM August 28, 2024
    },
    {
      title: 'Project Review',
      start: new Date(2024, 7, 29, 10, 0), // 10:00 AM August 29, 2024
      end: new Date(2024, 7, 29, 11, 0),   // 11:00 AM August 29, 2024
    },
    {
      title: 'Code Review',
      start: new Date(2024, 7, 30, 12, 0), // 12:00 PM August 30, 2024
      end: new Date(2024, 7, 30, 13, 0),   // 1:00 PM August 30, 2024
    },
    {
      title: 'Sprint Planning',
      start: new Date(2024, 7, 30, 17, 0), // 5:00 PM August 30, 2024
      end: new Date(2024, 7, 30, 18, 0),   // 6:00 PM August 30, 2024
    },
    {
      title: 'Team Meeting',
      start: new Date(2024, 7, 31, 8, 0),  // 8:00 AM August 31, 2024
      end: new Date(2024, 7, 31, 9, 0),    // 9:00 AM August 31, 2024
    },
  ];
  
const CalenderEvent = () => {
    const [events, setEvents] = useState([]);

  useEffect(() => {
    const currentMonth = moment().month(); // Get the current month (0-11)
    const currentYear = moment().year(); // Get the current year

    const orders = [
      {
        title: 'Pickup on Jun 2, 2024 at 11:30 AM',
        start: new Date(currentYear, currentMonth, 6, 11, 30),
        end: new Date(currentYear, currentMonth, 6, 12, 30),
        allDay: false,
        resource: {
          from: 'North Street, ABC',
          to: '5th Avenue, XYZ',
          orderId: '98237469'
        }
      },
      {
        title: 'Pickup on Jun 3, 2024 at 2:00 PM',
        start: new Date(currentYear, currentMonth, 3, 14, 0),
        end: new Date(currentYear, currentMonth, 3, 15, 0),
        allDay: false,
        resource: {
          from: 'Market Street, DEF',
          to: '7th Avenue, LMN',
          orderId: '98237470'
        }
      }
      // Add more orders/events as needed
    ];

    setEvents(orders);
  }, []);

  return (
    <div style={{ height: '500px', padding: '20px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%', width: '100%' }}
        views={['month', 'week']}
        defaultView="month"
        onSelectEvent={event => alert(`Order ID: ${event.resource.orderId}`)}
      />
     
    </div>
  );
};

export default CalenderEvent;
