let asistencias = JSON.parse(localStorage.getItem("asistencias")) || [];

function guardarEnLocalStorageAsistencias() {
  localStorage.setItem("asistencias", JSON.stringify(asistencias));
}

function registrarAsistencia() {
  const tipoDocumento = document.getElementById("tipoDocumento").value.trim();
  const numeroDocumento = document.getElementById("numeroDocumento").value.trim();
  const codigoAsignatura = document.getElementById("codigoAsignaturaAsistencia").value.trim();
  const fecha = document.getElementById("fechaAsistencia").value;
  const horaEntrada = document.getElementById("horaEntrada").value;
  const horaSalida = document.getElementById("horaSalida").value;

  if (!tipoDocumento || !numeroDocumento || !codigoAsignatura || !fecha || !horaEntrada || !horaSalida) {
    document.getElementById("resultadoAsistencia").innerHTML = "<span class='error'>Todos los campos son obligatorios.</span>";
    return;
  }

  asistencias.push({
    tipoDocumento,
    numeroDocumento,
    codigoAsignatura,
    fecha,
    horaEntrada,
    horaSalida
  });

  guardarEnLocalStorageAsistencias();

  document.getElementById("resultadoAsistencia").innerText = "Asistencia registrada correctamente.";

  document.getElementById("tipoDocumento").value = "";
  document.getElementById("numeroDocumento").value = "";
  document.getElementById("codigoAsignaturaAsistencia").value = "";
  document.getElementById("fechaAsistencia").value = "";
  document.getElementById("horaEntrada").value = "";
  document.getElementById("horaSalida").value = "";
}

function listarAsistencias() {
  if (asistencias.length === 0) {
    document.getElementById("listaAsistencias").innerText = "No hay asistencias registradas.";
    return;
  }

  let lista = "Lista de Asistencias:\n\n";
  asistencias.forEach((a, index) => {
    lista += `${index + 1}. Documento: ${a.tipoDocumento} ${a.numeroDocumento} - Asignatura: ${a.codigoAsignatura} - Fecha: ${a.fecha} - Entrada: ${a.horaEntrada} - Salida: ${a.horaSalida}\n`;
  });

  document.getElementById("listaAsistencias").innerText = lista;
}

window.onload = function () {
  listarAsistencias();
};
