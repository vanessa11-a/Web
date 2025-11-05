from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from .db import get_db
from . import models, auth

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

# función para obtener el usuario actual a partir del token
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token inválido o expirado",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(models.Usuario).filter(models.Usuario.id_usuario == int(user_id)).first()
    if user is None:
        raise credentials_exception
    return user

# función para verificar si el usuario actual es administrador
def get_current_admin(current_user: models.Usuario = Depends(get_current_user)):
    if current_user.rol_id != 1:  # rol_id = 1 → admin
        raise HTTPException(status_code=403, detail="No tienes permisos de administrador")
    return current_user
