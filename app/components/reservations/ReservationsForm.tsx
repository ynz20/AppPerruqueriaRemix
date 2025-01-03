import {
  Form,
  useLoaderData,
  useActionData,
  useNavigation,
  Link,
} from "@remix-run/react";
import React from "react";

interface ValidationErrors {
  [key: string]: string;
}

const ReservationsForm: React.FC = () => {
  const navigation = useNavigation();
  const validationErrors = useActionData<ValidationErrors>();
  const isSubmitting = navigation.state !== "idle";

  const { clients, services, workers } = useLoaderData<{
    clients: { dni: string; name: string; surname: string }[];
    services: { id: number; name: string }[];
    workers: { dni: string; name: string; surname: string }[];
  }>();

  return (
    <Form
      method="post"
      action="/reservations/add"
      className="flex flex-col rounded-lg bg-white-japan p-6 shadow-lg border border-gray-200"
    >
      {/* Client */}
      <div className="mb-4">
        <label
          htmlFor="client"
          className="mb-2 block text-sm font-medium text-gray-600"
        >
          Client
        </label>
        <select
          id="client"
          name="client"
          required
          className="w-full rounded-md border border-gray-300 p-3 text-white-japan shadow-sm focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
        >
          <option value="">Selecciona un client</option>
          {clients.map((client) => (
            <option key={client.dni} value={client.dni}>
              {client.name} {client.surname} - {client.dni}
            </option>
          ))}
        </select>
        {validationErrors?.client && (
          <p className="mt-1 text-xs text-red-500">{validationErrors.client}</p>
        )}
      </div>

      {/* Service */}
      <div className="mb-4">
        <label
          htmlFor="service"
          className="mb-2 block text-sm font-medium text-gray-600"
        >
          Servei
        </label>
        <select
          id="service"
          name="service"
          required
          className="w-full rounded-md border border-gray-300 p-3 text-white-japan shadow-sm focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
        >
          <option value="">Selecciona un servei</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
        {validationErrors?.service && (
          <p className="mt-1 text-xs text-red-500">{validationErrors.service}</p>
        )}
      </div>

      {/* Worker */}
      <div className="mb-4">
        <label
          htmlFor="worker"
          className="mb-2 block text-sm font-medium text-gray-600"
        >
          Treballador
        </label>
        <select
          id="worker"
          name="worker"
          required
          className="w-full rounded-md border border-gray-300 p-3 text-white-japan shadow-sm focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
        >
          <option value="">Selecciona un treballador</option>
          {workers.map((worker) => (
            <option key={worker.dni} value={worker.dni}>
              {worker.name} {worker.surname} - {worker.dni}
            </option>
          ))}
        </select>
        {validationErrors?.worker && (
          <p className="mt-1 text-xs text-red-500">{validationErrors.worker}</p>
        )}
      </div>

      {/* Hour */}
      <div className="mb-4">
        <label
          htmlFor="hour"
          className="mb-2 block text-sm font-medium text-gray-600"
        >
          Hora
        </label>
        <input
          type="time"
          id="hour"
          name="hour"
          required
          className="w-full rounded-md border border-gray-300 p-3 text-white-japan shadow-sm focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
        />
        {validationErrors?.hour && (
          <p className="mt-1 text-xs text-red-500">{validationErrors.hour}</p>
        )}
      </div>

      {/* Day */}
      <div className="mb-4">
        <label
          htmlFor="day"
          className="mb-2 block text-sm font-medium text-gray-600"
        >
          Dia
        </label>
        <input
          type="date"
          id="day"
          name="day"
          required
          className="w-full rounded-md border border-gray-300 p-3 text-white-japan shadow-sm focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
        />
        {validationErrors?.day && (
          <p className="mt-1 text-xs text-red-500">{validationErrors.day}</p>
        )}
      </div>

      {validationErrors && (
        <div className="mb-4 p-4 bg-red-100 border border-red-500 rounded-md">
          <div className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-red-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-lg font-semibold text-red-500">
              Error
            </span>
          </div>
          <ul className="list-inside list-disc text-sm text-red-700">
            {Object.values(validationErrors).map((error: string, index) => (
              <li key={index} className="mb-1">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center justify-between mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-red-japan px-6 py-3 text-sm font-medium text-white hover:bg-black-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
        >
          {isSubmitting ? "Guardant..." : "Enviar"}
        </button>
        <Link
          to=".."
          className="text-sm font-medium text-gray-500 hover:text-red-japan focus:outline-none focus:underline"
        >
          Cancel·la
        </Link>
      </div>
    </Form>
  );
};

export default ReservationsForm;
