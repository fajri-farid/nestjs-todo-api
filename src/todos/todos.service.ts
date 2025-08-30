import { Injectable, NotFoundException } from '@nestjs/common';
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
      title: 'belajar nestjs',
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: 'belajar typescript',
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      title: 'belajar laravel',
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  private nextId = 4;

  findAll(): Todo[] {
    return this.todos;
  }

  findByStatus(isCompleted: boolean): Todo[] {
    return this.todos.filter((todo) => todo.isCompleted === isCompleted);
  }

  findOneById(id: number): Todo | undefined {
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
