import { Card, Button } from "react-bootstrap";

export default function PagoCliente() {
  return (
    <section>
      <h3 className="title-gradient">💳 Pago</h3>

      <Card className="p-4 bg-dark text-white">
        <h5>Completar pago</h5>
        <p>Selecciona un método de pago para continuar.</p>

        <Button variant="success" className="mt-2">
          Proceder al Pago
        </Button>
      </Card>
    </section>
  );
}
