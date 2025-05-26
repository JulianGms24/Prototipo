// controllers/estudianteController.js
export async function agregarEstudiante(estudiante) {
  console.log("Agregar estudiante (futuro Firebase):", estudiante);
  // Aquí irá la lógica de Firebase
}

export async function consultarEstudiante(codigo) {
  console.log("Consultar estudiante (futuro Firebase):", codigo);
  // Retornar datos simulados por ahora
  return { codigo, nombre: "Ejemplo", programa: "Ingeniería" };
}

export async function modificarEstudiante(codigo, nuevosDatos) {
  console.log("Modificar estudiante:", codigo, nuevosDatos);
  // Aquí irá la lógica de Firebase
}

export async function eliminarEstudiante(codigo) {
  console.log("Eliminar estudiante:", codigo);
  // Aquí irá la lógica de Firebase
}
