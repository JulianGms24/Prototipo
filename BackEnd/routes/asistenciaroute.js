import asistenciaController from "../controllers/asistenciaController.js";

document.addEventListener("DOMContentLoaded", () => {
  // REGISTRAR
  document.querySelector("button[onclick='registrarAsistencia()']").onclick = async () => {
    const asistencia = {
      fecha: document.getElementById("fechaRegistrar").value,
      horaInicio: document.getElementById("horaInicioRegistrar").value,
      horaFinal: document.getElementById("horaFinalRegistrar").value,
      codigo: document.getElementById("codigoEstudianteRegistrar").value,
      nombre: document.getElementById("nombreEstudianteRegistrar").value,
      estado: document.getElementById("estadoRegistrar").value
    };

    const resultado = await asistenciaController.registrar(asistencia);
    alert(resultado.mensaje);
  };

  // CONSULTAR
  document.querySelector("button[onclick='buscarAsistencia()']").onclick = async () => {
    const fecha = document.getElementById("fechaBuscar").value;
    const horaInicio = document.getElementById("horaInicioBuscar").value;

    const asistencias = await asistenciaController.consultar(fecha, horaInicio);
    if (asistencias.length > 0) {
      let mensaje = "Asistencias encontradas:\n\n";
      asistencias.forEach(a => {
        mensaje += `Nombre: ${a.nombre}\nCódigo: ${a.codigo}\nEstado: ${a.estado}\n\n`;
      });
      alert(mensaje);
    } else {
      alert("No se encontraron asistencias para esa fecha y hora.");
    }
  };

  // MODIFICAR
  document.querySelector("button[onclick='modificarAsistencia()']").onclick = async () => {
    const fecha = document.getElementById("fechaModificar").value;
    const horaInicio = document.getElementById("horaInicioModificar").value;
    const codigo = document.getElementById("codigoEstudianteModificar").value;
    const nuevoEstado = document.getElementById("nuevoEstadoModificar").value;

    const resultado = await asistenciaController.modificar(fecha, horaInicio, codigo, nuevoEstado);
    alert(resultado.mensaje);
  };

  // ELIMINAR
  document.querySelector("button[onclick='eliminarAsistencia()']").onclick = async () => {
    const fecha = document.getElementById("fechaEliminar").value;
    const horaInicio = document.getElementById("horaInicioEliminar").value;
    const codigo = document.getElementById("codigoEstudianteEliminar").value;

    const resultado = await asistenciaController.eliminar(fecha, horaInicio, codigo || null);
    alert(resultado.mensaje);
  };
});
