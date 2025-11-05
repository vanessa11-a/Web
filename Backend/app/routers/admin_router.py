from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.db import get_db
from app.auth import JWTBearer, decodeJWT


router = APIRouter(
    prefix="/admin",
    tags=["Administrador"],
    dependencies=[Depends(JWTBearer())]
)

@router.get("/stats")
def get_stats(db: Session = Depends(get_db), token: str = Depends(JWTBearer())):
    """
    Devuelve estadísticas generales del sistema usando SQL crudo.
    """
    try:
        # Decodificar token para obtener el rol
        payload = decodeJWT(token)
        rol = payload.get("rol")

        if rol != 1:
            raise HTTPException(status_code=403, detail="No tienes permisos de administrador")

        # 🔹 Consultas SQL crudas
        total_usuarios = db.execute(text("SELECT COUNT(*) FROM usuarios")).scalar() or 0

        try:
            total_reservas = db.execute(text("SELECT COUNT(*) FROM reservas")).scalar() or 0
        except Exception:
            total_reservas = 0

        try:
            total_campos = db.execute(text("SELECT COUNT(*) FROM campos")).scalar() or 0
        except Exception:
            total_campos = 0

        try:
            total_pagos = db.execute(text("SELECT COUNT(*) FROM pagos")).scalar() or 0
        except Exception:
            total_pagos = 0

        return {
            "usuarios": total_usuarios,
            "reservas": total_reservas,
            "campos": total_campos,
            "pagos": total_pagos
        }

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error en /admin/stats: {e}")
        raise HTTPException(status_code=500, detail="Error interno al obtener estadísticas")
