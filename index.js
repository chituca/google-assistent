'use strict';

const http = require('http');
const https = require('https');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const loterias = {
    Mega: "Mega-Sena",
    Lotofacil: "Lotofacil",
    Quina: "Quina",
    Lotomania: "Lotomania",
    Timemania: "Timemania"
}

app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

app.use(bodyParser.json());

app.post("/caixaWebhook", function(req, res) {
    var loteriaSelecionada = req.body.queryResult.parameters.Loterias;
    let options = getOptions(loteriaSelecionada);
    let resultado = loteriaSelecionada;
        getLoteria(options, function(err, result){
            if(err){
                throw new Error('Error ao acessar a API: ', err);
                reject();
            }
            switch(resultado) {
                case loterias.Mega:
                     loteriaSelecionada = 'agora é Mega-Sena...';
                     break;

                case loterias.Lotofacil:
                    loteriaSelecionada = "agora é Lotofacil...2";
                    break;

                case loterias.Quina:
                    loteriaSelecionada = "agora é Quina ...3";
                    break;

                case loterias.Lotomania:
                    loteriaSelecionada = "agora é Lotomania...4";
                    break;

                case loterias.Timemania:
                    loteriaSelecionada = "agora é Timemania...5";
                    break;

                default:
                    loteriaSelecionada = "loteria não localizada";
                
                }
            });
       
    return res.json({   
            "fulfillmentText": "não sei mais..."+loteriaSelecionada,
            "fulfillmentMessages": [{
              "text": {"text":["não entendo..." +loteriaSelecionada]}
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
