const express = require('express');
const router = express.Router();
const departamentoController = require('../Controles/departamentocontroller');

// POST /.netlify/functions/departamentos
router.post('/', async (req, res) => {
  const resultado = await departamentoController.registrar(req.body);
  res.json(resultado);
});

// GET /.netlify/functions/departamentos/:nombre
router.get('/:nombre', async (req, res) => {
  const nombre = req.params.nombre;
  const resultado = await departamentoController.consultar(nombre);
  res.json(resultado);
});

// PUT /.netlify/functions/departamentos/:nombre
router.put('/:nombre', async (req, res) => {
  const nombre = req.params.nombre;
  const { nuevoNombre } = req.body;
  const resultado = await departamentoController.modificar(nombre, nuevoNombre);
  res.json(resultado);
});

// DELETE /.netlify/functions/departamentos/:nombre
router.delete('/:nombre', async (req, res) => {
  const nombre = req.params.nombre;
  const resultado = await departamentoController.eliminar(nombre);
  res.json(resultado);
});

module.exports = router;
