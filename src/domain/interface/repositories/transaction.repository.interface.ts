import { Transaction } from '../../entities/transaction.entity';

export interface ITransactionRepository {
  addTransaction(transaction: Transaction): Promise<void>;
  deleteAll(): Promise<void>;
  getLast60SecondsTransactions(): Promise<Transaction[]>;
}