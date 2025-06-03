const express = require('express');
const router = express.Router();
const asignaturaController = require('../Controles/asignaturacontroller');

// POST /.netlify/functions/asignaturas
router.post('/', async (req, res) => {
  const { codigo, nombre, creditos, semestre } = req.body;
  const resultado = await asignaturaController.agregar(codigo, nombre, creditos, semestre);
  res.json(resultado);
});

// GET /.netlify/functions/asignaturas/:codigo
router.get('/:codigo', async (req, res) => {
  const codigo = req.params.codigo;
  const resultado = await asignaturaController.consultar(codigo);
  res.json(resultado);
});

// PUT /.netlify/functions/asignaturas/:codigo
router.put('/:codigo', async (req, res) => {
  const codigo = req.params.codigo;
  const { nombre, creditos, semestre } = req.body;
  const resultado = await asignaturaController.modificar(codigo, nombre, creditos, semestre);
  res.json(resultado);
});

// DELETE /.netlify/functions/asignaturas/:codigo
router.delete('/:codigo', async (req, res) => {
  const codigo = req.params.codigo;
  const resultado = await asignaturaController.eliminar(codigo);
  res.json(resultado);
});

module.exports = router;
