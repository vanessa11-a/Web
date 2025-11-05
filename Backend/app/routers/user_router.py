from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db import get_db
from .. import models, schemas
from ..dependencies import get_current_user, get_current_admin

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

# Endpoint para obtener los datos del usuario actual
@router.get("/me", response_model=schemas.UsuarioOut)
def get_me(current_user: models.Usuario = Depends(get_current_user)):
    return current_user

# Endpoint solo para administradores
@router.get("/", response_model=list[schemas.UsuarioOut])
def listar_usuarios(db: Session = Depends(get_db), current_admin: models.Usuario = Depends(get_current_admin)):
    usuarios = db.query(models.Usuario).all()
    return usuarios
