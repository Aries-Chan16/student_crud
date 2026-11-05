# Developer & Assistant Context Handover

This file captures the full state, architectural decisions, credentials structure, and workflow context of the **Student CRUD** fullstack project. Use this file to continue work seamlessly.

---

## 📌 Project Overview & Current State

* **Repository:** [https://github.com/Aries-Chan16/student_crud.git](https://github.com/Aries-Chan16/student_crud.git)
* **Default Branch:** `main`
* **Status:** Fully developed, verified, containerized, and configured for Render.com deployment.

---

## ⚙️ Key Architectural Decisions

1. **Frontend UI/UX:**
   * **Framework:** React 19 bootstrapped with Vite 8.
   * **Styling:** Tailwind CSS v4 using `@tailwindcss/vite` plugin.
   * **Layout:** Strictly **No Modals** (as requested by user). Add and Edit operations are performed in an inline responsive sticky card form.
   * **Delete Flow:** Inline two-step confirmation right in the table row ("Confirm? [Yes] [No]") - avoids popup modals completely.
   * **Icons:** `lucide-react`.

2. **Backend API:**
   * **Framework:** Spring Boot (Java 21) with Spring Data JPA & PostgreSQL.
   * **Entity (`Student`):**
     * `id`: Integer (Auto-generated)
     * `firstname`: String
     * `lastname`: String
     * `course`: String
     * `section`: String
   * **Controller:** [`StudentController.java`](student/src/main/java/com/chan/student/StudentController.java) mapped to `/chan/students`.
   * **CORS:** Configured via `@CrossOrigin(origins = "*")` at the controller level to allow requests from the static frontend domain on Render.

3. **API Routing & Dynamic Environment Handling:**
   * In [`frontend/src/api/studentService.js`](frontend/src/api/studentService.js):
     * **Local Development:** When `VITE_API_BASE_URL` is empty, API requests use relative paths (`/chan/students`), which are forwarded to `http://localhost:8080` by the Vite development proxy defined in [`frontend/vite.config.js`](frontend/vite.config.js).
     * **Production (Render):** When `VITE_API_BASE_URL` is set (e.g. `student-backend` or `https://student-backend.onrender.com`), the function automatically resolves the URL to `https://student-backend.onrender.com/chan/students`.

4. **Render Blueprint Infrastructure (`render.yaml`):**
   * Follows the template from `https://github.com/rnvelascoua/student-crud/blob/main/render.yaml`.
   * Provisions:
     * `student-db`: Free tier PostgreSQL database (`db_student`).
     * `student-backend`: Web service built via `student/Dockerfile` (`eclipse-temurin:21-jdk-alpine` -> `eclipse-temurin:21-jre-alpine`). Environment variables `DB_HOST`, `DB_PORT`, `DB_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `CORS_ALLOWED_ORIGINS`, `DB_SSL_MODE`, `PORT` are injected automatically.
     * `student-frontend`: Static site web service building via `cd frontend && npm install && npm run build`, publishing from `frontend/dist`, with SPA rewrite rule (`/*` -> `/index.html`) and `VITE_API_BASE_URL` pointing to `student-backend`.

---

## 🚀 How to Run Locally

### 1. Frontend Development Setup
```bash
cd frontend
npm install
npm run dev
# (or cmd /c "npm run dev" on Windows)
```
Frontend runs at `http://localhost:5173`.

### 2. Backend Development Setup
Ensure PostgreSQL is running locally with a database named `db_student`:
```bash
cd student
.\mvnw.cmd spring-boot:run
```
Backend runs at `http://localhost:8080`.

---

## 🗂️ File Directory & Responsibility Map

* `render.yaml` - Infrastructure as Code blueprint for Render.com.
* `README.md` - Documentation and setup guide.
* `CONTEXT.md` - Developer handover context.
* `PLAN.md` - Initial planning specifications.
* `student/`
  * `Dockerfile` - Multi-stage container definition for backend deployment.
  * `pom.xml` - Maven dependencies (Java 21, Spring Boot Web, Spring Data JPA, PostgreSQL).
  * `src/main/resources/application.properties` - Dual local/cloud datasource config using `${ENV_VAR:fallback}`.
  * `src/main/java/com/chan/student/Student.java` - Entity definition.
  * `src/main/java/com/chan/student/StudentRepository.java` - JPA CRUD Repository.
  * `src/main/java/com/chan/student/StudentController.java` - REST Controller with endpoints.
* `frontend/`
  * `vite.config.js` - Vite configuration with Tailwind CSS plugin and localhost:8080 proxy.
  * `src/api/studentService.js` - Fetch API wrapper with dynamic base URL resolution for all CRUD calls.
  * `src/components/StudentForm.jsx` - Inline card form (Add/Edit mode, validation, clear/cancel).
  * `src/components/StudentTable.jsx` - Responsive table, search filter, inline delete confirmation.
  * `src/components/Header.jsx` - Header with total count and refresh action.
  * `src/components/SearchBar.jsx` - Multi-field search and course dropdown.
  * `src/components/AlertBanner.jsx` - Status feedback banner.
  * `src/App.jsx` - Root component coordinating state, network calls, and layout.
