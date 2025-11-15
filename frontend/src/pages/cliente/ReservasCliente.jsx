import React, { useEffect, useState } from "react";

export default function ReservasCliente() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/cliente/reservas");

        if (!res.ok) {
          console.error("Error al obtener reservas:", res.status);
          return;
        }

        const data = await res.json();
        setReservas(data);
      } catch (error) {
        console.error("❌ Error en fetch reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  
  return (
    
      
    <section id="reservas" className="section">
      <h3 className="title-gradient">📅 Gestión de Reservas</h3>
      <p className="subtitle">Consulta, confirma o cancela tus reservas.</p>

      <div className="table-container">
        <table className="reservas-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Paquete</th>
              <th>Campo</th>
              <th>Fecha</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", color: "#ffffff" }}>
                  Cargando reservas...
                </td>
              </tr>
            ) : reservas.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", color: "#ffffff" }}>
                  No tienes reservas aún.
                </td>
              </tr>
            ) : (
              reservas.map((r, index) => (
                <tr key={r.id_reserva}>
                  <td>{index + 1}</td>
                  <td>{r.paquete}</td>
                  <td>{r.campo}</td>
                  <td>{r.fecha_reserva}</td>
                  <td>{r.hora_inicio}</td>
                  <td>{r.hora_fin}</td>
                  <td>{r.estado}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
