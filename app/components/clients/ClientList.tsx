import { Link } from "@remix-run/react";
import { Client } from "~/types/interfaces";
import { useState } from "react";

interface ClientListProps {
  clients: Client[] | undefined;
}

export default function ClientList({ clients }: ClientListProps) {
  const [filter, setFilter] = useState<string>("");

  const filteredClients = clients?.filter(
    (client) =>
      client.name.toLowerCase().includes(filter.toLowerCase()) ||
      client.surname.toLowerCase().includes(filter.toLowerCase()) ||
      client.dni.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Filtre */}
      <div className="mb-4">
        <label htmlFor="filter" className="block text-sm font-medium text-gray-700">
          Filtrar clients
        </label>
        <input
  type="text"
  id="filter"
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
  placeholder="Cercar per nom, cognom, DNI, etc."
  className="mt-1 block w-full rounded-md border bg-red-japan text-white-japan p-2 shadow-sm placeholder-white-japan"
/>
      </div>
      {/* Llista de clients */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto"
        style={{ maxHeight: "400px" }}
      >
        {filteredClients?.map((client) => (
          <div
            key={client.dni}
            className="rounded-lg border border-gray-300 bg-black-japan shadow-md p-3 mx-1 hover:bg-red-japan"
          >
            <h2 className="text-lg font-bold text-white-japan">
              {client.name} {client.surname}
            </h2>
            <p className="text-sm text-white-japan">DNI: {client.dni}</p>
            <div className="mt-4 text-right">
              <Link
                to={`../clients/${client.dni}`}
                className="text-white-japan hover:text-blue-700 text-sm font-semibold"
              >
                Editar ✏️
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
