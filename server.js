/* import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

const ESP32_IP = '"http://myesp32.loca.lt"'; // Asegúrate de reemplazar esto con la URL correcta

app.use(cors()); // Habilitar CORS para todas las rutas

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/api/led/:state", async (req, res) => {
  const state = req.params.state;
  let url = `${ESP32_IP}/?led=${state}`;

  try {
    console.log(`Sending request to ESP32: ${url}`);
    const response = await fetch(url);
    const data = await response.text();
    console.log(`Response from ESP32: ${response.status}`);
    res.send(`ESP32 responded with: ${data}`);
  } catch (error) {
    console.error("Error communicating with ESP32:", error);
    res.status(500).send("Error communicating with ESP32");
  }
}); */

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

/* import express from "express";

import bodyParser from "body-parser";
import mqtt from "mqtt";

const app = express();
const port = process.env.PORT || 3000;


const MQTT_SERVER = "mqtt://192.168.1.100";
const MQTT_TOPIC = "esp32/led";


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const client = mqtt.connect(MQTT_SERVER);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
});

app.post("/api/led/:state", (req, res) => {
  const ledState = req.params.state;
  console.log(`Received request to turn ${ledState} the LED`);
  client.publish(MQTT_TOPIC, ledState, (err) => {
    if (err) {
      console.error("Error publishing message:", err);
      return res.status(500).send("Error communicating with ESP32");
    }
    res.status(200).send(`LED is turned ${ledState}`);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
 */

import express from "express";
import bodyParser from "body-parser";
import mqtt from "mqtt";
import cors from "cors";
const app = express();

const port = process.env.PORT || 10000;

const MQTT_SERVER = "mqtt://192.168.1.100"; // Cambia a la dirección IP de tu servidor MQTT
const MQTT_TOPIC = "esp32/led";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = mqtt.connect(MQTT_SERVER);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
});

app.post("/api/led/:state", (req, res) => {
  const ledState = req.params.state;
  console.log(`Received request to turn ${ledState} the LED`);
  client.publish(MQTT_TOPIC, ledState, (err) => {
    if (err) {
      console.error("Error publishing message:", err);
      return res.status(500).send("Error communicating with ESP32");
    }
    res.status(200).send(`LED is turned ${ledState}`);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
