import { Transaction } from "src/domain/entities";
import { MemoryTransactionRepository } from "src/infrastructure/repository";


describe('MemoryTransactionRepository', () => {
  let repo: MemoryTransactionRepository;

  beforeEach(() => {
    repo = new MemoryTransactionRepository();
  });

  it('Deve adicionar uma transação', async () => {
    const transaction = new Transaction({ amount: 100, timestamp: new Date() });
    
    await repo.addTransaction(transaction);

    const result = await repo.getLast60SecondsTransactions();
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(transaction);
  });

  it('Deve deletar todas as transações', async () => {
    const transaction = new Transaction({ amount: 100, timestamp: new Date() });
    await repo.addTransaction(transaction);

    await repo.deleteAll();
    const result = await repo.getLast60SecondsTransactions();
    expect(result).toHaveLength(0);
  });

  it('Deve retornar apenas transações dos últimos 60 segundos', async () => {
    const now = new Date();
    const recent = new Transaction({ amount: 100, timestamp: new Date(now.getTime() - 30_000) }); // dentro da janela
    const old = new Transaction({ amount: 200, timestamp: new Date(now.getTime() - 70_000) }); // fora da janela

    await repo.addTransaction(recent);
    await repo.addTransaction(old);

    const result = await repo.getLast60SecondsTransactions();
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(recent);
  });

  it('Deve retornar um erro se adicionar uma transação com valor negativo', async () => {
    expect(() => {
        new Transaction({ amount: -100, timestamp: new Date() });
      }).toThrow('NEGATIVE_AMOUNT');
  }); 

    it('Deve retornar um erro se adicionar uma transação com timestamp no futuro', async () => {
        expect(() => {
            new Transaction({ amount: 100, timestamp: new Date(Date.now() + 10000) });
        }).toThrow('INVALID_TIMESTAMP');
    });

});
