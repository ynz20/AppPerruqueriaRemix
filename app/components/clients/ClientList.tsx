import { Link, useFetcher } from "@remix-run/react";
import { Client } from "~/types/interfaces";

interface ClientListProps {
  clients: Client[] | undefined;
}

export default function ClientList({ clients }: ClientListProps) {
  const fetcher = useFetcher(); //Per eliminar utilitzarem el fetcher

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 text-black">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Nom</th>
            <th className="px-4 py-2 border-b">Cognom</th>
            <th className="px-4 py-2 border-b">DNI</th>
            <th className="px-4 py-2 border-b">Telèfon</th>
            <th className="px-4 py-2 border-b">Correu electrònic</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.dni} className="hover:bg-gray-100 text-black">
              <td className="px-4 py-2 border-b">{client.name}</td>
              <td className="px-4 py-2 border-b">{client.surname}</td>
              <td className="px-4 py-2 border-b">{client.dni}</td>
              <td className="px-4 py-2 border-b">{client.telf}</td>
              <td className="px-4 py-2 border-b">{client.email}</td>
              <td className="px-4 py-2 border-b">
                <Link
                to={`../clients/${client.dni}`}
                className = "transform text-xl text-blue-500 transition-transform hover:scale-125 hover:text-blue-700"
                >
                  ✏️
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
