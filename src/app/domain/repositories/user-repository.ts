import { User } from '../user';

export interface UserRepository {
  getById(id: number): Promise<User | null>;
  getByUsername(username: string): Promise<User | null>;
  save(user: User): Promise<void>;
  getAll(): Promise<User[]>;
}
