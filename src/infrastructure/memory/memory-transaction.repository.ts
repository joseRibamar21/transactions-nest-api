import { Transaction } from "src/domain/entities";
import { TransactionRepository } from "src/domain/repositories";


export class InMemoryTransactionRepository implements TransactionRepository {
  private transactions: Transaction[] = [];

  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
  }

  deleteAll(): void {
    this.transactions = [];
  }

  getLast60SecondsTransactions(): Transaction[] {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);

    return this.transactions.filter(t => t.timestamp >= oneMinuteAgo);
  }
}
