import { redirect, useNavigate } from "@remix-run/react";
import Modal from "../components/utils/Modal";
import WorkerForm from "~/components/workers/WorkerForm";
import { updateWorker } from "~/data/worker.server";
import { getTokenFromRequest } from "~/utils/sessionUtils";

export default function WorkerEditPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <WorkerForm />
    </Modal>
  );
}

export async function action({ request }) {
  const token = await getTokenFromRequest(request) as string;

  if (request.method === "PUT") {
    const formData = await request.formData();
    const workerData = {
      dni: formData.get("dni"),
      name: formData.get("name"),
      surname: formData.get("surname"),
      nick: formData.get("nick"),
      telf: formData.get("telf"),
      email: formData.get("email"),
    };

    const message = await updateWorker(workerData, token);
    if (message){
      const error = message;
      return {error};
    }
  }

  return redirect("/workers");
}
