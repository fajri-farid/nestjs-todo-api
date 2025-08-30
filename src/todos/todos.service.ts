import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

export interface Todo {
  id: number;
  title: string;
}

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    { id: 1, title: 'belajar nestjs' },
    { id: 2, title: 'belajar typescript' },
    { id: 3, title: 'belajar laravel' },
  ];
  private nextId = 4;

  findAll(): Todo[] {
    return this.todos;
  }

  findOneById(id: number): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  create(createTodoDto: CreateTodoDto): Todo {
    const newTodo: Todo = {
      id: this.nextId++,
      title: createTodoDto.title,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  updateOneById(id: number, updateTodoDto: UpdateTodoDto): Todo | undefined {
    const todoId = this.findOneById(id);

    if (!todoId) {
      return undefined;
    }

    if (updateTodoDto.title !== undefined) {
      todoId.title = updateTodoDto.title;
    }

    return todoId;
  }

  deleteOneById(id: number): void {
    const index = this.todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    this.todos.splice(index, 1);
  }
}
