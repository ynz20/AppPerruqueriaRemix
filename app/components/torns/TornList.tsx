import { Link } from "@remix-run/react";
import { ShiftListProps } from "~/types/interfaces";
import { useState } from "react";

export default function TornList({ shifts = [] }: ShiftListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3; // Mostra 3 torns per pàgina

  // Calcula el nombre total de pàgines
  const totalPages = Math.ceil(shifts.length / ITEMS_PER_PAGE);

  // Paginació: Mostra els torns corresponents a la pàgina actual
  const paginatedShifts = shifts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Funció per passar a la pàgina anterior
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Funció per passar a la pàgina següent
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <head>
        <title>Historial de Torn</title>
      </head>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
          {paginatedShifts.map((shift) => {
            const totalReservations = shift.reservations.reduce((sum, reservation) => {
              return sum + (parseFloat(reservation.service.price.toString()) || 0);
            }, 0);

            return (
              <div
                key={shift.id}
                className="border p-4 rounded shadow-sm bg-black-japan text-white-japan hover:bg-black transition"
              >
                <h3 className="text-lg font-bold">Torn #{shift.id}</h3>
                <p>
                  <span className="font-semibold">Data:</span> {new Date(shift.date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Hora d&apos;inici:</span>{" "}
                  {new Date(shift.start_time).toLocaleTimeString()}
                </p>
                <p>
                  <span className="font-semibold">Hora de fi:</span>{" "}
                  {shift.end_time ? new Date(shift.end_time).toLocaleTimeString() : "No finalitzat"}
                </p>

                <p className="mt-2 font-semibold text-yellow-japan">
                  Total de reserves: <span className="text-green-600">{totalReservations.toFixed(2)} €</span>
                </p>

                <Link
                  to={`/history/shift/${shift.id}`}
                  className="mt-2 text-sm bg-red-japan text-white px-3 py-1 rounded hover:bg-black-japan inline-block"
                >
                  Mostrar Reserves
                </Link>
              </div>
            );
          })}
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
          <span className="text-black-japan">
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
}
