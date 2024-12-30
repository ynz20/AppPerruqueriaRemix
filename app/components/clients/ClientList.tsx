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
      client.dni.toLowerCase().includes(filter.toLowerCase()) ||
      client.telf.toLowerCase().includes(filter.toLowerCase()) ||
      client.email.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-4">
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
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-black">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Nom</th>
              <th className="px-4 py-2 border-b">Cognom</th>
              <th className="px-4 py-2 border-b">DNI</th>
              <th className="px-4 py-2 border-b">Telèfon</th>
              <th className="px-4 py-2 border-b">Correu electrònic</th>
              <th className="px-4 py-2 border-b">Accions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients?.map((client) => (
              <tr key={client.dni} className="hover:bg-gray-100 text-black">
                <td className="px-4 py-2 border-b">{client.name}</td>
                <td className="px-4 py-2 border-b">{client.surname}</td>
                <td className="px-4 py-2 border-b">{client.dni}</td>
                <td className="px-4 py-2 border-b">{client.telf}</td>
                <td className="px-4 py-2 border-b">{client.email}</td>
                <td className="px-4 py-2 border-b">
                  <Link
                    to={`../clients/${client.dni}`}
                    className="transform text-xl text-blue-500 transition-transform hover:scale-125 hover:text-blue-700"
                  >
                    ✏️
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
