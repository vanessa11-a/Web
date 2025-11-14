import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../assets/css/modal.css";

export default function ModalCompra({ show, onHide, paquete }) {
  const [metodoPago, setMetodoPago] = useState("");
  const [mensaje, setMensaje] = useState("");

  const confirmarCompra = () => {
    if (!metodoPago) {
      setMensaje("⚠️ Debes seleccionar un método de pago.");
      return;
    }

    // ejemplo de reserva simulada
    const nuevaReserva = {
      paquete,
      metodoPago,
      fecha: new Date().toISOString().split("T")[0],
      horaInicio: "14:00",
      horaFin: "16:00",
      estado: "pendiente",
    };

    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    reservas.push(nuevaReserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));

    setMensaje("✅ Compra realizada con éxito.");

    setTimeout(() => {
      setMensaje("");
      onHide();
    }, 1500);
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <div className="modal-content">
        <h3 className="title-gradient">Comprar: {paquete}</h3>

        <p className="modal-sub">Selecciona el método de pago:</p>

        <div className="metodos-pago">
          <label>
            <input
              type="radio"
              name="pago"
              value="1"
              onChange={(e) => setMetodoPago(e.target.value)}
            />{" "}
            Tarjeta de Crédito
          </label>

          <label>
            <input
              type="radio"
              name="pago"
              value="2"
              onChange={(e) => setMetodoPago(e.target.value)}
            />{" "}
            PSE
          </label>

          <label>
            <input
              type="radio"
              name="pago"
              value="3"
              onChange={(e) => setMetodoPago(e.target.value)}
            />{" "}
            Efectivo
          </label>
        </div>

        <Button className="btn-confirmar" onClick={confirmarCompra}>
          Confirmar Compra
        </Button>

        <Button className="btn-cerrar" onClick={onHide}>
          Cancelar
        </Button>

        <p className="modal-msg">{mensaje}</p>
      </div>
    </Modal>
  );
}
