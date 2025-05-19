// Backend/Controles/asignaturacontroller.js
import fs from 'fs';
const path = './data/asignaturas.json';

function leerAsignaturas() {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, '[]');
    }
    const data = fs.readFileSync(path);
    return JSON.parse(data);
}

function guardarAsignaturas(asignaturas) {
    fs.writeFileSync(path, JSON.stringify(asignaturas, null, 2));
}

export function agregarAsignatura(codigo, nombre) {
    const asignaturas = leerAsignaturas();

    if (!codigo || !nombre) {
        return { exito: false, mensaje: "Todos los campos son obligatorios." };
    }

    if (asignaturas.find(asig => asig.codigo === codigo)) {
        return { exito: false, mensaje: "La asignatura ya está registrada." };
    }

    asignaturas.push({ codigo, nombre });
    guardarAsignaturas(asignaturas);

    return { exito: true, mensaje: "Asignatura agregada correctamente." };
}

export function buscarAsignatura(codigo) {
    const asignaturas = leerAsignaturas();
    const asignatura = asignaturas.find(asig => asig.codigo === codigo);
    return asignatura
        ? { exito: true, datos: asignatura }
        : { exito: false, mensaje: "Asignatura no encontrada." };
}

export function listarAsignaturas() {
    return leerAsignaturas();
}
