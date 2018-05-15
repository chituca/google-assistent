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
// Get qual jogo
//let city = req.body.queryResult.parameters['geo-city']; 
// Get the date  (if present)
 /* let date = '';
  if (req.body.queryResult.parameters['date']) {
    date = req.body.queryResult.parameters['date'];
    console.log('Date: ' + date);
  }*/
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
 /* return res.json({   
          "fulfillmentText": "<speak>" + 
          "ok <break time=\"1s\"/>, os números sorteados foram: " +
          "06 <say-as interpret-as=\"cardinal\">12</say-as> <say-as interpret-as=\"cardinal\">22</say-as>"+
	        "<say-as interpret-as=\"cardinal\">28</say-as> <say-as interpret-as=\"cardinal\">31</say-as>"+
	        "<say-as interpret-as=\"cardinal\">44</say-as><break time=\"1s\"/>"+
	        "\n a estimativa de prêmio para o próximo concurso, " +
	        "em 12/05/2018, é de R$ 50.000.000,00, \n <break time=\"1s\"/>o valor acumulado para o próximo concurso é de R$ 44.786.421,27" + 
          "</speak>",
          "fulfillmentMessages": [{
            "text": {"text":["Assistente Virtual Caixa!"]}
          }

        ],
        "source": "caixa.gov.br"
  });*/
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
