const express = require('express');
const { validPage, obtenerJoyas, prepararHATEOASjoyas } = require('./controller/getJoyas');
const { validFiltros, filtrarJoyas, prepararHATEOASfiltros } = require('./controller/filtrosJoyas');
const app = express();

//levantamos servidor en puerto 3000
app.listen(3000, console.log('Server ON'));


app.get('/joyas', validPage ,async(req,res)=>{
    try {
        const getQuery = req.query;
        const { rows, rowCoun, page } = await obtenerJoyas(getQuery);
        const HATEOAS = await prepararHATEOASjoyas(rows)
        res.json(HATEOAS)        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
        });
    }
})

app.get('/joyas/filtros', validFiltros, async(req,res)=>{
    try {
        const getQuery = req.query;
        const { rows, rowCount } = await filtrarJoyas(getQuery);
        const HATEOAS = await prepararHATEOASfiltros(rows)
        res.json(HATEOAS);        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
        });        
    }
})


