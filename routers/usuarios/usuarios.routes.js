const express = require('express')
const { usuarios } = require('../../data/data')

const router = express.Router()

router.get('/', (req,res) => {
    const { rol, search } = req.query;
    let respuestaUsuarios = [...usuarios];
    if (Object.keys(req.query).length > 0) {
      if (rol) {
        respuestaUsuarios = respuestaUsuarios.filter(usuario => usuario.rol === rol.toLowerCase());
      }
      if (search) {
        respuestaUsuarios = respuestaUsuarios.filter(usuario => 
          usuario.nombre.toLowerCase().includes(search.toLowerCase()) ||
          usuario.apellido.toLowerCase().includes(search.toLowerCase())
        );
      }
      return res.json(respuestaUsuarios);
    }
      return res.json(respuestaUsuarios);
  });
  
router.get('/:idUsuario', (req, res) => {
  const { idUsuario } = req.params;
  if (isNaN(+idUsuario) || +idUsuario < 0 || +idUsuario % 1 !== 0) {
    return res.status(400).json({error: 'El parámetro debe ser un número entero mayor a cero'});
  }
  const usuario = usuarios.find(usuario => usuario.id === +idUsuario);
  if (!usuario) {
    return res.status(404).json({ error: `El usuario con id ${idUsuario} no se encuentra en nuestros registros`}); 
  }
  return res.json(usuario);
});

router.post('/', (req,res) => {
  const { nombre, apellido, edad, email, rol } = req.body || {};
  if (!nombre || !apellido || !edad || !email || !rol) {
    let camposRequeridos = [];
    if (!nombre) camposRequeridos.push('nombre');
    if (!apellido) camposRequeridos.push('apellido');
    if (!edad) camposRequeridos.push('edad');
    if (!email) camposRequeridos.push('email');
    if (!rol) camposRequeridos.push('rol');
    return res.status(400).json({ error: `Los siguientes campos son requeridos: ${camposRequeridos.join(', ')}`})
  }
  const nuevoUsuario = {
    id: usuarios[usuarios.length - 1].id + 1,
    nombre,
    apellido,
    edad,
    email,
    rol
  };
  usuarios.push(nuevoUsuario);
  return res.json({ exito: true, resultado: nuevoUsuario});
});

router.put('/:idUsuario', (req, res) => {
  const { params: { idUsuario }, body: { nombre, apellido, edad, email, rol } } = req;
  if (isNaN(+idUsuario) || +idUsuario < 0 || +idUsuario % 1 !== 0) {
    return res.status(400).json({error: 'El parámetro debe ser un número entero mayor a cero'});
  }
  const indiceUsuario = usuarios.findIndex( usuario => usuario.id === +idUsuario);
  if (indiceUsuario < 0) {
    return res.status(404).send(`El usuario con id ${idProducto} no está en nuestros registros!`);
  } 
  if (!nombre || !apellido || !edad || !email || !rol) {
    let camposRequeridos = [];
    if (!nombre) camposRequeridos.push('nombre');
    if (!apellido) camposRequeridos.push('apellido');
    if (!edad) camposRequeridos.push('edad');
    if (!email) camposRequeridos.push('email');
    if (!rol) camposRequeridos.push('rol');
    return res.status(400).json({ error: `Los siguientes campos son requeridos: ${camposRequeridos.join(', ')}`})
  }
  const usuarioModificado = {
    ...usuarios[indiceUsuario],
    nombre,
    apellido,
    edad,
    email,
    rol
  };
  usuarios[indiceUsuario] = usuarioModificado;
  return res.json({ exito: true, resultado: usuarioModificado });
});

router.delete('/:idUsuario', (req, res) => {
  const { idUsuario } = req.params;
  if (isNaN(+idUsuario) || +idUsuario < 0 || +idUsuario % 1 !== 0) {
    return res.status(400).json({error: 'El parámetro debe ser un número entero mayor a cero'});
  }
  const indiceUsuario = usuarios.findIndex( usuario => usuario.id === +idUsuario);
  if (indiceUsuario < 0) {
    return res.status(404).send(`El usuario con id ${idProducto} no está en nuestros registros!`);
  } 
  const usuarioEliminado = usuarios[indiceUsuario];
  usuarios.splice(indiceUsuario, 1);
  return res.json({ exito: true, resultado: usuarioEliminado });
});

module.exports = router