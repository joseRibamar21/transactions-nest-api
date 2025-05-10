export class TransactionError extends Error {
    constructor(public code: 'NEGATIVE_AMOUNT' | 'INVALID_TIMESTAMP') {
      super(code);
    }
  }
  