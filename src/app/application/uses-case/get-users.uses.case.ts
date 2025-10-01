import { UserRepository } from '../../domain/repositories/user-repository';
import { User } from '../../domain/user';

export class GetUsersUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepo.getAll();
  }
}
