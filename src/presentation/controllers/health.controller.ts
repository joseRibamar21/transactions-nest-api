import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthResponseDto } from '../dtos';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Verifica a saúde da aplicação' ,description: 'Verifica se a aplicação está em execução e retorna informações básicas sobre o ambiente.'})
  @ApiResponse({ status: 200, type: HealthResponseDto })
  check() {
    return {
      status: 'ok',
      appName: process.env.npm_package_name || 'unknown',
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || 'unknown',
      platform: process.platform,
      arch: process.arch,
      timestamp: new Date().toISOString(),
    };
  }
}
