import { Outlet, Link } from "@remix-run/react";

export default function Layout() {
  return (
    <div className="flex h-screen">
      {/* BARRA DE NAVEGACIÓ lateral amb links de prova*/}
      <nav className="w-1/5 bg-gray-800 text-white flex flex-col items-center justify-center">
        <ul className="space-y-6">
          <li>
            <Link
              to="/"
              className="text-lg font-semibold hover:text-indigo-400 transition"
            >
              Inici
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-lg font-semibold hover:text-indigo-400 transition"
            >
              Inicia sessió
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="text-lg font-semibold hover:text-indigo-400 transition"
            >
              Registre
            </Link>
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
