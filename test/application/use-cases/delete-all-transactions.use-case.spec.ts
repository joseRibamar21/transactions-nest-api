import { DeleteAllTransactionsUseCase } from "src/application/use-cases";

describe('DeleteAllTransactionsUseCase', () => {
  const mockRepo = {
    deleteAll: jest.fn(),
  };

  const mockEventHandler = {
    onTransactionsDeleted: jest.fn(),
  };

  const useCase = new DeleteAllTransactionsUseCase(
    mockRepo as any,
    mockEventHandler as any,
  );

  it('Deve deletar todas as transações', async () => {
    await useCase.execute();

    expect(mockRepo.deleteAll).toHaveBeenCalledTimes(1);
    expect(mockEventHandler.onTransactionsDeleted).toHaveBeenCalledTimes(1);
  });
});
