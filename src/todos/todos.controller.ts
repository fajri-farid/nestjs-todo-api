import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(@Query('isCompleted', ParseBoolPipe) isCompleted?: boolean) {
    if (isCompleted === undefined) {
      return this.todosService.findAll();
    }
    return this.todosService.findByStatus(isCompleted);
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.findOneById(id);
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.createTodo(createTodoDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.updateOneById(id, updateTodoDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.deleteOneById(id);
  }
}
