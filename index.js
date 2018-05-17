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
       //--------
       let retorno;
       let concurso = result.resultado.concurso;
       let ganhadores = result.resultado.ganhadores;
       let sorteados = result.resultado.resultado.split('-').sort();
       let dataSorteio = formata_data(result.resultado.data);
       let dataProximo = formata_data(result.resultado.DT_PROXIMO_CONCURSO);
       let cabecalho = "<speak>ok <break time=\"1s\"/>, para o concurso "+concurso+" foram sorteados: " +
       "<say-as interpret-as=\"cardinal\">"+sorteados[0]+"</say-as>,"+
       "<say-as interpret-as=\"cardinal\">"+sorteados[1]+"</say-as>,"+
       "<say-as interpret-as=\"cardinal\">"+sorteados[2]+"</say-as>,"+
       "<say-as interpret-as=\"cardinal\">"+sorteados[3]+"</say-as>,"+
       "<say-as interpret-as=\"cardinal\">"+sorteados[4]+"</say-as> e"+
       "<say-as interpret-as=\"cardinal\">"+sorteados[5]+"</say-as>,";

       if(ganhadores === 0) {
           var estimativa = formataReal(result.resultado.VR_ESTIMATIVA);
           var acumulado = formataReal(result.resultado.valor_acumulado1);
           retorno = cabecalho+"<break time=\"1s\"/>o prêmio acumulou e a estimativa para o próximo concurso, em "+dataProximo+
           ", é de "+ estimativa + " <break time=\"1s\"/>, o valor acumulado para o próximo concurso é de "+acumulado+".</speak>";
       
           } else {
           var premio = formataReal(result.resultado.valor);
           var apostasTexto = '';
               if(ganhadores > 1){
                   apostasTexto = "apostas foram premiadas";
               } else {
                   apostasTexto = "aposta foi premiada";
               }
           retorno = cabecalho+"<break time=\"1s\"/> <say-as interpret-as=\"cardinal\">"+ganhadores+
           "</say-as>"+apostasTexto+"com valor de "+premio+"</speak>";    
           }
       //--------
       return res.json({   
            "fulfillmentText": retorno,
            "fulfillmentMessages": [{
            "text": {"text":[retorno]}
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
