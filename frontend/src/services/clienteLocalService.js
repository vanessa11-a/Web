export const clienteService = {
  cargarPerfil() {
    return JSON.parse(localStorage.getItem("perfil")) || null;
  },

  guardarPerfil(perfil) {
    localStorage.setItem("perfil", JSON.stringify(perfil));
  },

  obtenerPaquetesComprados() {
    return JSON.parse(localStorage.getItem("paquetes")) || [];
  },

  obtenerReservas() {
    return JSON.parse(localStorage.getItem("reservas")) || [];
  },

  crearReserva: async function (reserva) {
  try {
    const response = await fetch("http://127.0.0.1:8000/cliente/reservas", {
      method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reserva),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error al crear la reserva");
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error("❌ Error creando reserva:", error);
      throw error;
    }
  }
,

  agregarPaquete(nombre) {
    const paquetes = JSON.parse(localStorage.getItem("paquetes")) || [];
    paquetes.push(nombre);
    localStorage.setItem("paquetes", JSON.stringify(paquetes));
  }
};
