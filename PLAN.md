# Student CRUD Application - Project Documentation & Deployment Guide

## 1. Project Overview & Architecture
This is a Full-Stack CRUD (Create, Read, Update, Delete) management system for Students.

- **Backend**: Spring Boot (Java 21, Maven, JPA / Hibernate, PostgreSQL) located in `./student`
  - Base URL / Controller: `/chan/students`
  - Cross-Origin: `@CrossOrigin(origins = "*")`
  - Entity Schema (`Student`):
    - `id` (Integer, Primary Key, Auto-generated)
    - `firstname` (String)
    - `lastname` (String)
    - `course` (String)
    - `section` (String)
- **Frontend**: Vite + React + JavaScript styled with **Tailwind CSS**, located in `./frontend`
- **UI Architecture**: **Strictly NON-MODAL master-detail interface** with inline edit and delete confirmations.

---

## 2. Render.com Deployment Configuration (`render.yaml`)

The repository includes a blueprint specification in `render.yaml` modeled after the reference deployment:

```yaml
services:
  # 🚀 Backend (Docker) 🚀
  - type: web
    name: student-backend
    env: docker
    plan: free
    dockerfilePath: ./student/Dockerfile
    dockerContext: ./student
    envVars:
      - key: DB_HOST
        fromDatabase:
          name: student-db
          property: host
      - key: DB_PORT
        fromDatabase:
          name: student-db
          property: port
      - key: DB_NAME
        fromDatabase:
          name: student-db
          property: database
      - key: DATABASE_USERNAME
        fromDatabase:
          name: student-db
          property: user
      - key: DATABASE_PASSWORD
        fromDatabase:
          name: student-db
          property: password
      - key: CORS_ALLOWED_ORIGINS
        value: "*"
      - key: DB_SSL_MODE
        value: require
      - key: PORT
        value: "8080"

  # 🚀 Frontend (Static) 🚀
  - type: web
    name: student-frontend
    env: static
    buildCommand: cd frontend && npm install && npm run build
    staticPublishPath: frontend/dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
    envVars:
      - key: VITE_API_BASE_URL
        fromService:
          type: web
          name: student-backend
          property: host

databases:
  - name: student-db
    plan: free
    databaseName: db_student
```

### Components Prepared for Render:
1. **`render.yaml`**: Root blueprint orchestrating the Dockerized backend service, static frontend site, and managed PostgreSQL database.
2. **`student/Dockerfile`**: Multi-stage Docker build utilizing Eclipse Temurin 21 JDK (Alpine) to compile the Spring Boot JAR with Maven and Eclipse Temurin 21 JRE for a lightweight runtime container.
3. **`student/src/main/resources/application.properties`**: Parameterized with environment variables (`DB_HOST`, `DB_PORT`, `DB_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `DB_SSL_MODE`, `PORT`) with automatic fallbacks for local execution.
4. **`frontend/src/api/studentService.js`**: Dynamic URL resolution (`getApiRoot()`) using `import.meta.env.VITE_API_BASE_URL` with automatic protocol and `.onrender.com` format handling in production, and relative paths in local development.
5. **`.gitignore`**: Clean tracking excluding `node_modules`, `dist`, `target`, and IDE caches.

---

## 3. How to Deploy to Render.com

1. Push your repository to GitHub / GitLab.
2. Log in to [Render.com](https://render.com).
3. In your dashboard, click **"New +"** and choose **"Blueprint"**.
4. Connect your GitHub repository.
5. Render will automatically detect `render.yaml` and provision:
   - **`student-db`**: PostgreSQL database (`db_student`)
   - **`student-backend`**: Dockerized Spring Boot API
   - **`student-frontend`**: Static Vite React web app
6. Click **"Apply"** to start the automatic build and deployment.

---

## 4. Local Execution

### Backend (Spring Boot):
```bash
cd student
.\mvnw.cmd spring-boot:run
```
*(Runs on `http://localhost:8080`)*

### Frontend (Vite + React + Tailwind):
```bash
cd frontend
npm run dev
```
*(Runs on `http://localhost:5173`, automatically proxies `/chan/*` to `http://localhost:8080`)*
