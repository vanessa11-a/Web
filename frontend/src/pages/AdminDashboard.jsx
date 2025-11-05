import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    usuarios: 0,
    reservas: 0,
    campos: 0,
    pagos: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Simulación de fetch de estadísticas — puedes conectar con tu backend real luego
    const fetchStats = async () => {
      try {
        // const token = localStorage.getItem('token');
        // const res = await api.get('/admin/stats', {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        // setStats(res.data);
        setStats({ usuarios: 35, reservas: 12, campos: 5, pagos: 4 }); // placeholder
      } catch {
        toast.error('Error al cargar las estadísticas');
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info('Sesión cerrada');
    navigate('/login');
  };

  return (
    <div className="admin-layout d-flex">
      {/* === SIDEBAR === */}
      <aside
        className="sidebar d-flex flex-column justify-content-between p-3"
        style={{
          width: '240px',
          background: '#0f172a',
          height: '100vh',
          position: 'fixed',
          boxShadow: '2px 0 15px rgba(0,0,0,0.4)',
        }}
      >
        <div>
          <h3
            className="text-center mb-4"
            style={{
              color: '#00ff99',
              fontWeight: '700',
              letterSpacing: '1px',
            }}
          >
            ⚙️ Paintball Admin
          </h3>

          <Nav className="flex-column">
            <Nav.Link
              className="text-light mb-2"
              style={{ background: '#1e293b', borderRadius: '8px' }}
              active
            >
              🏠 Dashboard
            </Nav.Link>
            <Nav.Link className="text-secondary mb-2">👥 Usuarios</Nav.Link>
            <Nav.Link className="text-secondary mb-2">🎯 Reservas</Nav.Link>
            <Nav.Link className="text-secondary mb-2">🏞️ Campos</Nav.Link>
            <Nav.Link className="text-secondary mb-2">🎟️ Paquetes</Nav.Link>
            <Nav.Link className="text-secondary mb-2">🧰 Equipos</Nav.Link>
            <Nav.Link className="text-secondary mb-2">💳 Pagos</Nav.Link>
          </Nav>
        </div>

        <button
          onClick={handleLogout}
          className="btn w-100 mt-auto"
          style={{
            background: '#00ff99',
            color: '#000',
            border: 'none',
            fontWeight: '600',
            borderRadius: '10px',
            marginTop: '10px',
          }}
        >
          🚪 Salir
        </button>
      </aside>

      {/* === MAIN CONTENT === */}
      <main
        className="main-content"
        style={{
          marginLeft: '240px',
          padding: '40px',
          background: '#0b0f19',
          color: '#e2e8f0',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        <h2
          style={{
            color: '#00ff99',
            fontWeight: '700',
            marginBottom: '10px',
          }}
        >
          Panel de Control
        </h2>
        <p style={{ color: '#94a3b8' }}>
          Bienvenido, administrador. Aquí puedes monitorear y gestionar todo el sistema.
        </p>

        {/* === DASHBOARD CARDS === */}
        <Container fluid className="mt-4">
          <Row className="g-4">
            <Col md={3}>
              <Card
                className="text-center"
                style={{
                  background: '#1e293b',
                  border: '1px solid #2d3748',
                  borderRadius: '15px',
                  boxShadow: '0 0 20px rgba(0,255,153,0.15)',
                }}
              >
                <Card.Body>
                  <Card.Title style={{ color: '#00ffaa' }}>Usuarios Registrados</Card.Title>
                  <Card.Text style={{ fontSize: '1.8em', fontWeight: 'bold' }}>
                    {stats.usuarios}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card
                className="text-center"
                style={{
                  background: '#1e293b',
                  border: '1px solid #2d3748',
                  borderRadius: '15px',
                  boxShadow: '0 0 20px rgba(0,255,153,0.15)',
                }}
              >
                <Card.Body>
                  <Card.Title style={{ color: '#00ffaa' }}>Reservas Activas</Card.Title>
                  <Card.Text style={{ fontSize: '1.8em', fontWeight: 'bold' }}>
                    {stats.reservas}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card
                className="text-center"
                style={{
                  background: '#1e293b',
                  border: '1px solid #2d3748',
                  borderRadius: '15px',
                  boxShadow: '0 0 20px rgba(0,255,153,0.15)',
                }}
              >
                <Card.Body>
                  <Card.Title style={{ color: '#00ffaa' }}>Campos Disponibles</Card.Title>
                  <Card.Text style={{ fontSize: '1.8em', fontWeight: 'bold' }}>
                    {stats.campos}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card
                className="text-center"
                style={{
                  background: '#1e293b',
                  border: '1px solid #2d3748',
                  borderRadius: '15px',
                  boxShadow: '0 0 20px rgba(0,255,153,0.15)',
                }}
              >
                <Card.Body>
                  <Card.Title style={{ color: '#00ffaa' }}>Pagos Pendientes</Card.Title>
                  <Card.Text style={{ fontSize: '1.8em', fontWeight: 'bold' }}>
                    {stats.pagos}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
