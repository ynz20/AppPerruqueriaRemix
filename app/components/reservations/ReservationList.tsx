import React, { useState, useEffect } from "react";
import { Reservation } from "~/types/interfaces";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import caLocale from "@fullcalendar/core/locales/ca"; // Idioma Català
import ReservationModal from "./ReservationModal";

interface ReservationCalendarProps {
  reservations: Reservation[]; // Propietat per a les reserves
  token: string; // Token per a la API
  refreshReservations: () => Promise<Reservation[]>; // Funció per actualitzar les reserves
}

const ReservationCalendar: React.FC<ReservationCalendarProps> = ({
  reservations: initialReservations,
  token,
  refreshReservations,
}) => {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<any>(null);

  // Actualitzar les reserves al canviar l'estat
  useEffect(() => {
    setReservations(initialReservations);
  }, [initialReservations]);

  // Crida a la API per obtenir les reserves actualitzades
  const handleRefresh = async () => {
    try {
      const updatedReservations = await refreshReservations();
      setReservations(updatedReservations); // Actualitza les reserves
    } catch (error) {
      console.error("Error al obtenir les reserves:", error);
    }
  };

  // Converteix les reserves en esdeveniments per a FullCalendar
  const events = reservations.map((reservation) => ({
    title: `${reservation.service_id} - ${reservation.user.name} ${reservation.user.surname}`,
    start: `${reservation.date}T${reservation.hour}`,
    end: `${reservation.date}T${reservation.hour}`,
    description: `Client: ${reservation.client.name} ${reservation.client.surname}`,
    status: reservation.status,
    extendedProps: {
      id: reservation.id.toString(),
      clientName: `${reservation.client.name} ${reservation.client.surname}`,
      userName: `${reservation.user.name} ${reservation.user.surname}`,
      status: reservation.status,
      hour: reservation.hour,
      service: reservation.service.name,
      token, // Utilitzem el token aquí
    },
  }));

  const getEventClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-japan text-white";
      case "pending":
        return "bg-yellow-japan text-black-japan";
      case "cancelled":
        return "bg-red-japan text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  const handleEventClick = (info: any) => {
    setSelectedReservation(info.event.extendedProps);
    setModalOpen(true);
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
          background-color: #8A0303;
        }
        .fc-scrollgrid-section-body td,
        .fc-scrollgrid-section-body th {
          border-color: black;
        }
        .fc-scrollgrid {
          border-color: black;
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
          background-color: #F3E5AB;
          color: #8A0303;
          border: 1px solid #8A0303;
          border-radius: 5px;
        }
        .fc-button-group .fc-button:hover {
          background-color: #8A0303;
          color: #FFFFFF;
        }
        .fc-button-group .fc-button.fc-button-active {
          background-color: #8A0303;
          color: #FFFFFF;
          font-weight: bold;
        }
        .fc-today-button {
          background-color: #FFE4B5;
          color: #8A0303;
        }
        @media (max-width: 768px) {
          .fc-toolbar.fc-header-toolbar {
            flex-wrap: wrap;
          }
          .fc-toolbar .fc-toolbar-chunk {
            margin-bottom: 10px;
          }
        }
      `}
      </style>
      <FullCalendar
        key={reservations.length} // Això assegura que es recarregui el calendari quan canvien les reserves
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        eventClassNames={(info) => getEventClass(info.event.extendedProps.status)}
        height="auto"
        contentHeight="auto"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        locale={caLocale}
        views={{
          dayGridMonth: { buttonText: "Mes" },
          dayGridWeek: { buttonText: "Setmana" },
          dayGridDay: { buttonText: "Dia" },
        }}
      />

      <ReservationModal
        isOpen={modalOpen}
        reservation={selectedReservation}
        onClose={() => setModalOpen(false)}
        refreshReservations={handleRefresh} // Passem la funció per refrescar al modal
        token={token}
      />
    </div>
  );
};

export default ReservationCalendar;
