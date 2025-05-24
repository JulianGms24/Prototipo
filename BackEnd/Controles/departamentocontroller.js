import * as router from "../routes/departamentosRouter.js";

export async function agregarDepartamentoController(codigo, nombre) {
    if (!codigo || !nombre) {
        return { exito: false, mensaje: "Todos los campos son obligatorios." };
    }

    const departamento = { codigo, nombre };
    return await router.agregarDepartamento(departamento);
}

export async function buscarDepartamentoController(codigo) {
    if (!codigo || codigo.length < 2) {
        return { exito: false, mensaje: "Código no válido." };
    }

    const encontrado = await router.buscarDepartamentoPorCodigo(codigo);
    if (encontrado) {
        return { exito: true, datos: encontrado };
    } else {
        return { exito: false, mensaje: "Departamento no encontrado." };
    }
}

export async function listarDepartamentosController() {
    return await router.listarDepartamentos();
}
