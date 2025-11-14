export default function PerfilCliente() {
  return (
    <section id="perfil" className="section">
      <h3 className="title-gradient">👤 Mi Perfil</h3>

      <div className="perfil-container">
        <form className="perfil-form">
          <label>Nombre:</label>
          <input type="text" defaultValue="Kelly Vanessa" required />

          <label>Email:</label>
          <input type="email" defaultValue="kelly@example.com" required />

          <label>Teléfono:</label>
          <input type="text" defaultValue="3100000000" required />

          <button type="submit" className="btn-save">Guardar Cambios</button>
        </form>

        <div className="perfil-msg"></div>
      </div>
    </section>
  );
}
