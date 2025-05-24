import {
    listarAsistencias,
    agregarAsistencia,
    buscarAsistencia
} from "../controllers/asistenciaController.js";

export function routerAsistencias(event) {
    const { httpMethod, path, body } = event;

    if (httpMethod === "GET" && path === "/.netlify/functions/asistencia") {
        return listarAsistencias();
    }

    if (httpMethod === "POST" && path === "/.netlify/functions/asistencia") {
        return agregarAsistencia(JSON.parse(body));
    }

    if (httpMethod === "GET") {
        const id = path.split("/").pop();
        return buscarAsistencia(id);
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ mensaje: "Método no permitido." })
    };
}
