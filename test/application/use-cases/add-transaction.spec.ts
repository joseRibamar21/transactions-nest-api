import { Transaction } from "../../../src/domain/entities/transaction.entity";
import { AddTransactionUseCase } from "../../../src/application/use-cases/add-transaction.use-case";

describe('AddTransactionUseCase', () => {
  const mockRepo = {
    addTransaction: jest.fn(),
  };

  const mockEventHandler = {
    onTransactionCreated: jest.fn(),
  };

  const useCase = new AddTransactionUseCase(
    mockRepo as any,
    mockEventHandler as any,
  );

  it('Quando criar uma transação com um valor negativo, deve lançar um erro', async () => {
    const amount = -100;
    const timestamp = new Date();

    await expect(useCase.execute(amount, timestamp)).rejects.toThrow(Error);

    expect(mockRepo.addTransaction).toHaveBeenCalledTimes(0);
    expect(mockEventHandler.onTransactionCreated).not.toHaveBeenCalled();
  });

  it('Quando criar uma transação com um timestamp no futuro, deve lançar um erro', async () => {
    const amount = 100;
    const timestamp = new Date(Date.now() + 100000);

    await expect(useCase.execute(amount, timestamp)).rejects.toThrow(Error);

    expect(mockRepo.addTransaction).toHaveBeenCalledTimes(0);
    expect(mockEventHandler.onTransactionCreated).not.toHaveBeenCalled();
  });

  it('Quando criar uma transação com um valor e timestamp válidos, deve adicionar a transação', async () => {
    const amount = 100;
    const timestamp = new Date();

    await useCase.execute(amount, timestamp);

    expect(mockRepo.addTransaction).toHaveBeenCalledTimes(1);
    expect(mockEventHandler.onTransactionCreated).toHaveBeenCalledTimes(1);
  }
  );

  it('Quando criar uma transação com um valor e timestamp válidos, deve retornar a transação', async () => {
    const amount = 100;
    const timestamp = new Date();

    const transaction = await useCase.execute(amount, timestamp);

    expect(transaction).toBeInstanceOf(Transaction);
    expect(transaction.amount).toBe(amount);
    expect(transaction.timestamp).toEqual(timestamp);
  });

  it('Quando criar uma transação com um valor e timestamp válidos, deve chamar o método toString', async () => {
    const amount = 100;
    const timestamp = new Date();

    const transaction = await useCase.execute(amount, timestamp);

    expect(transaction.toString()).toBe(`Transaction: ${amount} at ${timestamp}`);
  });
});
