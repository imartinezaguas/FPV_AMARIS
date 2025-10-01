import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ChangePasswordUseCase } from '../../../../application/uses-case/change-password.usecase';
import { AuthService } from '../../../../core/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

function matchPasswords(group: AbstractControl): ValidationErrors | null {
  const pass = group.get('password')?.value ?? '';
  const confirm = group.get('confirm')?.value ?? '';
  return pass && confirm && pass !== confirm ? { mismatch: true } : null;
}

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule,ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword {
  hide1 = true;
  hide2 = true;
  form: any;
  constructor(
    private fb: FormBuilder,
    private changePassword: ChangePasswordUseCase,
    private auth: AuthService,
    private router: Router
  ) {
      this.form = this.fb.group({
    username: ['', [Validators.required]],
    passwordGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm:  ['', [Validators.required]],
    }, { validators: matchPasswords })
  });
  }

  async onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const username = this.form.value.username!;
    const password = this.form.value.passwordGroup?.password!;

    try {
      const updatedUser = await this.changePassword.execute(username, password);

      // Si el usuario que cambió es el que está logueado, actualizamos la sesión (signals/localStorage)
      const current = this.auth.getUser();
      if (current && current.username === updatedUser.username) {
        this.auth.setUser({ ...current, password }); // mantenemos balance/portfolio/role
      }

      alert('Contraseña actualizada. Inicia sesión con la nueva contraseña.');
      this.router.navigate(['/login'], { replaceUrl: true });
    } catch (e: any) {
      alert(` ${e?.message ?? 'No fue posible cambiar la contraseña'}`);
    }
  }

  goBackLogin(){
    this.router.navigate(['/login'])
  }
}
