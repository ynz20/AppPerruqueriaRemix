import { Form, Link, useActionData, useMatches, useNavigation, useParams } from "@remix-run/react";
import React from "react";
import { Client } from "~/types/interfaces";

interface ValidationErrors {
  [key: string]: string;
}

const ClientsForm: React.FC = () => {
  const navigation = useNavigation();
  const validationErrors = useActionData<ValidationErrors>();
  const isSubmitting = navigation.state !== "idle";
  const params = useParams();
  const matches = useMatches();

  const matchedRoute = matches.find((match) => match.id === "routes/_app.clients");

  const clients = (matchedRoute?.data as { clients: Client[] } | undefined)?.clients;
  
  const clientData = clients?.find(({ dni }) => dni === params.dni) || {
    dni: "",
    name: "",
    surname: "",
    telf: "",
    email: "",
  };

  return (
    <Form
      method={clientData.dni ? "put" : "post"}
      action={clientData.dni ? `/clients/${clientData.dni}` : "/clients/add"}
      className="flex flex-col rounded-lg bg-white-japan p-6 shadow-lg border border-gray-200"
      id="clients-form"
    >
      {clientData.dni && (
        <input type="hidden" name="dni" value={clientData.dni} />
      )}
      <h1 className="text-2xl font-bold text-red-japan mb-6">
        {clientData.dni ? "Edita Client" : "Afegeix Client"}
      </h1>

      <div className="mb-4">
        <label
          htmlFor="dni"
          className="mb-2 block text-sm font-medium text-gray-600"
        >
          DNI
        </label>
        <input
          type="text"
          id="dni"
          name="dni"
          required
          defaultValue={clientData.dni}
          maxLength={9}
          className="w-full rounded-md border border-gray-300 p-3 text-white-japan shadow-sm focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
          placeholder="DNI"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-600"
        >
          Nom
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={clientData.name}
          maxLength={50}
          className="w-full rounded-md border border-gray-300 p-3 text-white-japan shadow-sm focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
          placeholder="Nom"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="surname"
          className="mb-2 block text-sm font-medium text-gray-600"
        >
          Cognom
        </label>
        <input
          type="text"
          id="surname"
          name="surname"
          required
          defaultValue={clientData.surname}
          maxLength={50}
          className="w-full rounded-md border border-gray-300 p-3 text-white-japan shadow-sm focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
          placeholder="Cognom"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="telf"
          className="mb-2 block text-sm font-medium text-gray-600"
        >
          Telèfon
        </label>
        <input
          type="tel"
          id="telf"
          name="telf"
          required
          pattern="[0-9]{9,}"
          defaultValue={clientData.telf}
          title="Introdueix un número de telèfon vàlid."
          className="w-full rounded-md border border-gray-300 p-3 text-white-japan shadow-sm focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
          placeholder="Telèfon"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-600"
        >
          Correu electrònic
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          defaultValue={clientData.email}
          className="w-full rounded-md border border-gray-300 p-3 text-white-japan shadow-sm focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
          placeholder="Correu electrònic"
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
          {isSubmitting ? "Guardant..." : "Desar"}
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

export default ClientsForm;
