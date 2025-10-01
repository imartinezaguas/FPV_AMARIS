import { AuthRepository } from "../../domain/repositories/auth-repository";
import { User } from "../../domain/user";

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(username: string, password: string): Promise<User | null> {
    return this.authRepository.login(username, password);
  }
}
