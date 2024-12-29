import React from "react";
import { Reservation } from "~/types/interfaces"; // Asegúrate de tener la interface `Reservation` con las propiedades necesarias (fecha, servicio, etc.)
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // para interacción como selección y arrastre

interface ReservationCalendarProps {
  reservations: Reservation[];
}

const ReservationCalendar: React.FC<ReservationCalendarProps> = ({ reservations }) => {
  // Mapear las reservas a los eventos de FullCalendar
  const events = reservations.map((reservation) => ({
    title: `${reservation.service_id} - ${reservation.user.name} ${reservation.user.surname}`,
    // Aquí es importante usar la fecha y la hora correctamente
    start: `${reservation.date}T${reservation.hour}`, // Concatenar fecha y hora
    end: `${reservation.date}T${reservation.hour}`,   // Si tus reservas no tienen una duración establecida, podemos poner el mismo valor
    description: `Client: ${reservation.client.name} ${reservation.client.surname}`,
    status: reservation.status,
  }));

  // Función para decidir el color del evento según el estado
  const getEventClass = (status: string) => {
    switch (status) {
      case 'confirmada':
        return 'bg-green-500 text-white'; // Color verde para confirmada
      case 'pendiente':
        return 'bg-yellow-500 text-white'; // Color amarillo para pendiente
      case 'cancelada':
        return 'bg-red-500 text-white'; // Color rojo para cancelada
      default:
        return 'bg-blue-500 text-white'; // Color por defecto
    }
  };

  return (
    <div className="overflow-x-auto" style={{ maxWidth: '100%' }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events} // Los eventos que provienen de las reservas
        eventClick={(info) => {
          alert('Reserva: ' + info.event.title + '\n' + info.event.extendedProps.description); // Mostrar detalles al hacer click
        }}
        eventClassNames={info => getEventClass(info.event.extendedProps.status)} // Asigna el color dinámicamente
        height="auto" // Aseguramos que el calendario se ajuste a la pantalla
        contentHeight="auto" // Ajustamos la altura del contenido
        aspectRatio={2} // Ajusta el aspecto de las celdas (si es necesario)
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
      />
    </div>
  );
};

export default ReservationCalendar;
