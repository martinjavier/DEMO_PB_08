const express = require('express')
const { productos } = require('../../data/data')

const router = express.Router()

router.get('/', (req, res,next) => {

  try {
    res.status(200).json(productos);
  } catch (error) {
    next(error);
  }

});

router.get('/:idProducto', (req, res) => {
const { idProducto } = req.params;
const producto = productos.find(producto => producto.id === +idProducto);
if (!producto) {
  return res.status(404).json({ error : `Producto con id ${req.params.idProducto} no existe!` });
}
return res.json(producto);
});

router.post('/', (req, res) => {
const { title, price, thumbnail } = req.body;
if ( !title || !price || !thumbnail) {
  return res.status(404).json({ error : `El cuerpo tiene un formato incorrecto` });
}
const nuevoProducto = {
id: productos.length + 1,
title,
price,
thumbnail
};
productos.push(nuevoProducto);
return res.json(nuevoProducto);
});

router.put('/:idProducto', (req, res) => {
const { params: { idProducto }, body: { title, price, thumbnail} } = req;
const indiceProducto = productos.findIndex((producto) => producto.id === +idProducto);
if (indiceProducto < 0) return res.status(404).json({ error : `Producto con id ${idProducto} no existe!` });
const nuevoProducto = {
...productos[indiceProducto],
title,
price,
thumbnail
};
productos[indiceProducto] = nuevoProducto;
return res.json(nuevoProducto);
});

router.delete('/:idProducto', (req, res) => {
const { idProducto } = req.params;
const indiceProducto = productos.findIndex(producto => producto.id === +idProducto);
if (indiceProducto < 0) return res.status(404).json({ error : `Producto con id ${idProducto} no existe!` });
// productos = productos.filter(producto => producto.id !== +idProducto); mostrar error 500!!!
productos.splice(indiceProducto, 1);
return res.json('producto eliminado correctamente!');
});

module.exports = router
