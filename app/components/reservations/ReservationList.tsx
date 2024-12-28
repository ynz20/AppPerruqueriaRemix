import React from "react";
import { Reservation } from "~/types/interfaces"; // Asegúrate de tener la interface `Reservation` con las propiedades necesarias (fecha, servicio, etc.)

interface ReservationCalendarProps {
  reservations: Reservation[];
}

const daysOfWeek = ["Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte", "Diumenge"];

const ReservationCalendar: React.FC<ReservationCalendarProps> = ({ reservations }) => {
  const getDayOfWeek = (date: string) => {
    const d = new Date(date);
    return d.getDay(); 
  };

  // Organizar las reservas por día de la semana
  const organizedReservations = daysOfWeek.map((_, index) => {
    return reservations.filter((reservation) => getDayOfWeek(reservation.date) === index);
  });

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-7 gap-4">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="border border-gray-300 p-4">
            <h3 className="text-gray-500 text-lg font-semibold text-center">{day}</h3>
            <div className="mt-2">
              {organizedReservations[index].length > 0 ? (
                organizedReservations[index].map((reservation) => (
                  <div key={reservation.id} className="border-b py-2">
                    <p className="text- text-sm font-medium">{reservation.service_id}</p>
                    <p className="text-xs text-gray-500">{new Date(reservation.date).toLocaleTimeString()}</p>
                    <p className="text-xs text-gray-500">Treballador: {reservation.worker_dni}</p>
                    <p className="text-xs text-gray-500">Client: {reservation.client_dni}</p>
                    <p className="text-xs text-green-500">Estat: {reservation.status}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center">No hi ha reserves</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationCalendar;
