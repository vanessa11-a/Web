import React, { useEffect, useState } from "react";
import { Card, Table, Button, Badge, Modal, Form } from "react-bootstrap";

export default function CamposView() {
  const [campos, setCampos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCampo, setSelectedCampo] = useState(null);

  const fetchCampos = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/admin/campos");
      if (!res.ok) throw new Error("Error al obtener campos");
      const data = await res.json();
      setCampos(data);
    } catch (e) {
      console.error("❌ Error:", e);
    }
  };

  useEffect(() => {
    fetchCampos();
  }, []);

  const handleEdit = (campo) => {
    setSelectedCampo({ ...campo });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este campo?")) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/admin/campos/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Campo eliminado correctamente");
        fetchCampos();
      } else {
        alert("Error al eliminar el campo");
      }
    } catch (e) {
      console.error("❌ Error al eliminar:", e);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/admin/campos/${selectedCampo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedCampo),
        }
      );
      if (res.ok) {
        alert("Campo actualizado correctamente");
        setShowModal(false);
        fetchCampos();
      } else {
        alert("Error al actualizar el campo");
      }
    } catch (e) {
      console.error("❌ Error al guardar:", e);
    }
  };

  const renderEstado = (estado) => (
    <Badge bg={estado === "Disponible" ? "success" : "secondary"}>
      {estado}
    </Badge>
  );

  return (
    <Card className="card-alt p-4">
      <Card.Title style={{ color: "#34D399" }}>Gestión de Campos</Card.Title>
      <Card.Text style={{ color: "#ffffffff" }}>
        Lista de campos disponibles y su estado actual.
      </Card.Text>

      <div className="table-responsive mt-3">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Capacidad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {campos.length > 0 ? (
              campos.map((campo) => (
                <tr key={campo.id}>
                  <td>{campo.id}</td>
                  <td>{campo.nombre}</td>
                  <td>{campo.descripcion}</td>
                  <td>{campo.capacidad} jugadores</td>
                  <td>{renderEstado(campo.estado)}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-warning"
                      className="me-2"
                      onClick={() => handleEdit(campo)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDelete(campo.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No hay campos registrados
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* === MODAL EDITAR === */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Campo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCampo && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCampo.nombre}
                  onChange={(e) =>
                    setSelectedCampo({
                      ...selectedCampo,
                      nombre: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={selectedCampo.descripcion}
                  onChange={(e) =>
                    setSelectedCampo({
                      ...selectedCampo,
                      descripcion: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Capacidad</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedCampo.capacidad}
                  onChange={(e) =>
                    setSelectedCampo({
                      ...selectedCampo,
                      capacidad: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group>
                <Form.Check
                  type="switch"
                  id="activo-switch"
                  label="Activo"
                  checked={selectedCampo.activo === 1}
                  onChange={(e) =>
                    setSelectedCampo({
                      ...selectedCampo,
                      activo: e.target.checked ? 1 : 0,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleSave}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}
