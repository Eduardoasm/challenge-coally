# challenge-coally

## Despliegues:
Front: https://client-chi-wheat.vercel.app
Backend: https://challenge-coally.onrender.com

## Pre requisitos
- Node.js (V14 o mayor)
- MongoDB
- Git

## Comienzo

## Setup de Backend en local
````bash
cd api
npm install

variables de entorno:
PORT=3003
DATABASE=mongodb+srv://eduardoasm19:edu123456@cluster0.rfekn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=1f9fdac764fc6b8cdaa98a14f12f442346742b7bcafdb82128e5df54235ee532

Correr el backend:
npm run dev

Correr testing back tasks:
npm run test

Setup de frontend:
cd client
npm install

variables de entorno frontend
REACT_APP_API_URL=http://localhost:3000/api

Correr el frontend: 
npm run start

API Endpoints

Authentication
POST /api/auth/login - Login user
POST /api/auth/register - Register new user

Tasks
GET /api/tasks - Get all tasks
POST /api/tasks - Create new task
GET /api/tasks/:id - Get task by ID
PUT /api/tasks/:id - Update task
DELETE /api/tasks/:id - Delete task

Technologies Used
Frontend: React, Chakra UI, React Router
Backend: Node.js, Express, MongoDB
Authentication: JWT
````

## User for testing app

descripcion: Se realizo la autenticacion solo en el backend, por temas de tiempo no se realizo en el front