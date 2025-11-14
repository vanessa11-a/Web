import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";

export default function ClienteHeader() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="main-header">
      <div className="logo-area">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3210/3210101.png"
          className="logo-icon"
          alt="Logo"
        />
        <h2>Zona Paintball</h2>
      </div>

      <Nav className="header-nav">
        <NavLink className="nav-link" to="/cliente/inicio">Inicio</NavLink>
        <NavLink className="nav-link" to="/cliente/reservas">Mis Reservas</NavLink>
        <NavLink className="nav-link" to="/cliente/paquetes">Paquetes</NavLink>
        <NavLink className="nav-link" to="/cliente/perfil">Mi Perfil</NavLink>
      </Nav>

      <Button variant="danger" className="btn-logout" onClick={logout}>
        Salir
      </Button>
    </header>
  );
}
