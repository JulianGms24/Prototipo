let asignaturas = JSON.parse(localStorage.getItem("asignaturas")) || [];

function guardarEnLocalStorageAsignaturas() {
  localStorage.setItem("asignaturas", JSON.stringify(asignaturas));
}

function agregarAsignatura() {
  const codigo = document.getElementById("codigoAsignatura").value.trim();
  const nombre = document.getElementById("nombreAsignatura").value.trim();

  if (!codigo || !nombre) {
    document.getElementById("resultadoAgregarAsignatura").innerHTML = "<span class='error'>Todos los campos son obligatorios.</span>";
    return;
  }

  const yaExiste = asignaturas.find(a => a.codigo === codigo);
  if (yaExiste) {
    document.getElementById("resultadoAgregarAsignatura").innerHTML = "<span class='error'>La asignatura ya está registrada.</span>";
    return;
  }

  asignaturas.push({ codigo, nombre });
  guardarEnLocalStorageAsignaturas();

  document.getElementById("resultadoAgregarAsignatura").innerText = "Asignatura agregada correctamente.";
  document.getElementById("codigoAsignatura").value = "";
  document.getElementById("nombreAsignatura").value = "";
}

function buscarAsignatura() {
  const codigo = document.getElementById("buscarCodigoAsignatura").value.trim();
  const asignatura = asignaturas.find(a => a.codigo === codigo);

  if (!codigo || codigo.length < 2) {
    document.getElementById("resultadoBusquedaAsignatura").innerHTML = "<span class='error'>Código no válido.</span>";
  } else if (asignatura) {
    document.getElementById("resultadoBusquedaAsignatura").innerText =
      `Asignatura encontrada:\nCódigo: ${asignatura.codigo}\nNombre: ${asignatura.nombre}`;
  } else {
    document.getElementById("resultadoBusquedaAsignatura").innerText = "Asignatura no encontrada.";
  }
}

function listarAsignaturas() {
  if (asignaturas.length === 0) {
    document.getElementById("listaAsignaturas").innerText = "No hay asignaturas registradas.";
    return;
  }

  let lista = "Lista de Asignaturas:\n\n";
  asignaturas.forEach((a, index) => {
    lista += `${index + 1}. Código: ${a.codigo} - Nombre: ${a.nombre}\n`;
  });

  document.getElementById("listaAsignaturas").innerText = lista;
}

// Cargar automáticamente al iniciar
window.onload = function () {
  listarAsignaturas();
};
