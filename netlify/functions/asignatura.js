// netlify/functions/asignaturas.js

import { promises as fs } from "fs";
import path from "path";

const archivo = path.resolve("data/asignaturas.json");

export async function handler(event) {
  try {
    const metodo = event.httpMethod;
    const id = event.path.split("/").pop();

    switch (metodo) {
      case "GET":
        return await manejarGet(id);
      case "POST":
        return await manejarPost(JSON.parse(event.body));
      case "PUT":
        return await manejarPut(id, JSON.parse(event.body));
      case "DELETE":
        return await manejarDelete(id);
      default:
        return { statusCode: 405, body: "Método no permitido" };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ mensaje: "Error interno del servidor." })
    };
  }
}

async function leerAsignaturas() {
  try {
    const datos = await fs.readFile(archivo, "utf8");
    return JSON.parse(datos);
  } catch {
    return [];
  }
}

async function guardarAsignaturas(asignaturas) {
  await fs.writeFile(archivo, JSON.stringify(asignaturas, null, 2));
}

async function manejarGet(codigo) {
  const asignaturas = await leerAsignaturas();
  const asignatura = asignaturas.find(a => a.codigo === codigo);
  return asignatura
    ? { statusCode: 200, body: JSON.stringify(asignatura) }
    : { statusCode: 404, body: "Asignatura no encontrada" };
}

async function manejarPost(nuevaAsignatura) {
  const asignaturas = await leerAsignaturas();
  if (asignaturas.find(a => a.codigo === nuevaAsignatura.codigo)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ mensaje: "La asignatura ya existe." })
    };
  }
  asignaturas.push(nuevaAsignatura);
  await guardarAsignaturas(asignaturas);
  return {
    statusCode: 201,
    body: JSON.stringify({ mensaje: "Asignatura agregada correctamente." })
  };
}

async function manejarPut(codigo, datos) {
  const asignaturas = await leerAsignaturas();
  const index = asignaturas.findIndex(a => a.codigo === codigo);
  if (index === -1) {
    return {
      statusCode: 404,
      body: JSON.stringify({ mensaje: "Asignatura no encontrada." })
    };
  }
  asignaturas[index] = { ...asignaturas[index], ...datos };
  await guardarAsignaturas(asignaturas);
  return {
    statusCode: 200,
    body: JSON.stringify({ mensaje: "Asignatura modificada exitosamente." })
  };
}

async function manejarDelete(codigo) {
  let asignaturas = await leerAsignaturas();
  const existe = asignaturas.some(a => a.codigo === codigo);
  if (!existe) {
    return {
      statusCode: 404,
      body: JSON.stringify({ mensaje: "Asignatura no encontrada." })
    };
  }
  asignaturas = asignaturas.filter(a => a.codigo !== codigo);
  await guardarAsignaturas(asignaturas);
  return {
    statusCode: 200,
    body: JSON.stringify({ mensaje: "Asignatura eliminada correctamente." })
  };
}
