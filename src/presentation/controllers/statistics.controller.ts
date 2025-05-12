import {
    Controller,
    Get,
    Inject,
    Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetLast60SecondsTransactionsUseCase } from 'src/application/use-cases';
import { StatisticsResponseDto } from '../dtos';
import { USE_CASE_TOKENS } from 'src/domain/tokens';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
    private readonly logger = new Logger(StatisticsController.name);

    constructor(        
        @Inject(USE_CASE_TOKENS.GET_LAST_TRANSACTIONS)
        private readonly getLast60s: GetLast60SecondsTransactionsUseCase,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Lista transações dos últimos 60 segundos' })
    @ApiResponse({
        status: 200,
        description: 'Estatísticas das transações recentes',
        type: StatisticsResponseDto,
    })
    async list(): Promise<StatisticsResponseDto> {
        const itens = await this.getLast60s.execute();

        if (!itens || itens.length === 0) {
            this.logger.log('Nenhuma transação encontrada nos últimos 60 segundos.');
            return {
                count: 0,
                sum: 0,
                avg: 0,
                min: 0,
                max: 0,
            };
        }

        const amounts = itens.map(t => Number(t.amount));
        const sum = amounts.reduce((acc, curr) => acc + curr, 0);

        this.logger.log(`Estatísticas: ${JSON.stringify({
            count: itens.length,
            sum: sum,
            avg: sum / itens.length,
            min: Math.min(...amounts),
            max: Math.max(...amounts),
        })}`);

        return {
            count: itens.length,
            sum: sum,
            avg: sum / itens.length,
            min: Math.min(...amounts),
            max: Math.max(...amounts),
        };
    }
}
