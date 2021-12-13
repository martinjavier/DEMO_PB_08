const express = require('express')
const rutasUsuario = require('./usuarios/usuarios.routes')
const rutasProducto = require('./productos/productos.routes')
const morgan = require('morgan')
const rutasArchivo = require('./archivos/archivos.routes')

const router = express.Router()

// Middlewares
router.use(morgan('tiny'))
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Rutas
router.use('/usuarios', rutasUsuario);
router.use('/productos', rutasProducto);
router.use(rutasArchivo);

module.exports = router