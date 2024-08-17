

# Task Management API

## Description

This project is a Task Management API. It provides a set of RESTful endpoints to interact with tasks in a MongoDB database.

## Stack Used

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB**
- **Mongoose**
- **Docker**

## Getting Started

To start the project in a Docker environment, run:

```bash
npm run start:docker
```

This command will build and run the application in a Docker container, setting up all necessary dependencies and configurations.

Make sure to set the environment variable:

```bash
DB_URL="mongodb://db/task-management-api"
```

For running in development mode without Docker:

```bash
npm run start:dev
```

Make sure to set the environment variable:

```bash
DB_URL="mongodb://localhost:27017/task-management-api"
```

The rest of the environment variables needed are included as examples in `.env.example`.
