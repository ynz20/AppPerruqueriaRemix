import { Link } from "@remix-run/react";
import { ServiceListProps } from "~/types/interfaces";
import { useState } from "react";



export default function ServiceList({ services }: ServiceListProps) {
  const [filter, setFilter] = useState<string>("");

  const filteredServices = services?.filter(
    (service) =>
      service.name.toLowerCase().includes(filter.toLowerCase()) ||
      service.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Filtro */}
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
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Cercar per nom o descripció"
          className="mt-1 block w-full rounded-md border bg-red-japan text-white-japan p-2 shadow-sm placeholder-white-japan"
        />
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto"
        style={{ maxHeight: "400px" }}
      >
        {filteredServices?.map((service) => (
          <div
            key={service.id}
            className="rounded-lg border border-gray-300 bg-black-japan shadow-md p-4 mx-1 hover:bg-red-japan"
          >
            <h2 className="text-lg font-bold text-white-japan">{service.name}</h2>
            <p className="text-sm text-white-japan mb-6">{service.description}</p>
            <p className="text-sm text-white-japan font-bold">Preu: {service.price}€</p>
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
    </div>
  );
}
