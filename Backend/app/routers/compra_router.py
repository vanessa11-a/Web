from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import get_db
from .. import models, schemas

router = APIRouter(prefix="/cliente", tags=["Cliente"])

@router.get("/reservas", response_model=list[schemas.ReservaClienteOut])
def obtener_reservas_cliente(db: Session = Depends(get_db)):

    id_usuario = 1  # temporal

    reservas = (
        db.query(models.Reserva)
        .join(models.Paquete, models.Reserva.id_paquete == models.Paquete.id_paquete)
        .join(models.Campo, models.Reserva.id_campo == models.Campo.id_campo)
        .filter(models.Reserva.id_usuario == id_usuario)
        .all()
    )

    resultado = []
    for r in reservas:
        resultado.append({
            "id_reserva": r.id_reserva,
            "paquete": r.paquete.nombre_paquete,
            "campo": r.campo.nombre_campo,
            "fecha_reserva": str(r.fecha_reserva),
            "hora_inicio": r.hora_inicio.strftime("%H:%M"),
            "hora_fin": r.hora_fin.strftime("%H:%M"),
            "estado": r.estado
        })

    return resultado

@router.get("/reservas", response_model=list[schemas.ReservaClienteOut])
def obtener_reservas_cliente(db: Session = Depends(get_db)):

    id_usuario = 1  # temporal

    reservas = (
        db.query(models.Reserva)
        .join(models.Campo, models.Campo.id_campo == models.Reserva.id_campo)
        .join(models.Paquete, models.Paquete.id_paquete == models.Reserva.id_paquete)
        .filter(models.Reserva.id_usuario == id_usuario)
        .all()
    )

    respuesta = []
    for r in reservas:
        respuesta.append({
            "id_reserva": r.id_reserva,
            "fecha_reserva": r.fecha_reserva,
            "hora_inicio": str(r.hora_inicio),
            "hora_fin": str(r.hora_fin),
            "estado": r.estado,
            "cantidad_personas": r.cantidad_personas,
            "campo": r.campo.nombre_campo,
            "paquete": r.paquete.nombre_paquete
        })

    return respuesta


#  OBTENER PAQUETES COMPRADOS POR EL CLIENTE

@router.get("/paquetes", response_model=list[schemas.PaqueteOut])
def obtener_paquetes_cliente(db: Session = Depends(get_db)):

    id_usuario = 1  # temporal

    reservas = (
        db.query(models.Reserva)
        .filter(models.Reserva.id_usuario == id_usuario)
        .all()
    )

    paquetes_ids = {r.id_paquete for r in reservas}

    paquetes = (
        db.query(models.Paquete)
        .filter(models.Paquete.id_paquete.in_(paquetes_ids))
        .all()
    )

    return paquetes