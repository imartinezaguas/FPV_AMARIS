import { SubscribeFundUseCase } from './../../../application/uses-case/subscribe-fund.usecase';
import { GetFundsUseCase } from './../../../application/uses-case/get-fuds.usecase';
import { Component, OnInit } from '@angular/core';
import {CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/auth.service';
import { Fund } from '../../../domain/user';
import { CancelFundUseCase } from '../../../application/uses-case/cancel-fund.usescase';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-fund-list',
  imports: [CommonModule, MatCardModule,
    MatButtonModule,MatIconModule],
  templateUrl: './fund-list.html',
  styleUrl: './fund-list.css'
})
export class FundList implements OnInit {
  funds: Fund[] = [];
  loading = true;

  constructor(
    private getFunds: GetFundsUseCase,
    private subscribeFund: SubscribeFundUseCase,
    private cancelSubcribeFund: CancelFundUseCase,
    private auth: AuthService,

  ) {}

  isSubscribed(fundId: number): boolean {
  const u = this.auth.getUser();
  return !!u?.portfolio.some(f => f.id === fundId);
}


  async ngOnInit() {
    this.funds = await this.getFunds.execute();
    this.loading = false;
  }

async subscribe(fundId: number) {
  const u = this.auth.getUser();
  if (!u) { alert('Debes iniciar sesión'); return; }

  try {
    const { tx, user } = await this.subscribeFund.execute(u.id, fundId);
    this.auth.setUser(user);               // refresca sesión (signals) -> toolbar/balance
    alert(` Suscripción creada. Transacción: ${tx.id}`);
  } catch (e: any) {
    alert(`${e.message ?? e}`);
  }
}

async cancelSubcribe(fundId:number){
  const u = this.auth.getUser();
  if (!u) { alert('Debes iniciar sesión'); return; }


  try {
    const { tx, user } = await this.cancelSubcribeFund.execute(u.id, fundId);
    this.auth.setUser(user);               // refresca sesión (signals) -> toolbar/balance
    alert(` Suscripción cancelada. Transacción: ${tx.id}`);
  } catch (e: any) {
    alert(` ${e.message ?? e}`);
  }

}

}
