import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { GetTodosQueryDto } from './dto/get-todos-query.dto';
import { TodoEntity } from './entities/todo.entity';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

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
    const { isCompleted, limit, search, orderBy } = query;
    return this.todosService.findByFilters(isCompleted, limit, search, orderBy);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get todo by ID',
    description: 'Retrieve a specific todo by its unique identifier',
  })
  @ApiParam({
    name: 'id',
    description: 'Todo ID',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Todo retrieved successfully',
    type: TodoEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Todo not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Todo with ID 1 not found' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid ID provided',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'ID must be a positive number' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.findOneById(id);
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
    return this.todosService.createTodo(createTodoDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update todo',
    description: 'Update an existing todo by ID. Supports partial updates.',
  })
  @ApiParam({
    name: 'id',
    description: 'Todo ID',
    type: Number,
    example: 1,
  })
  @ApiBody({
    type: UpdateTodoDto,
    description: 'Todo update data',
    examples: {
      updateTitle: {
        summary: 'Update title only',
        value: {
          title: 'Learn NestJS advanced topics',
        },
      },
      updateStatus: {
        summary: 'Update completion status only',
        value: {
          isCompleted: true,
        },
      },
      updateBoth: {
        summary: 'Update both title and status',
        value: {
          title: 'Master NestJS framework',
          isCompleted: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Todo updated successfully',
    type: TodoEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Todo not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.updateOneById(id, updateTodoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete todo',
    description: 'Delete a todo by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Todo ID',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 204,
    description: 'Todo deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Todo not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid ID provided',
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.deleteOneById(id);
  }
}
