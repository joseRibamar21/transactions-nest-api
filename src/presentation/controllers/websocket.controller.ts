import {
    Controller,
    Get,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('WebSocket')
@Controller('websocket')
export class WebSocketInfoController {
  @Get('socket-info')
  @ApiOperation({ summary: 'Informações sobre o canal WebSocket' })
  @ApiResponse({
    status: 200,
    description: 'Retorna os detalhes do namespace WebSocket e eventos suportados.',
  })
  getSocketInfo() {
    return {
      websocketNamespace: 'ws://localhost:3000/statistics',
      events: {
        clientEmit: 'requestStatistics',
        serverEmit: 'statisticsUpdate',
      },
      description:
        'Conecte-se ao namespace via WebSocket e envie o evento "requestStatistics" para receber atualizações de estatísticas.',
    };
  }
}