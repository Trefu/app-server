const express = require("express");
const path = require('path');
const morgan = require('morgan');
const engine = require('ejs-mate');
const app = express();

//Configuraciones
const PORT = process.env.PORT || 3000;
app.set('port', process.env.PORT || 3000);
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(morgan('dev'));

//RUTAS
app.use('/', require('./routes/index'))

//Arrancando server
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

