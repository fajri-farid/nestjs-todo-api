# 📡 API Documentation

## 🚀 Swagger/OpenAPI Documentation

**Interactive API Documentation**: [http://localhost:3000/api](http://localhost:3000/api)

The Todo API is fully documented using **Swagger/OpenAPI 3.0** with interactive documentation. You can:

- 🔍 **Explore all endpoints** with detailed descriptions
- 🧪 **Test API calls directly** from the browser
- 📋 **View request/response schemas** with examples
- 📝 **See validation rules** and error responses
- 🎯 **Try different parameters** and see results instantly

## Quick Access

| Resource         | URL                            |
| ---------------- | ------------------------------ |
| **Swagger UI**   | http://localhost:3000/api      |
| **API Base URL** | http://localhost:3000          |
| **OpenAPI JSON** | http://localhost:3000/api-json |

---

## 🎯 API Overview

### Base URL

```
http://localhost:3000
```

### Available Tags

- **todos** - Todo CRUD operations with filtering and sorting

### Authentication

Currently no authentication required (public API)

---

## 📋 Endpoints Summary

| Method | Endpoint      | Summary                      | Status Codes  |
| ------ | ------------- | ---------------------------- | ------------- |
| GET    | `/todos`      | Get all todos with filtering | 200           |
| GET    | `/todos/{id}` | Get specific todo by ID      | 200, 404, 400 |
| POST   | `/todos`      | Create a new todo            | 201, 400      |
| PATCH  | `/todos/{id}` | Update existing todo         | 200, 404, 400 |
| DELETE | `/todos/{id}` | Delete todo by ID            | 204, 404, 400 |

---

## 📖 Using Swagger UI

### 1. **Exploring Endpoints**

- Visit [http://localhost:3000/api](http://localhost:3000/api)
- Click on any endpoint to see details
- View request/response schemas and examples

### 2. **Testing Endpoints**

- Click **"Try it out"** button
- Fill in parameters/request body
- Click **"Execute"** to make the API call
- View response in real-time

### 3. **Understanding Schemas**

- Scroll down to see **"Schemas"** section
- View data models for Todo, CreateTodoDto, etc.
- See field types, validations, and examples

---

## 🧪 Quick Testing Examples

### Using Swagger UI

1. **Create a Todo**:
   - Go to `POST /todos`
   - Click "Try it out"
   - Use example: `{"title": "Learn Swagger", "isCompleted": false}`
   - Execute and see the response

2. **Get All Todos**:
   - Go to `GET /todos`
   - Try with different query parameters
   - Example: `isCompleted=false&limit=5`

3. **Update a Todo**:
   - Go to `PATCH /todos/{id}`
   - Set ID to 1
   - Update with: `{"isCompleted": true}`

### Using cURL (Alternative)

```bash
# Create a todo
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Swagger API", "isCompleted": false}'

# Get all todos with filters
curl "http://localhost:3000/todos?isCompleted=false&limit=3"

# Get specific todo
curl http://localhost:3000/todos/1

# Update todo
curl -X PATCH http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"isCompleted": true}'

# Delete todo
curl -X DELETE http://localhost:3000/todos/1
```

---

## 📊 Request/Response Examples

### GET /todos Response

```json
[
  {
    "id": 1,
    "title": "Learn NestJS basics",
    "isCompleted": false,
    "createdAt": "2025-09-02T10:30:00.000Z",
    "updatedAt": "2025-09-02T10:30:00.000Z"
  }
]
```

### POST /todos Request

```json
{
  "title": "Learn Swagger documentation",
  "isCompleted": false
}
```

### Error Response Example

```json
{
  "statusCode": 404,
  "message": "Todo with ID 999 not found",
  "error": "Not Found"
}
```

---

## 🔧 Query Parameters

### GET /todos

| Parameter     | Type    | Required | Description                                         |
| ------------- | ------- | -------- | --------------------------------------------------- |
| `isCompleted` | boolean | No       | Filter by completion status                         |
| `limit`       | number  | No       | Limit results (1-100)                               |
| `search`      | string  | No       | Search in titles                                    |
| `orderBy`     | enum    | No       | Sort order: `asc`, `desc`, `createdAt`, `updatedAt` |

**Examples**:

- `GET /todos?isCompleted=false`
- `GET /todos?search=nestjs&limit=5`
- `GET /todos?orderBy=desc`

---

## 📝 Data Models

### TodoEntity

```typescript
{
  id: number; // Auto-generated unique ID
  title: string; // Todo description (min: 3 chars)
  isCompleted: boolean; // Completion status
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Last update timestamp
}
```

### CreateTodoDto

```typescript
{
  title: string; // Required, min 3 characters
  isCompleted: boolean; // Optional, defaults to false
}
```

### UpdateTodoDto

```typescript
{
  title?: string;       // Optional, min 3 characters
  isCompleted?: boolean; // Optional
}
```

---

## 🛡️ Validation Rules

### Title Validation

- **Type**: String
- **Min Length**: 3 characters
- **Required**: Yes (POST), Optional (PATCH)

### isCompleted Validation

- **Type**: Boolean
- **Required**: No (defaults to false)

### ID Validation

- **Type**: Positive integer
- **Must be greater than 0**

---

## 🚨 Error Handling

### HTTP Status Codes

| Code | Description  | Example                      |
| ---- | ------------ | ---------------------------- |
| 200  | Success      | Todo retrieved/updated       |
| 201  | Created      | Todo created successfully    |
| 204  | No Content   | Todo deleted successfully    |
| 400  | Bad Request  | Validation error, invalid ID |
| 404  | Not Found    | Todo doesn't exist           |
| 500  | Server Error | Unexpected server error      |

### Common Error Responses

**Validation Error (400)**:

```json
{
  "statusCode": 400,
  "message": ["title should not be empty"],
  "error": "Bad Request"
}
```

**Not Found (404)**:

```json
{
  "statusCode": 404,
  "message": "Todo with ID 999 not found",
  "error": "Not Found"
}
```

---

## 🔄 API Versioning

Current API version: **v1.0**

Future versions will be accessible via:

- Header: `Accept: application/vnd.api+json;version=2`
- URL: `/v2/todos` (when available)

---

## 📈 Performance & Limits

- **Rate Limiting**: Not implemented (development)
- **Response Time**: < 50ms average
- **Max Results**: 100 per request (via limit parameter)
- **Timeout**: 30 seconds

---

## 🔗 Related Documentation

- **[Testing Guide](./testing.md)** - API testing strategies
- **[Development Guide](./development.md)** - Setup and development
- **[Swagger/OpenAPI Spec](http://localhost:3000/api-json)** - Raw OpenAPI JSON

---

## 💡 Tips for API Consumers

1. **Use Swagger UI** for exploration and testing
2. **Check response schemas** before implementation
3. **Handle all documented error cases**
4. **Use appropriate HTTP methods**
5. **Validate input data** before sending requests
6. **Implement proper error handling** in your client

---

**🎉 Happy API Testing with Swagger!**

## Endpoints Overview

| Method | Endpoint     | Description                         | Status Code   |
| ------ | ------------ | ----------------------------------- | ------------- |
| GET    | `/todos`     | Get all todos with optional filters | 200           |
| GET    | `/todos/:id` | Get a specific todo by ID           | 200, 404, 400 |
| POST   | `/todos`     | Create a new todo                   | 201, 400      |
| PATCH  | `/todos/:id` | Update an existing todo             | 200, 404, 400 |
| DELETE | `/todos/:id` | Delete a todo                       | 204, 404, 400 |

---

## 📋 GET /todos

Get all todos with optional filtering, searching, and sorting.

### Query Parameters

| Parameter     | Type    | Required | Description                              | Example                                 |
| ------------- | ------- | -------- | ---------------------------------------- | --------------------------------------- |
| `isCompleted` | boolean | No       | Filter by completion status              | `true`, `false`                         |
| `limit`       | number  | No       | Limit number of results (1-100)          | `10`                                    |
| `search`      | string  | No       | Search in todo titles (case-insensitive) | `nestjs`                                |
| `orderBy`     | string  | No       | Sort order                               | `asc`, `desc`, `createdAt`, `updatedAt` |

### Example Requests

```bash
# Get all todos
GET /todos

# Get only completed todos
GET /todos?isCompleted=true

# Get first 5 incomplete todos
GET /todos?isCompleted=false&limit=5

# Search for todos containing "learn"
GET /todos?search=learn

# Get todos sorted by creation date (newest first)
GET /todos?orderBy=desc

# Combine filters
GET /todos?isCompleted=false&search=nestjs&limit=3&orderBy=asc
```

### Response

**Status Code:** `200 OK`

```json
[
  {
    "id": 1,
    "title": "Learn NestJS basics",
    "isCompleted": false,
    "createdAt": "2025-09-02T10:30:00.000Z",
    "updatedAt": "2025-09-02T10:30:00.000Z"
  },
  {
    "id": 2,
    "title": "Build Todo API",
    "isCompleted": true,
    "createdAt": "2025-09-02T11:00:00.000Z",
    "updatedAt": "2025-09-02T12:15:00.000Z"
  }
]
```

---

## 🔍 GET /todos/:id

Get a specific todo by ID.

### Path Parameters

| Parameter | Type   | Required | Description                |
| --------- | ------ | -------- | -------------------------- |
| `id`      | number | Yes      | Todo ID (must be positive) |

### Example Request

```bash
GET /todos/1
```

### Response

**Success - Status Code:** `200 OK`

```json
{
  "id": 1,
  "title": "Learn NestJS basics",
  "isCompleted": false,
  "createdAt": "2025-09-02T10:30:00.000Z",
  "updatedAt": "2025-09-02T10:30:00.000Z"
}
```

**Error Responses:**

```json
// 404 Not Found
{
  "statusCode": 404,
  "message": "Todo with ID 999 not found",
  "error": "Not Found"
}

// 400 Bad Request (invalid ID)
{
  "statusCode": 400,
  "message": "ID must be a positive number",
  "error": "Bad Request"
}
```

---

## ➕ POST /todos

Create a new todo.

### Request Body

```json
{
  "title": "string (required, min: 1 char, max: 200 chars)",
  "isCompleted": "boolean (required)"
}
```

### Example Request

```bash
POST /todos
Content-Type: application/json

{
  "title": "Learn TypeScript",
  "isCompleted": false
}
```

### Response

**Status Code:** `201 Created`

```json
{
  "id": 4,
  "title": "Learn TypeScript",
  "isCompleted": false,
  "createdAt": "2025-09-02T14:20:00.000Z",
  "updatedAt": "2025-09-02T14:20:00.000Z"
}
```

**Error Response:**

```json
// 400 Bad Request (validation error)
{
  "statusCode": 400,
  "message": [
    "title should not be empty",
    "title must be a string",
    "isCompleted must be a boolean value"
  ],
  "error": "Bad Request"
}
```

---

## ✏️ PATCH /todos/:id

Update an existing todo. Supports partial updates.

### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `id`      | number | Yes      | Todo ID     |

### Request Body

```json
{
  "title": "string (optional, min: 1 char, max: 200 chars)",
  "isCompleted": "boolean (optional)"
}
```

### Example Requests

```bash
# Update title only
PATCH /todos/1
Content-Type: application/json

{
  "title": "Learn NestJS advanced topics"
}

# Update completion status only
PATCH /todos/1
Content-Type: application/json

{
  "isCompleted": true
}

# Update both fields
PATCH /todos/1
Content-Type: application/json

{
  "title": "Master NestJS framework",
  "isCompleted": true
}
```

### Response

**Status Code:** `200 OK`

```json
{
  "id": 1,
  "title": "Master NestJS framework",
  "isCompleted": true,
  "createdAt": "2025-09-02T10:30:00.000Z",
  "updatedAt": "2025-09-02T14:45:00.000Z"
}
```

**Error Responses:**

```json
// 404 Not Found
{
  "statusCode": 404,
  "message": "Todo with ID 999 not found",
  "error": "Not Found"
}

// 400 Bad Request (validation error)
{
  "statusCode": 400,
  "message": [
    "title should not be empty"
  ],
  "error": "Bad Request"
}
```

---

## 🗑️ DELETE /todos/:id

Delete a todo by ID.

### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `id`      | number | Yes      | Todo ID     |

### Example Request

```bash
DELETE /todos/1
```

### Response

**Status Code:** `204 No Content`

No response body.

**Error Responses:**

```json
// 404 Not Found
{
  "statusCode": 404,
  "message": "Todo with ID 999 not found",
  "error": "Not Found"
}

// 400 Bad Request (invalid ID)
{
  "statusCode": 400,
  "message": "ID must be a positive number",
  "error": "Bad Request"
}
```

---

## 🔧 Common Error Responses

### Validation Errors (400 Bad Request)

When request data doesn't meet validation requirements:

```json
{
  "statusCode": 400,
  "message": [
    "title should not be empty",
    "title must be a string",
    "isCompleted must be a boolean value",
    "limit must not be less than 1",
    "limit must not be greater than 100"
  ],
  "error": "Bad Request"
}
```

### Not Found Errors (404 Not Found)

When a todo with the specified ID doesn't exist:

```json
{
  "statusCode": 404,
  "message": "Todo with ID {id} not found",
  "error": "Not Found"
}
```

### Server Errors (500 Internal Server Error)

Unexpected server errors:

```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

---

## 📝 Data Validation Rules

### Todo Title

- **Type**: String
- **Required**: Yes (for POST), Optional (for PATCH)
- **Min Length**: 1 character
- **Max Length**: 200 characters
- **Validation**: Must not be empty or only whitespace

### Todo isCompleted

- **Type**: Boolean
- **Required**: Yes (for POST), Optional (for PATCH)
- **Values**: `true` or `false`

### Query Parameters

- **isCompleted**: Must be boolean (`true`, `false`)
- **limit**: Must be integer between 1 and 100
- **search**: Any string
- **orderBy**: Must be one of: `asc`, `desc`, `createdAt`, `updatedAt`

### Path Parameters

- **id**: Must be positive integer (> 0)

---

## 🧪 Testing the API

### Using cURL

```bash
# Create a todo
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Test todo", "isCompleted": false}'

# Get all todos
curl http://localhost:3000/todos

# Get specific todo
curl http://localhost:3000/todos/1

# Update todo
curl -X PATCH http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"isCompleted": true}'

# Delete todo
curl -X DELETE http://localhost:3000/todos/1
```

### Using HTTPie

```bash
# Create a todo
http POST localhost:3000/todos title="Test todo" isCompleted:=false

# Get all todos
http GET localhost:3000/todos

# Get with filters
http GET localhost:3000/todos isCompleted==false limit==5

# Update todo
http PATCH localhost:3000/todos/1 title="Updated todo"

# Delete todo
http DELETE localhost:3000/todos/1
```

---

## 📊 Response Time & Performance

Expected response times (local development):

- **GET /todos**: < 10ms
- **GET /todos/:id**: < 5ms
- **POST /todos**: < 15ms
- **PATCH /todos/:id**: < 15ms
- **DELETE /todos/:id**: < 10ms

Note: Response times may vary based on system performance and data size.
