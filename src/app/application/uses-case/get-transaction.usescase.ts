import { TransactionRepository } from "../../domain/repositories/transaction-respository";
import { Transaction } from "../../domain/user";

export class GetTransactionsUseCase {
  constructor(private repo: TransactionRepository) {}
  execute(limit = 20, userId?: number): Promise<Transaction[]> {
    return this.repo.latest(limit, userId);
  }
}
