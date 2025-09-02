import { IsNotEmpty, IsString, MinLength, IsBoolean } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsBoolean()
  isCompleted: boolean = false;
}
