import { ApiProperty } from '@nestjs/swagger';

export class StatisticsResponseDto {
  @ApiProperty({
    description: 'Quantidade total de transações nos últimos 60s',
    example: 10,
  })
  count: number;

  @ApiProperty({
    description: 'Soma total dos valores transacionados',
    example: 1234.56,
  })
  sum: number;

  @ApiProperty({
    description: 'Média dos valores transacionados',
    example: 123.45,
  })
  avg: number;

  @ApiProperty({
    description: 'Menor valor transacionado',
    example: 12.34,
  })
  min: number;

  @ApiProperty({
    description: 'Maior valor transacionado',
    example: 456.78,
  })
  max: number;
}
