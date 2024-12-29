import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import React from "react";

interface ValidationErrors {
  [key: string]: string;
}

const ClientsForm: React.FC = () => {
  const navigation = useNavigation();
  const validationErrors = useActionData<ValidationErrors>();
  const isSubmitting = navigation.state !== "idle";

  const defaultValues = {
    dni: "",
    name: "",
    surname: "",
    telf: "",
    email: "",
  };

  return (
    <Form
      method="post"
      action="/clients/add"
      className="flex flex-col rounded-lg bg-gray-100 p-6 shadow-md"
      id="clients-form"
    >
      <p className="mb-4">
        <label
          htmlFor="dni"
          className="mb-2 block font-semibold text-gray-700"
        >
          DNI
        </label>
        <input
          type="text"
          id="dni"
          name="dni"
          required
          defaultValue={defaultValues.dni}
          maxLength={9}
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </p>

      <p className="mb-4">
        <label
          htmlFor="name"
          className="mb-2 block font-semibold text-gray-700"
        >
          Nom
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={defaultValues.name}
          maxLength={50}
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </p>

      <p className="mb-4">
        <label
          htmlFor="surname"
          className="mb-2 block font-semibold text-gray-700"
        >
          Cognom
        </label>
        <input
          type="text"
          id="surname"
          name="surname"
          required
          defaultValue={defaultValues.surname}
          maxLength={50}
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </p>

      <p className="mb-4">
        <label
          htmlFor="telf"
          className="mb-2 block font-semibold text-gray-700"
        >
          Telèfon
        </label>
        <input
          type="tel"
          id="telf"
          name="telf"
          required
          pattern="[0-9]{9,}"
          defaultValue={defaultValues.telf}
          title="Introdueix un número de telèfon vàlid."
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </p>

      <p className="mb-4">
        <label
          htmlFor="email"
          className="mb-2 block font-semibold text-gray-700"
        >
          Correu electrònic
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          defaultValue={defaultValues.email}
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </p>

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
          {isSubmitting ? "Saving..." : "Submit"}
        </button>
        <Link
          className="text-indigo-500 hover:underline"
          to=".."
        >
          Cancel
        </Link>
      </div>
    </Form>
  );
};

export default ClientsForm;
