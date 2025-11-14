import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";

// CLIENTE 
import ClienteLayout from "./pages/cliente/ClienteLayout";
import InicioCliente from "./pages/cliente/InicioCliente";
import PaquetesCliente from "./pages/cliente/PaquetesCliente";
import ReservasCliente from "./pages/cliente/ReservasCliente";
import PerfilCliente from "./pages/cliente/PerfilCliente";
import PagoCliente from "./pages/cliente/PagoCliente";

export default function App() {
  const token = localStorage.getItem("token");
  const rol = parseInt(localStorage.getItem("rol") || "0", 10);

  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN */}
        <Route
          path="/dashboard"
          element={
            token && rol === 1 ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* CLIENTE */}
        <Route
          path="/cliente"
          element={
            token && rol === 2 ? (
              <ClienteLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="inicio" element={<InicioCliente />} />
          <Route path="paquetes" element={<PaquetesCliente />} />
          <Route path="reservas" element={<ReservasCliente />} />
          <Route path="perfil" element={<PerfilCliente />} />
          <Route path="pago" element={<PagoCliente />} />
        </Route>

        {/* DEFAULT */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
