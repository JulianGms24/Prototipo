import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const archivo = join(process.cwd(), "data", "estudiantes.json");

function leerDatos() {
  if (!existsSync(archivo)) return [];
  const datos = readFileSync(archivo);
  return JSON.parse(datos);
}

function guardarDatos(estudiantes) {
  writeFileSync(archivo, JSON.stringify(estudiantes, null, 2));
}

export async function handler(event) {
  const metodo = event.httpMethod;
  const path = event.path.split("/").filter(Boolean);
  const codigo = path.length > 2 ? path[2] : null;

  if (metodo === "GET") {
    const estudiantes = leerDatos();
    const estudiante = estudiantes.find(e => e.codigo === codigo);
    return {
      statusCode: estudiante ? 200 : 404,
      body: JSON.stringify(estudiante || {})
    };
  }

  if (metodo === "POST") {
    const nuevo = JSON.parse(event.body);
    const estudiantes = leerDatos();

    if (estudiantes.some(e => e.codigo === nuevo.codigo)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ mensaje: "El estudiante ya existe." })
      };
    }

    estudiantes.push(nuevo);
    guardarDatos(estudiantes);
    return {
      statusCode: 201,
      body: JSON.stringify({ mensaje: "Estudiante agregado correctamente." })
    };
  }

  if (metodo === "PUT") {
    const nuevosDatos = JSON.parse(event.body);
    const estudiantes = leerDatos();
    const indice = estudiantes.findIndex(e => e.codigo === codigo);

    if (indice === -1) {
      return {
        statusCode: 404,
        body: JSON.stringify({ mensaje: "Estudiante no encontrado." })
      };
    }

    estudiantes[indice] = { ...estudiantes[indice], ...nuevosDatos };
    guardarDatos(estudiantes);
    return {
      statusCode: 200,
      body: JSON.stringify({ mensaje: "Estudiante modificado correctamente." })
    };
  }

  if (metodo === "DELETE") {
    const estudiantes = leerDatos();
    const filtrados = estudiantes.filter(e => e.codigo !== codigo);

    if (filtrados.length === estudiantes.length) {
      return {
        statusCode: 404,
        body: JSON.stringify({ mensaje: "Estudiante no encontrado." })
      };
    }

    guardarDatos(filtrados);
    return {
      statusCode: 200,
      body: JSON.stringify({ mensaje: "Estudiante eliminado correctamente." })
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ mensaje: "Método no permitido" })
  };
}
