import {
    listarAsignaturas,
    agregarAsignatura,
    buscarAsignatura
} from "../controllers/asignaturaController.js";

export function routerAsignaturas(event) {
    const { httpMethod, path, body } = event;

    if (httpMethod === "GET" && path === "/.netlify/functions/asignatura") {
        return listarAsignaturas();
    }

    if (httpMethod === "POST" && path === "/.netlify/functions/asignatura") {
        return agregarAsignatura(JSON.parse(body));
    }

    if (httpMethod === "GET") {
        const id = path.split("/").pop();
        return buscarAsignatura(id);
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ mensaje: "Método no permitido." })
    };
}
