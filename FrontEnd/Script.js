let estudiantes = [];

// Al cargar la página
window.onload = function() {
  if (localStorage.getItem('estudiantes')) {
    estudiantes = JSON.parse(localStorage.getItem('estudiantes'));
  }
}

function guardarEstudiantes() {
  localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
}

function agregarEstudiante() {
  let nombre = document.getElementById("nuevoNombre").value.trim();
  let tipoID = document.getElementById("nuevoTipoID").value;
  let documento = document.getElementById("nuevoDocumento").value.trim();

  if (nombre === "" || documento.length < 6) {
    document.getElementById("resultadoAgregar").innerText = "Datos inválidos.";
    return;
  }

  let yaExiste = estudiantes.some(est => est.documento === documento);
  if (yaExiste) {
    document.getElementById("resultadoAgregar").innerText = "Estudiante ya registrado.";
    return;
  }

  estudiantes.push({ nombre: nombre, tipo: tipoID, documento: documento });
  guardarEstudiantes();

  document.getElementById("resultadoAgregar").innerText = "Estudiante agregado correctamente.";
  document.getElementById("nuevoNombre").value = "";
  document.getElementById("nuevoDocumento").value = "";
}

function buscarEstudiante() {
  let docBuscar = document.getElementById("buscarDoc").value.trim();
  
  if (docBuscar === "" || docBuscar.length < 6) {
    document.getElementById("resultadoBusqueda").innerText = "Número no válido.";
    return;
  }

  let estudiante = estudiantes.find(est => est.documento === docBuscar);
  if (estudiante) {
    alert("Estudiante encontrado:\nNombre: " + estudiante.nombre + "\nTipo ID: " + estudiante.tipo + "\nDocumento: " + estudiante.documento);
    document.getElementById("resultadoBusqueda").innerText = "";
  } else {
    document.getElementById("resultadoBusqueda").innerText = "Estudiante no encontrado.";
  }
}

function prepararModificacion() {
  let docModificar = document.getElementById("modificarDoc").value.trim();
  let estudiante = estudiantes.find(est => est.documento === docModificar);

  if (estudiante) {
    document.getElementById("modificacionCampos").style.display = "block";
    document.getElementById("nuevoNombreMod").value = estudiante.nombre;
    document.getElementById("nuevoTipoIDMod").value = estudiante.tipo;
    document.getElementById("resultadoModificacion").innerText = "";
  } else {
    document.getElementById("modificacionCampos").style.display = "none";
    document.getElementById("resultadoModificacion").innerText = "Estudiante no encontrado.";
  }
}

function modificarEstudiante() {
  let docModificar = document.getElementById("modificarDoc").value.trim();
  let nuevoNombre = document.getElementById("nuevoNombreMod").value.trim();
  let nuevoTipo = document.getElementById("nuevoTipoIDMod").value;

  let indice = estudiantes.findIndex(est => est.documento === docModificar);
  if (indice >= 0) {
    estudiantes[indice].nombre = nuevoNombre;
    estudiantes[indice].tipo = nuevoTipo;
    guardarEstudiantes();
    document.getElementById("resultadoModificacion").innerText = "Datos actualizados.";
  }
}

function agregarADepartamento() {
  let docDep = document.getElementById("docAgregarDep").value.trim();
  let est = estudiantes.find(est => est.documento === docDep);

  if (est) {
    document.getElementById("resAgregarDep").innerText = "Estudiante agregado al departamento.";
  } else {
    document.getElementById("resAgregarDep").innerText = "Estudiante no encontrado.";
  }
}

function agregarAAsignatura() {
  let docAsig = document.getElementById("docAgregarAsig").value.trim();
  let est = estudiantes.find(est => est.documento === docAsig);

  if (est) {
    document.getElementById("resAgregarAsig").innerText = "Estudiante agregado a la asignatura.";
  } else {
    document.getElementById("resAgregarAsig").innerText = "Estudiante no encontrado.";
  }
}
