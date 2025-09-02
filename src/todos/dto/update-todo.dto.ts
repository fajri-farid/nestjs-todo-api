import { IsOptional, IsString, MinLength, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

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
