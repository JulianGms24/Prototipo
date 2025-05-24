import * as router from "../routes/asistenciasRouter.js";

export async function agregarAsistenciaController(dni, fecha, asistencia) {
    if (!dni || !fecha || !asistencia) {
        return { exito: false, mensaje: "Todos los campos son obligatorios." };
    }

    const registro = { dni, fecha, asistencia };
    return await router.agregarAsistencia(registro);
}

export async function listarAsistenciasController() {
    return await router.listarAsistencias();
}
