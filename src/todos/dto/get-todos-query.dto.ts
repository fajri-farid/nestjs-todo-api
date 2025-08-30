import { IsOptional, IsBooleanString } from 'class-validator';

export class GetTodosQueryDto {
  @IsOptional()
  @IsBooleanString()
  isCompleted?: string; // nama query harus sama dengan nama param-nya
}
