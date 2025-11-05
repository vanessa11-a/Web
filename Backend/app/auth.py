import time
import bcrypt
import jwt
from decouple import config
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# ==============================
# 🔐 CONFIGURACIÓN DEL TOKEN JWT
# ==============================

JWT_SECRET = config("JWT_SECRET", default="mi_clave_segura_paintball")
JWT_ALGORITHM = config("JWT_ALGORITHM", default="HS256")


def signJWT(user_id: str, rol: int):
    """
    Genera un token JWT con ID de usuario y su rol
    """
    payload = {
        "sub": str(user_id),
        "rol": rol,
        "exp": time.time() + 60 * 60 * 4  # Expira en 4 horas
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return {"access_token": token}


def decodeJWT(token: str):
    """
    Decodifica el token JWT y devuelve el contenido
    """
    try:
        decoded = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded if decoded["exp"] >= time.time() else None
    except Exception:
        return None


# ======================================
# 🔒 CLASE JWTBearer (protege las rutas)
# ======================================

class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if credentials.scheme != "Bearer":
                raise HTTPException(status_code=403, detail="Formato de autenticación inválido")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Token inválido o expirado")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Token no proporcionado")

    def verify_jwt(self, jwtoken: str) -> bool:
        payload = decodeJWT(jwtoken)
        return bool(payload)



# ==============================
# 🔐 HASH Y VERIFICACIÓN DE CONTRASEÑAS
# ==============================

def get_password_hash(password: str) -> str:
    """
    Genera un hash seguro para almacenar en la base de datos.
    """
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica si la contraseña ingresada coincide con el hash almacenado.
    """
    try:
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
    except Exception:
        return False
