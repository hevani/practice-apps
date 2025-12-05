from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db import Base, engine
from .routes.notes import router as notes_router
from .routes.ai import router as ai_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Notebook API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(notes_router)
app.include_router(ai_router)
