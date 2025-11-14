import React, { useEffect, useState } from "react";
import { Card, Table, Button, Spinner, Badge } from "react-bootstrap";

export default function ReservasView() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  // PAGINACIÓN (igual que en Usuarios)
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 7; // puedes cambiarlo si quieres

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/admin/reservas");
        const data = await res.json();
        setReservas(data);
      } catch (error) {
        console.error("❌ Error al cargar reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  const renderEstado = (estado) => {
    const color =
      estado === "confirmada"
        ? "success"
        : estado === "pendiente"
        ? "warning"
        : "danger";
    return <Badge bg={color}>{estado}</Badge>;
  };

  // CÁLCULO DE PAGINACIÓN (igual que usuarios)
  const totalPaginas = Math.ceil(reservas.length / registrosPorPagina);
  const indiceInicial = (paginaActual - 1) * registrosPorPagina;
  const indiceFinal = indiceInicial + registrosPorPagina;
  const reservasPagina = reservas.slice(indiceInicial, indiceFinal);

  return (
    <Card className="card-alt p-4">
      <Card.Title style={{ color: "#34D399" }}>Gestión de Reservas</Card.Title>
      <Card.Text style={{ color: "#C9D1D9" }}>
        Consulta, confirma o cancela las reservas de los jugadores.
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
                <th>Cliente</th>
                <th>Campo</th>
                <th>Fecha</th>
                <th>Hora Inicio</th>
                <th>Hora Fin</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {reservasPagina.length > 0 ? (
                reservasPagina.map((r, index) => (
                  <tr key={r.id_reserva}>
                    {/* 🔥 NUMERACIÓN 1..N global */}
                    <td>{indiceInicial + index + 1}</td>

                    <td>{r.cliente}</td>
                    <td>{r.campo}</td>
                    <td>{r.fecha_reserva ?? "—"}</td>
                    <td>{r.hora_inicio ?? "—"}</td>
                    <td>{r.hora_fin ?? "—"}</td>
                    <td>{renderEstado(r.estado)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center text-muted">
                    No hay reservas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* 🔥 PAGINACIÓN IGUAL A USUARIOS */}
          <div className="d-flex justify-content-between mt-3">
            <Button
              variant="secondary"
              disabled={paginaActual === 1}
              onClick={() => setPaginaActual(paginaActual - 1)}
            >
              ⬅ Anterior
            </Button>

            <span style={{ color: "#C9D1D9" }}>
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
