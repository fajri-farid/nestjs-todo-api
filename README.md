# 📝 NestJS Todo API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

A simple and robust Todo API built with NestJS framework, featuring comprehensive CRUD operations, filtering, and sorting capabilities.

## 🚀 Features

- ✅ **Full CRUD Operations**: Create, Read, Update, Delete todos
- 🔍 **Advanced Filtering**: Filter by completion status, search by title
- 📊 **Sorting & Pagination**: Sort by creation/update date, limit results
- 🛡️ **Input Validation**: Comprehensive validation using class-validator
- 🧪 **Comprehensive Testing**: Unit tests with 84%+ coverage
- 📚 **API Documentation**: Well-documented endpoints
- 🔄 **Type Safety**: Full TypeScript implementation

## 📋 API Endpoints

| Method | Endpoint     | Description       | Query Parameters                            |
| ------ | ------------ | ----------------- | ------------------------------------------- |
| GET    | `/todos`     | Get all todos     | `isCompleted`, `limit`, `search`, `orderBy` |
| GET    | `/todos/:id` | Get specific todo | -                                           |
| POST   | `/todos`     | Create new todo   | -                                           |
| PATCH  | `/todos/:id` | Update todo       | -                                           |
| DELETE | `/todos/:id` | Delete todo       | -                                           |

### Query Parameters:

- `isCompleted`: `true` or `false` - Filter by completion status
- `limit`: `number` (1-100) - Limit number of results
- `search`: `string` - Search in todo titles (case-insensitive)
- `orderBy`: `asc`, `desc`, `createdAt`, `updatedAt` - Sort order

### Example Requests:

```bash
# Get all incomplete todos, limited to 5 results
GET /todos?isCompleted=false&limit=5

# Search for todos containing "nestjs"
GET /todos?search=nestjs

# Get todos sorted by creation date (newest first)
GET /todos?orderBy=desc
```

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd todolist-nestjs

# Install dependencies
npm install
```

## 🚀 Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Watch mode (recommended for development)
npm run start:dev
```

The API will be available at `http://localhost:3000`

## 🧪 Testing

This project includes comprehensive unit tests with high coverage.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:cov

# Run e2e tests
npm run test:e2e

# Run specific module tests
npm test -- src/todos
```

### Test Coverage

- **TodosService**: 88% coverage
- **TodosController**: 100% coverage
- **Overall Module**: 84%+ coverage

## � API Documentation

### 🚀 Swagger/OpenAPI

**Interactive API Documentation**: [http://localhost:3000/api](http://localhost:3000/api)

The API is fully documented using Swagger/OpenAPI 3.0 with:

- 📋 Interactive endpoint testing
- 🔍 Detailed request/response schemas
- 📝 Validation rules and examples
- 🧪 Live API testing interface

### 📖 Documentation Files

- **[Swagger UI](http://localhost:3000/api)** - Interactive API documentation
- **[API Guide](./docs/api.md)** - Comprehensive API documentation
- **[Testing Guide](./docs/testing.md)** - Unit testing documentation
- **[Development Guide](./docs/development.md)** - Setup and development workflow

## 🏗️ Project Structure

```
src/
├── todos/                    # Todo module
│   ├── dto/                  # Data Transfer Objects
│   │   ├── create-todo.dto.ts
│   │   ├── update-todo.dto.ts
│   │   └── get-todos-query.dto.ts
│   ├── utils/                # Utility functions
│   │   └── todo-sort.util.ts
│   ├── todos.controller.ts   # HTTP layer
│   ├── todos.service.ts      # Business logic
│   ├── todos.module.ts       # Module definition
│   ├── todos.controller.spec.ts  # Controller tests
│   └── todos.service.spec.ts     # Service tests
├── app.module.ts             # Root module
└── main.ts                   # Application entry point

docs/
└── testing.md               # Comprehensive testing documentation

test/
└── app.e2e-spec.ts          # End-to-end tests
```

## 🎯 Todo Data Model

```typescript
interface Todo {
  id: number; // Auto-incremented unique identifier
  title: string; // Todo description
  isCompleted: boolean; // Completion status
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Last update timestamp
}
```

## 📝 Usage Examples

### Creating a Todo

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn NestJS",
    "isCompleted": false
  }'
```

### Getting Todos with Filters

```bash
# Get incomplete todos
curl "http://localhost:3000/todos?isCompleted=false"

# Search and limit results
curl "http://localhost:3000/todos?search=nestjs&limit=5"

# Sort by creation date
curl "http://localhost:3000/todos?orderBy=desc"
```

### Updating a Todo

```bash
curl -X PATCH http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn NestJS Advanced Topics",
    "isCompleted": true
  }'
```

## 📚 Documentation

- **[Testing Guide](./docs/testing.md)** - Comprehensive testing documentation
- **[NestJS Docs](https://docs.nestjs.com)** - Official NestJS documentation

## 🧩 Architecture

This application follows NestJS best practices:

- **Modular Architecture**: Features organized in modules
- **Dependency Injection**: Loose coupling between components
- **DTOs**: Input validation and data transformation
- **Exception Handling**: Proper HTTP error responses
- **Testing**: Unit and integration tests with high coverage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📋 TODO / Future Enhancements

- [ ] Add database integration (PostgreSQL/MongoDB)
- [ ] Implement authentication & authorization
- [ ] Add API documentation with Swagger
- [ ] Implement caching with Redis
- [ ] Add rate limiting
- [ ] Deploy with Docker
- [ ] Add logging with Winston
- [ ] Implement real-time updates with WebSockets

## 🐛 Known Issues

- Todos are stored in memory (will be lost on server restart)
- No persistent storage implemented yet
- Limited to basic CRUD operations

## 📄 License

This project is [MIT licensed](LICENSE).

---

**Built with ❤️ using [NestJS](https://nestjs.com)**
