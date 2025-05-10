import { TransactionError } from "../errors/transaction-error";
import { Entity } from "./entity";

export interface TransactionProps {
    amount: number
    timestamp: Date
}

export class Transaction extends Entity<TransactionProps> {
    constructor(props: TransactionProps) {
        if (props.amount < 0) {
            throw new TransactionError('NEGATIVE_AMOUNT');
        }
        if (props.timestamp > new Date()) {
            throw new TransactionError('INVALID_TIMESTAMP');
        }
        super(props);
    }

    get amount(): number {
        return this.props.amount;
    }
    get timestamp(): Date {
        return this.props.timestamp;
    }

    set amount(value: number) {
        this.props.amount = value;
    }

    set timestamp(value: Date) {
        this.props.timestamp = value;
    }

    toString(): string {
        return `Transaction: ${this.props.amount} at ${this.props.timestamp}`;
    }
  }
  