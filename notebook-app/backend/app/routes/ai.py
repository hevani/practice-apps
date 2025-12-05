from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..db import get_db
from ..models import Note
import os
from openai import OpenAI

router = APIRouter(prefix="/ai", tags=["ai"])
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class IdeaRequest(BaseModel):
    prompt: str
    count: int = 5

class RewriteRequest(BaseModel):
    note_id: int
    tone: str  # e.g., "concise", "enthusiastic", "professional"

@router.post("/summarize/{note_id}")
def summarize(note_id: int, db: Session = Depends(get_db)):
    note = db.query(Note).get(note_id)
    if not note: raise HTTPException(404, "Note not found")
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful writing assistant."},
            {"role": "user", "content": f"Summarize the following note succinctly:\n\n{note.content}"}
        ]
    )
    return {"summary": completion.choices[0].message.content.strip()}

@router.post("/ideas")
def ideas(payload: IdeaRequest):
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You generate practical, specific ideas."},
            {"role": "user", "content": f"Give {payload.count} concrete ideas for: {payload.prompt}"}
        ]
    )
    text = completion.choices[0].message.content.strip()
    ideas = [i.strip("- ").strip() for i in text.split("\n") if i.strip()]
    return {"ideas": ideas}

@router.post("/rewrite")
def rewrite(payload: RewriteRequest, db: Session = Depends(get_db)):
    note = db.query(Note).get(payload.note_id)
    if not note: raise HTTPException(404, "Note not found")
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You rewrite text clearly, preserving meaning."},
            {"role": "user", "content": f"Rewrite the text in a {payload.tone} tone:\n\n{note.content}"}
        ]
    )
    return {"rewritten": completion.choices[0].message.content.strip()}
