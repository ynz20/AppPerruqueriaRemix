import { Link } from "@remix-run/react";
import { Service } from "~/types/interfaces";

interface ServiceListProps {
  services: Service[] | undefined;
}

export default function ServiceList({ services }: ServiceListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 text-black">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Nom</th>
            <th className="px-4 py-2 border-b">Descripció</th>
            <th className="px-4 py-2 border-b">Preu</th>
            <th className="px-4 py-2 border-b">Estimació</th>
            <th className="px-4 py-2 border-b">Accions</th>
          </tr>
        </thead>
        <tbody>
          {services?.map((service) => (
            <tr key={service.id} className="hover:bg-gray-100 text-black">
              <td className="px-4 py-2 border-b">{service.name}</td>
              <td className="px-4 py-2 border-b">{service.description}</td>
              <td className="px-4 py-2 border-b">{service.price}€</td>
              <td className="px-4 py-2 border-b">{service.estimation} minuts</td>
              <td className="px-4 py-2 border-b">
                <Link
                  to={`../services/${service.id}`}
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
  );
}
