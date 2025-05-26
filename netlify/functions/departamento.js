// netlify/functions/departamentos.js

import { promises as fs } from 'fs';
import path from 'path';

const archivo = path.resolve('data/departamentos.json');

async function leerDepartamentos() {
  try {
    const data = await fs.readFile(archivo, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function guardarDepartamentos(lista) {
  await fs.writeFile(archivo, JSON.stringify(lista, null, 2));
}

export async function handler(event) {
  const { httpMethod, queryStringParameters, body } = event;
  const codigo = queryStringParameters?.codigo;

  switch (httpMethod) {
    case 'GET': {
      const departamentos = await leerDepartamentos();
      const resultado = codigo
        ? departamentos.find(d => d.codigo === codigo)
        : departamentos;
      return {
        statusCode: resultado ? 200 : 404,
        body: JSON.stringify(resultado || { mensaje: 'No encontrado' })
      };
    }

    case 'POST': {
      const nuevo = JSON.parse(body);
      const departamentos = await leerDepartamentos();
      if (departamentos.some(d => d.codigo === nuevo.codigo)) {
        return {
          statusCode: 400,
          body: JSON.stringify({ mensaje: 'Código ya registrado' })
        };
      }
      departamentos.push(nuevo);
      await guardarDepartamentos(departamentos);
      return {
        statusCode: 201,
        body: JSON.stringify({ mensaje: 'Departamento agregado con éxito' })
      };
    }

    case 'PUT': {
      const nuevosDatos = JSON.parse(body);
      const departamentos = await leerDepartamentos();
      const index = departamentos.findIndex(d => d.codigo === codigo);
      if (index === -1) {
        return {
          statusCode: 404,
          body: JSON.stringify({ mensaje: 'Departamento no encontrado' })
        };
      }
      departamentos[index] = { ...departamentos[index], ...nuevosDatos };
      await guardarDepartamentos(departamentos);
      return {
        statusCode: 200,
        body: JSON.stringify({ mensaje: 'Departamento modificado' })
      };
    }

    case 'DELETE': {
      let departamentos = await leerDepartamentos();
      const inicial = departamentos.length;
      departamentos = departamentos.filter(d => d.codigo !== codigo);
      if (departamentos.length === inicial) {
        return {
          statusCode: 404,
          body: JSON.stringify({ mensaje: 'Departamento no encontrado' })
        };
      }
      await guardarDepartamentos(departamentos);
      return {
        statusCode: 200,
        body: JSON.stringify({ mensaje: 'Departamento eliminado' })
      };
    }

    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ mensaje: 'Método no permitido' })
      };
  }
}
