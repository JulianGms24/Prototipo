import {
    listarEstudiantes,
    agregarEstudiante,
    buscarEstudiante
} from "../controllers/estudianteController.js";

export function routerEstudiantes(event) {
    const { httpMethod, path, body } = event;

    if (httpMethod === "GET" && path === "/.netlify/functions/estudiantes") {
        return listarEstudiantes();
    }

    if (httpMethod === "POST" && path === "/.netlify/functions/estudiantes") {
        return agregarEstudiante(JSON.parse(body));
    }

    if (httpMethod === "GET") {
        const id = path.split("/").pop();
        return buscarEstudiante(id);
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ mensaje: "Método no permitido." })
    };
}
