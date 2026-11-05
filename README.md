# Student CRUD Fullstack Application

A fullstack Student Management CRUD application featuring a **Spring Boot 3 / Java 21 REST API** backend, a **Vite + React 19 + Tailwind CSS** frontend, and **Render.com Cloud Infrastructure with PostgreSQL**.

---

## 🚀 Live Cloud Architecture (Render.com)

This application is ready for 1-click deployment on Render.com using the blueprint in `render.yaml`:
* **Frontend App:** Static Web Service running Vite React + Tailwind CSS
* **Backend API:** Dockerized Web Service running Spring Boot on Java 21 (`/chan/students`)
* **Database:** Managed PostgreSQL Database (`db_student`)

---

## 📐 Project Architecture

```
STUDENT-CRUD/
├── render.yaml                    # Render Blueprint (Infrastructure as Code)
├── CONTEXT.md                     # Context & Developer Handover guide
├── README.md                      # Project documentation
├── .gitignore                     # Git exclusions
│
├── student/                       # Spring Boot Backend
│   ├── Dockerfile                 # Multi-stage Docker build (Java 21)
│   ├── pom.xml                    # Maven configuration
│   ├── src/main/java/com/chan/student/
│   │   ├── Student.java           # JPA Entity (id, firstname, lastname, course, section)
│   │   ├── StudentRepository.java # Spring Data JPA repository
│   │   ├── StudentController.java # REST Controller with @CrossOrigin
│   │   └── StudentApplication.java
│   └── src/main/resources/
│       └── application.properties # Dynamic env config for Local & Cloud
│
└── frontend/                      # Vite + React Frontend (Tailwind CSS, No Modals)
    ├── package.json               # React 19, Tailwind CSS v4, Lucide Icons
    ├── vite.config.js             # Dev reverse proxy (/chan -> localhost:8080)
    └── src/
        ├── api/
        │   └── studentService.js  # Dynamic API client (local proxy & remote URL)
        ├── components/
        │   ├── Header.jsx         # Sticky header with counter & refresh
        │   ├── StudentForm.jsx    # Inline card form (Add & Edit modes, strictly no modal)
        │   ├── StudentTable.jsx   # Searchable table with inline delete confirmation
        │   ├── SearchBar.jsx      # Instant search & course filter
        │   └── AlertBanner.jsx    # Inline status notification banner
        ├── App.jsx                # Main coordinator & state management
        └── index.css              # Tailwind CSS styles
```

---

## 💻 Running Locally

### 1. Run the Backend (`student/`)
#### Requirements:
* Java JDK 17+ (JDK 21 recommended)
* PostgreSQL running locally (default database: `db_student`, user: `postgres`, password: `admin`)

#### Start Server:
```bash
cd student
./mvnw spring-boot:run
```
*(On Windows: `.\mvnw.cmd spring-boot:run`)*

Backend will start at: `http://localhost:8080/chan/students`

---

### 2. Run the Frontend (`frontend/`)
#### Requirements:
* Node.js v18+ and npm

#### Start Frontend:
```bash
cd frontend
npm install
npm run dev
```

> **Note for Windows PowerShell:** If you see script execution errors running `npm`, run via `cmd /c "npm run dev"` or execute `npm.cmd run dev`.

Frontend will start at: `http://localhost:5173`

---

## 📡 API Reference

Base Endpoint: `/chan/students`

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/chan/students` | Get all students | None |
| `GET` | `/chan/students/{id}` | Get student by ID | None |
| `POST` | `/chan/students` | Add new student | `{ firstname, lastname, course, section }` |
| `PUT` | `/chan/students/{id}` | Update student | `{ firstname, lastname, course, section }` |
| `DELETE` | `/chan/students/{id}` | Delete student | None |

---

## ☁️ Deployment on Render

This project uses Render Blueprints (`render.yaml`):
1. **Database:** `student-db` (PostgreSQL)
2. **Backend:** `student-backend` (Docker container using `student/Dockerfile`)
3. **Frontend:** `student-frontend` (Static site built via `cd frontend && npm install && npm run build`)

### Steps:
1. Push this repository to GitHub: `https://github.com/Aries-Chan16/student_crud.git`
2. Go to [dashboard.render.com](https://dashboard.render.com)
3. Click **"New +"** -> **"Blueprint"**
4. Connect this GitHub repository.
5. Click **"Apply"**.
