  Examix Project Documentation

Examix Project Documentation
============================

Introduction
------------

Examix is an examination platform that allows educators to create, distribute, and administer tests with ease. Teachers can effortlessly craft tests and evaluate their students, making the platform a convenient solution for academic testing. The frontend is designed with React for a responsive user experience, while the backend uses Nest.js to ensure scalability and effective performance.

Prerequisites
-------------

Before initiating the setup process, ensure the following prerequisites are met:

*   Node.js is installed on your system.
*   npm (Node Package Manager) is available for managing dependencies.
*   Docker is installed for service containerization. It can be downloaded from [Docker's official website](https://www.docker.com/get-started).

Project Setup
-------------

### Initial Setup

To install all required node packages, run the following command in the terminal:

`npm install`

### Setting Up Services with Docker

Use Docker to create service containers for PostgreSQL and Redis:

`docker run -d --name postgres-examix -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=yourpassword -e POSTGRES_DB=examix -p 5432:5432 postgres`  
`docker run -d --name redis-examix -p 6379:6379 redis`

### Configuring .env Files

Environment variables must be configured before running the application. Create a `.env` file in both the `client` and `server` directories using the provided `.env.example` as a template.

### Client Configuration

`VITE_SERVER_HTTP_URL="http://localhost:4000"`  
`VITE_SERVER_WS_URL="ws://localhost:4000"`

### Server Configuration

`PORT=4000`  
`SESSION_SECRET="your_secret"`  
`DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"`  
`CACHE_URL="redis://localhost:6379"`  
`MAIL_TRANSPORT_URL="smtps://your_email_address:your_email_password@smtp.gmail.com"`

### Database Migration

After installing all dependencies, migrate the database schema with the following Prisma command:

`cd server && npx prisma migrate deploy && npx prisma generate`

Starting Development
--------------------

Run the following command to start the development servers for both the client and the server:

`npm run dev`

Client Development
------------------

To start the client in development mode, use:

`npm run dev:client`

Server Development
------------------

To start the server in development mode, use:

`npm run dev:server`

Linting
-------

Run the linting process for both the client and the server with:

`npm run lint`

Additional Commands
-------------------

For a comprehensive list of available commands for development, testing, and deployment, refer to the `package.json` files located in the root directory, and within the `client` and `server` directories of the project.

API Documentation
-----------------

Once the server is operational, you can access the full server documentation at the `/api/docs` endpoint.