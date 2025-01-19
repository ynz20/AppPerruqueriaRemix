import { Outlet, Link, Form, useLoaderData, useNavigation } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import { getUserRoleFromRequest } from "~/utils/sessionUtils";

// Loader per obtenir el rol del usuari
export const loader: LoaderFunction = async ({ request }) => {
  const role = await getUserRoleFromRequest(request);
  return { role };
};

export default function Layout() {
  const { role } = useLoaderData<{ role: number | null }>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation();

  // Estat per controlar la càrrega
  const [isLoading, setIsLoading] = useState(false);

  // Detecta quan la navegació comença i acaba
  useEffect(() => {
    if (navigation.state !== "idle") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [navigation.state]);

  return (
    <div className="h-screen flex">
      {/* Overlay per al menú lateral en pantalles petites */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Menú lateral */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-black-japan text-white-japan transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:w-64 transition-transform duration-300 ease-in-out z-50 flex flex-col items-start justify-center p-5`}
      >
        <ul className="space-y-6 w-full text-left">
          {role === 0 && (
            <>
              <li className="pl-4">
                <Link
                  to="/reservations"
                  className="text-lg font-semibold hover:text-yellow-japan transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reserves
                </Link>
              </li>
              <li className="pl-4">
                <Link
                  to="/clients"
                  className="text-lg font-semibold hover:text-yellow-japan transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Clients
                </Link>
              </li>
              <li className="pl-4">
                <Link
                  to="/products"
                  className="text-lg font-semibold hover:text-yellow-japan transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Productes
                </Link>
              </li>
              <li className="pl-4">
                <Link
                  to="/profile"
                  className="text-lg font-semibold hover:text-yellow-japan transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  El meu perfil
                </Link>
              </li>
            </>
          )}
          {role === 1 && (
            <>
              <li className="pl-4">
                <Link
                  to="/reservations"
                  className="text-lg font-semibold hover:text-yellow-japan transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reserves
                </Link>
              </li>
              <li className="pl-4">
                <Link
                  to="/clients"
                  className="text-lg font-semibold hover:text-yellow-japan transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Clients
                </Link>
              </li>
              <li className="pl-4">
                <Link
                  to="/products"
                  className="text-lg font-semibold hover:text-yellow-japan transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Productes
                </Link>
              </li>
              <li className="pl-4">
                <Link
                  to="/services"
                  className="text-lg font-semibold hover:text-yellow-japan transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Serveis
                </Link>
              </li>
              <li className="pl-4">
                <Link
                  to="/workers"
                  className="text-lg font-semibold hover:text-yellow-japan transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Treballadors
                </Link>
              </li>
              <li className="pl-4">
                <Link
                  to="/history"
                  className="text-lg font-semibold hover:text-yellow-japan transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Torns
                </Link>
              </li>
              <li className="pl-4">
                <Link
                  to="/profile"
                  className="text-lg font-semibold hover:text-yellow-japan transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  El meu perfil
                </Link>
              </li>
            </>
          )}
          <li className="pl-4">
            <Form method="post" action="/logout">
              <button
                type="submit"
                className="text-lg text-yellow-japan font-semibold hover:text-red-japan transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {role === 0 ? "Tanca sessió" : "Sortir"}
              </button>
            </Form>
          </li>
        </ul>
      </nav>

      {/* Botó de menú hamburguesa */}
      <button
        className="lg:hidden fixed top-4 left-4 text-black-japan z-50 mt-8"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* Rodeta de càrrega */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="loader border-t-4 border-b-4 border-yellow-japan rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}

      {/* Contingut principal */}
      <main className="flex-1 bg-white-japan p-6 lg:ml-0">
        <Outlet />
      </main>
    </div>
  );
}
