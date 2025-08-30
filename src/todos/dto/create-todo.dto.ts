import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsBoolean()
  @IsOptional()
  isCompleted: boolean = false;
}
