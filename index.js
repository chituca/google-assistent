'use strict';

var util = require("./util");
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
var retorno;
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
    
    var options = getOptions(loteriaSelecionada);
    getLoteria(options, function(err, result) {
        if(err){
            throw new Error('Error ao acessar a API: ', err);
            reject();
       }
       
       switch(loteriaSelecionada){
            case loterias.Mega:
                getMegaSena(result);
                break; 
            case loterias.Quina:      
                getQuina(result);
                break;
            case loterias.Lotofacil:      
                getLotofacil(result);
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

//chama Mega-Sena
function getMegaSena(result) {

    let concurso = result.resultado.concurso;
    let ganhadores = result.resultado.ganhadores;
    let sorteados = result.resultado.resultado.split('-').sort();
    let dataSorteio = util.formataData(result.resultado.data);
    let dataProximo = util.formataData(result.resultado.DT_PROXIMO_CONCURSO);
    let cabecalho = "<speak>ok <break time=\"1s\"/>, para o concurso "+concurso+" foram sorteados: " +
    "<say-as interpret-as=\"cardinal\">"+sorteados[0]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[1]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[2]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[3]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[4]+"</say-as> e"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[5]+"</say-as> e";

    if(ganhadores === 0) {
        var estimativa = util.formataReal(result.resultado.VR_ESTIMATIVA);
        var acumulado = util.formataReal(result.resultado.valor_acumulado1);
        retorno = cabecalho+"<break time=\"1s\"/>o prêmio acumulou e a estimativa para o próximo concurso, em "+dataProximo+
        ", é de "+ estimativa + " <break time=\"1s\"/>, o valor acumulado para o próximo concurso é de "+acumulado+".</speak>";
    
        } else {
        var premio = util.formataReal(result.resultado.valor);
        var apostasTexto = '';
            if(ganhadores > 1){
                apostasTexto = "apostas foram premiadas";
            } else {
                apostasTexto = "aposta foi premiada";
            }
        retorno = cabecalho+"<break time=\"1s\"/> <say-as interpret-as=\"cardinal\">"+ganhadores+
        "</say-as>"+apostasTexto+" com valor de "+premio+"</speak>";    
        }
}

//chama Quina
function getQuina(result) {

    let concurso = result.resultado.concurso;
    let ganhadores = result.resultado.ganhadores;
    let sorteados = result.resultado.resultado.split('-').sort();
    let dataSorteio = util.formataData(result.resultado.data);
    let dataProximo = util.formataData(result.resultado.DT_PROXIMO_CONCURSO);
    let cabecalho = "<speak>tudo bem <break time=\"1s\"/>, para o concurso "+concurso+" foram sorteados: " +
    "<say-as interpret-as=\"cardinal\">"+sorteados[0]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[1]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[2]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[3]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[4]+"</say-as> e";

    if(ganhadores === 0) {
        var estimativa = util.formataReal(result.resultado.VR_ESTIMATIVA);
        var acumulado = util.formataReal(result.resultado.valor_acumulado1);
        retorno = cabecalho+"<break time=\"1s\"/>o prêmio acumulou e a estimativa para o próximo concurso, em "+dataProximo+
        ", é de "+ estimativa + " <break time=\"1s\"/>, o valor acumulado para o próximo concurso é de "+acumulado+".</speak>";
    
        } else {
        var premio = util.formataReal(result.resultado.valor1);
        var apostasTexto = '';
            if(ganhadores > 1){
                apostasTexto = "apostas foram premiadas";
            } else {
                apostasTexto = "aposta foi premiada";
            }
        retorno = cabecalho+"<break time=\"1s\"/> <say-as interpret-as=\"cardinal\">"+ganhadores+
        "</say-as>"+apostasTexto+" com valor de "+premio+"</speak>";    
        }
}

//chama Lotofacil
function getLotofacil(result) {

    let concurso = result.resultado.nu_concurso;
    let ganhadores = result.resultado.qt_ganhador_faixa1;
    let sorteados = result.resultado.de_resultado.split('-').sort();
    let dataSorteio = util.formataData(result.resultado.dt_inclusao);
    let dataProximo = util.formataData(result.resultado.DT_PROXIMO_CONCURSO);
    let cabecalho = "<speak>vamos lá<break time=\"1s\"/>, para o concurso "+concurso+" foram sorteados: " +
    "<say-as interpret-as=\"cardinal\">"+sorteados[0]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[1]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[2]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[3]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[4]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[5]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[6]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[7]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[8]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[9]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[10]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[11]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[12]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[13]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[14]+"</say-as> e";

    if(ganhadores === 0) {
        var estimativa = util.formataReal(result.resultado.VR_ESTIMATIVA);
        var acumulado = util.formataReal(result.resultado.VR_ACUMULADO_ESPECIAL);
        retorno = cabecalho+"<break time=\"1s\"/>o prêmio acumulou e a estimativa para o próximo concurso, em "+dataProximo+
        ", é de "+ estimativa + " <break time=\"1s\"/>, o valor acumulado para o próximo concurso é de "+acumulado+".</speak>";
    
        } else {
        var premio = util.formataReal(result.resultado.valor1);
        var apostasTexto = '';
            if(ganhadores > 1){
                apostasTexto = "apostas foram premiadas";
            } else {
                apostasTexto = "aposta foi premiada";
            }
        retorno = cabecalho+"<break time=\"1s\"/> <say-as interpret-as=\"cardinal\">"+ganhadores+
        "</say-as>"+apostasTexto+" com valor de "+premio+"</speak>";    
        }
}
app.listen(process.env.PORT || 8000, function() {
    console.log("Caixa server google assistente rodando!");
  });
