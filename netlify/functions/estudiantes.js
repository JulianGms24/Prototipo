let estudiantes = [];

export async function handler(event, context) {
    const { httpMethod, path, body } = event;

    if (httpMethod === "GET" && path === "/.netlify/functions/estudiantes") {
        return {
            statusCode: 200,
            body: JSON.stringify(estudiantes)
        };
    }

    if (httpMethod === "POST" && path === "/.netlify/functions/estudiantes") {
        const nuevo = JSON.parse(body);
        if (!nuevo.numeroDocumento || !nuevo.nombre || !nuevo.tipoDocumento) {
            return {
                statusCode: 400,
                body: JSON.stringify({ exito: false, mensaje: "Faltan campos obligatorios." })
            };
        }

        const existe = estudiantes.find(e => e.numeroDocumento === nuevo.numeroDocumento);
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

    if (httpMethod === "GET" && event.pathParameters) {
        const id = event.path.split("/").pop();
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

    return {
        statusCode: 405,
        body: JSON.stringify({ mensaje: "Método no permitido." })
    };
}
