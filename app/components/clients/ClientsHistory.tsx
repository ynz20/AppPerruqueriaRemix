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
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-gray-200 rounded-lg shadow-lg p-4 flex flex-col justify-between"
          >
            <div>
              <p className="text-sm text-gray-600 font-semibold">
                {reservation.date} -- {reservation.hour}
              </p>
              <p>
                <strong>Servei:</strong> {reservation.service_id}
              </p>
              <p className="text-sm">
                <strong>Client:</strong> {reservation.client_dni}
              </p>
              <p>
                <strong>Rating:</strong> {reservation.rating}
              </p>
              <p className="text-gray-800">
                <strong>Comentari:</strong> {reservation.comment}
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex">
                {Array.from({ length: reservation.rating }, (_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-yellow-500"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <button
                className="p-2 text-white rounded-full hover:bg-red-800"
                onClick={() => console.log(`Eliminar reserva amb ID: ${reservation.id}`)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientsHistory;



