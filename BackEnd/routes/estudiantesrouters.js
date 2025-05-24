export async function agregarEstudiante(estudiante) {
    try {
        const res = await fetch("/.netlify/functions/estudiantes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(estudiante),
        });
        return await res.json();
    } catch (error) {
        return { exito: false, mensaje: "Error al conectar con el servidor." };
    }
}

export async function buscarEstudiantePorDocumento(numeroDocumento) {
    try {
        const res = await fetch(`/.netlify/functions/estudiantes/${numeroDocumento}`);
        if (!res.ok) throw new Error();
        return await res.json();
    } catch {
        return null;
    }
}

export async function listarEstudiantes() {
    try {
        const res = await fetch("/.netlify/functions/estudiantes");
        return await res.json();
    } catch {
        return [];
    }
}
