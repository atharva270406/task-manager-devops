const request = require("supertest");
const app = require("../src/app");

describe("Task Manager API", () => {
  test("GET / returns API information", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Task Manager API is running");
  });

  test("GET /health returns UP status", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("UP");
  });

  test("GET /tasks returns a list of tasks", async () => {
    const response = await request(app).get("/tasks");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /tasks creates a new task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "Complete DevOps assignment" });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Complete DevOps assignment");
    expect(response.body.completed).toBe(false);
  });

  test("POST /tasks rejects an empty title", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "" });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Task title is required");
  });

  test("GET /tasks/999 returns 404 for an unknown task", async () => {
    const response = await request(app).get("/tasks/999");

    expect(response.statusCode).toBe(404);
  });
});
