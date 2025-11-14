import React, { useEffect, useState } from "react";
import { Card, Table, Button, Modal, Form } from "react-bootstrap";

export default function PaquetesView() {
  const [paquetes, setPaquetes] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editPaquete, setEditPaquete] = useState(null);

  // ===============================
  //   Cargar paquetes desde backend
  // ===============================
  const cargarPaquetes = async () => {
    try {
      const res = await fetch("http://localhost:8000/admin/paquetes");
      const data = await res.json();
      setPaquetes(data);
    } catch (error) {
      console.error("Error cargando paquetes:", error);
    }
  };

  useEffect(() => {
    cargarPaquetes();
  }, []);

  // ===============================
  //   Eliminar paquete
  // ===============================
  const eliminarPaquete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este paquete?")) return;

    try {
      const res = await fetch(`http://localhost:8000/admin/paquetes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPaquetes(paquetes.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Error eliminando paquete:", error);
    }
  };

  // ===============================
  //   Editar paquete
  // ===============================
  const abrirModalEditar = (paquete) => {
    setEditPaquete(paquete);
    setShowEdit(true);
  };

  const guardarCambios = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/admin/paquetes/${editPaquete.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editPaquete),
        }
      );

      if (res.ok) {
        // actualizar tabla sin recargar
        setPaquetes(
          paquetes.map((p) => (p.id === editPaquete.id ? editPaquete : p))
        );
        setShowEdit(false);
      }
    } catch (error) {
      console.error("Error actualizando paquete:", error);
    }
  };

  return (
    <Card className="card-alt p-4">
      <Card.Title style={{ color: "#34D399" }}>Gestión de Paquetes</Card.Title>
      <Card.Text style={{ color: "#C9D1D9" }}>
        Administra los paquetes y precios.
      </Card.Text>

      <div className="table-responsive mt-3">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Duración</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paquetes.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.nombre_paquete}</td>
                <td>${p.precio}</td>
                <td>{p.descripcion}</td>
                <td>{p.duracion_minutos} min</td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-warning"
                    className="me-2"
                    onClick={() => abrirModalEditar(p)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => eliminarPaquete(p.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/*  Modal de Edición*/}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Paquete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editPaquete && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  value={editPaquete.nombre}
                  onChange={(e) =>
                    setEditPaquete({ ...editPaquete, nombre: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  value={editPaquete.precio}
                  onChange={(e) =>
                    setEditPaquete({ ...editPaquete, precio: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  value={editPaquete.descripcion}
                  onChange={(e) =>
                    setEditPaquete({
                      ...editPaquete,
                      descripcion: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Duración (minutos)</Form.Label>
                <Form.Control
                  type="number"
                  value={editPaquete.duracion}
                  onChange={(e) =>
                    setEditPaquete({
                      ...editPaquete,
                      duracion: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={guardarCambios}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}
