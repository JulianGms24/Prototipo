// asistenciacontroller.js

let asistencias = JSON.parse(localStorage.getItem("asistencias")) || [];

function guardarAsistenciasLS() {
    localStorage.setItem("asistencias", JSON.stringify(asistencias));
}

export function registrarAsistencia(documento, asignatura, fecha, asistencia) {
    if (!documento || !asignatura || !fecha || !asistencia) {
        return { exito: false, mensaje: "Todos los campos son obligatorios." };
    }

    const nuevaAsistencia = {
        documento,
        asignatura,
        fecha,
        asistencia  // puede ser "Presente", "Ausente", etc.
    };

    asistencias.push(nuevaAsistencia);
    guardarAsistenciasLS();

    return { exito: true, mensaje: "Asistencia registrada correctamente." };
}

export function buscarAsistenciasPorDocumento(documento) {
    if (!documento) {
        return { exito: false, mensaje: "Debe ingresar un documento válido." };
    }

    const resultados = asistencias.filter(a => a.documento === documento);

    if (resultados.length > 0) {
        return { exito: true, datos: resultados };
    } else {
        return { exito: false, mensaje: "No se encontraron asistencias para este documento." };
    }
}

export function listarAsistencias() {
    return asistencias;
}

