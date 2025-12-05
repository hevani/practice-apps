import { useEffect, useState } from "react";
import { listNotes, createNote, updateNote, deleteNote, summarizeNote, ideas, rewrite } from "./api";

type Note = { id: number; title: string; content: string };

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [aiOutput, setAiOutput] = useState("");

  useEffect(() => {
    listNotes().then(setNotes);
  }, []);

  const addNote = async () => {
    const n = await createNote(title, content);
    setNotes([n, ...notes]);
    setTitle(""); setContent("");
  };

  const removeNote = async (id: number) => {
    await deleteNote(id);
    setNotes(notes.filter(n => n.id !== id));
  };

  const doSummarize = async (id: number) => {
    const res = await summarizeNote(id);
    setAiOutput(res.summary);
  };

  const doIdeas = async () => {
    const res = await ideas(content || "New project notebook", 5);
    setAiOutput(res.ideas.join("\n"));
  };

  const doRewrite = async (id: number, tone: string) => {
    const res = await rewrite(id, tone);
    setAiOutput(res.rewritten);
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1>Notebook</h1>

      <section style={{ display: "grid", gap: 8 }}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} rows={6} />
        <button onClick={addNote}>Add note</button>
        <button onClick={doIdeas}>Generate ideas</button>
      </section>

      <hr />

      <section>
        <h2>Notes</h2>
        {notes.map(n => (
          <div key={n.id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
            <strong>{n.title}</strong>
            <p style={{ whiteSpace: "pre-wrap" }}>{n.content}</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => doSummarize(n.id)}>Summarize</button>
              <button onClick={() => doRewrite(n.id, "concise")}>Rewrite concise</button>
              <button onClick={() => removeNote(n.id)}>Delete</button>
            </div>
          </div>
        ))}
      </section>

      <hr />
      <section>
        <h2>AI output</h2>
        <pre>{aiOutput}</pre>
      </section>
    </div>
  );
}
