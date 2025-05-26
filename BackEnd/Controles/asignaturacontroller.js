const asignaturaController = {
  async agregar(codigo, nombre, creditos, semestre) {
    try {
      const respuesta = await fetch("/.netlify/functions/asignaturas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo, nombre, creditos, semestre })
      });
      return await respuesta.json();
    } catch (error) {
      return { exito: false, mensaje: "Error de red o servidor." };
    }
  },

  async consultar(codigo) {
    try {
      const respuesta = await fetch(`/.netlify/functions/asignaturas/${codigo}`);
      if (!respuesta.ok) return null;
      return await respuesta.json();
    } catch (error) {
      return null;
    }
  },

  async modificar(codigo, nombre, creditos, semestre) {
    try {
      const respuesta = await fetch(`/.netlify/functions/asignaturas/${codigo}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, creditos, semestre })
      });
      return await respuesta.json();
    } catch (error) {
      return { exito: false, mensaje: "Error al modificar." };
    }
  },

  async eliminar(codigo) {
    try {
      const respuesta = await fetch(`/.netlify/functions/asignaturas/${codigo}`, {
        method: "DELETE"
      });
      return await respuesta.json();
    } catch (error) {
      return { exito: false, mensaje: "Error al eliminar." };
    }
  }
};
