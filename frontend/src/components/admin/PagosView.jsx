import React, { useEffect, useState } from "react";
import { Card, Table, Badge, Button } from "react-bootstrap";

export default function PagosView() {
  const [pagos, setPagos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const pagosPorPagina = 8;

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/admin/pagos");
        if (!response.ok) throw new Error("Error al obtener pagos");
        const data = await response.json();
        setPagos(data);
      } catch (error) {
        console.error("❌ Error al cargar pagos:", error);
      }
    };
    fetchPagos();
  }, []);

  // ===============================
  //   Paginación lógica
  // ===============================
  const indiceUltimo = paginaActual * pagosPorPagina;
  const indicePrimero = indiceUltimo - pagosPorPagina;
  const pagosPaginados = pagos.slice(indicePrimero, indiceUltimo);

  const totalPaginas = Math.ceil(pagos.length / pagosPorPagina);

  const cambiarPagina = (num) => {
    if (num >= 1 && num <= totalPaginas) {
      setPaginaActual(num);
    }
  };

  // ===============================
  //   Badge Estado
  // ===============================
  const renderEstado = (estado) => {
    const color =
      estado === "pagado"
        ? "success"
        : estado === "pendiente"
        ? "warning"
        : "info";

    return <Badge bg={color}>{estado}</Badge>;
  };

  return (
    <Card className="card-alt p-4">
      <Card.Title style={{ color: "#34D399" }}>Gestión de Pagos</Card.Title>
      <Card.Text style={{ color: "#C9D1D9" }}>
        Revisa el historial y estado de los pagos realizados.
      </Card.Text>

      <div className="table-responsive mt-3">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Campo</th>
              <th>Método de Pago</th>
              <th>Monto</th>
              <th>Fecha Pago</th>
              <th>Estado</th>
              <th>Referencia</th>
              <th>Creado En</th>
            </tr>
          </thead>
          <tbody>
            {pagosPaginados.length > 0 ? (
              pagosPaginados.map((p, index) => (
                <tr key={p.numero}>
                  {/* Números consecutivos por página */}
                  <td>{indicePrimero + index + 1}</td>
                  <td>{p.cliente}</td>
                  <td>{p.campo}</td>
                  <td>{p.metodo_pago}</td>
                  <td>${p.monto?.toLocaleString()}</td>
                  <td>{p.fecha_pago ?? "—"}</td>
                  <td>{renderEstado(p.estado)}</td>
                  <td>{p.referencia ?? "—"}</td>
                  <td>{p.creado_en ?? "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No hay pagos registrados
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* ===============================
            Controles de paginación
      ================================== */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <Button
          variant="outline-light"
          disabled={paginaActual === 1}
          onClick={() => cambiarPagina(paginaActual - 1)}
        >
          ⬅ Anterior
        </Button>

        <span style={{ color: "#C9D1D9" }}>
          Página {paginaActual} de {totalPaginas}
        </span>

        <Button
          variant="outline-light"
          disabled={paginaActual === totalPaginas}
          onClick={() => cambiarPagina(paginaActual + 1)}
        >
          Siguiente ➡
        </Button>
      </div>
    </Card>
  );
}
