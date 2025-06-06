var express = require('express');
var cors = require("cors");
var serverless = require('serverless-http');
var app = express();

var asignaturasroutes = require("../../BackEnd/routes/asignaturaroute.js");

app.use(express.json());
app.use(cors());

var router = express.Router();
router.use("/asignaturas", asignaturasroutes);

app.use('/.netlify/functions', router);

exports.handler = serverless(app);
