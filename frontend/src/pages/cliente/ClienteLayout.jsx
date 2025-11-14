import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "../../assets/css/cliente.css";

export default function ClienteLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* HEADER */}
      <header className="main-header">
        <div className="logo-area">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3210/3210101.png"
            className="logo-icon"
            alt="Logo"
          />
          <h2>Zona Paintball</h2>
        </div>

        <nav className="header-nav">
          <NavLink
            to="/cliente/inicio"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Inicio
          </NavLink>

          <NavLink
            to="/cliente/reservas"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Mis Reservas
          </NavLink>

          <NavLink
            to="/cliente/paquetes"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Paquetes
          </NavLink>

          <NavLink
            to="/cliente/perfil"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Mi Perfil
          </NavLink>
        </nav>

        <button className="btn-logout" onClick={logout}>Salir</button>
      </header>

      {/* CONTENIDO */}
      <main id="content" className="main-content">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Zona Paintball | Diversión y estrategia</p>
      </footer>
    </>
  );
}
