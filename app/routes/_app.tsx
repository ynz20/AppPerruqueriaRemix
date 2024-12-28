import { Outlet, Link, Form, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { getUserRoleFromRequest } from "~/utils/sessionUtils";

// Loader per obtenir el rol de l'usuari
export const loader: LoaderFunction = async ({ request }) => {
  const role = await getUserRoleFromRequest(request);
  return { role };
};

export default function Layout() {
  const { role } = useLoaderData<{ role: number | null }>();

  return (
    <div className="flex h-screen">
      {/* BARRA DE NAVEGACIÓ lateral amb links */} 
      <nav className="w-1/5 bg-gray-800 text-white flex flex-col items-center justify-center">
        <ul className="space-y-6">
          {role === 0 && (
            <>
              <li>
                <Link
                  to="/reservations"
                  className="text-lg font-semibold hover:text-indigo-400 transition"
                >
                  Reserves
                </Link>
              </li>
              <li>
                <Link
                  to="/clients"
                  className="text-lg font-semibold hover:text-indigo-400 transition"
                >
                  Clients
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-lg font-semibold hover:text-indigo-400 transition"
                >
                  El meu perfil
                </Link>
              </li>
            </>
          )}
          {role === 1 && (
            <>
              <li>
                <Link
                  to="/reservations"
                  className="text-lg font-semibold hover:text-indigo-400 transition"
                >
                  Reserves
                </Link>
              </li>
              <li>
                <Link
                  to="/clients"
                  className="text-lg font-semibold hover:text-indigo-400 transition"
                >
                  Clients
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-lg font-semibold hover:text-indigo-400 transition"
                >
                  Serveis
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="text-lg font-semibold hover:text-indigo-400 transition"
                >
                  Historial de reserves
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-lg font-semibold hover:text-indigo-400 transition"
                >
                  El meu perfil
                </Link>
              </li>
            </>
          )}
          <li>
            {/* Formulari de logout */}
            <Form method="post" action="/logout">
              <button
                type="submit"
                className="text-lg text-red-500 font-semibold hover:text-red-400 transition"
              >
                {role === 0 ? "Tanca sessió" : "Sortir"}
              </button>
            </Form>
          </li>
        </ul>
      </nav>

      {/* Contingut principal */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}
