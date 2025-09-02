import { Transform, Type } from 'class-transformer';
import {
  IsOptional,
  IsInt,
  IsString,
  Min,
  IsBoolean,
  IsIn,
  Max,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetTodosQueryDto {
  @ApiPropertyOptional({
    description: 'Filter todos by completion status',
    example: false,
    type: Boolean,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  @IsBoolean()
  isCompleted?: boolean;

  @ApiPropertyOptional({
    description: 'Limit the number of results',
    example: 10,
    minimum: 1,
    maximum: 100,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Search todos by title (case-insensitive)',
    example: 'nestjs',
    type: String,
  })
  @IsOptional()
  @Type(() => String)
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Sort order for the results',
    example: 'desc',
    enum: ['createdAt', 'updatedAt', 'asc', 'desc'],
  })
  @IsOptional()
  @IsIn(['createdAt', 'updatedAt', 'asc', 'desc'])
  @Type(() => String)
  @IsString()
  orderBy?: 'createdAt' | 'updatedAt' | 'asc' | 'desc';
}
