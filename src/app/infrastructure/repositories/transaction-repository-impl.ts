import { TransactionRepository } from './../../domain/repositories/transaction-respository';
import { Transaction } from '../../domain/user';
import { TX_KEY } from '../../constants/const';

export class TransactionRepositoryImpl implements TransactionRepository {
 private read(): Transaction[] {
    const raw = localStorage.getItem(TX_KEY);
    if (!raw) return [];
    // Rehidratar fechas (JSON guarda Date como string)
    const arr = JSON.parse(raw) as Array<Omit<Transaction, 'date'> & { date: string }>;
    return arr.map(t => ({ ...t, date: new Date(t.date) }));
  }

  private write(list: Transaction[]): void {
    // Guardar; Date se serializa a ISO automáticamente
    localStorage.setItem(TX_KEY, JSON.stringify(list));
  }

  async latest(limit = 20, userId?: number): Promise<Transaction[]> {
    const store = this.read();
    const filtered = userId ? store.filter(t => t.userId === userId) : store;
    return filtered
      .sort((a, b) => +b.date - +a.date)
      .slice(0, limit);
  }

  async add(tx: Transaction): Promise<void> {
    const list = this.read();
    list.push(tx);
    this.write(list);
  }

  // (Opcional) para testing / reset
  async clear(): Promise<void> {
    localStorage.removeItem(TX_KEY);
  }
}
