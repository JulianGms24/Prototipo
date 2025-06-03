var express = require('express');
var cors = require("cors");
var serverless = require('serverless-http');
var app = express();

var departamentosroutes = require("../../BackEnd/routes/departamentoroute.js");

app.use(express.json());
app.use(cors());

var router = express.Router();
router.use("/departamentos", departamentosroutes);

app.use('/.netlify/functions', router);

exports.handler = serverless(app);
