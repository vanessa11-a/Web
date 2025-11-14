export default function ReservasCliente() {
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
            <tr>
              <td colSpan="7" style={{ textAlign: "center" , color: "#ffffff"}}>
                No tienes reservas aún.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
