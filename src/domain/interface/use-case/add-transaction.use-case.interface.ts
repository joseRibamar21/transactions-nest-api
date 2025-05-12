import { Transaction } from "src/domain/entities";

export interface IAddTransactionUseCase {
    execute(amount: number, timestamp: Date): Promise<Transaction>;
  }