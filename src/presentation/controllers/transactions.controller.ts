import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddTransactionUseCase, DeleteAllTransactionsUseCase, GetLast60SecondsTransactionsUseCase } from 'src/application/use-cases';
import { CreateTransactionDto, StatisticsResponseDto } from '../dtos';
import { USE_CASE_TOKENS } from 'src/domain/tokens';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
    constructor(
        @Inject(USE_CASE_TOKENS.ADD_TRANSACTION)
        private readonly addTransaction: AddTransactionUseCase,

        @Inject(USE_CASE_TOKENS.DELETE_ALL_TRANSACTIONS)
        private readonly deleteAll: DeleteAllTransactionsUseCase,
        
        @Inject(USE_CASE_TOKENS.GET_LAST_TRANSACTIONS)
        private readonly getLast60s: GetLast60SecondsTransactionsUseCase,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Adiciona uma nova transação' })
    @ApiResponse({ status: 201, description: 'Transação criada com sucesso' })
    async add(@Body() dto: CreateTransactionDto) {
        await this.addTransaction.execute(
            Number(dto.amount),
            new Date(dto.timestamp),
        );
        return { message: 'Transação aceita e registrada.' };
    }

    @Delete()
    @ApiOperation({ summary: 'Deleta todas as transações' })
    @ApiResponse({ status: 200, description: 'Todas as transações foram deletadas' })
    async delete() {
        await this.deleteAll.execute();
        return { message: 'Todas as transações foram apagadas com sucesso.' };
    }

    @Get()
    @ApiOperation({ summary: 'Lista transações dos últimos 60 segundos' })
    @ApiResponse({
        status: 200,
        description: 'Estatísticas das transações recentes',
        type: StatisticsResponseDto,
    })
    async list(): Promise<StatisticsResponseDto> {
        const itens = await this.getLast60s.execute();

        if (!itens) {
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

        return {
            count: itens.length,
            sum: sum,
            avg: sum / itens.length,
            min: Math.min(...amounts),
            max: Math.max(...amounts),
        };
    }
}
