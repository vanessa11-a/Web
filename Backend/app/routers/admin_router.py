from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.db import get_db
from fastapi import Body


router = APIRouter(
    prefix="/admin",
    tags=["Administrador"]
)

# === 1️⃣ Estadísticas Generales ===
@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    """
    Devuelve estadísticas generales del sistema.
    """
    try:
        stats = {}
        queries = {
            "usuarios": "SELECT COUNT(*) FROM usuarios",
            "reservas": "SELECT COUNT(*) FROM reservas",
            "campos": "SELECT COUNT(*) FROM campos",
            "pagos": "SELECT COUNT(*) FROM pagos WHERE estado = 'pendiente'"
        }

        for key, query in queries.items():
            try:
                value = db.execute(text(query)).scalar()
                stats[key] = int(value) if value is not None else 0
            except Exception as e:
                print(f" Error en la consulta '{key}': {e}")
                stats[key] = 0

        print(" Resultados generados:", stats)
        return stats

    except Exception as e:
        print(f" Error general en /admin/stats: {e}")
        raise HTTPException(status_code=500, detail="Error interno al obtener estadísticas")

# ===  Usuarios ===
@router.get("/usuarios")
def get_usuarios(db: Session = Depends(get_db)):
    """
    Devuelve todos los usuarios registrados.
    """
    try:
        query = text("""
            SELECT id_usuario, nombre, apellido, email, telefono, rol, activo, fecha_registro
            FROM usuarios
            ORDER BY id_usuario ASC
        """)
        result = db.execute(query).mappings().all()
        return [dict(row) for row in result]

    except Exception as e:
        print(f" Error en /admin/usuarios: {e}")
        raise HTTPException(status_code=500, detail="Error al obtener usuarios")

# ===  Campos ===
@router.get("/campos")
def get_campos(db: Session = Depends(get_db)):
    try:
        query = text("""
            SELECT 
                id_campo,
                nombre_campo,
                descripcion,
                capacidad_personas,
                CASE 
                    WHEN activo = 1 THEN 'Disponible'
                    ELSE 'Inactivo'
                END AS estado
            FROM campos
            ORDER BY id_campo ASC
        """)
        result = db.execute(query).fetchall()

        return [
            {
                "id": r.id_campo,
                "nombre": r.nombre_campo,
                "descripcion": r.descripcion or "—",
                "capacidad": r.capacidad_personas,
                "estado": r.estado,
                "activo": 1 if r.estado == "Disponible" else 0
            }
            for r in result
        ]

    except Exception as e:
        print(f"❌ Error en /admin/campos:", e)
        raise HTTPException(status_code=500, detail="Error al obtener los campos")


#  Editar un campo existente
@router.put("/campos/{campo_id}")
def update_campo(
    campo_id: int,
    data: dict = Body(...),
    db: Session = Depends(get_db)
):
    try:
        query = text("""
            UPDATE campos
            SET nombre_campo = :nombre,
                descripcion = :descripcion,
                capacidad_personas = :capacidad,
                activo = :activo
            WHERE id_campo = :campo_id
        """)
        db.execute(query, {
            "nombre": data.get("nombre"),
            "descripcion": data.get("descripcion"),
            "capacidad": data.get("capacidad"),
            "activo": 1 if data.get("activo") else 0,
            "campo_id": campo_id
        })
        db.commit()
        return {"message": "Campo actualizado correctamente"}

    except Exception as e:
        print(f"❌ Error en update_campo:", e)
        raise HTTPException(status_code=500, detail="Error al actualizar el campo")


# Eliminar un campo
@router.delete("/campos/{campo_id}")
def delete_campo(campo_id: int, db: Session = Depends(get_db)):
    try:
        db.execute(text("DELETE FROM campos WHERE id_campo = :id"), {"id": campo_id})
        db.commit()
        return {"message": "Campo eliminado correctamente"}
    except Exception as e:
        print(f"❌ Error en delete_campo:", e)
        raise HTTPException(status_code=500, detail="Error al eliminar el campo")


# === 4️⃣ Paquetes ===
@router.get("/paquetes")
def get_paquetes(db: Session = Depends(get_db)):
    """
    Devuelve todos los paquetes disponibles.
    """
    try:
        query = text("""
            SELECT id_paquete, nombre_paquete, descripcion, precio, duracion_minutos, activo
            FROM paquetes
            ORDER BY id_paquete ASC
        """)
        result = db.execute(query).mappings().all()
        return [dict(row) for row in result]

    except Exception as e:
        print(f" Error en /admin/paquetes: {e}")
        raise HTTPException(status_code=500, detail="Error al obtener paquetes")

@router.get("/pagos")
def get_pagos(db: Session = Depends(get_db)):
    """
    Devuelve la lista de pagos con información completa:
    reserva, usuario, campo, y método de pago.
    """
    try:
        query = text("""
            SELECT 
                p.id_pago,
                r.id_reserva,
                u.nombre AS cliente,
                c.nombre_campo AS campo,
                m.nombre_metodo AS metodo_pago,
                p.monto,
                p.fecha_pago,
                p.estado,
                p.referencia,
                p.creado_en
            FROM pagos p
            LEFT JOIN reservas r ON p.id_reserva = r.id_reserva
            LEFT JOIN usuarios u ON r.id_usuario = u.id_usuario
            LEFT JOIN campos c ON r.id_campo = c.id_campo
            LEFT JOIN metodospago m ON p.id_metodo = m.id_metodo
            ORDER BY p.fecha_pago DESC
        """)

        pagos = db.execute(query).fetchall()

        resultados = [
            {
                "numero": idx + 1,  # Enumeración automática
                "cliente": p.cliente or "Desconocido",
                "campo": p.campo or "—",
                "metodo_pago": p.metodo_pago or "—",
                "monto": float(p.monto),
                "fecha_pago": p.fecha_pago,
                "estado": p.estado,
                "referencia": p.referencia,
                "creado_en": p.creado_en
            }
            for idx, p in enumerate(pagos)
        ]

        return resultados

    except Exception as e:
        print(f"❌ Error en /admin/pagos: {e}")
        raise HTTPException(status_code=500, detail="Error al obtener los pagos")


# ===  Reservas ===
@router.get("/reservas")
def get_reservas(db: Session = Depends(get_db)):
    """
    Devuelve la lista de reservas con datos de usuario y campo.
    """
    try:
        query = text("""
            SELECT 
                r.id_reserva,
                u.nombre AS cliente,
                c.nombre_campo AS campo,
                r.fecha_reserva,
                r.hora_inicio,
                r.hora_fin,
                r.estado
            FROM reservas r
            LEFT JOIN usuarios u ON r.id_usuario = u.id_usuario
            LEFT JOIN campos c ON r.id_campo = c.id_campo
            ORDER BY r.fecha_reserva DESC
        """)

        reservas = db.execute(query).fetchall()

        resultados = [
            {
                "numero": idx + 1,
                "cliente": r.cliente or "—",
                "campo": r.campo or "—",
                "fecha_reserva": r.fecha_reserva,
                "hora_inicio": r.hora_inicio,
                "hora_fin": r.hora_fin,
                "estado": r.estado or "pendiente"
            }
            for idx, r in enumerate(reservas)
        ]

        return resultados

    except Exception as e:
        print(f"❌ Error en /admin/reservas: {e}")
        raise HTTPException(status_code=500, detail="Error al obtener reservas")

