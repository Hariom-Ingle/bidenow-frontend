import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedImports } from '../shared/shared-imports';

import { AuthServiceService } from '../../services/auth-service.service';
@Component({
  selector: 'app-logout',
  standalone: true,
  providers: [AuthServiceService],
  imports: [...SharedImports],
  templateUrl: './logout.component.html',
})
export class LogoutComponent {
  constructor(public router: Router, private authService: AuthServiceService) {}

  // Handle user logout
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // Clear stored user data
        localStorage.clear();
        sessionStorage.clear();
        console.log('User logged out and data cleared.');

        // Redirect to the login page
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed:', error);
        alert('Failed to log out. Please try again.');
      },
    });
  }
}
