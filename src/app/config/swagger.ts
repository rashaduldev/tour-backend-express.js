// OpenAPI 3.0 specification for the Tour booking API.
// Documents the currently mounted routes: /auth and /users.
export const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "Tour Booking API",
    version: "1.0.0",
    description:
      "REST API for the Tour booking platform. Covers authentication and admin user management.",
  },
  servers: [
    {
      url: "http://localhost:" + (process.env.PORT ?? "5000"),
      description: "Local server",
    },
  ],
  tags: [
    { name: "Auth", description: "Registration, login and social sign-in" },
    { name: "Users", description: "Admin user management" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "JWT issued by /auth endpoints. Send as: Bearer <token>",
      },
    },
    schemas: {
      PublicUser: {
        type: "object",
        properties: {
          _id: { type: "string", example: "665f1c2a9b3e4a0012ab34cd" },
          name: { type: "string", example: "Jane Doe" },
          email: { type: "string", format: "email", example: "jane@example.com" },
          photo: { type: "string", nullable: true, example: "https://example.com/jane.png" },
          role: { type: "string", enum: ["user", "admin"], example: "user" },
        },
      },
      User: {
        type: "object",
        properties: {
          _id: { type: "string", example: "665f1c2a9b3e4a0012ab34cd" },
          name: { type: "string", example: "Jane Doe" },
          email: { type: "string", format: "email", example: "jane@example.com" },
          photo: { type: "string", nullable: true },
          role: { type: "string", enum: ["user", "admin"], example: "user" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      AuthResponse: {
        type: "object",
        properties: {
          token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          user: { $ref: "#/components/schemas/PublicUser" },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: { type: "string" },
          error: { type: "string" },
        },
      },
    },
  },
  paths: {
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string", example: "Jane Doe" },
                  email: { type: "string", format: "email", example: "jane@example.com" },
                  password: { type: "string", format: "password", example: "secret123" },
                  photo: { type: "string", example: "https://example.com/jane.png" },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "User created",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/AuthResponse" } },
            },
          },
          "400": { description: "Missing required fields", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "409": { description: "Email already in use", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "500": { description: "Registration failed", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Log in with email and password",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", format: "email", example: "jane@example.com" },
                  password: { type: "string", format: "password", example: "secret123" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Login successful",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/AuthResponse" } },
            },
          },
          "400": { description: "Missing credentials", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "401": { description: "Invalid email or password", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "500": { description: "Login failed", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/auth/social": {
      post: {
        tags: ["Auth"],
        summary: "Social sign-in (find-or-create for OAuth, e.g. Google)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email"],
                properties: {
                  email: { type: "string", format: "email", example: "jane@example.com" },
                  name: { type: "string", example: "Jane Doe" },
                  photo: { type: "string", example: "https://example.com/jane.png" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Authenticated (existing or newly created user)",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/AuthResponse" } },
            },
          },
          "400": { description: "Email is required", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "500": { description: "Social login failed", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/users/admin/{email}": {
      get: {
        tags: ["Users"],
        summary: "Check whether a user is an admin",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "email",
            in: "path",
            required: true,
            schema: { type: "string", format: "email" },
            example: "jane@example.com",
          },
        ],
        responses: {
          "200": {
            description: "Admin status",
            content: {
              "application/json": {
                schema: { type: "object", properties: { admin: { type: "boolean" } } },
              },
            },
          },
          "401": { description: "Unauthorized: no token", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "403": { description: "Forbidden: invalid token", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/users": {
      get: {
        tags: ["Users"],
        summary: "List all users (admin only)",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Array of users",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/User" } },
              },
            },
          },
          "401": { description: "Unauthorized: no token", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "403": { description: "Forbidden: admin only", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/users/{id}/role": {
      patch: {
        tags: ["Users"],
        summary: "Update a user's role (admin only)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["role"],
                properties: { role: { type: "string", enum: ["user", "admin"] } },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Updated user",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/User" } },
            },
          },
          "400": { description: "role must be 'user' or 'admin'", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "401": { description: "Unauthorized: no token", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "403": { description: "Forbidden: admin only", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "404": { description: "User not found", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/users/{id}": {
      delete: {
        tags: ["Users"],
        summary: "Delete a user (admin only)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          "200": {
            description: "User deleted",
            content: {
              "application/json": {
                schema: { type: "object", properties: { deletedCount: { type: "integer", example: 1 } } },
              },
            },
          },
          "401": { description: "Unauthorized: no token", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "403": { description: "Forbidden: admin only", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          "404": { description: "User not found", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
  },
} as const;
