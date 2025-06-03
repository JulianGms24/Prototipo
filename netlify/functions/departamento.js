var express = require('express');
var cors = require("cors");
var serverless = require('serverless-http');
var app = express();

var departamentosRoutes = require("../../backend/routes/departamentosroutes.js");

app.use(express.json());
app.use(cors());

var router = express.Router();
router.use("/departamentos", departamentosRoutes);

app.use('/.netlify/functions', router);

exports.handler = serverless(app);
