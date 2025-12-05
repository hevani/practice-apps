# app/routes/__init__.py

from fastapi import APIRouter

# Create a central router that can include all sub‑routers
router = APIRouter()

# Import and include your route modules here
from .notes import router as notes_router
from .ai import router as ai_router

router.include_router(notes_router, prefix="/notes", tags=["notes"])
router.include_router(ai_router, prefix="/ai", tags=["ai"])
