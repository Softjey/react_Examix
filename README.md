
# Examix Project Documentation

## Introduction
This documentation outlines the process for setting up and developing the "Examix" project, which consists of two main parts: the client (`client`) and the server (`server`). The project utilizes `npm` for dependency management and script execution.

## Project Setup

### Initial Setup

- Before running any other scripts, make sure to execute:

  ```bash
  npm install
  ```

  This will install the necessary packages for the project's root.

### Installing Dependencies

- To install all dependencies simultaneously in both `client` and `server` directories, run the following command:

  ```bash
  npm run install-all
  ```

## Starting Development

### Concurrent Client and Server Development

- While you can start development servers for both the client and server simultaneously with:

  ```bash
  npm run dev
  ```

  It is often more convenient to open the client and server in separate console windows. This approach provides better visibility and control over the output and processes of each part of the application. However, if preferred, they can still be run concurrently in a single console.

  This command runs two processes in parallel: `dev:client` (client development server) and `dev:server` (server development server).

### Client Development

- To work solely on the client, execute:

  ```bash
  npm run dev:client
  ```

  This will start the development server for the client part of the project.

### Server Development

- For server-side development only, use:

  ```bash
  npm run dev:server
  ```

  This will start the development server for the server part of the project.

## Linting

- To perform linting (code style checks) for both the client and server simultaneously, use the command:

  ```bash
  npm run lint
  ```

## Notes

- Ensure you have `Node.js` and `npm` installed before running these commands.
- Husky configuration depends on your project's needs, make sure it is set up according to your requirements.

This documentation should assist you in efficiently starting work on the "Examix" project, utilizing defined scripts for development, testing, and project management.
