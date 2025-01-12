import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";
import { User } from "~/types/interfaces";

interface WorkersListProps {
  workers: User[] | undefined;
}

export default function WorkersList({ workers }: WorkersListProps) {
  const [filter, setFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1); // Estat per la pàgina actual
  const [itemsPerPage, setItemsPerPage] = useState<number>(12); // Nombre d'elements per pàgina (dinàmic)

  // Actualitzar el nombre d'elements per pàgina segons la mida de la pantalla
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(4); // Pantalles petites: 1 columna, 4 files
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(12); // Pantalles mitjanes: 3 columnes
      } else {
        setItemsPerPage(16); // Pantalles grans: 4 columnes
      }
    };

    updateItemsPerPage(); // Executar quan es munta el component
    window.addEventListener("resize", updateItemsPerPage); // Escoltar canvis de mida de pantalla

    return () => window.removeEventListener("resize", updateItemsPerPage); // Netejar esdeveniment en desmuntar
  }, []);

  // Filtrar els treballadors basant-se en el text introduït al filtre
  const filteredWorkers = workers?.filter(
    (worker) =>
      worker.name.toLowerCase().includes(filter.toLowerCase()) ||
      worker.surname.toLowerCase().includes(filter.toLowerCase()) ||
      worker.dni.toLowerCase().includes(filter.toLowerCase())
  );

  // Calcular el nombre total de pàgines
  const totalPages = Math.ceil((filteredWorkers?.length || 0) / itemsPerPage);

  // Obtenir els treballadors de la pàgina actual
  const paginatedWorkers = filteredWorkers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Funcions per navegar entre pàgines
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-4">
      {/* Filtre */}
      <div className="mb-4">
        <label
          htmlFor="filter"
          className="block text-sm font-medium text-gray-700"
        >
          Filtrar treballadors
        </label>
        <input
          type="text"
          id="filter"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1); // Reiniciar a la primera pàgina quan es filtra
          }}
          placeholder="Cercar per nom, cognom, DNI, etc."
          className="mt-1 block w-full rounded-md border bg-red-japan text-white-japan p-2 shadow-sm placeholder-white-japan"
        />
      </div>

      {/* Llista de treballadors amb disseny dinàmic segons mida de pantalla */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        {paginatedWorkers?.map((worker) => (
          <div
            key={worker.dni}
            className="rounded-lg border border-gray-300 bg-black-japan shadow-md p-4 mx-1 hover:bg-red-japan"
          >
            <h2 className="text-lg font-bold text-white-japan">
              {worker.name} {worker.surname}
            </h2>
            <p className="text-sm text-white-japan">DNI: {worker.dni}</p>
            <div className="flex justify-between items-center">
              <Link
                to={`../workers/${worker.dni}`}
                className="text-white-japan hover:text-blue-700 text-sm font-semibold"
              >
                Editar ✏️
              </Link>
              <Link
                to={`../worker/reservations/${worker.dni}`}
                className="text-white-japan hover:text-green-500 text-sm font-semibold flex items-center space-x-1"
              >
                📜 <span>Historial</span>
              </Link>
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
