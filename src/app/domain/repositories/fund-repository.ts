import { Fund, Transaction } from "../user";

export interface FundRepository {
  getFunds(): Promise<Fund[]>;
  subscribe(userId: number, fundId: number): Promise<Transaction>;
  cancel(userId: number, fundId: number): Promise<Transaction>;
}
