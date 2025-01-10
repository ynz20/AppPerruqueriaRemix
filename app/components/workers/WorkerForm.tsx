import {
    Form,
    Link,
    useActionData,
    useNavigation,
    useParams,
    useMatches,
  } from "@remix-run/react";
  import React from "react";
  import { User } from "~/types/interfaces";
  
  interface ValidationErrors {
    [key: string]: string;
  }
  
  const WorkerForm: React.FC = () => {
    const navigation = useNavigation();
    const validationErrors = useActionData<ValidationErrors>();
    const isSubmitting = navigation.state !== "idle";
    const params = useParams();
    const matches = useMatches();
  
    const matchedRoute = matches.find(
      (match) => match.id === "routes/_app.workers"
    );
  
    // Obtenir les dades dels treballadors
    const workers = matchedRoute?.data?.users as User[] | undefined;
  
    const workerData =
      workers?.find(({ dni }) => dni === params.dni) || {
        dni: "",
        name: "",
        surname: "",
        nick: "",
        telf: "",
        password: "",
        email: "",
      };
  
    return (
      <Form
        method="put"
        action={`/workers/${workerData.dni}`}
        className="flex flex-col rounded-lg bg-white-japan p-6 shadow-lg border border-gray-200"
        id="worker-form"
      >
        {workerData.dni && <input type="hidden" name="dni" value={workerData.dni} />}
        <h1 className="text-2xl font-bold text-red-japan mb-6">Edita Treballador</h1>
  
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
            defaultValue={workerData.dni}
            className="w-full rounded-md border border-gray-300 p-3 text-white-japan shadow-sm focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
            placeholder="DNI"
            disabled
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
            defaultValue={workerData.name}
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
            defaultValue={workerData.surname}
            maxLength={50}
            className="w-full rounded-md border border-gray-300 p-3 text-white-japan shadow-sm focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
            placeholder="Cognom"
          />
        </div>
  
        <div className="mb-4">
          <label
            htmlFor="nick"
            className="mb-2 block text-sm font-medium text-gray-600"
          >
            Nick
          </label>
          <input
            type="text"
            id="nick"
            name="nick"
            required
            defaultValue={workerData.nick}
            maxLength={50}
            className="w-full rounded-md border border-gray-300 p-3 text-white-japan shadow-sm focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
            placeholder="Nick"
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
            defaultValue={workerData.telf}
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
            defaultValue={workerData.email}
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
  
  export default WorkerForm;
  