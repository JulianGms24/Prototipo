let estudiantes = [];

export function listarEstudiantes() {
    return {
        statusCode: 200,
        body: JSON.stringify(estudiantes)
    };
}

export function agregarEstudiante(nuevo) {
    const { tipoDocumento, numeroDocumento, nombre, semestre, grupo } = nuevo;

    if (!tipoDocumento || !numeroDocumento || !nombre || !semestre || !grupo) {
        return {
            statusCode: 400,
            body: JSON.stringify({ exito: false, mensaje: "Todos los campos son obligatorios." })
        };
    }

    const existe = estudiantes.find(e => e.numeroDocumento === numeroDocumento);
    if (existe) {
        return {
            statusCode: 400,
            body: JSON.stringify({ exito: false, mensaje: "Estudiante ya existe." })
        };
    }

    estudiantes.push(nuevo);
    return {
        statusCode: 201,
        body: JSON.stringify({ exito: true, mensaje: "Estudiante agregado correctamente." })
    };
}

export function buscarEstudiante(id) {
    const estudiante = estudiantes.find(e => e.numeroDocumento === id);
    if (estudiante) {
        return {
            statusCode: 200,
            body: JSON.stringify(estudiante)
        };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ mensaje: "Estudiante no encontrado." })
        };
    }
}
