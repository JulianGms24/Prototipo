var express = require('express');
var cors = require("cors");
var serverless = require('serverless-http');
var app = express();

var estudiantesroutes = require("../../BackEnd/routes/estudiantesroute.js");

app.use(express.json());
app.use(cors());

var router = express.Router();
router.use("/estudiantes", estudiantesroutes);

app.use('/.netlify/functions', router);

exports.handler = serverless(app);
