# Task Management Backend Service

This project is a simple task management backend service that includes two models: **User** and **Task**. It provides RESTful CRUD endpoints for managing tasks, allowing users to create, read, update, and delete tasks.

## Search Functionality

In addition to basic task management, this project supports **full-text search** functionality. Users can search for tasks based on their title and description fields.

### Why `tsvector` is Used for Searching

To optimize the search functionality, I utilize PostgreSQL's built-in **full-text search** feature using the `tsvector` data type. The `tsvector` type is ideal for full-text search because it tokenizes the text into lexemes (the root forms of words), which allows for faster and more accurate searching. This approach provides several advantages over traditional string matching (e.g., using `LIKE`), including:

- **Improved Performance**: Full-text search is faster for large datasets, as it uses specialized indexes (e.g., GIN) that allow quick lookups.
- **Linguistic Matching**: `tsvector` recognizes word forms and can match variations (e.g., "run", "running", "ran").
- **Ranking Results**: It can rank search results based on relevance, providing more accurate results for users.

### Reference
You can learn more about PostgreSQL's full-text search and the `tsvector` type by visiting the official PostgreSQL documentation: [PostgreSQL Full-Text Search](https://www.postgresql.org/docs/current/textsearch.html).

## Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker](https://www.docker.com/) (for PostgreSQL setup)


## Environment Variables

You can configure the environment variables by copying the `.env.example` file and renaming it to `.env`:
```bash
cp .env.example .env
```

## Getting Started

Follow these simple steps to start the project:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/task-management-backend.git
   cd task-management-backend

2. **Install dependencies:** `npm install`

3. **Running PostgreSQL DB:** `docker compose up -d`

4. **Start the service:** `npm run start:dev`


## Postman Collection

To make it easier to interact with the API, I have included a Postman collection with pre-configured requests for all endpoints. You can import this collection into Postman and start testing the API right away.

### How to Import the Postman Collection:

1. Download the [Postman Collection](./postman/task-management.postman_collection.json).
2. Open Postman and click on **Import** in the top-left corner.
3. Choose the file you downloaded, and the collection will be imported into Postman.
4. You can now use the collection to test the available API endpoints.

