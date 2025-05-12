import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({ example: 'ok', description: 'Status da aplicação' })
  status: string;

  @ApiProperty({ example: 'my-nest-app', description: 'Nome do aplicativo' })
  appName: string;

  @ApiProperty({ example: 'development', description: 'Ambiente atual da aplicação' })
  environment: string;

  @ApiProperty({ example: '1.0.0', description: 'Versão da aplicação' })
  version: string;

  @ApiProperty({ example: 'linux', description: 'Plataforma do sistema operacional' })
  platform: string;

  @ApiProperty({ example: 'x64', description: 'Arquitetura da CPU' })
  arch: string;

  @ApiProperty({ example: '2025-05-12T18:44:21.000Z', description: 'Timestamp atual em ISO' })
  timestamp: string;
}
