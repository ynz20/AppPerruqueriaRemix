import { Form, useLoaderData, useActionData, useNavigation } from "@remix-run/react";
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
    console.log(clients, services, workers),
    <Form
      method="post"
      action="/reservations/add"
      className="flex flex-col rounded-lg bg-gray-100 p-6 shadow-md"
    >
      {/* Client */}
      <div className="mb-4">
        <label htmlFor="client" className="block text-gray-700 text-sm font-bold mb-2">
          Client
        </label>
        <select
          id="client"
          name="client"
          required
          className="w-full border rounded py-2 px-3"
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
        <label htmlFor="service" className="block text-gray-700 text-sm font-bold mb-2">
          Servei
        </label>
        <select
          id="service"
          name="service"
          required
          className="w-full border rounded py-2 px-3"
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
        <label htmlFor="worker" className="block text-gray-700 text-sm font-bold mb-2">
          Treballador
        </label>
        <select
          id="worker"
          name="worker"
          required
          className="w-full border rounded py-2 px-3"
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
        <label htmlFor="hour" className="block text-gray-700 text-sm font-bold mb-2">
          Hora
        </label>
        <input
          type="time"
          id="hour"
          name="hour"
          required
          className="w-full border rounded py-2 px-3"
        />
      </div>

      {/* Dia */}
      <div className="mb-4">
        <label htmlFor="day" className="block text-gray-700 text-sm font-bold mb-2">
          Dia
        </label>
        <input
          type="date"
          id="day"
          name="day"
          required
          className="w-full border rounded py-2 px-3"
        />
      </div>

      {validationErrors && (
        <ul className="mb-4 list-inside list-disc text-red-500">
          {Object.values(validationErrors).map((error: string) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <div className="form-actions flex items-center justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {isSubmitting ? "Guardant..." : "Enviar"}
        </button>
      </div>
    </Form>
  );
};

export default ReservationsForm;
