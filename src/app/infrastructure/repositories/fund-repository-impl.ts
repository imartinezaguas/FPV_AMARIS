import { FundRepository } from '../../domain/repositories/fund-repository';
import { Fund, Transaction } from '../../domain/user';


export class FundRepositoryImpl implements FundRepository {
  private funds: Fund[] = [
    { id: 1, name: 'FPV_BTG_PACTUAL_RECAUDADORA', minAmount: 75000, category: 'FPV' },
    { id: 2, name: 'FPV_BTG_PACTUAL_ECOPETROL', minAmount: 125000, category: 'FPV' },
    { id: 3, name: 'DEUDAPRIVADA', minAmount: 50000, category: 'FPV' },
    { id: 4, name: 'FDO-ACCIONES', minAmount: 250000, category: 'FPV' },
    { id: 5, name: 'FPV_BTG_PACTUAL_DINAMICA', minAmount: 100000, category: 'FPV' }
  ];

  async getFunds(): Promise<Fund[]> {
    return this.funds;
  }

  async subscribe(userId: number, fundId: number): Promise<Transaction> {
    const f = this.funds.find(x => x.id === fundId)!;
    return { id: crypto.randomUUID(), type: 'apertura', userId, fundId, amount: f.minAmount, date: new Date() };
  }

  async cancel(userId: number, fundId: number): Promise<Transaction> {
    const f = this.funds.find(x => x.id === fundId)!;
    return { id: crypto.randomUUID(), type: 'cancelacion', userId, fundId, amount: f.minAmount, date: new Date() };
  }
}
