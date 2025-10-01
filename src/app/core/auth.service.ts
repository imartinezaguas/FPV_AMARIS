import { Injectable, signal } from '@angular/core';
import { User } from '../domain/user';
import { STORAGE_KEY } from '../constants/const';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
private user = signal<User | null>(this.getUserFromStorage());

  private getUserFromStorage(): User | null {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

    get users() {
    return this.user.asReadonly();
  }

  setUser(u: User) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    this.user.set(u);
  }

  getUser(): User | null {
    return this.user();
  }

  clearUser() {
    localStorage.removeItem(STORAGE_KEY);
    this.user.set(null);
  }

  isAuthenticated(): boolean {
    return this.user() !== null;
  }

  hasRole(roles: string[]): boolean {
    const u = this.user();
    return !!u && roles.includes(u.role);
  }
}
