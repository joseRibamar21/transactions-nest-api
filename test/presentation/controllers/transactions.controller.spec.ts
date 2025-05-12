import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from 'src/presentation/controllers/transactions.controller';
import { AddTransactionUseCase, DeleteAllTransactionsUseCase } from 'src/application/use-cases';
import { BadRequestException, UnprocessableEntityException } from '@nestjs/common';
import { USE_CASE_TOKENS } from 'src/domain/tokens';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let addUseCase: AddTransactionUseCase;
  let deleteUseCase: DeleteAllTransactionsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: USE_CASE_TOKENS.ADD_TRANSACTION,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: USE_CASE_TOKENS.DELETE_ALL_TRANSACTIONS,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get(TransactionsController);
    addUseCase = module.get(USE_CASE_TOKENS.ADD_TRANSACTION);
    deleteUseCase = module.get(USE_CASE_TOKENS.DELETE_ALL_TRANSACTIONS);
  });

  describe('add()', () => {
    it('deve adicionar uma transação válida', async () => {
      const dto = { amount: 100, timestamp: new Date().toISOString() };

      const result = await controller.add(dto);

      expect(addUseCase.execute).toHaveBeenCalledWith(
        dto.amount,
        new Date(dto.timestamp),
      );
      expect(result).toEqual({ message: 'Transação aceita e registrada.' });
    });

    it('deve lançar erro se o amount for inválido', async () => {
      const dto = { amount: 'abc', timestamp: new Date().toISOString() };

      await expect(controller.add(dto as any)).rejects.toThrow(BadRequestException);
    });

    it('deve lançar erro se o amount for negativo', async () => {
      const dto = { amount: -100, timestamp: new Date().toISOString() };

      await expect(controller.add(dto)).rejects.toThrow(UnprocessableEntityException);
    });

    it('deve lançar erro se o timestamp for inválido', async () => {
      const dto = { amount: 100, timestamp: 'invalid-date' };

      await expect(controller.add(dto as any)).rejects.toThrow(BadRequestException);
    });

    it('deve lançar erro se o timestamp estiver no futuro', async () => {
      const futureDate = new Date(Date.now() + 100000).toISOString();
      const dto = { amount: 100, timestamp: futureDate };

      await expect(controller.add(dto)).rejects.toThrow(UnprocessableEntityException);
    });
  });

  describe('delete()', () => {
    it('deve deletar todas as transações', async () => {
      const result = await controller.delete();
      expect(deleteUseCase.execute).toHaveBeenCalled();
      expect(result).toEqual({ message: 'Todas as transações foram apagadas com sucesso.' });
    });
  });
});
