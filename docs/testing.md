# 🧪 Testing Documentation

## Overview

This document provides comprehensive information about testing in the NestJS Todo API project. We use Jest as our testing framework with comprehensive unit and integration tests.

## Table of Contents

- [Testing Strategy](#testing-strategy)
- [Test Structure](#test-structure)
- [Running Tests](#running-tests)
- [Unit Tests](#unit-tests)
- [Coverage Reports](#coverage-reports)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Testing Strategy

Our testing approach follows the testing pyramid:

```
    /\
   /  \     E2E Tests (Few)
  /____\
 /      \   Integration Tests (Some)
/__________\ Unit Tests (Many)
```

- **Unit Tests**: Test individual components in isolation
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows

## Test Structure

```
src/
├── todos/
│   ├── todos.controller.spec.ts    # Controller unit tests
│   ├── todos.service.spec.ts       # Service unit tests
│   └── todos.module.ts
├── app.controller.spec.ts           # App controller tests
test/
├── app.e2e-spec.ts                 # End-to-end tests
└── jest-e2e.json                   # E2E Jest config
```

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e

# Run specific test file
npm test -- todos.service.spec.ts

# Run tests for specific module
npm test -- src/todos
```

### Coverage Commands

```bash
# Generate coverage report
npm run test:cov

# Generate coverage for specific module
npm test -- src/todos --coverage

# Open coverage report in browser
# Coverage reports are generated in ./coverage/lcov-report/index.html
```

## Unit Tests

### TodosService Tests

The `TodosService` tests cover all business logic and data manipulation:

#### Test Categories:

**🔍 Data Retrieval**

- `findAll()` - Returns all todos with proper data structure
- `findByFilters()` - Filtering by completion status, search, limit, and sorting

**👤 Individual Todo Operations**

- `findOneById()` - Retrieve specific todo by ID
- Error handling for invalid IDs (negative, zero, non-existent)

**➕ Create Operations**

- `createTodo()` - Create new todos with auto-incrementing IDs
- Proper timestamp generation

**✏️ Update Operations**

- `updateOneById()` - Full and partial updates
- Timestamp updating behavior
- Error handling for non-existent todos

**🗑️ Delete Operations**

- `deleteOneById()` - Remove todos by ID
- Error handling for non-existent todos

#### Example Test:

```typescript
describe('findByFilters', () => {
  it('should filter by isCompleted status', () => {
    const completedTodos = service.findByFilters(true);
    const incompleteTodos = service.findByFilters(false);

    expect(completedTodos.every((todo) => todo.isCompleted === true)).toBe(
      true,
    );
    expect(incompleteTodos.every((todo) => todo.isCompleted === false)).toBe(
      true,
    );
  });
});
```

### TodosController Tests

The `TodosController` tests focus on HTTP layer and service integration:

#### Test Categories:

**🌐 HTTP Endpoints**

- `GET /todos` - List todos with query parameters
- `GET /todos/:id` - Get specific todo
- `POST /todos` - Create new todo
- `PATCH /todos/:id` - Update existing todo
- `DELETE /todos/:id` - Delete todo

**🔄 Service Integration**

- Proper service method calls with correct parameters
- Return value propagation
- Error propagation from service layer

#### Mocking Strategy:

```typescript
const mockTodosService = {
  findByFilters: jest.fn(),
  findOneById: jest.fn(),
  createTodo: jest.fn(),
  updateOneById: jest.fn(),
  deleteOneById: jest.fn(),
};
```

## Coverage Reports

### Current Coverage (as of last run):

```
File                     | % Stmts | % Branch | % Funcs | % Lines |
-------------------------|---------|----------|---------|---------|
TodosController          |   100%  |   75%    |   100%  |   100%  |
TodosService             |   88%   |   88.88% |   86.66%|   86.36%|
Overall Todos Module     |   84.21%|   82.35% |   90.47%|   84.84%|
```

### Coverage Goals:

- **Statements**: > 90%
- **Branches**: > 85%
- **Functions**: > 95%
- **Lines**: > 90%

### Viewing Coverage:

1. Run: `npm run test:cov`
2. Open: `./coverage/lcov-report/index.html`
3. Navigate through files to see uncovered lines

## Best Practices

### ✅ Do's

1. **Write Tests First (TDD)**: Consider writing tests before implementation
2. **Descriptive Test Names**: Use clear, descriptive test names
3. **Test Edge Cases**: Include boundary conditions and error scenarios
4. **Isolate Tests**: Each test should be independent
5. **Mock External Dependencies**: Use mocks for external services
6. **Arrange-Act-Assert**: Structure tests clearly

### ❌ Don'ts

1. **Don't Test Implementation Details**: Focus on behavior, not internals
2. **Don't Write Brittle Tests**: Avoid tests that break with minor changes
3. **Don't Ignore Error Cases**: Always test error scenarios
4. **Don't Skip Async Testing**: Properly handle promises and async operations
5. **Don't Mock Everything**: Only mock what you need to isolate

### Test Structure Example:

```typescript
describe('ClassName', () => {
  // Setup
  beforeEach(() => {
    // Initialize test data
  });

  afterEach(() => {
    // Cleanup
  });

  describe('methodName', () => {
    it('should handle normal case', () => {
      // Arrange
      const input = 'test data';

      // Act
      const result = service.method(input);

      // Assert
      expect(result).toBe(expected);
    });

    it('should handle error case', () => {
      // Test error scenarios
      expect(() => service.method(invalid)).toThrow(ErrorType);
    });
  });
});
```

## Error Testing Patterns

### Exception Testing:

```typescript
// Test that an exception is thrown
expect(() => service.findOneById(-1)).toThrow(BadRequestException);

// Test specific error message
expect(() => service.findOneById(999)).toThrow('Todo with ID 999 not found');

// Test async exceptions
await expect(service.asyncMethod()).rejects.toThrow(NotFoundException);
```

### Mock Error Scenarios:

```typescript
mockService.method.mockImplementation(() => {
  throw new NotFoundException('Resource not found');
});

expect(() => controller.method()).toThrow(NotFoundException);
```

## Testing DTOs and Validation

While not currently implemented, consider adding validation tests:

```typescript
// Example DTO validation test
describe('CreateTodoDto', () => {
  it('should validate required fields', () => {
    const dto = new CreateTodoDto();
    const errors = validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
```

## Continuous Integration

### GitHub Actions Example:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm test
      - run: npm run test:cov
```

## Troubleshooting

### Common Issues:

**1. Tests Timing Out**

```bash
# Increase timeout in jest.config.js
module.exports = {
  testTimeout: 10000, // 10 seconds
};
```

**2. Mock Not Working**

```typescript
// Clear mocks between tests
afterEach(() => {
  jest.clearAllMocks();
});
```

**3. Async Test Issues**

```typescript
// Use async/await or return promise
it('should handle async operation', async () => {
  await expect(service.asyncMethod()).resolves.toBe(result);
});
```

**4. Memory Leaks in Tests**

```typescript
// Proper cleanup
afterAll(async () => {
  await app.close();
});
```

### Debug Mode:

```bash
# Run tests in debug mode
npm test -- --detectOpenHandles --forceExit

# Run specific test in debug mode
npm test -- todos.service.spec.ts --detectOpenHandles
```

## Additional Resources

- [NestJS Testing Documentation](https://docs.nestjs.com/fundamentals/testing)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

**Last Updated**: September 2, 2025  
**Test Coverage**: 84.21% (Todos Module)  
**Total Tests**: 32 passing
