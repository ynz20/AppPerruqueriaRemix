import React from "react";
import { Reservation } from "~/types/interfaces";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import caLocale from "@fullcalendar/core/locales/ca"; // Idioma Català

interface ReservationCalendarProps {
  reservations: Reservation[]; // Propietat per a les reserves
}

const ReservationCalendar: React.FC<ReservationCalendarProps> = ({
  reservations,
}) => {
  // Mapegem les reserves als esdeveniments de FullCalendar
  const events = reservations.map((reservation) => ({
    title: `${reservation.service_id} - ${reservation.user.name} ${reservation.user.surname}`,
    start: `${reservation.date}T${reservation.hour}`, // Concatenem data i hora
    end: `${reservation.date}T${reservation.hour}`, // Si les reserves no tenen durada, utilitzem la mateixa hora
    description: `Client: ${reservation.client.name} ${reservation.client.surname}`,
    status: reservation.status,
    clientName: `${reservation.client.name} ${reservation.client.surname}`,
    userName: `${reservation.user.name} ${reservation.user.surname}`,
    hour: reservation.hour,
    service: reservation.service.name,
  }));

  // Funció per decidir el color de l'esdeveniment segons l'estat
  const getEventClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-400 text-white"; // Color verd per confirmada
      case "pending":
        return "bg-yellow-500 text-white"; // Color groc per pendent
      case "cancelled":
        return "bg-red-500 text-white"; // Color vermell per cancel·lada
      default:
        return "bg-blue-500 text-white"; // Color per defecte
    }
  };

  // Format de la targeta de cada reserva
  const eventContent = (eventInfo: {
    event: {
      extendedProps: {
        clientName: string;
        userName: string;
        hour: string;
        service: string;
      };
    };
  }) => {
    const { clientName, userName, hour, service } =
      eventInfo.event.extendedProps;

    return (
      <div className="text-sm">
        <p>
          <strong>Client:</strong> {clientName}
        </p>
        <p>
          <strong>Treballador:</strong> {userName}
        </p>
        <p>
          <strong>Hora:</strong> {hour}
        </p>
        <p>
          <strong>Servei:</strong>
          {service}
        </p>
      </div>
    );
  };

  return (
    <div
      className="calendar-container"
      style={{
        maxWidth: "100%",
        height: "500px",
        overflowY: "auto",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      <style>
        {`
        .fc-col-header {
          background-color: #8A0303; /* Fondo dels titols dels dies de la setmana*/
        }
        
        .fc-scrollgrid-section-body td,
        .fc-scrollgrid-section-body th {
          border-color: black; /* Color de les línies del calendari */
        }
        .fc-scrollgrid {
          border-color: black; /* Color dels bordes del calendari */
        }

        .fc-daygrid-day-number {
          color: #8A0303;
          font-weight: bold;
        }

        .fc-toolbar-title {
          color: #8A0303;
          font-weight: bold;
        }

        .fc-button-group .fc-button {
          background-color: #F3E5AB; /* Color de fons dels botons */
          color: #8A0303; /* Color del text */
          border: 1px solid #8A0303; /* Bordes */
          border-radius: 5px; /* Bordes arrodonits */
        }

        .fc-button-group .fc-button:hover {
          background-color: #8A0303; /* Fons al passar el ratolí */
          color: #FFFFFF; /* Text blanc */
        }

        /* Canviar el color del botó actiu */
        .fc-button-group .fc-button.fc-button-active {
          background-color: #8A0303; /* Fons actiu */
          color: #FFFFFF; /* Text blanc */
          font-weight: bold; /* Negrita per destacar */
        }

        .fc-today-button {
          background-color: #FFE4B5; /* Fons especial per 'Avui' */
          color: #8A0303;
        }
      `}
      </style>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={(info) => {
          alert(
            "Reserva: " +
              info.event.title +
              "\n" +
              info.event.extendedProps.description
          );
        }}
        eventClassNames={(info) =>
          getEventClass(info.event.extendedProps.status)
        }
        eventContent={eventContent}
        height="auto"
        contentHeight="auto"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        locale={caLocale} // Configuració per a l'idioma català
      />
    </div>
  );
};

export default ReservationCalendar;
