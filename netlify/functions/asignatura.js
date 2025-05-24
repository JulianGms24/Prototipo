let asignaturas = [];

export async function handler(event, context) {
    const { httpMethod, path, body } = event;

    if (httpMethod === "GET" && path === "/.netlify/functions/asignaturas") {
        return {
            statusCode: 200,
            body: JSON.stringify(asignaturas)
        };
    }

    if (httpMethod === "POST" && path === "/.netlify/functions/asignaturas") {
        const nueva = JSON.parse(body);
        if (!nueva.codigo || !nueva.nombre || !nueva.creditos) {
            return {
                statusCode: 400,
                body: JSON.stringify({ exito: false, mensaje: "Faltan campos obligatorios." })
            };
        }

        const existe = asignaturas.find(a => a.codigo === nueva.codigo);
        if (existe) {
            return {
                statusCode: 400,
                body: JSON.stringify({ exito: false, mensaje: "Asignatura ya existe." })
            };
        }

        asignaturas.push(nueva);
        return {
            statusCode: 201,
            body: JSON.stringify({ exito: true, mensaje: "Asignatura agregada correctamente." })
        };
    }

    if (httpMethod === "GET" && event.pathParameters) {
        const id = event.path.split("/").pop();
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

    return {
        statusCode: 405,
        body: JSON.stringify({ mensaje: "Método no permitido." })
    };
}
