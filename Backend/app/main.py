from fastapi import FastAPI
from .db import Base, engine
from .routers import auth_router, user_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Painball API")

app.include_router(auth_router.router)
app.include_router(user_router.router)

@app.get("/")
def home():
    return {"message": "API Painball funcionando correctamente jjj"}
