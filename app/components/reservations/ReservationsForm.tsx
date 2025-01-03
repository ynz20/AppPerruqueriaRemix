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
      </div>

      {/* Servei */}
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
      </div>

      {/* Treballador */}
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
      </div>

      {/* Hora */}
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
      </div>

      {/* Dia */}
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
      </div>

      {validationErrors && (
        <ul className="mb-4 list-inside list-disc text-sm text-red-500">
          {Object.values(validationErrors).map((error: string) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
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
