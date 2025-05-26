import departamentoController from "../controllers/departamentoController.js";

document.addEventListener("DOMContentLoaded", () => {
  // REGISTRAR
  document.querySelector("button[onclick='registrarDepartamento()']").onclick = async () => {
    const nombre = document.getElementById("nombreDepartamentoRegistrar").value;
    const resultado = await departamentoController.registrar({ nombre });
    alert(resultado.mensaje);
  };

  // CONSULTAR
  document.querySelector("button[onclick='buscarDepartamento()']").onclick = async () => {
    const nombre = document.getElementById("nombreDepartamentoBuscar").value;
    const departamento = await departamentoController.consultar(nombre);
    if (departamento) {
      alert(`Departamento encontrado:\nNombre: ${departamento.nombre}`);
    } else {
      alert("No se encontró el departamento.");
    }
  };

  // MODIFICAR
  document.querySelector("button[onclick='modificarDepartamento()']").onclick = async () => {
    const nombre = document.getElementById("nombreDepartamentoModificar").value;
    const nuevoNombre = document.getElementById("nuevoNombreDepartamento").value;
    const resultado = await departamentoController.modificar(nombre, nuevoNombre);
    alert(resultado.mensaje);
  };

  // ELIMINAR
  document.querySelector("button[onclick='eliminarDepartamento()']").onclick = async () => {
    const nombre = document.getElementById("nombreDepartamentoEliminar").value;
    const resultado = await departamentoController.eliminar(nombre);
    alert(resultado.mensaje);
  };
});
