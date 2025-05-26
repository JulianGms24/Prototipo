const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const rutasDepartamentos = require("../../backend/routes/departamentos");
app.use("/.netlify/functions/departamentos", rutasDepartamentos);

module.exports.handler = serverless(app);
