import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/domain/entities';
import { ITransactionRepository } from 'src/domain/interface/repositories';

@Injectable()
export class MemoryTransactionRepository implements ITransactionRepository {
  private transactions: Transaction[] = [];

  async addTransaction(transaction: Transaction): Promise<void> {
    return new Promise((resolve) => {
      this.transactions.push(transaction);
      resolve();
    });
  }

  async deleteAll(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    this.transactions = [];
  }

  async getLast60SecondsTransactions(): Promise<Transaction[]> {
    const now = new Date().getTime();
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.transactions.filter(t => now - t.timestamp.getTime() <= 60_000);
  }
}
