import { FundRepository } from '../../domain/repositories/fund-repository';
import { TransactionRepository } from '../../domain/repositories/transaction-respository';
import { UserRepository } from '../../domain/repositories/user-repository';
import { Transaction, User } from '../../domain/user';

export class CancelFundUseCase {
  constructor(private fundRepo: FundRepository,private userRepo: UserRepository, private txRepo: TransactionRepository) {}
  async execute(userId: number, fundId: number): Promise<{ tx: Transaction; user: User }> {
    const user = await this.userRepo.getById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    const fund = (await this.fundRepo.getFunds()).find(f => f.id === fundId);
    if (!fund) throw new Error('Fondo no encontrado');

    if (!user.portfolio.some(p => p.id === fundId)) throw new Error('No tienes este fondo');

    user.balance += fund.minAmount;
    user.portfolio = user.portfolio.filter(p => p.id !== fundId);
    await this.userRepo.save(user);

    const tx: Transaction = {
      id: crypto.randomUUID(),
      type: 'cancelacion',
      userId,
      fundId,
      amount: fund.minAmount,
      date: new Date()
    };
    await this.txRepo.add(tx);

    return { tx, user };
  }
}
