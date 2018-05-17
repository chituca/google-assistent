'use strict';

const http = require('http');
const https = require('https');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const loterias = {
    Mega: 'Mega-Sena',
    Lotofacil: 'Lotofacil',
    Quina: 'Quina',
    Lotomania: 'Lotomania',
    Timemania: 'Timemania'
};

app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

app.use(bodyParser.json());

app.post("/caixaWebhook", function(req, res) {
    var loteriaSelecionada =
      req.body.queryResult &&
      req.body.queryResult.parameters &&
      req.body.queryResult.parameters.Loterias
        ? req.body.queryResult.parameters.Loterias
        : "Erro ao identificar a loteria";
    //var retorno = '';
    var options = getOptions(loteriaSelecionada);
    getLoteria(options, function(err, result) {
        if(err){
            throw new Error('Error ao acessar a API: ', err);
            reject();
       }
    
       return res.json({   
            "fulfillmentText": result,
            "fulfillmentMessages": [{
            "text": {"text":[result]}
            }],
            "source": "caixa.gov.br"
        });
             
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

/*var options = getOptions("Mega-Sena");
console.log(options);
/////------------------------------
console.log("//--------------------");

getLoteria(options, function(err, result) {
    if(err){
        throw new Error('Error ao acessar a API: ', err);
        reject();
    }
      
    console.log(result); 
});
///---------------------------------
*/
function formataReal(n) {
    var valor = parseFloat(n);
        n =  String(valor.toFixed(2)); 
    var v= n.replace(/\D/g,"").replace(/(\d{2})$/,",$1").replace(/(\d+)(\d{3},\d{2})$/g,"$1.$2");
    var qtdLoop = (v.length-3)/3;
    var count = 0;
    
    while (qtdLoop > count)
    
    {
    count++;
    v=v.replace(/(\d+)(\d{3}.*)/,"$1.$2"); 
    }
    return "R$ " + v;
    }
    
function formata_data(str) {
     var data_siopi = str.replace(/[^\d]+/g, '');
     return data_siopi.substr(6,2)+"/"+data_siopi.substr(4,2)+"/"+data_siopi.substr(0,4);
    }

app.listen(process.env.PORT || 8000, function() {
    console.log("Caixa server google assistente rodando!");
  });
