# app/schemas.py
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# Modelo para crear usuario (registro)
class UsuarioCreate(BaseModel):
    nombre: str
    apellido: str
    email: EmailStr
    telefono: str
    documento_identidad: str
    password: str
    rol_id: Optional[int] = 2  # por defecto "cliente"

# Modelo de respuesta (lo que devuelve el backend)
class UsuarioOut(BaseModel):
    id_usuario: int
    nombre: str
    apellido: str
    email: str
    telefono: str
    documento_identidad: str
    rol_id: int
    fecha_registro: datetime

    class Config:
        orm_mode = True

# Modelo para login
class LoginData(BaseModel):
    email: str
    password: str
