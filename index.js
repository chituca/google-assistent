const http = require('http');
const express = require("express");
const bodyParser = require("body-parser");
const restService = express();
const host = 'viacep.com.br';
const wwoApiKey = '';

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
var jogo = '01001000';
//*** chama API de loterias ***//
  getLoterias(jogo).then((output) => {
    res.json({ 'fulfillmentText': output,
    "fulfillmentMessages": [{
        "text": {"text":["Assistente Virtual Caixa!"]}
      }
    ],
    "source": "caixa.gov.br" }); // Return the results of the weather API to Dialogflow
  }).catch(() => {
    res.json({ 'fulfillmentText': `I don't know the weather but I hope it's good!` });
  });
});

function getLoterias (jogo) {
  return new Promise((resolve, reject) => {
    // Cria o path para HTTP request 
    let path = '/ws/' + jogo + 'json/';
    console.log('API Request: ' + host + path);

    // Make the HTTP request to get jogo
    http.get({host: host, path: path}, (res) => {
      let body = ''; // var to store the response chunks
      res.on('data', (d) => { body += d; }); // store each response chunk
      res.on('end', () => {
        // After all the data has been received parse the JSON for desired data
        let response = JSON.parse(body);
        let cep = response['cep'];
        let location = response['localidade'];
        let conditions = response['ibge'];
        let currentConditions = response['bairro'];

        // Create response
        let output = `dados da consulta de CEP ${cep} ,
        ${location} - ${currentConditions} ${currentConditions}.`;

        // Resolve the promise with the output text
        console.log(output);
        resolve(output);
      });
      res.on('error', (error) => {
        console.log(`Error ao chamar API de loterias: ${error}`)
        reject();
      });
    });

  });
}
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
