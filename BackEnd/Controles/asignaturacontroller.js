let asignaturas = [];

export function listarAsignaturas() {
    return {
        statusCode: 200,
        body: JSON.stringify(asignaturas)
    };
}

export function agregarAsignatura(nueva) {
    const { codigo, nombre, creditos } = nueva;

    if (!codigo || !nombre || !creditos) {
        return {
            statusCode: 400,
            body: JSON.stringify({ exito: false, mensaje: "Todos los campos son obligatorios." })
        };
    }

    const existe = asignaturas.find(a => a.codigo === codigo);
    if (existe) {
        return {
            statusCode: 400,
            body: JSON.stringify({ exito: false, mensaje: "La asignatura ya existe." })
        };
    }

    asignaturas.push(nueva);
    return {
        statusCode: 201,
        body: JSON.stringify({ exito: true, mensaje: "Asignatura agregada correctamente." })
    };
}

export function buscarAsignatura(id) {
    const asignatura = asignaturas.find(a => a.codigo === id);
    if (asignatura) {
        return {
            statusCode: 200,
            body: JSON.stringify(asignatura)
        };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ mensaje: "Asignatura no encontrada." })
        };
    }
}
