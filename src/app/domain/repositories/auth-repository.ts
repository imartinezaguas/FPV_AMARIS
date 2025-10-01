import { User } from "../user";

export interface AuthRepository {
  login(username: string, password: string): Promise<User | null>;
}
