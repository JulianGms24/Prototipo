// departamentoController.js

let departamentos = JSON.parse(localStorage.getItem("departamentos")) || [];

function guardarDepartamentosLS() {
    localStorage.setItem("departamentos", JSON.stringify(departamentos));
}

export function agregarDepartamento(codigo, nombre) {
    if (!codigo || !nombre) {
        return { exito: false, mensaje: "Todos los campos son obligatorios." };
    }

    if (departamentos.find(dep => dep.codigo === codigo)) {
        return { exito: false, mensaje: "El departamento ya está registrado." };
    }

    departamentos.push({ codigo, nombre });
    guardarDepartamentosLS();

    return { exito: true, mensaje: "Departamento agregado correctamente." };
}

export function buscarDepartamento(codigo) {
    if (!codigo || codigo.length < 2) {
        return { exito: false, mensaje: "Código no válido." };
    }

    const departamento = departamentos.find(dep => dep.codigo === codigo);
    if (departamento) {
        return { exito: true, datos: departamento };
    } else {
        return { exito: false, mensaje: "Departamento no encontrado." };
    }
}

export function listarDepartamentos() {
    return departamentos;
}
