import { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.access_token);

      // ✅ Mostrar notificación de éxito
      toast.success('Inicio de sesión exitoso 🎉', {
        position: 'top-center',
        autoClose: 1800,
        style: {
          backgroundColor: '#0f172a',
          color: '#00ff99',
          border: '1px solid #00ff99',
          boxShadow: '0 0 10px rgba(0,255,153,0.3)',
        },
      });

      // Redirigir después de un corto delay
      setTimeout(() => navigate('/dashboard'), 1800);
    } catch {
      // ❌ Mostrar notificación de error
      toast.error('Correo o contraseña incorrectos ❌', {
        position: 'top-center',
        autoClose: 2500,
        style: {
          backgroundColor: '#1e293b',
          color: '#f87171',
          border: '1px solid #ef4444',
          boxShadow: '0 0 10px rgba(239,68,68,0.3)',
        },
      });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top, #0f172a, #020617)',
      }}
    >
      <Container>
        <Card
          className="p-4 mx-auto"
          style={{
            maxWidth: '420px',
            backgroundColor: '#111827',
            border: '1px solid #1f2937',
            boxShadow: '0 0 35px rgba(0,255,153,0.2)',
            borderRadius: '20px',
          }}
        >
          <Card.Body>
            <h2
              className="text-center mb-4"
              style={{
                color: '#00ff99',
                fontWeight: '700',
                textShadow: '0 0 15px rgba(0,255,153,0.5)',
              }}
            >
              Iniciar Sesión
            </h2>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#cbd5e1' }}>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    background: '#0f172a',
                    color: '#fff',
                    border: '1px solid #1f2937',
                    borderRadius: '10px',
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label style={{ color: '#cbd5e1' }}>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    background: '#0f172a',
                    color: '#fff',
                    border: '1px solid #1f2937',
                    borderRadius: '10px',
                  }}
                />
              </Form.Group>

              <div className="d-grid">
                <Button
                  type="submit"
                  variant="success"
                  className="btn"
                  style={{
                    backgroundColor: '#00ff99',
                    color: '#000',
                    border: 'none',
                    fontWeight: '600',
                    padding: '12px',
                    borderRadius: '12px',
                    boxShadow: '0 0 25px rgba(0,255,153,0.4)',
                  }}
                >
                  Entrar
                </Button>
              </div>

              <p className="redirect mt-4 text-center" style={{ color: '#94a3b8' }}>
                ¿No tienes cuenta?{' '}
                <Link to="/register" style={{ color: '#00ff99', textDecoration: 'none' }}>
                  Regístrate aquí
                </Link>
              </p>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
