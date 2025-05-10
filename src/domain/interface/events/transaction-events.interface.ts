export interface ITransactionEventHandler {
    onTransactionCreated(): void;
    onTransactionsDeleted(): void;
  }
  