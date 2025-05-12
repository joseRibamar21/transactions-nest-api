import { IsNumber, IsString, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Valor decimal da transação (positivo ou zero)',
    example: 123.45,
    minimum: 0,
  })
  @IsNumber({}, { message: 'Amount deve ser um número válido' })
  amount: number;

  @ApiProperty({
    description: 'Data e hora da transação no formato ISO 8601 (UTC)',
    example: '2024-02-20T12:34:56.789Z',
  })
  @IsString({ message: 'Timestamp deve ser uma string válida' })
  @IsDateString({}, { message: 'Timestamp deve ser uma data válida no formato ISO 8601' })
  timestamp: string;
}
