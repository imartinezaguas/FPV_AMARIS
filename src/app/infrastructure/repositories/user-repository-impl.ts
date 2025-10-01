import { UserRepository } from '../../domain/repositories/user-repository';
import { User } from '../../domain/user';

const USERS_KEY = 'users_mock';

export class UserRepositoryImpl implements UserRepository {
  private cache: User[];

  constructor() {
    const raw = localStorage.getItem(USERS_KEY);
    this.cache = raw ? JSON.parse(raw) : [
      { id: 1, name: 'Administrador', username:'admin', password:'1234', role:'Admin',     balance: 500000, portfolio: [] },
      { id: 2, name: 'Anderson Ocampo', username:'aocampo', password:'1234', role:'Consultor', balance: 0, portfolio: [] },
      { id: 3, name: 'Ivan Martinez',   username:'imartinez', password:'1234', role:'Cliente',   balance: 500000, portfolio: [] },
      { id: 4, name: 'Juliana Londoño',   username:'julilon', password:'1234', role:'Cliente',   balance: 500000, portfolio: [] },
    ];
    this.flush();
  }
  async getAll(): Promise<User[] > {
    return this.cache;
  }

  private flush() { localStorage.setItem(USERS_KEY, JSON.stringify(this.cache)); }

  async getById(id: number): Promise<User | null> {
    return this.cache.find(u => u.id === id) ?? null;
  }

   async getByUsername(username: string): Promise<User | null> {
    return this.cache.find(u => u.username === username) ?? null;
  }

  async save(user: User): Promise<void> {
    const i = this.cache.findIndex(u => u.id === user.id);
    if (i >= 0) this.cache[i] = user; else this.cache.push(user);
    this.flush();
  }
}
