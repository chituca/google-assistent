
function config(app){
   // const express = require('express');
   // const router = express.Router();  
    app.get('/teste', teste);
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
