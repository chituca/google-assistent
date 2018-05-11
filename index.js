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
          "fulfillmentText": "<speak>" + 
          "ok <break time=\"1s\"/>, os números sorteados foram: " +
          "06 <say-as interpret-as=\"cardinal\">12</say-as> <say-as interpret-as=\"cardinal\">22</say-as>"+
	  "<say-as interpret-as=\"cardinal\">28</say-as> <say-as interpret-as=\"cardinal\">31</say-as>"+
	  "<say-as interpret-as=\"cardinal\">44</say-as><break time=\"1s\"/>"+
	  "\n a estimativa de prêmio para o próximo concurso," +
	  "em 12/05/2018, é de R$ 50.000.000,00, \n <break time=\"1s\"/>o valor acumulado para o próximo concurso é de R$ 44.786.421,27" + 
          "</speak>",
          "fulfillmentMessages": [{
            "text": {"text":["agora esse?"+" mesmo"]}
          }

        ],
        "source": "caixa.gov.br"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
