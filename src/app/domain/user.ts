export interface User {
  id: number;
  name: string;
  role: 'Admin' | 'Consultor' | 'Cliente';
  username: string;
  password: string;
  balance: number;
  portfolio: Fund[];
}


export interface Fund {
  id: number;
  name: string;
  minAmount: number;
  category: 'FPV' | 'FIC';
}


export interface Transaction {
  id: string;
  type: 'apertura' | 'cancelacion';
  userId: number;
  fundId: number;
  amount: number;
  date: Date;
}
