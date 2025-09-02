# 📋 Swagger/OpenAPI Setup Guide

## 🎯 Overview

This guide documents the complete Swagger/OpenAPI 3.0 setup for the NestJS Todo API, providing interactive API documentation and testing capabilities.

## 🚀 What's Included

### ✅ Features Implemented

- **Interactive Swagger UI** at `/api` endpoint
- **Complete API documentation** with examples
- **Request/Response schemas** with validation rules
- **Live API testing** directly from browser
- **Error response documentation** with examples
- **Custom Swagger styling** with NestJS branding
- **OpenAPI JSON export** at `/api-json`

### 🎨 Custom Styling

- NestJS branded header with logo
- Custom color scheme matching NestJS theme
- Professional documentation layout
- Clear navigation and organization

## 📦 Dependencies

```json
{
  "@nestjs/swagger": "^7.x.x",
  "swagger-ui-express": "^5.x.x"
}
```

## 🔧 Setup Implementation

### 1. Main Application Setup (`src/main.ts`)

```typescript
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Swagger configuration
const config = new DocumentBuilder()
  .setTitle('Todo API')
  .setDescription('A simple and robust Todo API built with NestJS')
  .setVersion('1.0')
  .addTag('todos', 'Todo CRUD operations')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document, {
  customSiteTitle: 'Todo API Documentation',
  customfavIcon: 'https://nestjs.com/favicon.ico',
  customCss: `
    .topbar-wrapper .link {
      content: url('https://nestjs.com/img/logo-small.svg');
      width: 120px;
      height: auto;
    }
    .swagger-ui .topbar { background-color: #ea2845; }
  `,
});
```

### 2. DTO Documentation

#### CreateTodoDto

```typescript
export class CreateTodoDto {
  @ApiProperty({
    description: 'The title of the todo',
    example: 'Learn NestJS basics',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiProperty({
    description: 'Whether the todo is completed or not',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isCompleted: boolean = false;
}
```

#### UpdateTodoDto

```typescript
export class UpdateTodoDto {
  @ApiPropertyOptional({
    description: 'The title of the todo',
    example: 'Learn NestJS advanced topics',
    minLength: 3,
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  title?: string;

  @ApiPropertyOptional({
    description: 'Whether the todo is completed or not',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
```

#### GetTodosQueryDto

```typescript
export class GetTodosQueryDto {
  @ApiPropertyOptional({
    description: 'Filter todos by completion status',
    example: false,
    type: Boolean,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  @IsBoolean()
  isCompleted?: boolean;

  // ... other properties
}
```

### 3. Entity Documentation

```typescript
export class TodoEntity {
  @ApiProperty({
    description: 'Unique identifier for the todo',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The title of the todo',
    example: 'Learn NestJS basics',
  })
  title: string;

  // ... other properties
}
```

### 4. Controller Documentation

```typescript
@ApiTags('todos')
@Controller('todos')
export class TodosController {
  @Get()
  @ApiOperation({
    summary: 'Get all todos',
    description:
      'Retrieve all todos with optional filtering, searching, and sorting',
  })
  @ApiResponse({
    status: 200,
    description: 'List of todos retrieved successfully',
    type: [TodoEntity],
  })
  @ApiQuery({ name: 'isCompleted', required: false, type: Boolean })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    enum: ['createdAt', 'updatedAt', 'asc', 'desc'],
  })
  findAll(@Query() query: GetTodosQueryDto) {
    // Implementation
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new todo',
    description: 'Create a new todo item with title and completion status',
  })
  @ApiBody({
    type: CreateTodoDto,
    description: 'Todo data',
    examples: {
      example1: {
        summary: 'Basic todo',
        value: {
          title: 'Learn NestJS basics',
          isCompleted: false,
        },
      },
      example2: {
        summary: 'Completed todo',
        value: {
          title: 'Setup development environment',
          isCompleted: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Todo created successfully',
    type: TodoEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['title should not be empty'],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  create(@Body() createTodoDto: CreateTodoDto) {
    // Implementation
  }

  // ... other endpoints
}
```

## 🎯 Key Swagger Decorators Used

### Class-level Decorators

- `@ApiTags()` - Group endpoints by functionality
- `@Controller()` - Define base route

### Method-level Decorators

- `@ApiOperation()` - Endpoint summary and description
- `@ApiResponse()` - Define response schemas and status codes
- `@ApiParam()` - Path parameter documentation
- `@ApiQuery()` - Query parameter documentation
- `@ApiBody()` - Request body documentation with examples

### Property-level Decorators

- `@ApiProperty()` - Required property documentation
- `@ApiPropertyOptional()` - Optional property documentation

## 📊 Generated Documentation Features

### 1. **Interactive Testing**

- ✅ "Try it out" buttons for each endpoint
- ✅ Real-time API calls with responses
- ✅ Parameter input forms
- ✅ JSON request body editors

### 2. **Schema Documentation**

- ✅ Complete data models with examples
- ✅ Validation rules display
- ✅ Required/optional field indicators
- ✅ Data type information

### 3. **Response Examples**

- ✅ Success response schemas
- ✅ Error response examples
- ✅ Multiple response status codes
- ✅ Real data examples

### 4. **Request Examples**

- ✅ Multiple request body examples
- ✅ Query parameter examples
- ✅ Path parameter documentation
- ✅ Validation rule explanations

## 🌐 Access Points

| Resource         | URL                            | Description               |
| ---------------- | ------------------------------ | ------------------------- |
| **Swagger UI**   | http://localhost:3000/api      | Interactive documentation |
| **OpenAPI JSON** | http://localhost:3000/api-json | Raw OpenAPI specification |
| **API Base**     | http://localhost:3000          | Main API endpoints        |

## 🧪 Testing Workflow

### Using Swagger UI

1. **Navigate** to http://localhost:3000/api
2. **Explore** endpoints organized by tags
3. **Click** on any endpoint to see details
4. **Try it out** to test with real data
5. **Execute** requests and view responses
6. **Understand** schemas in the bottom section

### Example Testing Flow

1. **POST /todos** - Create a new todo

   ```json
   {
     "title": "Test Swagger Integration",
     "isCompleted": false
   }
   ```

2. **GET /todos** - Retrieve all todos with filters
   - Try different query parameters
   - Test search functionality
   - Experiment with limits and sorting

3. **PATCH /todos/{id}** - Update the created todo
   - Test partial updates
   - Verify validation rules

4. **DELETE /todos/{id}** - Clean up test data

## 🔧 Advanced Configuration

### Custom Examples in @ApiBody

```typescript
@ApiBody({
  type: CreateTodoDto,
  examples: {
    basic: {
      summary: 'Basic todo',
      description: 'A simple todo item',
      value: {
        title: 'Learn NestJS',
        isCompleted: false,
      },
    },
    advanced: {
      summary: 'Completed task',
      description: 'An already completed todo',
      value: {
        title: 'Setup development environment',
        isCompleted: true,
      },
    },
  },
})
```

### Multiple Response Documentation

```typescript
@ApiResponse({ status: 200, description: 'Success', type: TodoEntity })
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 404, description: 'Not Found' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })
```

### Complex Schema Definitions

```typescript
@ApiResponse({
  status: 400,
  description: 'Validation error',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: {
        type: 'array',
        items: { type: 'string' },
        example: ['title should not be empty', 'isCompleted must be boolean']
      },
      error: { type: 'string', example: 'Bad Request' },
    },
  },
})
```

## 📈 Benefits Achieved

### For Developers

- ✅ **Interactive Testing** - No need for external tools
- ✅ **Clear Documentation** - All endpoints documented
- ✅ **Schema Validation** - See validation rules clearly
- ✅ **Examples Provided** - Ready-to-use request examples

### For API Consumers

- ✅ **Self-Documenting** - Always up-to-date documentation
- ✅ **Easy Understanding** - Visual schema representation
- ✅ **Quick Testing** - Immediate API exploration
- ✅ **Error Handling** - Clear error response documentation

### For Teams

- ✅ **Consistent Documentation** - Automated generation
- ✅ **Reduced Communication** - Clear API contracts
- ✅ **Faster Development** - Quick API understanding
- ✅ **Better Testing** - Built-in testing interface

## 🔄 Maintenance

### Keeping Documentation Updated

1. **Add @Api decorators** to new endpoints
2. **Update examples** when data models change
3. **Document new DTOs** with proper descriptions
4. **Test documentation** after major changes
5. **Review schemas** for accuracy

### Best Practices

- ✅ Use descriptive summaries and descriptions
- ✅ Provide realistic examples
- ✅ Document all possible response codes
- ✅ Include validation rules in descriptions
- ✅ Group related endpoints with tags
- ✅ Keep documentation in sync with code

## 🚀 Future Enhancements

### Possible Improvements

- **Authentication Documentation** - When auth is added
- **API Versioning** - Document multiple API versions
- **Rate Limiting Info** - Document rate limits
- **Webhook Documentation** - If webhooks are implemented
- **SDK Generation** - Auto-generate client SDKs

---

**🎉 Swagger Integration Complete!**

Your API now has professional, interactive documentation that makes development and testing significantly easier!
