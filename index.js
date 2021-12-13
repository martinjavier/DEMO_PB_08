const path = require('path')
const express = require('express');
const rutasApi = require('./routers/app.routers')
const multer = require('multer')

const app = express();
const PORT = process.env.PORT || 8080;

// Express Static
// Todos los recursos estáticos en esta carpeta, van a estar disponibles
app.use(express.static('public'))

// Rutas
app.use('/api', rutasApi)

const connectedServer = app.listen(PORT, ()=> {
  console.log(`Servidor activo y escuchando en el puerto ${PORT}`);
});

connectedServer.on('error', (error) => {
  console.log(error.message);
})
