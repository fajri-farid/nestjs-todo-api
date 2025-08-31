import { Transform, Type } from 'class-transformer';
import { IsOptional, IsInt, IsString, Min, IsBoolean } from 'class-validator';

export class GetTodosQueryDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  @IsBoolean()
  isCompleted?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @Type(() => String)
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  orderBy?: 'createdAt' | 'updatedAt' | 'asc' | 'desc';
}
