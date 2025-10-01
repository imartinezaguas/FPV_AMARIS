import { GetTransactionsUseCase } from './../../../application/uses-case/get-transaction.usescase';
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../../core/auth.service';
import { Transaction, User } from '../../../domain/user';
import { GetUsersUseCase } from '../../../application/uses-case/get-users.uses.case';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-transactions-history',
  imports: [  CommonModule, MatCardModule, MatTableModule, MatIconModule,
   MatSelectModule, FormsModule, MatDividerModule,MatProgressSpinnerModule],
  templateUrl: './transactions-history.html',
  styleUrl: './transactions-history.css',
})
export class TransactionsHistory implements OnInit {
  displayedColumns = ['date', 'type', 'fund', 'amount','transactions','user'];
  data: Transaction[] = [];
  users: User[] = [];
  selectedUserId?: number;
  loading = true;

  constructor(
    private getTxs: GetTransactionsUseCase,
    private getUsers: GetUsersUseCase,
    public auth: AuthService
  ) {}

  async ngOnInit() {
    const u = this.auth.getUser();
    if (!u) return;

    if (u.role === 'Cliente') {
      this.data = await this.getTxs.execute(20, u.id);
    } else if (u.role === 'Admin') {
      this.data = await this.getTxs.execute(20);
    } else if (u.role === 'Consultor') {
      this.users = (await this.getUsers.execute()).filter((x) => x.role !== 'Consultor');
    }

    this.loading = false;
  }

  async onUserChange(userId: number) {
    this.loading = true;
    this.selectedUserId = userId;
    this.data = await this.getTxs.execute(20, userId);
    this.loading = false;
  }
}
