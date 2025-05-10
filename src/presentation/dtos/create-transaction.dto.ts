import { IsNumber, IsString, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Valor decimal da transação (positivo ou zero)',
    example: 123.45,
    minimum: 0,
  })
  @IsNumber({}, { message: 'Amount must be a number' })
  @Min(0, { message: 'Amount cannot be negative' })
  amount: number;

  @ApiProperty({
    description: 'Data e hora da transação no formato ISO 8601 (UTC)',
    example: '2024-02-20T12:34:56.789Z',
  })
  @IsString({ message: 'Timestamp must be a string' })
  @IsDateString({}, { message: 'Timestamp must be a valid ISO 8601 date string' })
  timestamp: string;
}
