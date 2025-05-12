import { Transaction } from 'src/domain/entities/transaction.entity';
import { TransactionError } from 'src/domain/errors/transaction-error';

describe('Transaction Entity', () => {
  it('Deve criar uma transação válida', () => {
    const amount = 100;
    const timestamp = new Date();
    const transaction = new Transaction({ amount, timestamp });

    expect(transaction.amount).toBe(amount);
    expect(transaction.timestamp).toBe(timestamp);
  });

  it('Deve lançar erro se o valor for negativo', () => {
    const amount = -100;
    const timestamp = new Date();

    expect(() => new Transaction({ amount, timestamp })).toThrow(TransactionError);
    expect(() => new Transaction({ amount, timestamp })).toThrow('NEGATIVE_AMOUNT');
  });

  it('Deve lançar erro se o timestamp estiver no futuro', () => {
    const amount = 100;
    const timestamp = new Date(Date.now() + 10000); // 10s no futuro

    expect(() => new Transaction({ amount, timestamp })).toThrow(TransactionError);
    expect(() => new Transaction({ amount, timestamp })).toThrow('INVALID_TIMESTAMP');
  });

  it('Deve permitir leitura e escrita de propriedades via getter/setter', () => {
    const transaction = new Transaction({ amount: 100, timestamp: new Date() });

    transaction.amount = 200;
    transaction.timestamp = new Date('2023-01-01');

    expect(transaction.amount).toBe(200);
    expect(transaction.timestamp).toEqual(new Date('2023-01-01'));
  });

  it('Deve retornar uma string com os dados da transação', () => {
    const timestamp = new Date('2023-01-01T00:00:00Z');
    const transaction = new Transaction({ amount: 150, timestamp });

    expect(transaction.toString()).toBe(`Transaction: 150 at ${timestamp}`);
  });
});
