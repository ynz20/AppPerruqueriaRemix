import { Form, Link, useMatches, useNavigation, useParams } from "@remix-run/react";
import React from "react";
import { ActionData, Client } from "~/types/interfaces";

const ClientsForm: React.FC<ActionData> = ({ error }) => {
  const navigation = useNavigation(); // Obtenir l'estat de navegació actual
  const isSubmitting = navigation.state !== "idle"; // Verificar si s'està enviant el formulari
  const params = useParams(); // Obtenir els paràmetres de la ruta
  const matches = useMatches(); // Obtenir les dades carregades per altres rutes

  // Cercar la ruta actual que conté la informació dels clients
  const matchedRoute = matches.find((match) => match.id === "routes/_app.clients");

  // Obtenir la llista de clients des de les dades de la ruta coincident
  const clients = (matchedRoute?.data as { clients: Client[] } | undefined)?.clients;

  // Cercar les dades del client si estem en mode editar, o utilitzar valors buits per afegir un nou client
  const clientData = clients?.find(({ dni }) => dni === params.dni) || {
    dni: "",
    name: "",
    surname: "",
    telf: "",
    email: "",
  };

  return (
    <Form
      method={clientData.dni ? "put" : "post"} // Seleccionar mètode HTTP segons si estem editant o afegint
      action={clientData.dni ? `/clients/${clientData.dni}` : "/clients/add"} // Definir l'acció segons el context
      className="flex flex-col rounded-lg bg-white-japan p-6 shadow-md"
      id="clients-form"
    >
      {/* Camp ocult per enviar el DNI en mode edició */}
      {clientData.dni && (
        <input type="hidden" name="dni" value={clientData.dni} />
      )}
      <h1 className="text-2xl font-bold text-red-japan mb-6">
        {clientData.dni ? "Edita Client" : "Afegeix Client"} {/* Títol segons el mode */}
      </h1>
      {/* Mostrar missatge d'error si existeix */}
      {error ? <p className="text-red-500 text-sm">{error}</p> : null}

      {/* Camps del formulari */}
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
          defaultValue={clientData.dni} // Valor per defecte
          maxLength={9}
          disabled={!!clientData.dni} // Deshabilitat en mode edició
          className="w-full rounded-md border border-gray-300 p-3 text-white-japan shadow-sm focus:border-red-japan focus:outline-none focus:ring-2 focus:ring-red-japan"
          placeholder="DNI"
        />
      </div>

      {/* Camps per al nom, cognom, telèfon i correu electrònic */}
      <div className="mb-4">
        <label
          htmlFor="name"
          className="mb-2 block font-semibold text-gray-600"
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
          className="w-full rounded-md border border-gray-300 text-white-japan p-2 focus:border-red-japan  focus:outline-none focus:ring-2 focus:ring-red-japan"
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
          pattern="[0-9]{9,}" // Validació de telèfon amb mínim 9 dígits
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

      {/* Botons per desar o cancel·lar */}
      <div className="flex items-center justify-between mt-6">
        <button
          type="submit"
          disabled={isSubmitting} // Deshabilitat mentre s'envia el formulari
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
