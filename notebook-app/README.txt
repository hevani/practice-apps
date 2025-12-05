Notebook App
============

A modern notebook application built with React (frontend), FastAPI (backend), and OpenAI for AI-powered features like summarization, idea generation, and rewriting notes.  
It is containerized with Docker and deployable on Kubernetes.

------------------------------------------------------------
Project Structure
------------------------------------------------------------

notebook-app/
├── backend/              FastAPI backend
│   ├── app/              Application code
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/             React frontend
│   ├── src/              React components
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf
├── k8s/                  Kubernetes manifests
│   ├── namespace.yaml
│   ├── secrets-config.yaml
│   ├── postgres.yaml
│   ├── backend.yaml
│   ├── frontend.yaml
│   └── ingress.yaml
├── docker-compose.yaml   Local dev orchestration
└── README.txt

------------------------------------------------------------
Features
------------------------------------------------------------

- Create, update, delete notes
- AI-powered:
  * Summarize notes
  * Generate ideas from prompts
  * Rewrite notes in different tones
- PostgreSQL persistence
- Dockerized frontend & backend
- Kubernetes manifests for production deployment

------------------------------------------------------------
Local Development
------------------------------------------------------------

1. Prerequisites
   - Docker & Docker Compose
   - Node.js (if you want to run frontend without Docker)
   - Python 3.11+

2. Environment Variables
   Create a .env file in the root with:

   OPENAI_API_KEY=your_openai_api_key_here

3. Run with Docker Compose
   docker-compose up --build

   Frontend → http://localhost:3000
   Backend  → http://localhost:8000

------------------------------------------------------------
Docker Build & Push
------------------------------------------------------------

# Backend
cd backend
docker build -t dockercap123/notebook-backend:latest .
docker push dockercap123/notebook-backend:latest

# Frontend
cd frontend
docker build -t dockercap123/notebook-frontend:latest .
docker push dockercap123/notebook-frontend:latest

------------------------------------------------------------
Kubernetes Deployment
------------------------------------------------------------

1. Apply manifests
   kubectl apply -f k8s/namespace.yaml
   kubectl apply -f k8s/secrets-config.yaml
   kubectl apply -f k8s/postgres.yaml
   kubectl apply -f k8s/backend.yaml
   kubectl apply -f k8s/frontend.yaml
   kubectl apply -f k8s/ingress.yaml

2. Access the app
   - If using Ingress: http://notebook.example.com
   - Or via port-forward:
     kubectl port-forward svc/frontend 8080:80 -n notebook
     Then open http://localhost:8080

------------------------------------------------------------
Security Notes
------------------------------------------------------------

- Store secrets (like OPENAI_API_KEY) in Kubernetes Secrets, not in source code.
- Restrict CORS origins in production.
- Use HTTPS with Ingress + TLS.

------------------------------------------------------------
Next Steps
------------------------------------------------------------

- Add authentication (JWT or OAuth)
- Add Alembic migrations for DB schema
- Configure CI/CD pipeline for builds and deployments
