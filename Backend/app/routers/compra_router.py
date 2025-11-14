from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import get_db
from .. import models, schemas

router = APIRouter(prefix="/cliente", tags=["Cliente"])

@router.get("/reservas", response_model=list[schemas.ReservaOut])
def obtener_reservas_cliente(db: Session = Depends(get_db)):

    id_usuario = 1  # temporal

    reservas = (
        db.query(models.Reserva)
        .filter(models.Reserva.id_usuario == id_usuario)
        .all()
    )

    return reservas
