
function config(app){
    //logger.info('config mensagem-router');
    const express = require('express');
    const router = express.Router();  

    //router.use(loginMiddleware);

    app.get('/teste', teste);

    //app.use('/msg', router);
}

async function teste(req, res){
    try{
        //let wppReturn = await msgService.enviar(req.body);
        res.send('Teste Caixa Ok!');
    }catch(err){
        console.log(err);
        res.status(500);
        res.json(err);
    }
}

module.exports = config;
