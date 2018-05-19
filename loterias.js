var util = require("./util");

module.exports = {

    //chama Mega-Sena
    getMegaSena: function (result) {
        let retorno;
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
        "<say-as interpret-as=\"cardinal\">"+sorteados[5]+"</say-as>,";

        if(ganhadores === 0) {
            var estimativa = util.formataReal(result.resultado.VR_ESTIMATIVA);
            var acumulado = util.formataReal(result.resultado.valor_acumulado1);
            return retorno = cabecalho+"<break time=\"1s\"/>o prêmio acumulou e a estimativa para o próximo concurso, em "+dataProximo+
            ", é de "+ estimativa + " <break time=\"1s\"/>, o valor acumulado para o próximo concurso é de "+acumulado+".</speak>";
        
            } else {
            var premio = util.formataReal(result.resultado.valor);
            var apostasTexto = '';
                if(ganhadores > 1){
                    apostasTexto = "apostas foram premiadas";
                } else {
                    apostasTexto = "aposta foi premiada";
                }
            return retorno = cabecalho+"<break time=\"1s\"/> <say-as interpret-as=\"cardinal\">"+ganhadores+
            "</say-as>"+apostasTexto+" com valor de "+premio+"</speak>";    
            }
    },

    //chama Quina
    getQuina: function (result) {
        let retorno;
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
            return retorno = cabecalho+"<break time=\"1s\"/>o prêmio acumulou e a estimativa para o próximo concurso, em "+dataProximo+
            ", é de "+ estimativa + " <break time=\"1s\"/>, o valor acumulado para o próximo concurso é de "+acumulado+".</speak>";
        
            } else {
            var premio = util.formataReal(result.resultado.valor1);
            var apostasTexto = '';
                if(ganhadores > 1){
                    apostasTexto = "apostas foram premiadas";
                } else {
                    apostasTexto = "aposta foi premiada";
                }
            return retorno = cabecalho+"<break time=\"1s\"/> <say-as interpret-as=\"cardinal\">"+ganhadores+
            "</say-as>"+apostasTexto+" com valor de "+premio+"</speak>";    
            }
    },

    //chama Lotofacil
    getLotofacil: function (result) {
    let retorno;
    let concurso = result.resultado.nu_concurso;
    let ganhadores = result.resultado.qt_ganhador_faixa1;
    let sorteados = result.resultado.de_resultado.split('-').sort();
    let dataSorteio = util.formataData(result.resultado.dt_inclusao);
    let dataProximo = util.formataData(result.resultado.DT_PROXIMO_CONCURSO);
    let cabecalho = "<speak>vamos lá <break time=\"1s\"/>, para o concurso "+concurso+" foram sorteados: " +
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
        var acumulado = util.formataReal(result.resultado.vr_acumulado_faixa1);
        return retorno = cabecalho+"<break time=\"1s\"/>o prêmio acumulou e a estimativa para o próximo concurso, em "+dataProximo+
        ", é de "+ estimativa + " <break time=\"1s\"/>, o valor acumulado para o próximo concurso é de "+acumulado+".</speak>";
    
        } else {
        var premio = util.formataReal(result.resultado.vr_rateio_faixa1);
        var apostasTexto = '';
            if(ganhadores > 1){
                apostasTexto = "apostas foram premiadas";
            } else {
                apostasTexto = "aposta foi premiada";
            }
        return retorno = cabecalho+"<break time=\"1s\"/> <say-as interpret-as=\"cardinal\">"+ganhadores+
        "</say-as>"+apostasTexto+" com valor de "+premio+".</speak>";    
        }
    },

    //chama Lotomania
    getLotomania: function (result) {

    let retorno;
    let concurso = result.resultado.co_concurso;
    let ganhadores = result.resultado.qt_ganhadores_faixa1;
    let sorteados = result.resultado.de_resultado.split('-').sort();
    let dataSorteio = util.formataData(result.resultado.dt_inclusao);
    let dataProximo = util.formataData(result.resultado.DT_PROXIMO_CONCURSO);
    let cabecalho = "<speak>A lotomania <break time=\"1s\"/> para o concurso "+concurso+" foram sorteados: " +
    "<say-as interpret-as=\"cardinal\">"+sorteados[0]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[1]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[2]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[3]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[4]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[5]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[6]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[7]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[8]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[9]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[10]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[11]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[12]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[13]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[14]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[15]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[16]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[17]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[18]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[19]+"</say-as> e";

    if(ganhadores === 0) {
        var estimativa = util.formataReal(result.resultado.VR_ESTIMATIVA);
        var acumulado = util.formataReal(result.resultado.vr_acumulado_faixa1);
        return retorno = cabecalho+"<break time=\"1s\"/>o prêmio acumulou e a estimativa para o próximo concurso, em "+dataProximo+
        ", é de "+ estimativa + " <break time=\"1s\"/>, o valor acumulado para o próximo concurso é de "+acumulado+".</speak>";
    
        } else {
        var premio = util.formataReal(result.resultado.vr_rateio_faixa1);
        var apostasTexto = '';
            if(ganhadores > 1){
                apostasTexto = "apostas foram premiadas";
            } else {
                apostasTexto = "aposta foi premiada";
            }
        return retorno = cabecalho+"<break time=\"1s\"/> <say-as interpret-as=\"cardinal\">"+ganhadores+
        "</say-as>"+apostasTexto+" com valor de "+premio+".</speak>";    
        }
    },

    //chama Timemania
    getTimemania: function (result) {

    let retorno;
    let concurso = result.resultado.co_concurso;
    let ganhadores = result.resultado.qt_ganhadores_faixa1;
    let sorteados = result.resultado.DE_RESULTADO.split('-').sort();
    let dataSorteio = util.formataData(result.resultado.dt_inclusao);
    let dataProximo = util.formataData(result.resultado.DT_PROXIMO_CONCURSO);
    let cabecalho = "<speak>A lotomania <break time=\"1s\"/> para o concurso "+concurso+" foram sorteados: " +
    "<say-as interpret-as=\"cardinal\">"+sorteados[0]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[1]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[2]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[3]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[4]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[5]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[6]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[7]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[8]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[9]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[10]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[11]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[12]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[13]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[14]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[15]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[16]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[17]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[18]+"</say-as>,"+"<say-as interpret-as=\"cardinal\">"+sorteados[19]+"</say-as> e";

    if(ganhadores === 0) {
        var estimativa = util.formataReal(result.resultado.VR_ESTIMATIVA);
        var acumulado = util.formataReal(result.resultado.vr_acumulado_faixa1);
        return retorno = cabecalho+"<break time=\"1s\"/>o prêmio acumulou e a estimativa para o próximo concurso, em "+dataProximo+
        ", é de "+ estimativa + " <break time=\"1s\"/>, o valor acumulado para o próximo concurso é de "+acumulado+".</speak>";
    
        } else {
        var premio = util.formataReal(result.resultado.vr_rateio_faixa1);
        var apostasTexto = '';
            if(ganhadores > 1){
                apostasTexto = "apostas foram premiadas";
            } else {
                apostasTexto = "aposta foi premiada";
            }
        return retorno = cabecalho+"<break time=\"1s\"/> <say-as interpret-as=\"cardinal\">"+ganhadores+
        "</say-as>"+apostasTexto+" com valor de "+premio+".</speak>";    
        }
    }
}
