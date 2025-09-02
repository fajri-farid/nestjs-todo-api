import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { GetTodosQueryDto } from './dto/get-todos-query.dto';

describe('TodosController', () => {
  let controller: TodosController;

  const mockTodosService = {
    findByFilters: jest.fn(),
    findOneById: jest.fn(),
    createTodo: jest.fn(),
    updateOneById: jest.fn(),
    deleteOneById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: mockTodosService,
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call service.findByFilters with correct parameters', () => {
      const query: GetTodosQueryDto = {
        isCompleted: true,
        limit: 10,
        search: 'test',
        orderBy: 'asc',
      };

      const expectedResult = [
        {
          id: 1,
          title: 'Test Todo',
          isCompleted: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockTodosService.findByFilters.mockReturnValue(expectedResult);

      const result = controller.findAll(query);

      expect(mockTodosService.findByFilters).toHaveBeenCalledWith(
        true,
        10,
        'test',
        'asc',
      );
      expect(result).toBe(expectedResult);
    });

    it('should call service.findByFilters with undefined parameters when query is empty', () => {
      const query: GetTodosQueryDto = {};
      const expectedResult = [];

      mockTodosService.findByFilters.mockReturnValue(expectedResult);

      const result = controller.findAll(query);

      expect(mockTodosService.findByFilters).toHaveBeenCalledWith(
        undefined,
        undefined,
        undefined,
        undefined,
      );
      expect(result).toBe(expectedResult);
    });
  });

  describe('findOneById', () => {
    it('should call service.findOneById with correct id', () => {
      const todoId = 1;
      const expectedResult = {
        id: 1,
        title: 'Test Todo',
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTodosService.findOneById.mockReturnValue(expectedResult);

      const result = controller.findOneById(todoId);

      expect(mockTodosService.findOneById).toHaveBeenCalledWith(todoId);
      expect(result).toBe(expectedResult);
    });

    it('should propagate NotFoundException from service', () => {
      const todoId = 999;
      mockTodosService.findOneById.mockImplementation(() => {
        throw new NotFoundException(`Todo with ID ${todoId} not found`);
      });

      expect(() => controller.findOneById(todoId)).toThrow(NotFoundException);
    });

    it('should propagate BadRequestException from service', () => {
      const todoId = -1;
      mockTodosService.findOneById.mockImplementation(() => {
        throw new BadRequestException('ID must be a positive number');
      });

      expect(() => controller.findOneById(todoId)).toThrow(BadRequestException);
    });
  });

  describe('create', () => {
    it('should call service.createTodo with correct data', () => {
      const createTodoDto: CreateTodoDto = {
        title: 'New Todo',
        isCompleted: false,
      };

      const expectedResult = {
        id: 4,
        title: 'New Todo',
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTodosService.createTodo.mockReturnValue(expectedResult);

      const result = controller.create(createTodoDto);

      expect(mockTodosService.createTodo).toHaveBeenCalledWith(createTodoDto);
      expect(result).toBe(expectedResult);
    });
  });

  describe('update', () => {
    it('should call service.updateOneById with correct parameters', () => {
      const todoId = 1;
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Todo',
        isCompleted: true,
      };

      const expectedResult = {
        id: 1,
        title: 'Updated Todo',
        isCompleted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTodosService.updateOneById.mockReturnValue(expectedResult);

      const result = controller.update(todoId, updateTodoDto);

      expect(mockTodosService.updateOneById).toHaveBeenCalledWith(
        todoId,
        updateTodoDto,
      );
      expect(result).toBe(expectedResult);
    });

    it('should propagate NotFoundException from service', () => {
      const todoId = 999;
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Todo',
      };

      mockTodosService.updateOneById.mockImplementation(() => {
        throw new NotFoundException(`Todo with ID ${todoId} not found`);
      });

      expect(() => controller.update(todoId, updateTodoDto)).toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should call service.deleteOneById with correct id', () => {
      const todoId = 1;

      mockTodosService.deleteOneById.mockReturnValue(undefined);

      const result = controller.delete(todoId);

      expect(mockTodosService.deleteOneById).toHaveBeenCalledWith(todoId);
      expect(result).toBeUndefined();
    });

    it('should propagate NotFoundException from service', () => {
      const todoId = 999;

      mockTodosService.deleteOneById.mockImplementation(() => {
        throw new NotFoundException(`Todo with ID ${todoId} not found`);
      });

      expect(() => controller.delete(todoId)).toThrow(NotFoundException);
    });
  });
});
