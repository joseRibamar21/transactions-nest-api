import { Inject, Injectable } from "@nestjs/common";
import { ITransactionRepository } from "src/domain/interface/repositories";
import { IDeleteAllTransactionsUseCase } from "src/domain/interface/use-case";
import { REPOSITORY_TOKENS } from "src/domain/tokens";

@Injectable()
export class DeleteAllTransactionsUseCase implements IDeleteAllTransactionsUseCase {
  constructor(
    @Inject(REPOSITORY_TOKENS.TRANSACTION)
    private readonly transactionRepo: ITransactionRepository) {}

  async execute(): Promise<void> {
    await this.transactionRepo.deleteAll();
  }
}
