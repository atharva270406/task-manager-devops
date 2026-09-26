# Task Manager DevOps

A simple Node.js and Express REST API created for the SIT223/SIT753 7.3HD DevOps Pipeline task.

## Features

- Create tasks
- View all tasks
- View a single task
- Update tasks
- Delete tasks
- Health check endpoint
- Automated Jest/Supertest tests
- ESLint code quality checking
- npm dependency security audit
- Docker deployment
- Jenkins pipeline

## Run locally

```bash
npm install
npm start
```

The API runs at:

http://localhost:3000

Health check:

http://localhost:3000/health

## Test

```bash
npm test
```

## Code quality

```bash
npm run lint
```

## Security

```bash
npm audit --audit-level=high
```

## Build

```bash
npm run build
```
