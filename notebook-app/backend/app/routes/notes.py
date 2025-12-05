from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import get_db
from ..models import Note
from ..schemas import NoteCreate, NoteOut, NoteUpdate

router = APIRouter(prefix="/notes", tags=["notes"])

@router.get("", response_model=list[NoteOut])
def list_notes(db: Session = Depends(get_db)):
    return db.query(Note).order_by(Note.id.desc()).all()

@router.post("", response_model=NoteOut, status_code=201)
def create_note(payload: NoteCreate, db: Session = Depends(get_db)):
    note = Note(title=payload.title, content=payload.content)
    db.add(note); db.commit(); db.refresh(note)
    return note

@router.get("/{note_id}", response_model=NoteOut)
def get_note(note_id: int, db: Session = Depends(get_db)):
    note = db.query(Note).get(note_id)
    if not note: raise HTTPException(404, "Note not found")
    return note

@router.put("/{note_id}", response_model=NoteOut)
def update_note(note_id: int, payload: NoteUpdate, db: Session = Depends(get_db)):
    note = db.query(Note).get(note_id)
    if not note: raise HTTPException(404, "Note not found")
    if payload.title is not None: note.title = payload.title
    if payload.content is not None: note.content = payload.content
    db.commit(); db.refresh(note)
    return note

@router.delete("/{note_id}", status_code=204)
def delete_note(note_id: int, db: Session = Depends(get_db)):
    note = db.query(Note).get(note_id)
    if not note: raise HTTPException(404, "Note not found")
    db.delete(note); db.commit()
    return
