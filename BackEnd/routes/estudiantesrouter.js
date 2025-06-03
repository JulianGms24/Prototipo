// routers/estudianteRouter.js
import {
  agregarEstudiante,
  consultarEstudiante,
  modificarEstudiante,
  eliminarEstudiante
} from '../controllers/estudianteController.js';

document.getElementById("btnAgregarEstudiante").addEventListener("click", async () => {
  const estudiante = {
    codigo: document.getElementById("codigoEst").value,
    nombre: document.getElementById("nombreEst").value,
    programa: document.getElementById("programaEst").value
  };
  await agregarEstudiante(estudiante);
});

document.getElementById("btnConsultarEstudiante").addEventListener("click", async () => {
  const codigo = document.getElementById("codigoConsultaEst").value;
  const est = await consultarEstudiante(codigo);
  document.getElementById("resultadoEstudiante").innerText = `Nombre: ${est.nombre}, Programa: ${est.programa}`;
});

document.getElementById("btnModificarEstudiante").addEventListener("click", async () => {
  const codigo = document.getElementById("codigoModEst").value;
  const nuevosDatos = {
    nombre: document.getElementById("nuevoNombreEst").value,
    programa: document.getElementById("nuevoProgramaEst").value
  };
  await modificarEstudiante(codigo, nuevosDatos);
});

document.getElementById("btnEliminarEstudiante").addEventListener("click", async () => {
  const codigo = document.getElementById("codigoElimEst").value;
  await eliminarEstudiante(codigo);
});
