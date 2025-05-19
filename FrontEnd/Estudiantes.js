let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

document.addEventListener('DOMContentLoaded', () => {
  guardarEnLocalStorage();
});
function guardarEnLocalStorage() {
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}

function agregarEstudiante() {
  const nombre = document.getElementById("nuevoNombre").value;
  const tipo = document.getElementById("nuevoTipoID").value;
  const documento = document.getElementById("nuevoDocumento").value;

  if (documento.length < 10) {
    document.getElementById("resultadoAgregar").innerHTML = "<span class='error'>Número de documento no válido.</span>";
    return;
  }

  const existente = estudiantes.find(e => e.documento === documento);
  if (existente) {
    document.getElementById("resultadoAgregar").innerHTML = "<span class='error'>Estudiante ya registrado.</span>";
    return;
  }

  estudiantes.push({ nombre, tipo, documento });
  guardarEnLocalStorage();
  document.getElementById("resultadoAgregar").innerText = "Estudiante agregado correctamente.";
}

function buscarEstudiante() {
  const doc = document.getElementById("buscarDoc").value;
  const encontrado = estudiantes.find(e => e.documento === doc);

  if (doc.length < 10) {
    document.getElementById("resultadoBusqueda").innerHTML = "<span class='error'>Número no válido o estudiante no encontrado.</span>";
  } else if (encontrado) {
    alert(`Estudiante:\nNombre: ${encontrado.nombre}\nTipo ID: ${encontrado.tipo}\nDocumento: ${encontrado.documento}`);
    document.getElementById("resultadoBusqueda").innerText = "";
  } else {
    document.getElementById("resultadoBusqueda").innerHTML = "<span class='error'>Estudiante no encontrado.</span>";
  }
}

function prepararModificacion() {
  const doc = document.getElementById("modificarDoc").value;
  const encontrado = estudiantes.find(e => e.documento === doc);

  if (encontrado) {
    document.getElementById("modificacionCampos").style.display = "block";
    document.getElementById("nuevoNombreMod").value = encontrado.nombre;
    document.getElementById("nuevoTipoIDMod").value = encontrado.tipo;
    document.getElementById("resultadoModificacion").innerText = "";
  } else {
    document.getElementById("modificacionCampos").style.display = "none";
    document.getElementById("resultadoModificacion").innerHTML = "<span class='error'>Estudiante no encontrado.</span>";
  }
}

function modificarEstudiante() {
  const doc = document.getElementById("modificarDoc").value;
  const nuevoNombre = document.getElementById("nuevoNombreMod").value;
  const nuevoTipo = document.getElementById("nuevoTipoIDMod").value;

  const index = estudiantes.findIndex(e => e.documento === doc);
  if (index !== -1) {
    estudiantes[index].nombre = nuevoNombre;
    estudiantes[index].tipo = nuevoTipo;
    guardarEnLocalStorage();
    document.getElementById("resultadoModificacion").innerText = "Estudiante modificado correctamente.";
  }
}

function agregarADepartamento() {
  const doc = document.getElementById("docAgregarDep").value;
  const est = estudiantes.find(e => e.documento === doc);
  if (est) {
    document.getElementById("resAgregarDep").innerText = "Estudiante agregado al departamento.";
  } else {
    document.getElementById("resAgregarDep").innerHTML = "<span class='error'>Estudiante no encontrado.</span>";
  }
}

function agregarAAsignatura() {
  const doc = document.getElementById("docAgregarAsig").value;
  const est = estudiantes.find(e => e.documento === doc);
  if (est) {
    document.getElementById("resAgregarAsig").innerText = "Estudiante agregado a la asignatura.";
  } else {
    document.getElementById("resAgregarAsig").innerHTML = "<span class='error'>Estudiante no encontrado.</span>";
  }
}
