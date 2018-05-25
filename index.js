'use strict';
var lot = require("./loterias");
var util = require("./util");
var config = require('./config');
const http = require('http');
const https = require('https');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

app.use(bodyParser.json());

app.post("/caixaWebhook", function(req, res) {
    var retorno;
    var loteriaSelecionada =
      req.body.queryResult &&
      req.body.queryResult.parameters &&
      req.body.queryResult.parameters.Loterias
        ? req.body.queryResult.parameters.Loterias
        : "Erro ao identificar a loteria";
    var concurso =
        req.body.queryResult &&
        req.body.queryResult.parameters &&
        req.body.queryResult.parameters.concurso
          ? req.body.queryResult.parameters.concurso
          : '';
    if(Number.isInteger(concurso) || ''){
        var options = getOptions(loteriaSelecionada,concurso);
    } else{
        retorno = "o número do concurso informado não é um número válido, refaça a pergunta, por favor."
        return  {"fulfillmentText": retorno,
                "fulfillmentMessages": [{
                "text": {"text":[retorno]}
                }],
                "source": "caixa.gov.br"}
    }
    
    
    getLoteria(options, function(err, result) {
        if(err){
            throw new Error('Error ao acessar a API: ', err);
            reject();
        }
       
       switch(loteriaSelecionada){
            case config.loterias.Mega:
                retorno = lot.getMegaSena(result);
                break; 
            case config.loterias.Quina:      
                retorno = lot.getQuina(result);
                break;
            case config.loterias.Lotofacil:      
                retorno = lot.getLotofacil(result);
                break;
            case config.loterias.Lotomania:      
                retorno = lot.getLotomania(result);
                break;
            case config.loterias.Timemania:      
                retorno = lot.getTimemania(result);
                break;
            case config.loterias.Dupla:      
                retorno = lot.getDuplaSena(result);
                break;
            case config.loterias.Federal:      
                retorno = lot.getFederal(result);
                break;
            default:
                retorno = "Loteria não localizada."
        }
       return res.json({   
            "fulfillmentText": retorno,
            "fulfillmentMessages": [{
            "text": {"text":[retorno]}
            }],
            "source": "caixa.gov.br"
        });
             
    });
   
  });

//*** Chama API de Loterias ***//
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

//*** define parâmetros da API ***//
function getOptions(jogo,concurso){
    var options = {
    host: config.host.gateway,
    port: 8443,
    path: config.host.pathLoterias+jogo+config.host.queryLoterias+concurso,
    method: 'GET',
    rejectUnauthorized: false
    };
    return options;
}

app.listen(process.env.PORT || 8000, function() {
    console.log("Caixa server google assistente rodando!");
  });
