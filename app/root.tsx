import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let title = "An error occurred";
  let message = "Hi ha hagut un error. Prova de tornar a iniciar sessió o torna-ho a intentar més tard.";

  if (isRouteErrorResponse(error)) {
    title = error.statusText;
    message = error.data?.message || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center bg-black-japan">
        <div className="mb-6 w-full max-w-lg rounded-lg bg-white-japan p-4 text-red-japan">
        <h1 className="text-5xl">ERROR</h1>
          <p className="text-lg">{message}</p>
        </div>
        <Link
          to="/"
          className="rounded bg-white px-4 py-2 font-medium text-indigo-600 hover:bg-gray-200"
        >
          Tornar a l&apos;inici
        </Link>
      </main>
    </Layout>
  );
}



export default function App() {
  return <Outlet />;
}
