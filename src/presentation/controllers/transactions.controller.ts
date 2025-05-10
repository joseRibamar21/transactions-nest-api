import {
    Body,
    Controller,
    Delete,
    Inject,
    Logger,
    Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddTransactionUseCase, DeleteAllTransactionsUseCase } from 'src/application/use-cases';
import { CreateTransactionDto } from '../dtos';
import { USE_CASE_TOKENS } from 'src/domain/tokens';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
    private readonly logger = new Logger(TransactionsController.name);

    constructor(
        @Inject(USE_CASE_TOKENS.ADD_TRANSACTION)
        private readonly addTransaction: AddTransactionUseCase,

        @Inject(USE_CASE_TOKENS.DELETE_ALL_TRANSACTIONS)
        private readonly deleteAll: DeleteAllTransactionsUseCase,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Adiciona uma nova transação' })
    @ApiResponse({ status: 201, description: 'Transação criada com sucesso' })
    async add(@Body() dto: CreateTransactionDto) {
        this.logger.log(`Adicionando transação: ${JSON.stringify(dto)}`);
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
        this.logger.log('Deletando todas as transações');
        await this.deleteAll.execute();
        return { message: 'Todas as transações foram apagadas com sucesso.' };
    }
}
