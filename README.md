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
- Sort by newest or oldest
- Clear all completed todos
- Expandable descriptions
- Input validation
- Timestamps on todos
- Responsive dark mode UI with Tailwind CSS

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

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| GET    | /api/todos      | Get all todos     |
| GET    | /api/todos/{id} | Get todo by ID    |
| POST   | /api/todos      | Create a new todo |
| PUT    | /api/todos/{id} | Update a todo     |
| DELETE | /api/todos/{id} | Delete a todo     |

```

```
