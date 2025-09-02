# 👨‍💻 Development Guide

## Project Setup for Development

### Prerequisites

- **Node.js**: v16+ (recommended v18+)
- **npm**: v8+ (comes with Node.js)
- **Git**: Latest version
- **VS Code**: Recommended editor with extensions

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

### Initial Setup

1. **Clone and Install**

   ```bash
   git clone <repository-url>
   cd todolist-nestjs
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run start:dev
   ```

3. **Verify Setup**

   ```bash
   # Test the API
   curl http://localhost:3000/todos

   # Run tests
   npm test
   ```

## 🛠️ Development Workflow

### 1. Feature Development Process

```bash
# 1. Create feature branch
git checkout -b feature/new-feature-name

# 2. Make changes and test frequently
npm run start:dev  # Keep running in terminal
npm test          # Run tests

# 3. Before committing
npm run test:cov  # Check coverage
npm run lint      # Check linting
npm run build     # Ensure build works

# 4. Commit and push
git add .
git commit -m "feat: add new feature description"
git push origin feature/new-feature-name
```

### 2. Code Style & Standards

**Naming Conventions:**

- **Files**: `kebab-case` (e.g., `todo-item.service.ts`)
- **Classes**: `PascalCase` (e.g., `TodoService`)
- **Methods/Variables**: `camelCase` (e.g., `findById`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_TODO_LENGTH`)

**File Structure:**

```
src/
├── module-name/
│   ├── dto/           # Data Transfer Objects
│   ├── entities/      # Database entities (if using database)
│   ├── interfaces/    # TypeScript interfaces
│   ├── utils/         # Utility functions
│   ├── *.controller.ts
│   ├── *.service.ts
│   ├── *.module.ts
│   └── *.spec.ts     # Test files
```

### 3. Adding New Features

#### Step 1: Create DTOs

```typescript
// src/todos/dto/create-todo.dto.ts
export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  title: string;

  @IsBoolean()
  isCompleted: boolean;
}
```

#### Step 2: Update Service

```typescript
// src/todos/todos.service.ts
@Injectable()
export class TodosService {
  // Add new method
  async newFeature(param: string): Promise<Todo[]> {
    // Implementation
  }
}
```

#### Step 3: Update Controller

```typescript
// src/todos/todos.controller.ts
@Controller('todos')
export class TodosController {
  @Get('new-endpoint')
  newEndpoint(@Query() param: string) {
    return this.todosService.newFeature(param);
  }
}
```

#### Step 4: Write Tests

```typescript
// src/todos/todos.service.spec.ts
describe('newFeature', () => {
  it('should return expected result', () => {
    // Test implementation
  });
});
```

### 4. Testing Guidelines

**Test Structure:**

```typescript
describe('ClassName', () => {
  beforeEach(() => {
    // Setup
  });

  describe('methodName', () => {
    it('should handle normal case', () => {
      // Arrange
      // Act
      // Assert
    });

    it('should handle edge case', () => {
      // Test edge cases
    });

    it('should handle error case', () => {
      // Test error scenarios
    });
  });
});
```

**Coverage Goals:**

- Statements: > 90%
- Branches: > 85%
- Functions: > 95%
- Lines: > 90%

### 5. Error Handling

**Custom Exceptions:**

```typescript
// Throw appropriate HTTP exceptions
throw new NotFoundException(`Todo with ID ${id} not found`);
throw new BadRequestException('Invalid input data');
throw new ConflictException('Todo already exists');
```

**Global Exception Filter:**

```typescript
// http-exception.filter.ts
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // Handle exception
  }
}
```

## 🔧 Development Tools

### 1. Scripts Overview

```json
{
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  }
}
```

### 2. Environment Configuration

**Development Environment Variables:**

```bash
# .env.development
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug
```

**Production Environment Variables:**

```bash
# .env.production
NODE_ENV=production
PORT=3000
LOG_LEVEL=error
```

### 3. Debugging

**VS Code Debug Configuration:**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug NestJS",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/src/main.ts",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "runtimeArgs": ["-r", "ts-node/register"],
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```

**Debug Tests:**

```bash
# Debug specific test
npm run test:debug -- todos.service.spec.ts

# Debug with breakpoints
node --inspect-brk node_modules/.bin/jest --runInBand
```

## 📦 Adding Dependencies

### 1. Installing Packages

```bash
# Production dependency
npm install package-name

# Development dependency
npm install -D package-name

# Example: Adding database support
npm install @nestjs/typeorm typeorm mysql2
npm install -D @types/node
```

### 2. Updating Dependencies

```bash
# Check outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm install package-name@latest
```

## 🔍 Code Quality

### 1. Linting Configuration

**ESLint Configuration (`.eslintrc.js`):**

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['@nestjs'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
```

### 2. Prettier Configuration

**Prettier Configuration (`.prettierrc`):**

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": true,
  "printWidth": 80,
  "endOfLine": "lf"
}
```

### 3. Pre-commit Hooks

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,js}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

## 🚀 Performance Tips

### 1. Development Performance

- Use `npm run start:dev` for hot reloading
- Keep tests running in watch mode during development
- Use VS Code integrated terminal for faster switching

### 2. Code Performance

```typescript
// Use async/await for better performance
async findTodos(): Promise<Todo[]> {
  return await this.todoRepository.find();
}

// Implement caching for expensive operations
@Injectable()
export class TodosService {
  private cache = new Map();

  async getExpensiveData(key: string) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const data = await this.computeExpensiveData();
    this.cache.set(key, data);
    return data;
  }
}
```

## 🐛 Common Issues & Solutions

### 1. Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run start:dev -- --port 3001
```

### 2. Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### 3. Test Timeouts

```typescript
// Increase timeout in jest config
module.exports = {
  testTimeout: 10000, // 10 seconds
};
```

### 4. TypeScript Compilation Errors

```bash
# Clean build
npm run build -- --clean

# Check TypeScript configuration
npx tsc --noEmit
```

## 📚 Learning Resources

- **NestJS Documentation**: https://docs.nestjs.com
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Jest Testing**: https://jestjs.io/docs/getting-started
- **Node.js Best Practices**: https://github.com/goldbergyoni/nodebestpractices

---

**Happy Coding! 🎉**
