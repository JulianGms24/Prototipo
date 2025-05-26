const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const rutasAsignaturas = require("../../backend/routes/asignaturas");
app.use("/.netlify/functions/asignaturas", rutasAsignaturas);

module.exports.handler = serverless(app);
