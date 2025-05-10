export interface IAddTransactionUseCase {
    execute(amount: number, timestamp: Date): Promise<void>;
  }