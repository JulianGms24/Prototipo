// estudiantescontroller.js
import * as router from "../routes/estudiantesRouter.js";

export async function agregarEstudianteController(dni, nombre, apellidos, email) {
    if (!dni || !nombre || !apellidos || !email) {
        return { exito: false, mensaje: "Todos los campos son obligatorios." };
    }

    const estudiante = { dni, nombre, apellidos, email };
    return await router.agregarEstudiante(estudiante);
}

export async function buscarEstudianteController(dni) {
    if (!dni || dni.length < 2) {
        return { exito: false, mensaje: "Documento no válido." };
    }

    const encontrado = await router.buscarEstudiantePorDocumento(dni);
    if (encontrado) {
        return { exito: true, datos: encontrado };
    } else {
        return { exito: false, mensaje: "Estudiante no encontrado." };
    }
}

export async function listarEstudiantesController() {
    return await router.listarEstudiantes();
}
