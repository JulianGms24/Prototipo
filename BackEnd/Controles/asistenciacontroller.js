const asistenciaController = {
  async registrar(asistencia) {
    try {
      const respuesta = await fetch("/.netlify/functions/asistencias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(asistencia)
      });
      return await respuesta.json();
    } catch (error) {
      return { exito: false, mensaje: "Error al registrar asistencia." };
    }
  },

  async consultar(fecha, horaInicio) {
    try {
      const respuesta = await fetch(`/.netlify/functions/asistencias/${fecha}/${horaInicio}`);
      if (!respuesta.ok) return [];
      return await respuesta.json();
    } catch (error) {
      return [];
    }
  },

  async modificar(fecha, horaInicio, codigoEstudiante, nuevoEstado) {
    try {
      const respuesta = await fetch(`/.netlify/functions/asistencias/${fecha}/${horaInicio}/${codigoEstudiante}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado })
      });
      return await respuesta.json();
    } catch (error) {
      return { exito: false, mensaje: "Error al modificar asistencia." };
    }
  },

  async eliminar(fecha, horaInicio, codigoEstudiante = null) {
    try {
      const url = codigoEstudiante
        ? `/.netlify/functions/asistencias/${fecha}/${horaInicio}/${codigoEstudiante}`
        : `/.netlify/functions/asistencias/${fecha}/${horaInicio}`;
      const respuesta = await fetch(url, { method: "DELETE" });
      return await respuesta.json();
    } catch (error) {
      return { exito: false, mensaje: "Error al eliminar asistencia." };
    }
  }
};

export default asistenciaController;
