import * as router from "../routes/asignaturasRouter.js";

export async function agregarAsignaturaController(codigo, nombre) {
    if (!codigo || !nombre) {
        return { exito: false, mensaje: "Todos los campos son obligatorios." };
    }

    const asignatura = { codigo, nombre };
    return await router.agregarAsignatura(asignatura);
}

export async function buscarAsignaturaController(codigo) {
    if (!codigo || codigo.length < 2) {
        return { exito: false, mensaje: "Código no válido." };
    }

    const encontrada = await router.buscarAsignaturaPorCodigo(codigo);
    if (encontrada) {
        return { exito: true, datos: encontrada };
    } else {
        return { exito: false, mensaje: "Asignatura no encontrada." };
    }
}

export async function listarAsignaturasController() {
    return await router.listarAsignaturas();
}
