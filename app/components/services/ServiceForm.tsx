import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useParams,
  useMatches,
} from "@remix-run/react";
import React from "react";
import { Service } from "~/types/interfaces";

interface ValidationErrors {
  [key: string]: string;
}

const ServicesForm: React.FC = () => {
  const navigation = useNavigation();
  const validationErrors = useActionData<ValidationErrors>();
  const isSubmitting = navigation.state !== "idle";
  const params = useParams();
  const matches = useMatches();

  const matchedRoute = matches.find(
    (match) => match.id === "routes/_app.services"
  );

  const services = matchedRoute?.data?.services as Service[] | undefined;

  const serviceData = services?.find(({ id }) => id === Number(params.id)) || {
    id: "",
    name: "",
    description: "",
    price: "",
    estimation: "",
  };

  return (
    <Form
      method={serviceData.id ? "put" : "post"}
      action={serviceData.id ? `/services/${serviceData.id}` : "/services/add"}
      className="flex flex-col rounded-lg bg-gray-100 p-6 shadow-md"
      id="services-form"
    >
      {serviceData.id && (
        <input type="hidden" name="id" value={serviceData.id} />
      )}
      <p className="mb-4">
        <label
          htmlFor="name"
          className="mb-2 block font-semibold text-gray-700"
        >
          Nom del servei
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={serviceData.name}
          maxLength={100}
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </p>

      <p className="mb-4">
        <label
          htmlFor="description"
          className="mb-2 block font-semibold text-gray-700"
        >
          Descripció
        </label>
        <textarea
          id="description"
          name="description"
          required
          defaultValue={serviceData.description}
          maxLength={255}
          rows={3}
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </p>

      <p className="mb-4">
        <label
          htmlFor="price"
          className="mb-2 block font-semibold text-gray-700"
        >
          Preu
        </label>
        <input
          type="number"
          id="price"
          name="price"
          required
          defaultValue={serviceData.price}
          step="0.01"
          min="0"
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </p>

      <p className="mb-4">
        <label
          htmlFor="estimation"
          className="mb-2 block font-semibold text-gray-700"
        >
          Estimació (Minuts)
        </label>
        <input
          type="text"
          id="estimation"
          name="estimation"
          required
          defaultValue={serviceData.estimation}
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
        <Link className="text-indigo-500 hover:underline" to="..">
          Cancel·la
        </Link>
      </div>
    </Form>
  );
};

export default ServicesForm;
