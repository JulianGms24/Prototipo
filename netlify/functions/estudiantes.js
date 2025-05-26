const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const rutasEstudiantes = require("../../backend/routes/estudiantes");
app.use("/.netlify/functions/estudiantes", rutasEstudiantes);

module.exports.handler = serverless(app);
