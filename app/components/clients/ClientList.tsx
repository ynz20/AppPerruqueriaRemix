import { Link, useFetcher } from "@remix-run/react";
import { ClientListProps } from "~/types/interfaces";
import { useState } from "react";

export default function ClientList({ clients }: ClientListProps) {
  const [filter, setFilter] = useState<string>(""); // Estat per emmagatzemar el filtre de text
  const [currentPage, setCurrentPage] = useState<number>(1); // Estat per la pàgina actual
  const fetcher = useFetcher();

  const ITEMS_PER_PAGE = 12; // 4 columnes x 3 files = 12 clients per pàgina

  // Filtrar els clients segons el text introduït al filtre
  const filteredClients = clients?.filter(
    (client) =>
      client.name.toLowerCase().includes(filter.toLowerCase()) ||
      client.surname.toLowerCase().includes(filter.toLowerCase()) ||
      client.dni.toLowerCase().includes(filter.toLowerCase())
  );

  // Calcular el nombre total de pàgines
  const totalPages = Math.ceil((filteredClients?.length || 0) / ITEMS_PER_PAGE);

  // Obtenir els clients corresponents a la pàgina actual
  const paginatedClients = filteredClients?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Funció per anar a la pàgina anterior
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Funció per anar a la pàgina següent
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-4">
      {/* Filtre per cercar clients */}
      <div className="mb-4">
        <label
          htmlFor="filter"
          className="block text-sm font-medium text-gray-700"
        >
          Filtrar clients
        </label>
        <input
          type="text"
          id="filter"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value); // Actualitzar el filtre
            setCurrentPage(1); // Reiniciar a la primera pàgina en filtrar
          }}
          placeholder="Cercar per nom, cognom, DNI, etc."
          className="mt-1 block w-full rounded-md border bg-red-japan text-white-japan p-2 shadow-sm placeholder-white-japan"
        />
      </div>

      {/* Llista de clients paginada */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedClients?.map((client) => (
          <div
            key={client.dni} // Identificador únic per cada client
            className="rounded-lg border border-gray-300 bg-black-japan shadow-md p-4 mx-1 hover:bg-red-japan"
          >
            <h2 className="text-lg font-bold text-white-japan">
              {client.name} {client.surname}
            </h2>
            <p className="text-sm text-white-japan">DNI: {client.dni}</p>
            <div className="mt-4 flex justify-between items-center">
              {/* Enllaç per editar el client */}
              <Link
                to={`../clients/${client.dni}`}
                className="text-white-japan hover:text-blue-700 text-sm font-semibold flex items-center space-x-1"
              >
                ✏️ <span>Editar</span>
              </Link>
              {/* Enllaç per veure l'historial del client */}
              <Link
                to={`../client/reservations/${client.dni}`}
                className="text-white-japan hover:text-green-500 text-sm font-semibold flex items-center space-x-1"
              >
                📜 <span>Historial</span>
              </Link>
              {/* Formulari per eliminar el client */}
              <fetcher.Form method="post" action={`/clients/${client.dni}`}>
                <input type="hidden" name="_method" value="delete" />
                <input type="hidden" name="dni" value={client.dni} />
                <button
                  type="submit"
                  className="text-white-japan hover:text-red-500 text-sm font-semibold flex items-center space-x-1"
                >
                  🗑️ <span>Eliminar</span>
                </button>
              </fetcher.Form>
            </div>
          </div>
        ))}
      </div>

      {/* Navegació entre pàgines */}
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
        <span className="text-white">
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
