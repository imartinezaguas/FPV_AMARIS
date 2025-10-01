import { AuthRepository } from "../../domain/repositories/auth-repository";
import { UserRepository } from "../../domain/repositories/user-repository";
import { User } from "../../domain/user";

export class AuthRepositoryImpl implements AuthRepository {

  constructor(private users: UserRepository) {}

  async login(username: string, password: string): Promise<User | null> {
    const user = await this.users.getByUsername(username);
    if (!user) return null;
    // mock simple: compara texto plano
    return user.password === password ? user : null;
  }
}
