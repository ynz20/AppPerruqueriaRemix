import type { ActionFunctionArgs } from "@remix-run/node";
import { destroyUserSession } from "~/utils/sessionUtils";


export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    throw Response.json({ message: "Method not allowed" }, { status: 405 });
    return {};
  }

  return destroyUserSession(request);
}