document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("button[onclick='consultarAsignatura()']").onclick = async () => {
    const codigo = document.getElementById("consultarCodigo").value.trim();
    const resultado = await asignaturaController.consultar(codigo);
    const salida = document.getElementById("consultaResultado");

    salida.innerText = resultado
      ? `Nombre: ${resultado.nombre}, Créditos: ${resultado.creditos}, Semestre: ${resultado.semestre}`
      : "Asignatura no encontrada.";
  };

  document.querySelector("button[onclick='agregarAsignatura()']").onclick = async () => {
    const codigo = document.getElementById("nuevoCodigo").value.trim();
    const nombre = document.getElementById("nuevoNombre").value.trim();
    const creditos = document.getElementById("nuevoCreditos").value.trim();
    const semestre = document.getElementById("nuevoSemestre").value.trim();

    const resultado = await asignaturaController.agregar(codigo, nombre, creditos, semestre);
    document.getElementById("agregadoResultado").innerText = resultado.mensaje;
  };

  document.querySelector("button[onclick='cargarAsignatura()']").onclick = async () => {
    const codigo = document.getElementById("modCodigoBuscar").value.trim();
    const resultado = await asignaturaController.consultar(codigo);

    const form = document.getElementById("modificarFormulario");
    const salida = document.getElementById("modResultado");

    if (resultado) {
      form.style.display = "block";
      document.getElementById("modNombre").value = resultado.nombre;
      document.getElementById("modCreditos").value = resultado.creditos;
      document.getElementById("modSemestre").value = resultado.semestre;
      salida.innerText = "";
    } else {
      form.style.display = "none";
      salida.innerText = "Asignatura no encontrada.";
    }
  };

  document.querySelector("button[onclick='guardarCambios()']").onclick = async () => {
    const codigo = document.getElementById("modCodigoBuscar").value.trim();
    const nombre = document.getElementById("modNombre").value.trim();
    const creditos = document.getElementById("modCreditos").value.trim();
    const semestre = document.getElementById("modSemestre").value.trim();

    const resultado = await asignaturaController.modificar(codigo, nombre, creditos, semestre);
    document.getElementById("modResultado").innerText = resultado.mensaje;
  };

  document.querySelector("button[onclick='buscarEliminar()']").onclick = async () => {
    const codigo = document.getElementById("elimCodigo").value.trim();
    const resultado = await asignaturaController.consultar(codigo);
    const contenedor = document.getElementById("eliminarDatos");

    if (resultado) {
      contenedor.innerHTML = `
        <p>Nombre: ${resultado.nombre}, Créditos: ${resultado.creditos}, Semestre: ${resultado.semestre}</p>
        <button id="btnConfirmarEliminar">Sí, eliminar</button>
        <button onclick="cancelarEliminar()">No, cancelar</button>
      `;

      document.getElementById("btnConfirmarEliminar").onclick = async () => {
        const res = await asignaturaController.eliminar(codigo);
        contenedor.innerText = res.mensaje;
      };
    } else {
      contenedor.innerText = "Asignatura no encontrada.";
    }
  };
});

function cancelarEliminar() {
  document.getElementById("eliminarDatos").innerText = "Operación cancelada.";
}
