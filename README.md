# Todo App

A full-stack task management application built with **Spring Boot** and **React**.

## Tech Stack

### Backend
- Java 17+
- Spring Boot 3
- Spring Data JPA
- H2 Database (in-memory)

### Frontend
- React (Vite)
- Axios
- Tailwind CSS

## Features
- Create, read, update, and delete todos
- Toggle completion status
- Inline editing
- Responsive dark mode UI

## Getting Started

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

The API will start on `http://localhost:8080`

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The app will start on `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/todos | Get all todos |
| GET | /api/todos/{id} | Get todo by ID |
| POST | /api/todos | Create a new todo |
| PUT | /api/todos/{id} | Update a todo |
| DELETE | /api/todos/{id} | Delete a todo |
```

**Step 4: Create a `.gitignore` in the root**

This tells git to ignore build files, dependencies, and IDE stuff that doesn't belong in the repo:
```
# Backend
backend/target/
backend/.mvn/
backend/mvnw
backend/mvnw.cmd
backend/*.iml
backend/.idea/

# Frontend
frontend/node_modules/
frontend/dist/

# General
.DS_Store
*.log
.env