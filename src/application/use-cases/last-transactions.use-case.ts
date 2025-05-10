import { Inject, Injectable } from "@nestjs/common";
import { Transaction } from "src/domain/entities";
import { ITransactionRepository } from "src/domain/interface/repositories";
import { IGetLastTransactionsUseCase } from "src/domain/interface/use-case";
import { REPOSITORY_TOKENS } from "src/domain/tokens";


@Injectable()
export class GetLast60SecondsTransactionsUseCase implements IGetLastTransactionsUseCase {
  constructor(
    @Inject(REPOSITORY_TOKENS.TRANSACTION)
    private readonly transactionRepo: ITransactionRepository) {}

  async execute(): Promise<Transaction[]> {
    return await this.transactionRepo.getLast60SecondsTransactions();
  }
}
