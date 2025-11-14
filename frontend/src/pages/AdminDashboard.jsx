import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Card, Nav } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import "../assets/css/dashboard_styles.css";
import UsuariosView from "../components/admin/UsuariosView";
import ReservasView from "../components/admin/ReservasView";
import CamposView from "../components/admin/CamposView";
import PaquetesView from "../components/admin/PaquetesView";
import EquiposView from "../components/admin/EquiposView";
import PagosView from "../components/admin/PagosView";


export default function AdminDashboard() {
  const [stats, setStats] = useState({
    usuarios: 0,
    reservas: 0,
    campos: 0,
    pagos: 0,
  });
  const [currentView, setCurrentView] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // === Cargar estadísticas desde el backend ===
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/admin/stats");
        if (!response.ok) throw new Error("Error al obtener estadísticas");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("❌ Error al cargar estadísticas:", error);
      }
    };
    fetchStats();
  }, []);

  // === Datos para la gráfica de barras ===
  const chartData = [
    { name: 'Usuarios', cantidad: stats.usuarios },
    { name: 'Reservas', cantidad: stats.reservas },
    { name: 'Campos', cantidad: stats.campos },
    { name: 'Pagos Pendientes', cantidad: stats.pagos },
  ];

  // === Cierre de sesión simulado ===
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };


  // === Iconos SVG ===
  const Icon = ({ path, color = 'currentColor', size = '1.2em' }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill={color}
      style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }}
    >
      <path d={path} />
    </svg>
  );

  const icons = useMemo(() => ({
    dashboard: "M224,96v64a8,8,0,0,1-8,8H192v40a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V104a8,8,0,0,1,8-8H160V64a8,8,0,0,0-16,0V88H72V64a8,8,0,0,0-16,0V88H32a8,8,0,0,0-8,8v64a8,8,0,0,0,8,8H56v40a16,16,0,0,0,16,16h112a16,16,0,0,0,16-16V168h24A8,8,0,0,0,224,160ZM176,168V216H72V168ZM72,96v56h16V96Zm32,0v56h16V96Zm32,0v56h16V96Zm32,0v56h16V96Z",
    users: "M234.3,210.6A120.2,120.2,0,0,0,128,24a120.2,120.2,0,0,0-106.3,186.6,8,8,0,0,0,14.6,6.8A104,104,0,0,1,128,40a104,104,0,0,1,91.7,177.4,8,8,0,0,0,14.6-6.8ZM128,144A48,48,0,1,0,80,96,48.1,48.1,0,0,0,128,144Zm0-80a32,32,0,1,1-32,32A32,32,0,0,1,128,64Z",
    reserves: "M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm-8,12v32H48V52ZM40,200V104H216v96Zm56-80a8,8,0,0,1,16,0v48a8,8,0,0,1-16,0Z",
    fields: "M228,188H28a12,12,0,0,1-12-12V80A12,12,0,0,1,28,68H228a12,12,0,0,1,12,12v96A12,12,0,0,1,228,188ZM28,84V172H228V84Zm100,56a8,8,0,0,0,8-8V108a8,8,0,0,0-16,0v28A8,8,0,0,0,128,140Z",
    packages: "M136,104a8,8,0,0,0-16,0v56a8,8,0,0,0,16,0Zm112-24V200a16,16,0,0,1-16,16H152V184a8,8,0,0,0-16,0v32H40a16,16,0,0,1-16-16V80a16,16,0,0,1,16-16H232A16,16,0,0,1,248,80ZM40,80h64v80H40ZM152,160V80h80v80Z",
    equipment: "M104,80a24,24,0,0,1,48,0V120H104ZM224,136H208V120a80,80,0,0,0-160,0v16H32a8,8,0,0,0-8,8v64a8,8,0,0,0,8,8h72v16H72a8,8,0,0,0,0,16h40a8,8,0,0,0,0-16H96V216h64v16h-16a8,8,0,0,0,0,16h40a8,8,0,0,0,0-16H184V144h24a8,8,0,0,0,8-8V136Z",
    payments: "M192,72H64a40,40,0,0,0-40,40v40a40,40,0,0,0,40,40H192a40,40,0,0,0,40-40V112A40,40,0,0,0,192,72Zm-8,88H72a8,8,0,0,1,0-16H184a8,8,0,0,1,0,16ZM72,120a24,24,0,1,1,24,24A24.1,24.1,0,0,1,72,120Zm104,40a8,8,0,0,1-8-8V112a8,8,0,0,1,16,0v40A8,8,0,0,1,176,160Z",
    exit: "M160,208H80V48h80a8,8,0,0,0,0-16H80A16,16,0,0,0,64,48V208a16,16,0,0,0,16,16h80a8,8,0,0,0,0-16ZM224,120l-40-32a8,8,0,0,0-8,1.6,8,8,0,0,0,1.6,12.8L208,120H136a8,8,0,0,0,0,16h72l-22.4,17.6a8,8,0,0,0-1.6,12.8,8,8,0,0,0,5.6,2.4,8,8,0,0,0,5.6-2.4l40-32A8,8,0,0,0,224,120Z",
  }), []);

  const StatCard = ({ title, value, color, iconPath }) => (
    <Col sm={6} md={3} className="mb-4">
      <Card className="card-alt stat-card shadow-toxic-s">
        <Card.Body className="d-flex flex-column align-items-center text-center">
          <Icon path={iconPath} color={color} size="2.5em" />
          <Card.Title style={{ color: '#C9D1D9' }} className="mt-2">{title}</Card.Title>
          <Card.Text className="display-4 fw-bold" style={{ color }}>
            {value}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );

  if (!isAuthenticated) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#0D1117' }}>
        {currentView === 'logout-message' ? (
          <div className="text-center p-5 card-alt rounded-3 shadow-toxic-s" style={{ maxWidth: '400px' }}>
            <h2 className="title-gradient mb-4">¡Sesión Cerrada!</h2>
            <p style={{ color: '#C9D1D9' }}>Acceso de administrador finalizado.</p>
            <button className="btn-lava mt-3" onClick={() => setIsAuthenticated(true)}>
              Volver al Panel
            </button>
          </div>
        ) : (
          <h3 style={{ color: '#34D399' }}>Cargando Sistema Táctico...</h3>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="admin-layout d-flex flex-lg-row flex-column">
        {/* === SIDEBAR === */}
        <aside className="sidebar d-flex flex-column justify-content-between">
          <div>
            <h3 className="text-center mb-4 title-gradient">
              <Icon path={icons.dashboard} color="#161B22" size="1.5em" />
              Paintball Admin
            </h3>

            <Nav className="flex-column">
              <Nav.Link className={`nav-link-custom ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentView('dashboard')}>
                <Icon path={icons.dashboard} color={currentView === 'dashboard' ? '#161B22' : 'currentColor'} />Dashboard
              </Nav.Link>
              <Nav.Link className={`nav-link-custom ${currentView === 'users' ? 'active' : ''}`} onClick={() => setCurrentView('users')}>
                <Icon path={icons.users} color={currentView === 'users' ? '#161B22' : 'currentColor'} />Usuarios
              </Nav.Link>
              <Nav.Link className={`nav-link-custom ${currentView === 'reserves' ? 'active' : ''}`} onClick={() => setCurrentView('reserves')}>
                <Icon path={icons.reserves} color={currentView === 'reserves' ? '#161B22' : 'currentColor'} />Reservas
              </Nav.Link>
              <Nav.Link className={`nav-link-custom ${currentView === 'fields' ? 'active' : ''}`} onClick={() => setCurrentView('fields')}>
                <Icon path={icons.fields} color={currentView === 'fields' ? '#161B22' : 'currentColor'} />Campos
              </Nav.Link>
              <Nav.Link className={`nav-link-custom ${currentView === 'packages' ? 'active' : ''}`} onClick={() => setCurrentView('packages')}>
                <Icon path={icons.packages} color={currentView === 'packages' ? '#161B22' : 'currentColor'} />Paquetes
              </Nav.Link>
              <Nav.Link className={`nav-link-custom ${currentView === 'equipment' ? 'active' : ''}`} onClick={() => setCurrentView('equipment')}>
                <Icon path={icons.equipment} color={currentView === 'equipment' ? '#161B22' : 'currentColor'} />Equipos
              </Nav.Link>
              <Nav.Link className={`nav-link-custom ${currentView === 'payments' ? 'active' : ''}`} onClick={() => setCurrentView('payments')}>
                <Icon path={icons.payments} color={currentView === 'payments' ? '#161B22' : 'currentColor'} />Pagos
              </Nav.Link>
            </Nav>
          </div>

          <button onClick={handleLogout} className="btn-lava w-100 mt-4">
            <Icon path={icons.exit} color="#0D1117" />
            Salir
          </button>
        </aside>

        {/* === MAIN CONTENT === */}
        <main className="main-content">
          <h2 className="title-gradient fw-bold mb-2">Panel de Control</h2>
          <p style={{ color: '#C9D1D999' }} className="mb-4">
            Bienvenido, administrador. Aquí puedes monitorear y gestionar el sistema.
          </p>

          {/* === DASHBOARD CARDS === */}
          <Container fluid className="p-0">
            <Row className="g-4">
              <StatCard title="Usuarios Registrados" value={stats.usuarios} color={'#34D399'} iconPath={icons.users} />
              <StatCard title="Reservas Activas" value={stats.reservas} color={'#06B6D4'} iconPath={icons.reserves} />
              <StatCard title="Campos Disponibles" value={stats.campos} color={'#34D399'} iconPath={icons.fields} />
              <StatCard title="Pagos Pendientes" value={stats.pagos} color="#F87171" iconPath={icons.payments} />
            </Row>

            <Row className="mt-5">
              <Col lg={12}>
                <Card className="card-alt p-4">
                  {currentView === 'dashboard' && (
                    <>
                      <Card.Title style={{ color: '#34D399' }} className="fs-4">
                        Resumen General del Sistema
                      </Card.Title>
                      <Card.Text style={{ color: '#C9D1D9' }}>
                        Métricas clave del sistema Paintball EMD.
                      </Card.Text>

                      {/* === GRÁFICA DE BARRAS === */}
                      <div
                        style={{
                          height: '350px',
                          background: 'rgba(52, 211, 153, 0.05)',
                          borderRadius: '10px',
                          padding: '1rem'
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#34D39930" />
                            <XAxis dataKey="name" stroke="#C9D1D9" />
                            <YAxis stroke="#C9D1D9" />
                            <Tooltip
                              contentStyle={{ backgroundColor: '#161B22', border: 'none' }}
                              labelStyle={{ color: '#34D399' }}
                            />
                            <Legend wrapperStyle={{ color: '#C9D1D9' }} />
                            <Bar dataKey="cantidad" fill="#34D399" barSize={50} radius={[10, 10, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </>
                  )}

                  {currentView === 'users' && <UsuariosView />}
                  {currentView === 'reserves' && <ReservasView />}
                  {currentView === 'fields' && <CamposView />}
                  {currentView === 'packages' && <PaquetesView />}
                  {currentView === 'equipment' && <EquiposView />}
                  {currentView === 'payments' && <PagosView />}
                </Card>

              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </>
  );
}
