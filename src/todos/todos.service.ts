import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    {
      id: 1,
      title: 'learn nestjs',
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: 'learn typescript',
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      title: 'learn laravel',
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  private nextId = 4;

  findAll(): Todo[] {
    return this.todos;
  }

  findByFilters(
    isCompleted?: boolean,
    limit?: number,
    search?: string,
    sortBy: 'createdAt' | 'updatedAt' = 'createdAt', // default to 'createdAt' if not provided
    orderBy: 'asc' | 'desc' = 'desc', // default to 'desc' if not provided
  ): Todo[] {
    let result = [...this.todos];

    // Apply filtering
    if (isCompleted !== undefined) {
      result = result.filter((todo) => todo.isCompleted === isCompleted);
    }

    if (search !== undefined) {
      result = result.filter((todo) =>
        todo.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Sort the results with two priorities:
    // 1. Incomplete todos (isCompleted = false) come first
    // 2. Within the same group, sort by the selected field (createdAt/updatedAt)
    //    using the specified order (asc = oldest first, desc = newest first)
    result = result.sort((a, b) => {
      // Priority 1: incomplete first
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }

      // Priority 2: based on sortBy + orderBy
      const fieldA = a[sortBy].getTime();
      const fieldB = b[sortBy].getTime();
      return orderBy === 'asc' ? fieldA - fieldB : fieldB - fieldA;
    });

    // Apply limit after sorting
    if (limit !== undefined) {
      result = result.slice(0, limit);
    }

    return result;
  }

  findOneById(id: number): Todo | undefined {
    if (id <= 0) {
      throw new BadRequestException('ID must be a positive number');
    }

    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return todo;
  }

  createTodo(createTodoDto: CreateTodoDto): Todo {
    const newTodo: Todo = {
      id: this.nextId++,
      title: createTodoDto.title,
      isCompleted: createTodoDto.isCompleted,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  updateOneById(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const todoId = this.findOneById(id);

    const editedTodo: Todo = {
      ...todoId,
      ...updateTodoDto,
      updatedAt: new Date(),
    } as Todo;

    this.todos = this.todos.map((t) => (t.id === id ? editedTodo : t));

    return editedTodo;
  }

  deleteOneById(id: number): void {
    this.findOneById(id);

    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
