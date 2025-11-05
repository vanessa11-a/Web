from fastapi import FastAPI
from .db import Base, engine
from .routers import auth_router, user_router, admin_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Painball API")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth_router  # ajusta según tu estructura

#app = FastAPI()

# 🔥 Habilitar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # origen de tu frontend
    allow_credentials=True,
    allow_methods=["*"],  # permite todos los métodos (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # permite todos los encabezados
)

app.include_router(auth_router.router)
app.include_router(user_router.router)
app.include_router(admin_router.router)

@app.get("/")
def home():
    return {"message": "API Painball funcionando correctamente jjj"}
