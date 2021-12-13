const path = require('path');
const express = require('express');
const loggerMiddleware = require('./middlewares/logger');
const authMiddleware = require('./middlewares/authorizer')

const app = express();
const PORT = process.env.PORT || 8080;

// Con el método USE hacemos que se utilice 
// ese middleware en los GET siguientes, sin necesidad de declararlo
// La USE siempre hay que declararlo antes de los GET
// Al agregarle '/api' eso hará que sólo se aplique a los GET cuya URL comience con '/api'
// app.use('/api', loggerMiddleware)
app.use([loggerMiddleware, authMiddleware])

// Rutas
app.get('/', (req, res) => {
    console.log(req.user);
    res.send('<h1>HOME</h1>')
})

app.get('/about', (req, res) => {
    res.send('<h1>ABOUT</h1>')
})

app.get('/api/products', (req, res) => {
  res.send('<h1>PRODUCTS</h1>')
})

const connectedServer = app.listen(PORT, ()=> {
  console.log(`Servidor activo y escuchando en el puerto ${PORT}`);
});

connectedServer.on('error', (error) => {
  console.log(error.message);
})
