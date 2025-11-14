export default function InicioCliente() {
  return (
    <section id="inicio" className="section">
      <h2 className="title-gradient">¡Bienvenido, Jugador!</h2>
      <p className="subtitle">Gestiona tus paquetes, reservas y perfil.</p>

      <div className="stat-card-row">
        <div className="stat-card">
          <h4>Reservas Activas</h4>
          <span>0</span>
        </div>

        <div className="stat-card">
          <h4>Paquetes Comprados</h4>
          <span>0</span>
        </div>
      </div>
    </section>
  );
}
