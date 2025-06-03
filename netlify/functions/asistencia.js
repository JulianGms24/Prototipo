var express = require('express');
var cors = require("cors");
var serverless = require('serverless-http');
var app = express();

var asistenciasroutes = require("../../BackEnd/routes/asistenciaroute.js");

app.use(express.json());
app.use(cors());

var router = express.Router();
router.use("/asistencias", asistenciasroutes);

app.use('/.netlify/functions', router);

exports.handler = serverless(app);
