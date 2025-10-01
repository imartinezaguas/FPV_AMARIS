import { UserRepository } from '../../domain/repositories/user-repository';
import { User } from '../../domain/user';

export class ChangePasswordUseCase {
  constructor(private users: UserRepository) {}

  /** Cambia la contraseña del usuario. Lanza error si no existe. */
  async execute(username: string, newPassword: string): Promise<User> {
    const user = await this.users.getByUsername(username);
    if (!user) throw new Error('Usuario no encontrado');

    if (newPassword.length < 4) throw new Error('La contraseña debe tener al menos 4 caracteres');

    user.password = newPassword;
    await this.users.save(user);
    return user;
  }
}
