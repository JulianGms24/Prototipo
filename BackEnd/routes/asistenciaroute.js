const express = require("express");
const router = express.Router();
const asistenciaController = require("../Controles/asistenciacontroller");

// Registrar asistencia
router.post("/", async (req, res) => {
  const resultado = await asistenciaController.registrar(req.body);
  res.json(resultado);
});

// Consultar asistencias por fecha y hora
router.get("/:fecha/:horaInicio", async (req, res) => {
  const { fecha, horaInicio } = req.params;
  const resultado = await asistenciaController.consultar(fecha, horaInicio);
  res.json(resultado);
});

// Modificar asistencia
router.put("/:fecha/:horaInicio/:codigo", async (req, res) => {
  const { fecha, horaInicio, codigo } = req.params;
  const { estado } = req.body;
  const resultado = await asistenciaController.modificar(fecha, horaInicio, codigo, estado);
  res.json(resultado);
});

// Eliminar asistencia (por código o todas)
router.delete("/:fecha/:horaInicio/:codigo?", async (req, res) => {
  const { fecha, horaInicio, codigo } = req.params;
  const resultado = await asistenciaController.eliminar(fecha, horaInicio, codigo);
  res.json(resultado);
});

module.exports = router;
