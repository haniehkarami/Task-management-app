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
- writing{variant=“document” id=“52741”}
- 

## Why These Technologies Were Used

React
React was chosen to build a component-based and maintainable user interface.

React Router DOM
Used to handle navigation between pages and implement protected routes.

React Hook Form
Used for efficient form management with better performance and fewer re-renders compared to controlled forms.

Zod
Used for schema-based form validation to ensure data consistency and improve maintainability.

React Query (TanStack Query)
Used for server state management, caching, synchronization, background refetching, and mutation handling.

Axios
Used to simplify API requests and provide a cleaner abstraction over the native Fetch API.

JSON Server
Used as a mock REST API to simulate backend behavior during development.

React Toastify
Used to provide user-friendly success and error notifications.

Hello Pangea DnD
Used to implement drag-and-drop functionality for moving tasks between workflow columns.

LocalStorage
Used to persist user authentication state and keep users logged in after page refreshes.


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
