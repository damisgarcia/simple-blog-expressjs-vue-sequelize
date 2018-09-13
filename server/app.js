const PORT = 3000;

/* Import Libs */
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();

/* Configurando Servidor para enviar JSON */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* 
* Inicializando rotas do express, responsabilidade passada para o módulo routes/index.js
*/
routes(app);

app.listen(PORT, () => {
    console.log(`This app listening on port ${PORT}!`);
});