import React, { useState } from "react";
import { ReservationListProps } from "~/types/interfaces";

const ClientsHistory: React.FC<ReservationListProps> = ({ reservations }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 4; // Nombre de reserves per pàgina

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
    return (
      <p className="text-center text-black-japan">
        No hi ha reserves disponibles.
      </p>
    );
  }
  return (
    <>
      <head>
        <title>Gestió d&apos;historial</title>
      </head>
      <div className="p-4">
        {/* Títol amb el nom del client o treballador */}
        <h1 className="text-2xl font-bold text-black-japan mb-4">
          Historial de reserves {reservations[0]?.user?.name ? `- Treballador: ${reservations[0].user.name} ${reservations[0].user.surname}` : `- Client: ${reservations[0]?.client.name} ${reservations[0].client.surname}`}
        </h1>

        {/* Llista de reserves */}
        <div className="grid grid-cols-2 gap-4">
          {paginatedReservations.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-black-japan rounded-lg shadow-md p-4 flex flex-col justify-between"
            >
              <div>
                <p className="text-sm text-yellow-japan font-bold">
                  {reservation.date} -- {reservation.hour}
                </p>
                <p>
                  <strong className="text-white-japan">Servei:</strong>{" "}
                  <span className="text-white">{reservation.service.name}</span>
                </p>
                <p className="text-white-japan">
                  <strong>Client:</strong> {reservation.client.name} {reservation.client.surname}
                </p>
                <p>
                  <strong className="text-white-japan">Rating:</strong>{" "}
                  <span className="text-yellow-japan">
                    {reservation.rating}
                  </span>
                </p>
                <p className="text-white-japan">
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
    </>
  );
};

export default ClientsHistory;
