import React, { useState } from "react";
import { Reservation } from "~/types/interfaces";

interface ClientsHistoryProps {
  reservations: Reservation[];
}

const ClientsHistory: React.FC<ClientsHistoryProps> = ({ reservations }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6; // Nombre de reserves per pàgina

  // Calcular el nombre total de pàgines
  const totalPages = Math.ceil(reservations.length / ITEMS_PER_PAGE);

  // Obtenir les reserves de la pàgina actual
  const paginatedReservations = reservations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Funcions per navegar entre pàgines
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (reservations.length === 0 || !reservations) {
    return <p className="text-center text-gray-600">No hi ha reserves disponibles.</p>;
  }

  return (
    <div className="p-4">
      {/* Llista de reserves */}
      <div className="grid grid-cols-2 gap-4">
        {paginatedReservations.map((reservation) => (
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

      {/* Navegació de pàgines */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md text-white ${
            currentPage === 1
          ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-japan hover:bg-black-japan"
          }`}
        >
          Anterior
        </button>
        <span className="text-gray-700">
          Pàgina {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md text-white ${
            currentPage === totalPages
             ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-japan hover:bg-black-japan"
          }`}
        >
          Següent
        </button>
      </div>
    </div>
  );
};

export default ClientsHistory;
