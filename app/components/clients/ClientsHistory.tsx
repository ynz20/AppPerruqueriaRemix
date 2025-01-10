import React from "react";
import { Reservation } from "~/types/interfaces";

interface ClientsHistoryProps {
  reservations: Reservation[];
}

const ClientsHistory: React.FC<ClientsHistoryProps> = ({ reservations }) => {
  if (reservations.length === 0 || !reservations) {
    return <p className="text-center text-gray-600">No hi ha reserves disponibles.</p>;
  }

  return (
    <div>
      <ul className="space-y-4">
        {reservations.map((reservation) => (
          <li
            key={reservation.id}
            className="border rounded-lg p-1 m-5 shadow-md bg-white-japan text-black-japan"
          >
            <p><strong>ID:</strong> {reservation.id}</p>
            <p><strong>Data:</strong> {reservation.date}</p>
            <p><strong>Hora:</strong> {reservation.hour}</p>
            <p><strong>Treballador:</strong> {reservation.worker_dni}</p>
            <p><strong>Servei:</strong> {reservation.service_id}</p>
            <p><strong>Client:</strong> {reservation.client_dni}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default ClientsHistory;
