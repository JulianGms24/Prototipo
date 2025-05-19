// Backend/Controles/asistenciacontroller.js
import fs from 'fs';
const path = './data/asistencias.json';

function leerAsistencias() {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, '[]');
    }
    const data = fs.readFileSync(path);
    return JSON.parse(data);
}

function guardarAsistencias(asistencias) {
    fs.writeFileSync(path, JSON.stringify(asistencias, null, 2));
}

export function registrarAsistencia(documento, asignatura, fecha, asistencia) {
    const asistencias = leerAsistencias();

    if (!documento || !asignatura || !fecha || !asistencia) {
        return { exito: false, mensaje: "Todos los campos son obligatorios." };
    }

    asistencias.push({ documento, asignatura, fecha, asistencia });
    guardarAsistencias(asistencias);

    return { exito: true, mensaje: "Asistencia registrada correctamente." };
}

export function buscarAsistenciasPorDocumento(documento) {
    const asistencias = leerAsistencias();

    if (!documento) {
        return { exito: false, mensaje: "Debe ingresar un documento válido." };
    }

    const resultados = asistencias.filter(a => a.documento === documento);
    return resultados.length > 0
        ? { exito: true, datos: resultados }
        : { exito: false, mensaje: "No se encontraron asistencias para este documento." };
}

export function listarAsistencias() {
    return leerAsistencias();
}
