import { useState } from "react";
import ModalCompra from "./ModalCompra";

import v1 from "../../assets/IMG/V1.png";
import v2 from "../../assets/IMG/v2.png";
import v3 from "../../assets/IMG/v3.png";

export default function PaquetesCliente() {
  const [modalShow, setModalShow] = useState(false);
  const [paqueteActual, setPaqueteActual] = useState("");

  const abrirModal = (paquete) => {
    setPaqueteActual(paquete);
    setModalShow(true);
  };

  return (
    <section id="paquetes" className="section">
      <h3 className="title-gradient">🎯 Paquetes Disponibles</h3>

      <div className="package-grid">

        {/* PAQUETE 1 */}
        <div className="package-card">
          <img src={v1} alt="Paquete Novato" />
          <h4>Paquete Novato</h4>
          <p>
            Ideal para partidas rápidas. <br /> 500 bolas de pintura.
          </p>
          <div className="price">$25.000</div>

          <button
            className="buy-btn"
            onClick={() => abrirModal("Paquete Novato")}
          >
            Comprar
          </button>
        </div>

        {/* PAQUETE 2 */}
        <div className="package-card">
          <img src={v2} alt="Paquete Táctico" />
          <h4>Paquete Táctico</h4>
          <p>
            Juego extendido. <br /> 1500 bolas + 1 hora extra.
          </p>
          <div className="price">$60.000</div>

          <button
            className="buy-btn"
            onClick={() => abrirModal("Paquete Táctico")}
          >
            Comprar
          </button>
        </div>

        {/* PAQUETE 3 */}
        <div className="package-card">
          <img src={v3} alt="Paquete Élite" />
          <h4>Paquete Élite</h4>
          <p>
            Juego ilimitado y equipo premium. <br /> 3000 bolas + 2 horas.
          </p>
          <div className="price">$110.000</div>

          <button
            className="buy-btn"
            onClick={() => abrirModal("Paquete Élite")}
          >
            Comprar
          </button>
        </div>
      </div>

      {/* MODAL DE COMPRA */}
      <ModalCompra
        show={modalShow}
        onHide={() => setModalShow(false)}
        paquete={paqueteActual}
      />
    </section>
  );
}
