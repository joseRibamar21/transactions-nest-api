import { Transaction } from "src/domain/entities";

export interface IGetLastTransactionsUseCase {
    execute(): Promise<Transaction[]>;
  }
  