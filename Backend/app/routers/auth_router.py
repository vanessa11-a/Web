from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, auth
from ..db import get_db

router = APIRouter(prefix="/auth", tags=["Autenticación"])

@router.post("/register", response_model=schemas.UsuarioOut)
def register(user: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    print("📩 Datos recibidos:", user.dict())  # <---- agrega esta línea temporalmente
    # Validar si ya existe email
    existing_user = db.query(models.Usuario).filter(models.Usuario.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="El email ya está registrado.")

    hashed_pw = auth.hash_password(user.password)
    new_user = models.Usuario(
        nombre=user.nombre,
        apellido=user.apellido,
        email=user.email,
        telefono=user.telefono,                      # ✅ campo correcto
        documento_identidad=user.documento_identidad,  # ✅ campo correcto
        contrasena_hash=hashed_pw,
        rol_id=user.rol_id
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login")
def login(data: schemas.LoginData, db: Session = Depends(get_db)):
    user = db.query(models.Usuario).filter(models.Usuario.email == data.email).first()
    if not user or not auth.verify_password(data.password, user.contrasena_hash):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    token = auth.create_access_token({"sub": str(user.id_usuario), "rol": user.rol_id})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/token")
def dummy_token():
    """
    Endpoint usado solo para que Swagger muestre correctamente el botón "Authorize".
    No se usa realmente en producción.
    """
    return {"detail": "Usa /auth/login para obtener el token."}
