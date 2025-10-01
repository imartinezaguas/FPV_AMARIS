import { Transaction } from "../user";

export interface TransactionRepository {

  latest(limit?: number, userId?: number): Promise<Transaction[]>;

  add(tx: Transaction): Promise<void>;
}
