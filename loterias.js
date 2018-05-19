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
    }


}
