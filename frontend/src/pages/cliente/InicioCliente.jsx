import { useEffect, useState } from "react";

export default function InicioCliente() {
  const [reservasActivas, setReservasActivas] = useState(0);
  const [paquetesComprados, setPaquetesComprados] = useState(0);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // 👉 Obtener todas las reservas del cliente
        const resReservas = await fetch("http://127.0.0.1:8000/cliente/reservas");
        const reservas = await resReservas.json();

        // 👉 1. Calcular reservas activas
        const activas = reservas.filter(
          (r) => r.estado === "pendiente" || r.estado === "confirmada"
        ).length;
        setReservasActivas(activas);

        // 👉 2. Calcular paquetes comprados (únicos)
        const paquetesUnicos = new Set(reservas.map((r) => r.id_paquete));
        setPaquetesComprados(paquetesUnicos.size);

      } catch (error) {
        console.error("❌ Error cargando datos del cliente:", error);
      }
    };

    cargarDatos();
  }, []);

  return (
    <section id="inicio" className="section">
      <h2 className="title-gradient">¡Bienvenido, Jugador!</h2>
      <p className="subtitle">Gestiona tus paquetes, reservas y perfil.</p>

      <div className="stat-card-row">
        <div className="stat-card">
          <h4>Reservas Activas</h4>
          <span>{reservasActivas}</span>
        </div>

        <div className="stat-card">
          <h4>Paquetes Comprados</h4>
          <span>{paquetesComprados}</span>
        </div>
      </div>
    </section>
  );
}
