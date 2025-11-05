import { useState } from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    documento_identidad: '',
    password: '',
  });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    try {
      // Nota: Es buena práctica validar los datos antes de enviar la petición.
      await api.post('/auth/register', { ...form, rol_id: 2 });
      setMsg('Registro exitoso ✅ Redirigiendo...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      // Capturar el mensaje de error del backend si está disponible
      const errorMessage = err.response?.data?.message || 'Error al registrar, revisa los datos.';
      setError(errorMessage);
    }
  };

  return (
    <div className="auth-page">
      <Container className="auth-container">
        <h1 className="text-center mb-4">Crear Cuenta</h1>

        {msg && <Alert variant="success">{msg}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          {/* Fila 1: Nombre y Apellido */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  placeholder="Tu apellido"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Fila 2: Correo Electrónico y Teléfono */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="3001234567"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Fila 3: Documento de Identidad */}
          <Row className="mb-3">
            {/* Ocupa toda la fila para un mejor enfoque en un campo importante, o podrías dividirlo con otro campo */}
            <Col md={12}>
              <Form.Group>
                <Form.Label>Documento de Identidad</Form.Label>
                <Form.Control
                  name="documento_identidad"
                  value={form.documento_identidad}
                  onChange={handleChange}
                  placeholder="1054896321"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          
          {/* Fila 4: Contraseña */}
          <Row className="mb-4">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="********"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" className="w-100 btn" variant="success" size="lg">
            Registrarme
          </Button>

          <p className="redirect text-center mt-3">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </Form>
      </Container>
    </div>
  );
}