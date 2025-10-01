import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginUseCase } from '../../../application/uses-case/login.usecase';
import { AuthService } from '../../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private loginUseCase: LoginUseCase
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const user = await this.loginUseCase.execute(username!, password!);

      if (user) {
        this.auth.setUser(user); // Guardar en AuthService/localStorage

        // Redirigir según el rol
        if (user.role === 'Admin' || user.role === 'Consultor' || user.role === 'Cliente') {
          this.router.navigate(['/dashboar']);
        }
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    }
  }

  navigateResetPassword(){
    this.router.navigate(['/reset-password'])
  }

}
