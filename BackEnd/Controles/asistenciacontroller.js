let asistencias = [];

export function listarAsistencias() {
    return {
        statusCode: 200,
        body: JSON.stringify(asistencias)
    };
}

export function agregarAsistencia(nueva) {
    const { estudiante, asignatura, fecha, estado } = nueva;

    if (!estudiante || !asignatura || !fecha || !estado) {
        return {
            statusCode: 400,
            body: JSON.stringify({ exito: false, mensaje: "Todos los campos son obligatorios." })
        };
    }

    asistencias.push(nueva);
    return {
        statusCode: 201,
        body: JSON.stringify({ exito: true, mensaje: "Asistencia registrada correctamente." })
    };
}

export function buscarAsistencia(idEstudiante) {
    const resultados = asistencias.filter(a => a.estudiante === idEstudiante);
    if (resultados.length > 0) {
        return {
            statusCode: 200,
            body: JSON.stringify(resultados)
        };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ mensaje: "No se encontraron asistencias para este estudiante." })
        };
    }
}
