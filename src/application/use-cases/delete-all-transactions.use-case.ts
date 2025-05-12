import { Inject, Injectable } from "@nestjs/common";
import { ITransactionEventHandler } from "src/domain/interface/events";
import { ITransactionRepository } from "src/domain/interface/repositories";
import { IDeleteAllTransactionsUseCase } from "src/domain/interface/use-case";
import { EVENT_HANDLER_TOKENS, REPOSITORY_TOKENS } from "src/domain/tokens";

@Injectable()
export class DeleteAllTransactionsUseCase implements IDeleteAllTransactionsUseCase {
  constructor(
    @Inject(REPOSITORY_TOKENS.TRANSACTION)
    private readonly transactionRepo: ITransactionRepository,
    @Inject(EVENT_HANDLER_TOKENS.TRANSACTION)
    private readonly eventHandler: ITransactionEventHandler,
  ) { }

  async execute(): Promise<void> {
    await this.transactionRepo.deleteAll();
    this.eventHandler.onTransactionsDeleted();
    
  }
}
