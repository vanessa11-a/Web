from sqlalchemy import String, Integer, Boolean, DateTime, ForeignKey, DECIMAL, Enum, Time, Date, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from sqlalchemy import (
    String, Integer, Boolean, DateTime, ForeignKey,
    DECIMAL, Enum, Time, Date, Column, Text, Float
)

from sqlalchemy.orm import Mapped, mapped_column, relationship

from .db import Base
import enum


# -------------------- ROLES --------------------

class Rol(Base):
    __tablename__ = "roles"

    id_rol: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nombre_rol: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    descripcion: Mapped[str | None] = mapped_column(String(255), nullable=True)

    usuarios: Mapped[list["Usuario"]] = relationship(back_populates="rol")


# -------------------- USUARIOS --------------------

class Usuario(Base):
    __tablename__ = "usuarios"

    id_usuario: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nombre: Mapped[str] = mapped_column(String(100), nullable=False)
    apellido: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(150), unique=True, nullable=False, index=True)
    telefono: Mapped[str | None] = mapped_column(String(20))
    documento_identidad: Mapped[str | None] = mapped_column(String(50))
    contrasena_hash: Mapped[str] = mapped_column(String(255))
    rol_id: Mapped[int] = mapped_column(ForeignKey("roles.id_rol"))
    activo: Mapped[bool] = mapped_column(Boolean, default=True)
    fecha_registro: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    rol: Mapped["Rol"] = relationship(back_populates="usuarios")


# -------------------- PAQUETES --------------------

class Paquete(Base):
    __tablename__ = "paquetes"

    id_paquete: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nombre_paquete: Mapped[str] = mapped_column(String(100), nullable=False)
    descripcion: Mapped[str | None] = mapped_column(Text)
    precio: Mapped[float] = mapped_column(DECIMAL(10, 2))
    duracion_minutos: Mapped[int] = mapped_column(Integer)
    activo: Mapped[bool] = mapped_column(Boolean, default=True)

    reservas: Mapped[list["Reserva"]] = relationship(back_populates="paquete")




# -------------------- CAMPOS --------------------

class Campo(Base):
    __tablename__ = "campos"

    id_campo: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nombre_campo: Mapped[str] = mapped_column(String(100), nullable=False)
    descripcion: Mapped[str | None] = mapped_column(Text)
    capacidad_personas: Mapped[int | None] = mapped_column(Integer, default=50)
    activo: Mapped[bool] = mapped_column(Boolean, default=True)

    reservas: Mapped[list["Reserva"]] = relationship(back_populates="campo")


# -------------------- RESERVAS --------------------

class EstadoReserva(str, enum.Enum):
    pendiente = "pendiente"
    confirmada = "confirmada"
    finalizada = "finalizada"
    cancelada = "cancelada"


class Reserva(Base):
    __tablename__ = "reservas"

    id_reserva: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    id_usuario: Mapped[int] = mapped_column(ForeignKey("usuarios.id_usuario"))
    id_campo: Mapped[int] = mapped_column(ForeignKey("campos.id_campo"))
    id_paquete: Mapped[int] = mapped_column(ForeignKey("paquetes.id_paquete"))

    fecha_reserva: Mapped[Date] = mapped_column(Date)
    hora_inicio: Mapped[Time] = mapped_column(Time)
    hora_fin: Mapped[Time] = mapped_column(Time)
    cantidad_personas: Mapped[int] = mapped_column(Integer)

    estado: Mapped[EstadoReserva] = mapped_column(Enum(EstadoReserva), default=EstadoReserva.pendiente)

    creado_en: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    actualizado_en: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    usuario: Mapped["Usuario"] = relationship()
    campo: Mapped["Campo"] = relationship(back_populates="reservas")
    paquete: Mapped["Paquete"] = relationship(back_populates="reservas")

    # 🔥 ESTA LÍNEA SOLUCIONA EL ERROR 🔥
    pago: Mapped["Pago"] = relationship(back_populates="reserva", uselist=False)



# -------------------- METODO PAGO --------------------

class MetodoPago(Base):
    __tablename__ = "metodospago"

    id_metodo: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nombre: Mapped[str] = mapped_column(String(100), nullable=False)

    pagos: Mapped[list["Pago"]] = relationship("Pago", back_populates="metodo")


# -------------------- PAGO --------------------

class Pago(Base):
    __tablename__ = "pagos"

    id_pago: Mapped[int] = mapped_column(Integer, primary_key=True)
    id_reserva: Mapped[int] = mapped_column(ForeignKey("reservas.id_reserva"))
    id_metodo: Mapped[int] = mapped_column(ForeignKey("metodospago.id_metodo"))

    fecha_pago: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    monto: Mapped[float] = mapped_column(DECIMAL(10, 2))
    estado: Mapped[str] = mapped_column(String(50), default="pendiente")
    referencia: Mapped[str | None] = mapped_column(String(200))

    reserva: Mapped["Reserva"] = relationship("Reserva", back_populates="pago")
    metodo: Mapped["MetodoPago"] = relationship("MetodoPago", back_populates="pagos")
