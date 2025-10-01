import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-dashboar',
  imports: [CommonModule, MatToolbarModule, MatIconModule, RouterModule,MatSidenavModule,MatListModule],
  templateUrl: './dashboar.html',
  styleUrl: './dashboar.css',
})
export class Dashboar implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  get user() {
    return this.auth.users; // ✅ cada vez que se accede, devuelve el signal
  }

  logout() {
    this.auth.clearUser();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  navigateFunds() {
    this.router.navigate(['dashboar/funds']);
  }

  navigateTransactions() {
    this.router.navigate(['dashboar/transactions']);
  }

  navigateHome() {
    this.router.navigate(['/dashboar/home']);
  }
}
