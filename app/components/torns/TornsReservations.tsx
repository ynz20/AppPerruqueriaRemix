import { useState, useEffect } from "react";
import { ReservationListProps } from "~/types/interfaces";

export default function ReservationList({ reservations }: ReservationListProps) {
  const [filter, setFilter] = useState<string>(""); // Filtro
  const [currentPage, setCurrentPage] = useState<number>(1); // Pàgina actual
  const [itemsPerPage, setItemsPerPage] = useState<number>(4); // Elements per pàgina (dinàmics)

  // Actualitzar el nombre d'elements per pàgina segons la mida de la pantalla
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(2); // Pantalles petites: 1 reserva per pàgina
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(3); // Pantalles mitjanes: 3 reserves per pàgina
      } else {
        setItemsPerPage(12); // Pantalles grans: 4 reserves per pàgina
      }
    };

    updateItemsPerPage(); // Executar quan es munta el component
    window.addEventListener("resize", updateItemsPerPage); // Escoltar canvis de mida de pantalla

    return () => window.removeEventListener("resize", updateItemsPerPage); // Netejar esdeveniment en desmuntar
  }, []);

  // Filtrar reserves segons el terme del filtre
  const filteredReservations = reservations?.filter(
    (reservation) =>
      reservation.service.name.toLowerCase().includes(filter.toLowerCase()) ||
      reservation.client_dni.toLowerCase().includes(filter.toLowerCase()) ||
      reservation.comment.toLowerCase().includes(filter.toLowerCase())
  );

  // Calcular el nombre total de pàgines
  const totalPages = Math.ceil(
    (filteredReservations?.length || 0) / itemsPerPage
  );

  // Reserves per a la pàgina actual
  const paginatedReservations = filteredReservations?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Funcions de navegació
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-4">
      {/* Filtro */}
      <div className="mb-4">
        <label
          htmlFor="filter"
          className="block text-sm font-medium text-gray-700"
        >
          Filtrar reserves
        </label>
        <input
          type="text"
          id="filter"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1); // Reiniciar a la primera pàgina al filtrar
          }}
          placeholder="Cercar per servei, DNI o comentari"
          className="mt-1 block w-full rounded-md border bg-red-japan text-white-japan p-2 shadow-sm placeholder-white-japan"
        />
      </div>

      {/* Llista de reserves */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        style={{ maxHeight: "calc(3 * 16rem)", overflowY: "auto" }} // Limitar a 3 targetes en pantalles petites
      >
        {paginatedReservations?.length > 0 ? (
          paginatedReservations.map((reservation) => (
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
                  <strong>Client:</strong> {reservation.client_dni}
                </p>
                <p>
                  <strong className="text-white-japan">Valoració:</strong>{" "}
                  <span className="text-yellow-japan">{reservation.rating}</span>
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
          ))
        ) : (
          <p className="text-sm text-gray-600">Sense reserves.</p>
        )}
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
  );
}
