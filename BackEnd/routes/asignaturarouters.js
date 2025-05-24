export async function agregarAsignatura(asignatura) {
    try {
        const res = await fetch("/.netlify/functions/asignaturas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(asignatura),
        });
        return await res.json();
    } catch (error) {
        return { exito: false, mensaje: "Error al conectar con el servidor." };
    }
}

export async function buscarAsignaturaPorCodigo(codigo) {
    try {
        const res = await fetch(`/.netlify/functions/asignaturas/${codigo}`);
        if (!res.ok) throw new Error();
        return await res.json();
    } catch {
        return null;
    }
}

export async function listarAsignaturas() {
    try {
        const res = await fetch("/.netlify/functions/asignaturas");
        return await res.json();
    } catch {
        return [];
    }
}
