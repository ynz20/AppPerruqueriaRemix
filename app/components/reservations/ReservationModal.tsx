import React, { useState } from "react";

interface ReservationModalProps {
  isOpen: boolean;
  reservation: any;
  onClose: () => void;
  refreshReservations: () => void; // Mètode per recarregar les reserves
  token: string; // Token d'autenticació
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  reservation,
  onClose,
  refreshReservations,
  token,
}) => {
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Estat per controlar si s'està enviant la petició

  if (!isOpen || !reservation) return null;

  // Reset dels camps i el missatge de error quan es tenca el modal
  const handleClose = () => {
    setShowRatingForm(false);
    setRating(0);
    setComment("");
    setErrorMessage("");
    setIsSubmitting(false); // Reset de l'estat d'enviament
    onClose();
  };


  async function deleteReservation(id: number, token:string) {
    console.log(id);
    const response = await fetch(`http://localhost:8085/api/reservations/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error(`Errorg3 ${response.status}: ${response.statusText}`);
    }
    refreshReservations(); // Recargar la llista de reserves
    handleClose(); // Tancar el modal
  }

  const updateReservationStatus = async (newStatus: string) => {
    const response = await fetch(
      `http://localhost:8085/api/reservations/${reservation.id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Enviar el token
        },
        body: JSON.stringify({ status: newStatus }), // Enviar el nou estat
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al actualitzar la reserva");
    }

    refreshReservations(); // Recargar la llista de reserves
    handleClose(); // Tancar el modal
  };

  const handleCompleteReservation = async () => {
    if (!rating || rating < 1 || rating > 5) {
      alert("Si us plau, proporciona una valoració entre 1 i 5.");
      return;
    }

    setIsSubmitting(true); // Marcar que la petició s'està enviant

    try {
      const response = await fetch(
        `http://localhost:8085/api/reservations/${reservation.id}/rate`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Enviar el token
          },
          body: JSON.stringify({ rating, comment }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al enviar la valoració");
      }

      await updateReservationStatus("completed");
    } catch (error: any) {
      console.error("Error al completar la reserva:", error.message);
      setErrorMessage(error.message || "Hi ha hagut un error inesperat.");
    } finally {
      setIsSubmitting(false); // Marcar que la petició ha acabat
    }
  };

  const isCompleted = reservation.status === "completed";
  const isCancelled = reservation.status === "cancelled";

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white-japan p-8 rounded-xl shadow-2xl max-w-md w-full border-2 border-red-japan">
        <h2 className="text-2xl font-bold text-red-japan mb-6 text-center">
          Detalls de la Reserva
        </h2>
        <div className="space-y-4">
          {/* Detalls de la reserva */}
          <p className="text-base text-gray-700">
            <strong className="font-semibold text-black-japan">ID Reserva:</strong>{" "}
            {reservation.id}
          </p>
          <p className="text-base text-gray-700">
            <strong className="font-semibold text-black-japan">Client:</strong>{" "}
            {reservation.clientName}
          </p>
          <p className="text-base text-gray-700">
            <strong className="font-semibold text-black-japan">Treballador:</strong>{" "}
            {reservation.userName}
          </p>
          <p className="text-base text-gray-700">
            <strong className="font-semibold text-black-japan">Hora:</strong>{" "}
            {reservation.hour}
          </p>
          <p className="text-base text-gray-700">
            <strong className="font-semibold text-black-japan">Servei:</strong>{" "}
            {reservation.service}
          </p>
          <p className="text-base text-gray-700">
            <strong className="font-semibold text-black-japan">Estat:</strong>{" "}
            {reservation.status}
          </p>
        </div>

        {/* Mostrar missatge d'error si no hi ha torn obert */}
        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}

        <div className="mt-6 space-y-4">
          <button
            onClick={handleClose} // Utilitzem handleClose per tancar el modal i resetar els estats
            className="w-full py-2 bg-gray-300 text-black-japan text-sm font-semibold rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
          >
            Tanca
          </button>

          {!isCompleted && !isCancelled && (
            <>
              <button
                onClick={() => deleteReservation(reservation.id, token)}

                className="w-full py-2 bg-red-japan text-white text-sm font-semibold rounded-lg hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-japan focus:ring-offset-2 transition-all duration-200"
              >
                Cancel·lar Reserva
              </button>

              {/* Formulari de valoració */}
              {showRatingForm && (
                <div className="space-y-4">
                  <label
                    htmlFor="rating"
                    className="text-red-japan block font-semibold mb-2"
                  >
                    Valoració:
                  </label>
                  <input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={rating || ''}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Puntua de 1 a 5"
                  />
                  <label
                    htmlFor="comment"
                    className="text-red-japan block font-semibold mb-2"
                  >
                    Comentari:
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={4}
                  />
                </div>
              )}

              <button
                onClick={() =>
                  showRatingForm ? handleCompleteReservation() : setShowRatingForm(true)
                }
                className="w-full py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-offset-2 transition-all duration-200"
                disabled={isSubmitting} // Deshabilitar el botó mentre s'envia la petició
              >
                {isSubmitting
                  ? "Enviant..."
                  : showRatingForm
                  ? "Envia Valoració"
                  : "Completa Reserva"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
