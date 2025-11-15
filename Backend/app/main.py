from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import admin_router, auth_router, user_router
from app.db import engine
from app import models
from .routers import compra_router


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# 🔹 CORS para el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # o "http://localhost:5173" si usas Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 Incluir routers
app.include_router(admin_router.router)
app.include_router(auth_router.router)
app.include_router(user_router.router)
app.include_router(compra_router.router)

