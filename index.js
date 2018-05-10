"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/caixaWebhook", function(req, res) {
  var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.jogo
      ? req.body.queryResult.parameters.jogo
      : "Tivemos algum problema, pode repetir, por favor?";
  return res.json({   
          "fulfillmentText": "Caixa Response",
          "fulfillmentMessages": [{
            "text": {"text":["teste google Caixa"]}
          }

        ],
        "source": "caixa.gov.br"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
