// useAvailableWorkers.ts
import { useState, useEffect } from "react";

interface Worker {
  dni: string;
  name: string;
  surname: string;
}

const useAvailableWorkers = (token: string, selectedDate: string, selectedHour: string, selectedService: string) => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailableWorkers = async () => {
      if (selectedDate && selectedHour && selectedService) {
        try {
          if (!token) {
            throw new Error("No token found");
          }

          const response = await fetch(`http://localhost:8085/api/workers/available`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              date: selectedDate,
              hour: selectedHour,
              service_id: selectedService,
            }),
          });

          const data = await response.json();
          if (data.status) {
            setWorkers(data.workers);
          } else {
            setWorkers([]);
            setError(data.message || "Unknown error");
          }
        } catch (error) {
          setWorkers([]);
          setError("Error fetching workers: " + (error as Error).message);
        }
      }
    };

    fetchAvailableWorkers();
  }, [token, selectedDate, selectedHour, selectedService]);

  return { workers, error };
};

export default useAvailableWorkers;
