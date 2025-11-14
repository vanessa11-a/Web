from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional


# =======================
#   USUARIOS
# =======================
class UsuarioCreate(BaseModel):
    nombre: str
    apellido: str
    email: EmailStr
    telefono: str
    documento_identidad: str
    password: str
    rol_id: Optional[int] = 2  # Cliente por defecto


class UsuarioOut(BaseModel):
    id_usuario: int
    nombre: str
    apellido: str
    email: str
    telefono: str
    documento_identidad: str
    rol_id: int
    fecha_registro: datetime

    model_config = {
        "from_attributes": True
    }


class LoginData(BaseModel):
    email: str
    password: str



# =======================
#   PAQUETES
# =======================
class PaqueteOut(BaseModel):
    id_paquete: int
    nombre: str
    descripcion: str
    precio: float

    model_config = {
        "from_attributes": True
    }



# =======================
#   RESERVAS
# =======================
class ReservaCreate(BaseModel):
    id_campo: int
    id_paquete: int
    fecha_reserva: str
    hora_inicio: str
    hora_fin: str
    cantidad_personas: int


from pydantic import BaseModel, field_serializer
from datetime import date, time

class ReservaOut(BaseModel):
    id_reserva: int
    id_usuario: int
    id_campo: int
    id_paquete: int
    fecha_reserva: date
    hora_inicio: time
    hora_fin: time
    cantidad_personas: int
    estado: str

    @field_serializer("hora_inicio", "hora_fin")
    def serialize_time(self, t: time):
        return t.strftime("%H:%M")

    model_config = {
        "from_attributes": True
    }

# =======================
#   PAGOS
# =======================
class PagoCreate(BaseModel):
    id_reserva: int
    id_metodo: int
    monto: float


class PagoOut(BaseModel):
    id_pago: int
    id_reserva: int
    id_metodo: int
    fecha_pago: datetime
    monto: float
    estado: str
    referencia: Optional[str]

    model_config = {
        "from_attributes": True
    }
