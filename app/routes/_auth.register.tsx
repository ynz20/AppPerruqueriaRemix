import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { userFormValidator } from "~/data/validacio.server";
import { register } from "~/data/worker.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  // Crear objecte amb les dades del formulari
  const data = {
    dni: formData.get("dni") as string,
    name: formData.get("name") as string,
    surname: formData.get("surname") as string,
    nick: formData.get("nick") as string,
    telf: formData.get("telf") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    password_confirmation: formData.get("password") as string,
    role: false,
  };

  // Validar les dades del formulari
  const { valid, errors } = userFormValidator(data);
  if (!valid) {
    return { errors }; // Retornar els errors al frontend
  }

  try {
    // Enviar les dades al servidor per registrar l'usuari
    const resultat = await register(data);

    // Comprovar possibles errors específics del backend (DNI, nick, correu i telèfon que siguin únics)
    if (resultat.id == 1) {
      errors.dni = resultat.message;
      return { errors };
    } else if (resultat.id == 2) {
      errors.nick = resultat.message;
      return { errors };
    } else if (resultat.id == 3) {
      errors.email = resultat.message;
      return { errors };
    } else if (resultat.id == 4) {
      errors.telf = resultat.message;
      return { errors };
    }

    // Redirigir a la pàgina de login si el registre és correcte
    return redirect("/login");
  } catch (error) {
    // Capturar errors del servidor i enviar un missatge genèric
    return json(
      { error: "Error del servidor. Torna-ho a intentar més tard." },
      { status: 500 }
    );
  }
};

export default function Register() {
  const actionData = useActionData<{ errors?: Record<string, string> }>();

  return (
    <>
      <head>
        <title>Registra&apos;t!</title>
      </head>
      <div className="flex min-h-screen overflow-hidden">
        {/* Menú Lateral: ocult a pantalles petites */}
        <div className="hidden md:flex w-1/3 bg-black-japan text-yellow-japan flex-col items-center justify-center">
          <div className="text-center px-6">
            <img
              src="../../public/haircutLogo.png"
              alt="Icono"
              className="mb-6 w-20 h-20"
            />
            <h1 className="text-4xl font-bold mb-2">Registra’t</h1>
            <h2 className="text-2xl">per accedir a tots els serveis!</h2>
          </div>
        </div>

        {/* Formulari de registre */}
        <div className="w-full md:w-2/3 bg-[#faf8e8] flex flex-col items-center justify-center">
          <div className="w-3/4 max-w-lg p-8">
            <h1 className="text-3xl font-bold text-red-japan text-center mb-6">
              Benvingut/da!
            </h1>
            <Form method="post">
              <div className="space-y-2">
                {/* Camps del formulari amb validació */}
                {actionData?.errors?.nick && (
                  <p className="text-red-500 text-sm">
                    {actionData.errors.nick}
                  </p>
                )}
                <input
                  type="text"
                  id="nick"
                  name="nick"
                  placeholder="Nom d’usuari"
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-yellow-500 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {actionData?.errors?.name && (
                  <p className="text-red-500 text-sm">
                    {actionData.errors.name}
                  </p>
                )}
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nom"
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-yellow-500 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {actionData?.errors?.surname && (
                  <p className="text-red-500 text-sm">
                    {actionData.errors.surname}
                  </p>
                )}
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  placeholder="Cognom"
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-yellow-500 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {actionData?.errors?.dni && (
                  <p className="text-red-500 text-sm">
                    {actionData.errors.dni}
                  </p>
                )}
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  placeholder="DNI"
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-yellow-500 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {actionData?.errors?.telf && (
                  <p className="text-red-500 text-sm">
                    {actionData.errors.telf}
                  </p>
                )}
                <input
                  type="tel"
                  id="telf"
                  name="telf"
                  placeholder="Telèfon"
                  required
                  pattern="[0-9]{9}"
                  title="Introdueix un número de telèfon vàlid (9 dígits)."
                  className="w-full px-4 py-3 bg-gray-800 text-yellow-500 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {actionData?.errors?.email && (
                  <p className="text-red-500 text-sm">
                    {actionData.errors.email}
                  </p>
                )}
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Correu"
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-yellow-500 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {actionData?.errors?.password && (
                  <p className="text-red-500 text-sm">
                    {actionData.errors.password}
                  </p>
                )}
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Contrasenya"
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-yellow-500 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="text-center mt-6">
                <p className="text-sm text-black mb-4">
                  Ja tens compte?{" "}
                  <a href="/login" className="text-red-japan underline">
                    Accedir-hi
                  </a>
                </p>
                <button
                  type="submit"
                  className="w-full py-3 bg-gray-900 text-white font-semibold rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Registrar-se
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
