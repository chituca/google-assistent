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
        let cabecalho = "<speak>Ok <break time=\"1s\"/>, para o concurso "+concurso+" foram sorteados: " +
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
        let cabecalho = "<speak>Tudo bem <break time=\"1s\"/>, para o concurso "+concurso+" foram sorteados: " +
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
    let cabecalho = "<speak>Vamos lá <break time=\"1s\"/>, para o concurso "+concurso+" foram sorteados: " +
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
    "<say-as interpret-as=\"cardinal\">"+sorteados[0]+"</say-as>,<say-as interpret-as=\"cardinal\">"+sorteados[1]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[2]+"</say-as>,<say-as interpret-as=\"cardinal\">"+sorteados[3]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[4]+"</say-as>,<say-as interpret-as=\"cardinal\">"+sorteados[5]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[6]+"</say-as>,<say-as interpret-as=\"cardinal\">"+sorteados[7]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[8]+"</say-as>,<say-as interpret-as=\"cardinal\">"+sorteados[9]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[10]+"</say-as>,<say-as interpret-as=\"cardinal\">"+sorteados[11]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[12]+"</say-as>,<say-as interpret-as=\"cardinal\">"+sorteados[13]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[14]+"</say-as>,<say-as interpret-as=\"cardinal\">"+sorteados[15]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[16]+"</say-as>,<say-as interpret-as=\"cardinal\">"+sorteados[17]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\">"+sorteados[18]+"</say-as> e <say-as interpret-as=\"cardinal\">"+sorteados[19]+"</say-as>, ";

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
    let concurso = result.resultado.NU_CONCURSO;
    let ganhadores = result.resultado.QT_GANHADOR_FAIXA_1;
    let sorteados = result.resultado.DE_RESULTADO.split('-').sort();
    let dataSorteio = util.formataData(result.resultado.DT_APURACAO);
    let dataProximo = util.formataData(result.resultado.DT_PROXIMO_CONCURSO);
    let cabecalho = "<speak>Para Timemania <break time=\"1s\"/> no concurso "+concurso+" os números sorteados foram: " +
    "<say-as interpret-as=\"cardinal\">"+sorteados[0]+"</say-as>,"+"<say-as interpret-as=\"cardinal\"> "+sorteados[1]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\"> "+sorteados[2]+"</say-as>,"+"<say-as interpret-as=\"cardinal\"> "+sorteados[3]+"</say-as>,"+
    "<say-as interpret-as=\"cardinal\"> "+sorteados[4]+"</say-as>,"+"<say-as interpret-as=\"cardinal\"> "+sorteados[5]+"</say-as>e"+
    "</say-as>"+"<say-as interpret-as=\"cardinal\"> "+sorteados[6]+"</say-as>, ";

    if(ganhadores === 0) {
        var estimativa = util.formataReal(result.resultado.VR_ESTIMATIVA_FAIXA_1);
        var acumulado = util.formataReal(result.resultado.VR_ACUMULADO_FAIXA_1);
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

     //chama Dupla-Sena
     getDuplaSena: function (result) {
        let retorno;
        let concurso = result.resultado.concurso;
        let ganhadores = result.resultado.ganhadores_sena1;
        let ganhadores2 = result.resultado.ganhadores_sena2;
        let sorteados = result.resultado.resultado_sorteio1.split('-').sort();
        let sorteados2 = result.resultado.resultado_sorteio2.split('-').sort();
        let dataSorteio = util.formataData(result.resultado.data);
        let dataProximo = util.formataData(result.resultado.DATA_PROXIMO_CONCURSO);
        let cabecalho = "<speak>para o concurso "+concurso+
        " da Dupla-Sena <break time=\"1s\"/>os números sorteado do <say-as interpret-as=\"ordinal\">1</say-as>º sorteio são: " +
        "<say-as interpret-as=\"cardinal\">"+sorteados[0]+"</say-as>,"+
        "<say-as interpret-as=\"cardinal\">"+sorteados[1]+"</say-as>,"+
        "<say-as interpret-as=\"cardinal\">"+sorteados[2]+"</say-as>,"+
        "<say-as interpret-as=\"cardinal\">"+sorteados[3]+"</say-as>,"+
        "<say-as interpret-as=\"cardinal\">"+sorteados[4]+"</say-as> e"+
        "<say-as interpret-as=\"cardinal\">"+sorteados[5]+"</say-as>,"+
        "<break time=\"2s\"/>e para o <say-as interpret-as=\"ordinal\">2</say-as>º sorteio foram: " +
        "<say-as interpret-as=\"cardinal\">"+sorteados2[0]+"</say-as>,"+
        "<say-as interpret-as=\"cardinal\">"+sorteados2[1]+"</say-as>,"+
        "<say-as interpret-as=\"cardinal\">"+sorteados2[2]+"</say-as>,"+
        "<say-as interpret-as=\"cardinal\">"+sorteados2[3]+"</say-as>,"+
        "<say-as interpret-as=\"cardinal\">"+sorteados2[4]+"</say-as> e"+
        "<say-as interpret-as=\"cardinal\">"+sorteados2[5]+"</say-as>,";

        if(ganhadores === 0) {
            var estimativa = util.formataReal(result.resultado.VALOR_ESTIMATIVA);
            var acumulado = util.formataReal(result.resultado.valor_acumulado_sena1);
            return retorno = cabecalho+"<break time=\"1s\"/>o prêmio acumulou e a estimativa para o próximo concurso, em "+dataProximo+
            ", é de "+ estimativa + " <break time=\"1s\"/>, o valor acumulado para o próximo concurso é de "+acumulado+".</speak>";
        
            } else {
            var premio = util.formataReal(result.resultado.valor_sena1);
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

    //chama Loteria Federal
    getFederal: function (result) {
        let retorno;
        let primeiroPremio = result.resultado.Primeiro_Premio;
        let segundoPremio = result.resultado.Segundo_Premio;
        let terceiroPremio = result.resultado.Terceiro_Premio;
        let quartoPremio = result.resultado.Quarto_Premio;
        let quintoPremio = result.resultado.Quinto_Premio;
        let concurso = result.resultado.Extracao;
        let valorPrimeiro = util.formataReal(result.resultado.Valor);
        let dataSorteio = util.formataData(result.resultado.Data_Extracao);
        let cabecalho = "<speak>Para o concurso <say-as interpret-as=\"cardinal\">"+concurso+"</say-as>"+
        " da Loteria Federal <break time=\"1s\"/>os bilhetes premiados foram:\n" +
        "<say-as interpret-as=\"ordinal\">1</say-as>º: "+primeiroPremio+", \n"+
        "<say-as interpret-as=\"ordinal\">2</say-as>º: "+segundoPremio+",\n"+
        "<say-as interpret-as=\"ordinal\">3</say-as>º: "+terceiroPremio+", \n"+
        "<say-as interpret-as=\"ordinal\">4</say-as>º: "+quartoPremio+" e \n"+
        "<say-as interpret-as=\"ordinal\">5</say-as>º: "+quintoPremio+". \n";

        return retorno = cabecalho+"<break time=\"1s\"/>O valor do primeiro prémio foi de "+valorPrimeiro+".</speak>";    
    }
}
