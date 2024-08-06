import express from "express";
import cors from "cors";
import http from "http";
import { WebSocketServer } from "ws"; // Importar el servidor WebSocket

// Crear una aplicación Express
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server }); // Crear una instancia del servidor WebSocket

// Middleware para CORS y JSON
app.use(cors());
app.use(express.json());

// Almacenar el cliente WebSocket
let wsClient = null;

// Endpoint para encender/apagar el LED
app.post("/api/led/:state", (req, res) => {
  const state = req.params.state; // Obtener el estado del LED de la solicitud
  console.log(`Solicitud para cambiar estado del LED a: ${state}`);

  if (wsClient) {
    const message = state === "on" ? "1" : "0"; // Determinar el mensaje a enviar
    wsClient.send(message); // Envía el comando al ESP32
    res.status(200).send(`LED is turned ${state}`);
    console.log(`Mensaje enviado al ESP32: ${message}`);
  } else {
    res.status(500).send("WebSocket connection not established"); // Error si no hay conexión WebSocket
    console.error("WebSocket connection not established");
  }
});

// Configuración del WebSocket
wss.on("connection", (ws) => {
  wsClient = ws;
  console.log("Conexión WebSocket establecida");

  ws.on("message", (message) => {
    console.log(`Mensaje recibido del ESP32: ${message}`);
  });

  ws.on("close", () => {
    wsClient = null;
    console.log("Conexión WebSocket cerrada");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

// Usar el puerto proporcionado por Render
const PORT = process.env.PORT || 10000; // Asegúrate de que este puerto esté abierto y disponible
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
