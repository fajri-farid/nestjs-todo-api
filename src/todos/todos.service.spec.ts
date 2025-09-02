import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all todos', () => {
      const todos = service.findAll();
      expect(todos).toHaveLength(3);
      expect(todos[0]).toHaveProperty('id');
      expect(todos[0]).toHaveProperty('title');
      expect(todos[0]).toHaveProperty('isCompleted');
      expect(todos[0]).toHaveProperty('createdAt');
      expect(todos[0]).toHaveProperty('updatedAt');
    });
  });

  describe('findByFilters', () => {
    it('should return all todos when no filters applied', () => {
      const result = service.findByFilters();
      expect(result).toHaveLength(3);
    });

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

    it('should limit results when limit is provided', () => {
      const result = service.findByFilters(undefined, 2);
      expect(result).toHaveLength(2);
    });

    it('should filter by search term in title', () => {
      const result = service.findByFilters(undefined, undefined, 'nestjs');
      expect(result).toHaveLength(1);
      expect(result[0].title).toContain('nestjs');
    });

    it('should be case insensitive when searching', () => {
      const result = service.findByFilters(undefined, undefined, 'NESTJS');
      expect(result).toHaveLength(1);
      expect(result[0].title.toLowerCase()).toContain('nestjs');
    });

    it('should sort by createdAt asc when orderBy is asc', () => {
      const result = service.findByFilters(
        undefined,
        undefined,
        undefined,
        'asc',
      );
      for (let i = 1; i < result.length; i++) {
        expect(result[i].createdAt.getTime()).toBeGreaterThanOrEqual(
          result[i - 1].createdAt.getTime(),
        );
      }
    });

    it('should sort by createdAt desc when orderBy is desc', () => {
      const result = service.findByFilters(
        undefined,
        undefined,
        undefined,
        'desc',
      );
      for (let i = 1; i < result.length; i++) {
        expect(result[i].createdAt.getTime()).toBeLessThanOrEqual(
          result[i - 1].createdAt.getTime(),
        );
      }
    });

    it('should combine multiple filters', () => {
      // First create a completed todo for testing
      const createDto: CreateTodoDto = {
        title: 'test completed nestjs',
        isCompleted: true,
      };
      service.createTodo(createDto);

      const result = service.findByFilters(true, 1, 'nestjs');
      expect(result).toHaveLength(1);
      expect(result[0].isCompleted).toBe(true);
      expect(result[0].title.toLowerCase()).toContain('nestjs');
    });
  });

  describe('findOneById', () => {
    it('should return a todo by id', () => {
      const todo = service.findOneById(1);
      expect(todo).toBeDefined();
      expect(todo!.id).toBe(1);
    });

    it('should throw NotFoundException when todo not found', () => {
      expect(() => service.findOneById(999)).toThrow(NotFoundException);
      expect(() => service.findOneById(999)).toThrow(
        'Todo with ID 999 not found',
      );
    });

    it('should throw BadRequestException for negative id', () => {
      expect(() => service.findOneById(-1)).toThrow(BadRequestException);
      expect(() => service.findOneById(-1)).toThrow(
        'ID must be a positive number',
      );
    });

    it('should throw BadRequestException for zero id', () => {
      expect(() => service.findOneById(0)).toThrow(BadRequestException);
    });
  });

  describe('createTodo', () => {
    it('should create a new todo', () => {
      const createDto: CreateTodoDto = {
        title: 'New Todo',
        isCompleted: false,
      };

      const initialCount = service.findAll().length;
      const newTodo = service.createTodo(createDto);

      expect(newTodo).toBeDefined();
      expect(newTodo.title).toBe(createDto.title);
      expect(newTodo.isCompleted).toBe(createDto.isCompleted);
      expect(newTodo.id).toBeGreaterThan(0);
      expect(newTodo.createdAt).toBeInstanceOf(Date);
      expect(newTodo.updatedAt).toBeInstanceOf(Date);
      expect(service.findAll()).toHaveLength(initialCount + 1);
    });

    it('should auto-increment id for new todos', () => {
      const createDto1: CreateTodoDto = {
        title: 'Todo 1',
        isCompleted: false,
      };
      const createDto2: CreateTodoDto = {
        title: 'Todo 2',
        isCompleted: true,
      };

      const todo1 = service.createTodo(createDto1);
      const todo2 = service.createTodo(createDto2);

      expect(todo2.id).toBe(todo1.id + 1);
    });
  });

  describe('updateOneById', () => {
    it('should update an existing todo', async () => {
      const updateDto: UpdateTodoDto = {
        title: 'Updated Title',
        isCompleted: true,
      };

      const originalTodo = service.findOneById(1);
      await new Promise((resolve) => setTimeout(resolve, 1));
      const updatedTodo = service.updateOneById(1, updateDto);

      expect(updatedTodo.id).toBe(1);
      expect(updatedTodo.title).toBe(updateDto.title);
      expect(updatedTodo.isCompleted).toBe(updateDto.isCompleted);
      expect(updatedTodo.createdAt).toEqual(originalTodo!.createdAt);
      expect(updatedTodo.updatedAt.getTime()).toBeGreaterThan(
        originalTodo!.updatedAt.getTime(),
      );
    });

    it('should partially update a todo', () => {
      const updateDto: UpdateTodoDto = {
        title: 'Only Title Updated',
      };

      const originalTodo = service.findOneById(1);
      const updatedTodo = service.updateOneById(1, updateDto);

      expect(updatedTodo.title).toBe(updateDto.title);
      expect(updatedTodo.isCompleted).toBe(originalTodo!.isCompleted);
    });

    it('should throw NotFoundException when updating non-existent todo', () => {
      const updateDto: UpdateTodoDto = {
        title: 'Updated Title',
      };

      expect(() => service.updateOneById(999, updateDto)).toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteOneById', () => {
    it('should delete an existing todo', () => {
      const initialCount = service.findAll().length;
      service.deleteOneById(1);

      expect(service.findAll()).toHaveLength(initialCount - 1);
      expect(() => service.findOneById(1)).toThrow(NotFoundException);
    });

    it('should throw NotFoundException when deleting non-existent todo', () => {
      expect(() => service.deleteOneById(999)).toThrow(NotFoundException);
    });
  });
});
