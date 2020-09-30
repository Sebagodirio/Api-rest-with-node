require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//habilitar el public
app.use(express.static(path.resolve(__dirname, '../public')))


//Configuracion global de rutas
app.use(require('./routes/index'));

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost:27017/cafe', {
    useNewUrlParser: true,
    useUnifiedTopology: true

}, (err, res) => {
    if (err) throw err;

    console.log(`Base de datos ONLINE`);
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto ' + process.env.PORT);
});