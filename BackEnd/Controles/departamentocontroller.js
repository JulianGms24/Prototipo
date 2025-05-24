let departamentos = [];

export function listarDepartamentos() {
    return {
        statusCode: 200,
        body: JSON.stringify(departamentos)
    };
}

export function agregarDepartamento(nuevo) {
    const { codigo, nombre } = nuevo;

    if (!codigo || !nombre) {
        return {
            statusCode: 400,
            body: JSON.stringify({ exito: false, mensaje: "Todos los campos son obligatorios." })
        };
    }

    const existe = departamentos.find(dep => dep.codigo === codigo);
    if (existe) {
        return {
            statusCode: 400,
            body: JSON.stringify({ exito: false, mensaje: "El departamento ya existe." })
        };
    }

    departamentos.push(nuevo);
    return {
        statusCode: 201,
        body: JSON.stringify({ exito: true, mensaje: "Departamento agregado correctamente." })
    };
}

export function buscarDepartamento(id) {
    const departamento = departamentos.find(d => d.codigo === id);
    if (departamento) {
        return {
            statusCode: 200,
            body: JSON.stringify(departamento)
        };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ mensaje: "Departamento no encontrado." })
        };
    }
}
