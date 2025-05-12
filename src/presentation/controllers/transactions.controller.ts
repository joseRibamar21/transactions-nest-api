import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Inject,
    Logger,
    Post,
    UnprocessableEntityException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
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
    @ApiBody({ type: CreateTransactionDto })
    @ApiResponse({ status: 201, description: 'Transação criada com sucesso' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 422, description: 'Unprocessable Entity' })
    async add(@Body() dto: CreateTransactionDto) {
        this.logger.log(`Adicionando transação: ${JSON.stringify(dto)}`);
        const amount = Number(dto.amount);
        const timestamp = new Date(dto.timestamp);
        const now = new Date();
        
        if (isNaN(amount)) {
            throw new BadRequestException('O campo amount deve ser um número válido.');
        }

        if (amount < 0) {
            throw new UnprocessableEntityException('O amount não pode ser negativo.');
        }

        if (isNaN(timestamp.getTime())) {
            throw new BadRequestException('O campo timestamp deve ser uma data válida.');
        }

        if (timestamp > now) {
            throw new UnprocessableEntityException('A transação não pode ocorrer no futuro.');
        }
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
