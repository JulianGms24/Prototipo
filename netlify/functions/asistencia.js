const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const rutasAsistencias = require("../../backend/routes/asistencias");
app.use("/.netlify/functions/asistencias", rutasAsistencias);

module.exports.handler = serverless(app);
