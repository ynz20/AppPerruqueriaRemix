import React from "react";
import { Reservation } from "~/types/interfaces";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import caLocale from "@fullcalendar/core/locales/ca"; // Idioma Català

interface ReservationCalendarProps {
  reservations: Reservation[];
}

const ReservationCalendar: React.FC<ReservationCalendarProps> = ({
  reservations,
}) => {
  // Mapegem les reserves als esdeveniments de FullCalendar
  const events = reservations.map((reservation) => ({
    title: `${reservation.service_id} - ${reservation.user.name} ${reservation.user.surname}`,
    start: `${reservation.date}T${reservation.hour}`, // Concatenar data i hora
    end: `${reservation.date}T${reservation.hour}`, // Si les reserves no tenen durada, podem posar el mateix valor
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
        return "bg-green-500 text-white"; // Color verd per confirmada
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

        .fc-daygrid-day-number {
          color: #8A0303;
          font-weight: bold;
        }
        .fc-daygrid-day:hover .fc-daygrid-day-number {
          color: #2D2D2D;
        }


        .fc-toolbar-title {
          color: #8A0303;
          font-weight: bold;
        }

      
        .fc-button-group .fc-button {
          background-color: #F3E5AB; /* Color de fondo de los botones */
          color: #8A0303; /* Color del texto */
          border: 1px solid #8A0303; /* Bordes */
          border-radius: 5px; /* Bordes redondeados */
        }

  
          background-color: #8A0303; /* Fondo al hacer hover */
          color: #FFFFFF; /* Texto blanco */
        }

        /* Cambiar el color del botón activo */
        .fc-button-group .fc-button.fc-button-active {
          background-color: #8A0303; /* Fondo activo */
          color: #FFFFFF; /* Texto blanco */
          font-weight: bold; /* Negrita para destacar */
        }

        .fc-today-button {
          background-color: #FFE4B5; /* Fondo especial para 'Hoy' */
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
        locale={caLocale}
      />
    </div>
  );
};

export default ReservationCalendar;
