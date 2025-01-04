// ReservationsForm.tsx
import React, { useState } from "react";
import { Form, useActionData, useNavigation, Link, useLoaderData, useOutletContext } from "@remix-run/react";
import useAvailableWorkers from "~/routes/useAvailableWorkers";




interface ValidationErrors {
  [key: string]: string;
}

const ReservationsForm: React.FC = () => {
  const navigation = useNavigation();
  const validationErrors = useActionData<ValidationErrors>();
  const isSubmitting = navigation.state !== "idle";

  const { clients, services } = useLoaderData<{
    clients: { dni: string; name: string; surname: string }[];
    services: { id: number; name: string; estimation: number }[];
  }>();

  // Obtenir el token des de l'OutletContext
  const { token } = useOutletContext<{ token: string }>();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedService, setSelectedService] = useState("");

  // Usar el custom hook
  const { workers, error } = useAvailableWorkers(token, selectedDate, selectedHour, selectedService);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedHour(e.target.value);
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(e.target.value);
  };

  return (
    <Form
      method="post"
      action="/reservations/add"
      className="flex flex-col rounded-lg bg-white-japan p-6 shadow-lg border border-gray-200"
    >
      {/* Client */}
      <div className="mb-4">
        <label htmlFor="client" className="mb-2 block text-sm font-medium text-gray-600">
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
        <label htmlFor="service" className="mb-2 block text-sm font-medium text-gray-600">
          Servei
        </label>
        <select
          id="service"
          name="service"
          required
          onChange={handleServiceChange}
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

      {/* Date */}
      <div className="mb-4">
        <label htmlFor="day" className="mb-2 block text-sm font-medium text-gray-600">
          Dia
        </label>
        <input
          type="date"
          id="day"
          name="day"
          required
          onChange={handleDateChange}
          className="w-full rounded-md border border-gray-300 p-3 text-white-japan shadow-sm focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
        />
        {validationErrors?.day && (
          <p className="mt-1 text-xs text-red-500">{validationErrors.day}</p>
        )}
      </div>

      {/* Hour */}
      <div className="mb-4">
        <label htmlFor="hour" className="mb-2 block text-sm font-medium text-gray-600">
          Hora
        </label>
        <input
          type="time"
          id="hour"
          name="hour"
          required
          onChange={handleHourChange}
          className="w-full rounded-md border border-gray-300 p-3 text-white-japan shadow-sm focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
        />
        {validationErrors?.hour && (
          <p className="mt-1 text-xs text-red-500">{validationErrors.hour}</p>
        )}
      </div>

      {/* Worker */}
      <div className="mb-4">
        <label htmlFor="worker" className="mb-2 block text-sm font-medium text-gray-600">
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
              {worker.name} {worker.surname}
            </option>
          ))}
        </select>
        {validationErrors?.worker && (
          <p className="mt-1 text-xs text-red-500">{validationErrors.worker}</p>
        )}
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>

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
