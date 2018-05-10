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
          "fulfillmentText": "06 25 26 35 38 40 \n Estimativa de prêmio do próximo concurso, em 10/05/2018, é de R$ 30.000.000,00 \n Acumulado para o próximo concurso R$ 26.744.923,97",
          "fulfillmentMessages": [{
            "text": {"text":["06 25 26 35 38 40 \n Estimativa de prêmio do próximo concurso, em 10/05/2018, é de R$ 30.000.000,00 \n Acumulado para o próximo concurso R$ 26.744.923,97"]}
          }

        ],
        "source": "caixa.gov.br"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
