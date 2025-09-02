import { IsOptional, IsString, MinLength, IsBoolean } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  title?: string;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
