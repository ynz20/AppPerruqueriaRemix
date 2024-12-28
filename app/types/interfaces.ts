export interface Client {
  dni: string;       // DNI del client
  name: string;      // Nom del client
  surname: string;   // Cognom del client
  telf: string;      // Telèfon del client
  email: string;     // Correu electrònic del client
}

export interface Service {
  id: number;        // Identificador del servei
  name: string;      // Nom del servei
  description: string; // Descripció del servei
  price: number;     // Preu del servei
}