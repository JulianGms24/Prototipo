// asignaturacontroller.js

let asignaturas = JSON.parse(localStorage.getItem("asignaturas")) || [];

function guardarAsignaturasLS() {
    localStorage.setItem("asignaturas", JSON.stringify(asignaturas));
}

export function agregarAsignatura(codigo, nombre) {
    if (!codigo || !nombre) {
        return { exito: false, mensaje: "Todos los campos son obligatorios." };
    }

    if (asignaturas.find(asig => asig.codigo === codigo)) {
        return { exito: false, mensaje: "La asignatura ya está registrada." };
    }

    asignaturas.push({ codigo, nombre });
    guardarAsignaturasLS();

    return { exito: true, mensaje: "Asignatura agregada correctamente." };
}

export function buscarAsignatura(codigo) {
    const asignatura = asignaturas.find(asig => asig.codigo === codigo);
    if (asignatura) {
        return { exito: true, datos: asignatura };
    } else {
        return { exito: false, mensaje: "Asignatura no encontrada." };
    }
}

export function listarAsignaturas() {
    return asignaturas;
}
