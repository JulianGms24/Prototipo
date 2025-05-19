let departamentos = JSON.parse(localStorage.getItem("departamentos")) || [];

function guardarEnLocalStorageDepartamentos() {
  localStorage.setItem("departamentos", JSON.stringify(departamentos));
}

function agregarDepartamento() {
  const codigo = document.getElementById("codigoDepartamento").value.trim();
  const nombre = document.getElementById("nombreDepartamento").value.trim();

  if (!codigo || !nombre) {
    document.getElementById("resultadoAgregarDepartamento").innerHTML = "<span class='error'>Todos los campos son obligatorios.</span>";
    return;
  }

  const yaExiste = departamentos.find(d => d.codigo === codigo);
  if (yaExiste) {
    document.getElementById("resultadoAgregarDepartamento").innerHTML = "<span class='error'>El departamento ya está registrado.</span>";
    return;
  }

  departamentos.push({ codigo, nombre });
  guardarEnLocalStorageDepartamentos();

  document.getElementById("resultadoAgregarDepartamento").innerText = "Departamento agregado correctamente.";
  document.getElementById("codigoDepartamento").value = "";
  document.getElementById("nombreDepartamento").value = "";
}

function buscarDepartamento() {
  const codigo = document.getElementById("buscarCodigoDepartamento").value.trim();
  const departamento = departamentos.find(d => d.codigo === codigo);

  if (!codigo || codigo.length < 2) {
    document.getElementById("resultadoBusquedaDepartamento").innerHTML = "<span class='error'>Código no válido.</span>";
  } else if (departamento) {
    document.getElementById("resultadoBusquedaDepartamento").innerText =
      `Departamento encontrado:\nCódigo: ${departamento.codigo}\nNombre: ${departamento.nombre}`;
  } else {
    document.getElementById("resultadoBusquedaDepartamento").innerText = "Departamento no encontrado.";
  }
}

function listarDepartamentos() {
  if (departamentos.length === 0) {
    document.getElementById("listaDepartamentos").innerText = "No hay departamentos registrados.";
    return;
  }

  let lista = "Lista de Departamentos:\n\n";
  departamentos.forEach((d, index) => {
    lista += `${index + 1}. Código: ${d.codigo} - Nombre: ${d.nombre}\n`;
  });

  document.getElementById("listaDepartamentos").innerText = lista;
}

// Cargar automáticamente al iniciar
window.onload = function () {
  listarDepartamentos();
};
