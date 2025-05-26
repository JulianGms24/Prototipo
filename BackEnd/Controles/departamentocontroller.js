const departamentoController = {
  async registrar(departamento) {
    try {
      const respuesta = await fetch("/.netlify/functions/departamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(departamento)
      });
      return await respuesta.json();
    } catch (error) {
      return { exito: false, mensaje: "Error al registrar departamento." };
    }
  },

  async consultar(nombre) {
    try {
      const respuesta = await fetch(`/.netlify/functions/departamentos/${nombre}`);
      if (!respuesta.ok) return null;
      return await respuesta.json();
    } catch (error) {
      return null;
    }
  },

  async modificar(nombre, nuevoNombre) {
    try {
      const respuesta = await fetch(`/.netlify/functions/departamentos/${nombre}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nuevoNombre })
      });
      return await respuesta.json();
    } catch (error) {
      return { exito: false, mensaje: "Error al modificar departamento." };
    }
  },

  async eliminar(nombre) {
    try {
      const respuesta = await fetch(`/.netlify/functions/departamentos/${nombre}`, {
        method: "DELETE"
      });
      return await respuesta.json();
    } catch (error) {
      return { exito: false, mensaje: "Error al eliminar departamento." };
    }
  }
};

export default departamentoController;
