# Task Management Board

A Trello-style task management application built with React.

## Features

- Authentication with LocalStorage
- Protected Routes
- Create Task
- Update Task
- Delete Task
- Drag & Drop
- Search Tasks
- Filter Tasks
- Sort Tasks
- Task Dependencies
- React Query
- React Hook Form
- Zod Validation

## Architecture

Server State is managed with React Query.

Form validation is handled using React Hook Form and Zod.

Routing is implemented with React Router.

Data persistence is provided by JSON Server.


## Technologies

- React
- React Router
- React Query
- Axios
- React Hook Form
- Zod
- JSON Server
- Hello Pangea DnD

## Installation

```bash
npm install
```

Run Frontend:

```bash
npm run dev
```

Run Backend:

```bash
npx json-server db.json --port 3001
```

## Project Structure

```txt
src
 ├── api
 ├── components
 ├── pages
 ├── routes
 ├── utils
```

## Author
karami