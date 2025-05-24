export async function agregarAsistencia(asistencia) {
    try {
        const res = await fetch("/.netlify/functions/asistencias", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(asistencia),
        });
        return await res.json();
    } catch {
        return { exito: false, mensaje: "Error al conectar con el servidor." };
    }
}

export async function listarAsistencias() {
    try {
        const res = await fetch("/.netlify/functions/asistencias");
        return await res.json();
    } catch {
        return [];
    }
}
