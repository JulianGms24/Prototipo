document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("button[onclick='agregarAsignatura()']").onclick = async () => {
    const codigo = document.getElementById("nuevoCodigo").value.trim();
    const nombre = document.getElementById("nuevoNombre").value.trim();
    const creditos = document.getElementById("nuevoCreditos").value.trim();
    const semestre = document.getElementById("nuevoSemestre").value.trim();

    const resultado = await asignaturaController.agregar(codigo, nombre, creditos, semestre);
    document.getElementById("agregadoResultado").innerText = resultado.exito
      ? "Asignatura agregada correctamente."
      : resultado.mensaje;
  };

  document.querySelector("button[onclick='consultarAsignatura()']").onclick = async () => {
    const codigo = document.getElementById("consultarCodigo").value.trim();
    const resultado = await asignaturaController.consultar(codigo);

    document.getElementById("consultaResultado").innerText = resultado?.nombre
      ? `Nombre: ${resultado.nombre}, Créditos: ${resultado.creditos}, Semestre: ${resultado.semestre}`
      : "Asignatura no encontrada.";
  };
});
