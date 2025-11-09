import { useState, useEffect } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import '../assets/css/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Animación de la barra de progreso
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2; // Más rápido
      });
    }, 30);

    // Ocultar pantalla de bienvenida después de 3.5 segundos
    const welcomeTimeout = setTimeout(() => {
      setShowWelcome(false);
      // Mostrar login inmediatamente después
      setTimeout(() => setShowLogin(true), 100);
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(welcomeTimeout);
    };
  }, []);

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
    <>
      {/* Pantalla de Bienvenida */}
      {showWelcome && (
        <div className="welcome-screen">
          <div className="characters">
            <div className="character"> &lt; </div>
            <div className="character"> &gt; </div>
            <div className="character"> &lt; </div>
            <div className="character"> &gt; </div>
          </div>
          
          <div className="floating-elements">
            <div className="floating-element"></div>
            <div className="floating-element"></div>
            <div className="floating-element"></div>
            <div className="floating-element"></div>
            <div className="floating-element"></div>
          </div>
          
          <div className="welcome-content">
            <div className="logo">
              <i className='bx bxs-shield'></i>
            </div>
            <h1 className="welcome-title">Bienvenido</h1>
            <p className="welcome-subtitle">Estamos encantados de tenerte con nosotros</p>
            
            <div className="progress-container">
              <div className="progress-text">Cargando experiencia...</div>
              <div className="progress-bar-custom">
                <div 
                  className="progress-custom"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formulario de Login - Siempre en el DOM pero oculto inicialmente */}
      <div 
        className={`login-container d-flex justify-content-center align-items-center ${!showLogin ? 'hidden' : ''}`}
        style={{
          minHeight: '100vh',
          background: 'radial-gradient(circle at top, #0f172a, #020617)',
          position: showWelcome ? 'fixed' : 'relative',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: showWelcome ? -1 : 100,
        }}
      >
        <Container>
          <Card
            className="p-4 mx-auto login-card"
            style={{
              maxWidth: '420px',
            }}
          >
            <Card.Body>
              <h2 className="text-center mb-4 login-title">
                Iniciar Sesión
              </h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#cbd5e1' }}>
                    Correo Electrónico
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-control-custom"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ color: '#cbd5e1' }}>
                    Contraseña
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-control-custom"
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    type="submit"
                    className="btn-custom"
                  >
                    Entrar
                  </Button>
                </div>

                <p className="redirect mt-4 text-center" style={{ color: '#94a3b8' }}>
                  ¿No tienes cuenta?{' '}
                  <Link 
                    to="/register" 
                    style={{ 
                      color: '#00ff99', 
                      textDecoration: 'none',
                      fontWeight: '600'
                    }}
                  >
                    Regístrate aquí
                  </Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}