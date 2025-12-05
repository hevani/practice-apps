const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export async function listNotes() {
  const res = await fetch(`${API_BASE}/notes`);
  return res.json();
}

export async function createNote(title: string, content: string) {
  const res = await fetch(`${API_BASE}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });
  return res.json();
}

export async function updateNote(id: number, data: Partial<{title: string; content: string;}>) {
  const res = await fetch(`${API_BASE}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteNote(id: number) {
  await fetch(`${API_BASE}/notes/${id}`, { method: "DELETE" });
}

export async function summarizeNote(id: number) {
  const res = await fetch(`${API_BASE}/ai/summarize/${id}`, { method: "POST" });
  return res.json();
}

export async function ideas(prompt: string, count = 5) {
  const res = await fetch(`${API_BASE}/ai/ideas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, count })
  });
  return res.json();
}

export async function rewrite(noteId: number, tone: string) {
  const res = await fetch(`${API_BASE}/ai/rewrite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note_id: noteId, tone })
  });
  return res.json();
}
