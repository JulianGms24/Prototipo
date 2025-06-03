var express = require('express');
var cors = require("cors");
var serverless = require('serverless-http');
var app = express();

var asistenciasRoutes = require("../../backend/routes/asistenciasroutes.js");

app.use(express.json());
app.use(cors());

var router = express.Router();
router.use("/asistencias", asistenciasRoutes);

app.use('/.netlify/functions', router);

exports.handler = serverless(app);
