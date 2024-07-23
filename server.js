import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

// Reemplaza con la IP local de tu ESP32
const ESP32_IP = "http://myesp32.loca.lt";

// Permitir CORS desde el dominio de tu frontend en Netlify
app.use(
  cors({
    origin: "https://esp32-led.netlify.app", // Reemplaza con tu dominio de Netlify
  })
);

app.get("/api/led/:state", async (req, res) => {
  const state = req.params.state;
  console.log(`Received request to turn ${state} the LED`);

  try {
    const response = await fetch(`${ESP32_IP}/?led=${state}`);
    const text = await response.text();
    console.log(`Response from ESP32: ${text}`);
    res.send(text);
  } catch (error) {
    console.error("Error communicating with ESP32:", error.message);
    res.status(500).send("Error communicating with ESP32: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

/* import express from "express";
import fetch from "node-fetch";

const app = express();
//const ESP32_IP = "http://192.168.1.45";  // Reemplaza con la IP de tu ESP32
const ESP32_IP = "http://192.168.0.91";

app.use(express.json());

app.get("/api/led/:state", async (req, res) => {
  const state = req.params.state;
  try {
    const response = await fetch(`${ESP32_IP}/?led=${state}`);
    const data = await response.text();
    res.send(data);
  } catch (error) {
    res.status(500).send("Error controlling LED");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
}); */

/* const express = require("express");
const app = express();
const fetch = require("node-fetch"); */

/* const ESP32_IP = "http://192.168.1.45"; */ // Reemplaza con la IP de tu ESP32

/* const ESP32_IP = "http://192.168.0.89";

app.use(express.json());

app.get("/api/led/:state", async (req, res) => {
  const state = req.params.state;
  try {
    const response = await fetch(`${ESP32_IP}/?led=${state}`);
    const data = await response.text();
    res.send(data);
  } catch (error) {
    res.status(500).send("Error controlling LED");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
 */
