from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, auth
from ..db import get_db

router = APIRouter(prefix="/auth", tags=["Autenticación"])


# =============================
# 🧩 REGISTRO DE USUARIO
# =============================
@router.post("/register", response_model=schemas.UsuarioOut)
def register(user: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    print("📩 Datos recibidos:", user.dict())  # Para debug

    # Validar si ya existe email
    existing_user = db.query(models.Usuario).filter(models.Usuario.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="El email ya está registrado.")

    # Hashear la contraseña correctamente
    hashed_pw = auth.get_password_hash(user.password)

    # Crear nuevo usuario
    new_user = models.Usuario(
        nombre=user.nombre,
        apellido=user.apellido,
        email=user.email,
        telefono=user.telefono,
        documento_identidad=user.documento_identidad,
        contrasena_hash=hashed_pw,
        rol_id=user.rol_id
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# =============================
# 🔐 LOGIN DE USUARIO
# =============================
@router.post("/login")
def login(data: schemas.LoginData, db: Session = Depends(get_db)):
    # Buscar usuario por email
    user = db.query(models.Usuario).filter(models.Usuario.email == data.email).first()

    # Verificar credenciales
    if not user or not auth.verify_password(data.password, user.contrasena_hash):
        raise HTTPException(status_code=401, detail="Correo o contraseña incorrectos")

    # Generar token con el rol y el id del usuario
    token = auth.signJWT(user.id_usuario, user.rol_id)
    return {
        "access_token": token["access_token"],
        "token_type": "bearer"
    }


# =============================
# ⚙️ TOKEN DUMMY (para Swagger)
# =============================
@router.post("/token")
def dummy_token():
    return {"detail": "Usa /auth/login para obtener el token JWT real."}
