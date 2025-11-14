import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Spinner } from 'react-bootstrap';

export default function UsuariosView() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // PAGINACIÓN
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 7; // puedes cambiar este número

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/admin/usuarios");
        const data = await res.json();
        setUsuarios(data);
      } catch (error) {
        console.error("❌ Error al cargar usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  // Cálculo de paginación
  const totalPaginas = Math.ceil(usuarios.length / registrosPorPagina);
  const indiceInicial = (paginaActual - 1) * registrosPorPagina;
  const indiceFinal = indiceInicial + registrosPorPagina;
  const usuariosPagina = usuarios.slice(indiceInicial, indiceFinal);

  return (
    <Card className="card-alt p-4">
      <Card.Title style={{ color: '#34D399' }}>Gestión de Usuarios</Card.Title>
      <Card.Text style={{ color: '#C9D1D9' }}>
        Aquí puedes ver y administrar todos los usuarios registrados en el sistema.
      </Card.Text>

      {loading ? (
        <div className="text-center py-4">
          <Spinner animation="border" variant="success" />
        </div>
      ) : (
        <div className="table-responsive mt-3">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuariosPagina.length > 0 ? (
                usuariosPagina.map((u, index) => (
                  <tr key={u.id_usuario}>
                    {/* 🔥 NÚMERO SECUENCIAL (1..n) */}
                    <td>{indiceInicial + index + 1}</td>

                    <td>{u.nombre ?? "—"}</td>
                    <td>{u.email ?? "—"}</td>
                    <td>{u.telefono ?? "—"}</td>
                    <td>{u.rol ?? "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-muted">
                    No hay usuarios registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* 🔥 PAGINACIÓN */}
          <div className="d-flex justify-content-between mt-3">
            <Button
              variant="secondary"
              disabled={paginaActual === 1}
              onClick={() => setPaginaActual(paginaActual - 1)}
            >
              ⬅ Anterior
            </Button>

            <span style={{ color: '#C9D1D9' }}>
              Página {paginaActual} de {totalPaginas}
            </span>

            <Button
              variant="secondary"
              disabled={paginaActual === totalPaginas}
              onClick={() => setPaginaActual(paginaActual + 1)}
            >
              Siguiente ➜
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
