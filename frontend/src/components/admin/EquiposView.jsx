import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';

export default function EquiposView() {
  return (
    <Card className="card-alt p-4">
      <Card.Title style={{ color: '#34D399' }}>Gestión de Equipos</Card.Title>
      <Card.Text style={{ color: '#C9D1D9' }}>
        Control del inventario de equipos y accesorios.
      </Card.Text>

      <div className="table-responsive mt-3">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>5</td>
              <td>Marcadora Tippmann</td>
              <td>Armas</td>
              <td>8</td>
              <td>Disponible</td>
              <td>
                <Button size="sm" variant="outline-warning" className="me-2">Editar</Button>
                <Button size="sm" variant="outline-danger">Eliminar</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Card>
  );
}
