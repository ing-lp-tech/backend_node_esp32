import express from "express";
import cors from "cors";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

let wsClient = null;

app.post("/api/led/:state", (req, res) => {
  const state = req.params.state;
  console.log(`Solicitud para cambiar estado del LED a: ${state}`);

  if (wsClient) {
    const message = state === "on" ? "1" : "0";
    wsClient.send(message);
    res.status(200).send(`LED is turned ${state}`);
    console.log(`Mensaje enviado al ESP32: ${message}`);
  } else {
    res.status(500).send("WebSocket connection not established");
    console.error("WebSocket connection not established");
  }
});

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

const PORT = 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
