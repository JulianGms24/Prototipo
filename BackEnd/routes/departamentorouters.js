export async function agregarDepartamento(departamento) {
    try {
        const res = await fetch("/.netlify/functions/departamentos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(departamento),
        });
        return await res.json();
    } catch {
        return { exito: false, mensaje: "Error al conectar con el servidor." };
    }
}

export async function buscarDepartamentoPorCodigo(codigo) {
    try {
        const res = await fetch(`/.netlify/functions/departamentos/${codigo}`);
        return res.ok ? await res.json() : null;
    } catch {
        return null;
    }
}

export async function listarDepartamentos() {
    try {
        const res = await fetch("/.netlify/functions/departamentos");
        return await res.json();
    } catch {
        return [];
    }
}
