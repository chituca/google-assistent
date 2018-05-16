'use strict';

const http = require('http');
const https = require('https');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var megaSena = '';

app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

app.use(bodyParser.json());

app.post("/caixaWebhook", function(req, res) {
    var jogo =
      req.body.queryResult &&
      req.body.queryResult.parameters &&
      req.body.queryResult.parameters.jogo
        ? req.body.queryResult.parameters.jogo
        : "Erro";
        if(jogo === "Mega-Sena"){
            var options = getOptions(jogo);
            
            getLoteria(options, function(err, result){
                if(err){
                    return console.log('Error ao acessar a API: ', err);
                    reject();
                }
                //console.log(result);
                //console.log();
                megaSena = "<speak>" + 
                "ok <break time=\"1s\"/>, os números sorteados para "+jogo+",<break time=\"1s\"/> concurso "+
                result.resultado.concurso+" foram: <break time=\"1s\"/>" +
                "06 <say-as interpret-as=\"cardinal\">12</say-as> <say-as interpret-as=\"cardinal\">22</say-as>"+
                "<say-as interpret-as=\"cardinal\">28</say-as> <say-as interpret-as=\"cardinal\">31</say-as>"+
                "<say-as interpret-as=\"cardinal\">44</say-as><break time=\"1s\"/>"+
                "\n a estimativa de prêmio para o próximo concurso, " +
                "em 12/05/2018, é de R$ 50.000.000,00, \n <break time=\"1s\"/>o valor acumulado para o próximo concurso é de R$ 44.786.421,27" + 
                "</speak>";
            });
           
        }
    return res.json({   
            "fulfillmentText": megaSena,
            "fulfillmentMessages": [{
              "text": {"text":[megaSena]}
            }
  
          ],
          "source": "caixa.gov.br"
    });
  });

function getLoteria(options, cb){

    https.request(options, function(res){
        var body = '';
    
        res.on('data', function(chunk){
            body +=chunk;
        });
    
        res.on('end', function(){
            var result = JSON.parse(body);
            cb(null, result);
        });
        res.on('error', cb);
    })
    .on('err', cb)
    .end();
}

//*** Chama API de Loterias ***//
function getOptions(jogo){
    var options = {
    host: 'api.caixa.gov.br',
    port: 8443,
    path: '/loterias/v2/resultados/'+jogo+'?concurso=',
    method: 'GET',
    rejectUnauthorized: false
    };
    return options;
}

app.listen(process.env.PORT || 8000, function() {
    console.log("Caixa server google assistente rodando!");
  });
