import { Transaction } from '../entities/transaction.entity';

export interface TransactionRepository {
  addTransaction(transaction: Transaction): void;
  deleteAll(): void;
  getLast60SecondsTransactions(): Transaction[];
}
