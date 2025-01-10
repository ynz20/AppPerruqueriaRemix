import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import WorkersList from "~/components/workers/WorkersList";
import { getWorkers } from "~/data/worker.server";
import { User } from "~/types/interfaces";
import { getTokenFromRequest } from "~/utils/sessionUtils";

export const loader: LoaderFunction = async ({ request }) => {
  const token = await getTokenFromRequest(request);

  if (!token) {
    throw new Response("Inicia sessió per accedir.", { status: 401 });
  }

  const workers = await getWorkers(token);

  return workers;
};

export default function WorkersPage() {
  const { users } = useLoaderData<{ users: User[] }>();
  return (
    <>
      <Outlet />
      <main>
        <section>
          <h1 className="text-2xl font-bold mb-4 text-black">
            Gestió de Treballadors
          </h1>
        </section>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-black">
            Llista de Treballadors
          </h1>
          <WorkersList workers={users} />
        </div>
      </main>
    </>
  );
}
