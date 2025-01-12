import { Link } from "@remix-run/react";
import { ServiceListProps } from "~/types/interfaces";
import { useState } from "react";

export default function ServiceList({ services }: ServiceListProps) {
  const [filter, setFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1); // Pàgina actual

  const ITEMS_PER_PAGE = 4; // Serveis per pàgina

  // Filtrar serveis segons el terme del filtre
  const filteredServices = services?.filter(
    (service) =>
      service.name.toLowerCase().includes(filter.toLowerCase()) ||
      service.description.toLowerCase().includes(filter.toLowerCase())
  );

  // Calcular número total de pàgines
  const totalPages = Math.ceil(
    (filteredServices?.length || 0) / ITEMS_PER_PAGE
  );

  // Serveis per a la pàgina actual
  const paginatedServices = filteredServices?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
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
      {/* Filtre */}
      <div className="mb-4">
        <label
          htmlFor="filter"
          className="block text-sm font-medium text-gray-700"
        >
          Filtrar serveis
        </label>
        <input
          type="text"
          id="filter"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1); // Reiniciar a la primera pàgina al filtrar
          }}
          placeholder="Cercar per nom o descripció"
          className="mt-1 block w-full rounded-md border bg-red-japan text-white-japan p-2 shadow-sm placeholder-white-japan"
        />
      </div>

      {/* Llista de serveis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedServices?.map((service) => (
          <div
            key={service.id}
            className="rounded-lg border border-gray-300 bg-black-japan shadow-md p-4 mx-1 hover:bg-red-japan"
          >
            <h2 className="text-lg font-bold text-white-japan">
              {service.name}
            </h2>
            <p className="text-sm text-white-japan mb-6">
              {service.description}
            </p>
            <p className="text-sm text-white-japan font-bold">
              Preu: {service.price}€
            </p>
            <p className="text-sm text-white-japan font-bold">
              Estimació: {service.estimation} minuts
            </p>
            <div className="mt-4 text-right">
              <Link
                to={`../services/${service.id}`}
                className="text-white-japan hover:text-black-japan text-sm font-semibold"
              >
                Editar ✏️
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
