import {
    listarDepartamentos,
    agregarDepartamento,
    buscarDepartamento
} from "../controllers/departamentoController.js";

export function routerDepartamentos(event) {
    const { httpMethod, path, body } = event;

    if (httpMethod === "GET" && path === "/.netlify/functions/departamento") {
        return listarDepartamentos();
    }

    if (httpMethod === "POST" && path === "/.netlify/functions/departamento") {
        return agregarDepartamento(JSON.parse(body));
    }

    if (httpMethod === "GET") {
        const id = path.split("/").pop();
        return buscarDepartamento(id);
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ mensaje: "Método no permitido." })
    };
}
