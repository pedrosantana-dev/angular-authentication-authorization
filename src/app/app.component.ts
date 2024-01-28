import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from './user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  authService = inject(AuthService);
  http = inject(HttpClient);

  ngOnInit() {
    this.http
      .get<{ user: UserInterface }>('https://api.realworld.io/api/user')
      .subscribe({
        next: (response) => {
          this.authService.currentUserSig.set(response.user);
        },
        error: (error) => {
          this.authService.currentUserSig.set(null);
        },
      });
  }

  logout() {
    console.log('logout');
    localStorage.setItem('token', '');
    this.authService.currentUserSig.set(null);
  }
}
