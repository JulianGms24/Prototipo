// archivo: netlify/functions/asistencias.js

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const DB_PATH = join(__dirname, "asistencias.json");

const leerDB = () => {
  if (!existsSync(DB_PATH)) writeFileSync(DB_PATH, "[]", "utf-8");
  return JSON.parse(readFileSync(DB_PATH, "utf-8"));
};

const guardarDB = (data) => {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
};

export async function handler(event) {
  const metodo = event.httpMethod;
  const asistencias = leerDB();

  if (metodo === "POST") {
    const nueva = JSON.parse(event.body);
    asistencias.push(nueva);
    guardarDB(asistencias);
    return {
      statusCode: 200,
      body: JSON.stringify({ exito: true, mensaje: "Asistencia registrada." })
    };
  }

  if (metodo === "GET") {
    const { fecha, horaInicio } = event.queryStringParameters || {};
    if (!fecha || !horaInicio) {
      return {
        statusCode: 400,
        body: JSON.stringify({ mensaje: "Se requiere fecha y horaInicio." })
      };
    }
    const encontrados = asistencias.filter(a => a.fecha === fecha && a.horaInicio === horaInicio);
    return {
      statusCode: 200,
      body: JSON.stringify(encontrados)
    };
  }

  if (metodo === "PUT") {
    const { fecha, horaInicio, codigo, nuevoEstado } = JSON.parse(event.body);
    const index = asistencias.findIndex(a => a.fecha === fecha && a.horaInicio === horaInicio && a.codigo === codigo);
    if (index === -1) {
      return {
        statusCode: 404,
        body: JSON.stringify({ mensaje: "Registro no encontrado." })
      };
    }
    asistencias[index].estado = nuevoEstado;
    guardarDB(asistencias);
    return {
      statusCode: 200,
      body: JSON.stringify({ mensaje: "Asistencia modificada." })
    };
  }

  if (metodo === "DELETE") {
    const { fecha, horaInicio, codigo } = event.queryStringParameters;
    let nuevos;

    if (codigo) {
      nuevos = asistencias.filter(a => !(a.fecha === fecha && a.horaInicio === horaInicio && a.codigo === codigo));
    } else {
      nuevos = asistencias.filter(a => !(a.fecha === fecha && a.horaInicio === horaInicio));
    }

    if (nuevos.length === asistencias.length) {
      return {
        statusCode: 404,
        body: JSON.stringify({ mensaje: "No se encontraron asistencias para eliminar." })
      };
    }

    guardarDB(nuevos);
    return {
      statusCode: 200,
      body: JSON.stringify({ mensaje: "Asistencia(s) eliminada(s)." })
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ mensaje: "Método no permitido." })
  };
}

