import { ApiProperty } from '@nestjs/swagger';

export class TodoEntity {
  @ApiProperty({
    description: 'Unique identifier for the todo',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The title of the todo',
    example: 'Learn NestJS basics',
  })
  title: string;

  @ApiProperty({
    description: 'Whether the todo is completed or not',
    example: false,
  })
  isCompleted: boolean;

  @ApiProperty({
    description: 'When the todo was created',
    example: '2025-09-02T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'When the todo was last updated',
    example: '2025-09-02T10:30:00.000Z',
  })
  updatedAt: Date;
}
