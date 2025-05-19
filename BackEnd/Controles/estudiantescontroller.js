// estudiantescontroller.js

let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

function guardarEstudiantesLS() {
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}

export function agregarEstudiante(tipoDocumento, numeroDocumento, nombres, apellidos, correo, celular, departamento, asignatura) {
    if (!tipoDocumento || !numeroDocumento || !nombres || !apellidos || !correo || !celular || !departamento || !asignatura) {
        return { exito: false, mensaje: "Todos los campos son obligatorios." };
    }

    if (estudiantes.find(est => est.numeroDocumento === numeroDocumento)) {
        return { exito: false, mensaje: "El estudiante ya está registrado." };
    }

    const nuevoEstudiante = {
        tipoDocumento,
        numeroDocumento,
        nombres,
        apellidos,
        correo,
        celular,
        departamento,
        asignatura
    };

    estudiantes.push(nuevoEstudiante);
    guardarEstudiantesLS();

    return { exito: true, mensaje: "Estudiante agregado correctamente." };
}

export function buscarEstudiante(numeroDocumento) {
    const estudiante = estudiantes.find(est => est.numeroDocumento === numeroDocumento);
    if (estudiante) {
        return { exito: true, datos: estudiante };
    } else {
        return { exito: false, mensaje: "Estudiante no encontrado." };
    }
}

export function listarEstudiantes() {
    return estudiantes;
}
