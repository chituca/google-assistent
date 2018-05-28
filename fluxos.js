
var lot = require("./loterias");
var config = require('./config');

module.exports = {

    loterias: getLoteria(options, function(err, result) {
        if(err){
            throw new Error('Error ao acessar a API: ', err);
            reject();
        }
    if (!result.resultado){
            retorno = "Não localizei esse concurso para "+loteriaSelecionada+", por favor, refaça a pergunta.";
    } else {

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
    }
    return res.json({   
            "fulfillmentText": retorno,
            "fulfillmentMessages": [{
            "text": {"text":[retorno]}
            }],
            "source": "caixa.gov.br"
        });
            
    })

}
