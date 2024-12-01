import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharedImports } from '../../shared/shared-imports';
import { AuthServiceService } from '../../../services/auth-service.service';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [...SharedImports, RouterLink],
  providers: [AuthServiceService],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  userData = {
    email: '',
  };

  resetLinkSent: boolean = false; // Track if reset link was sent
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthServiceService) {}

  onSubmit(): void {
    if (this.userData.email) {
      this.errorMessage = null;

      this.authService.forgotPassword(this.userData.email).subscribe({
        next: (response) => {
          console.log('Reset link sent successfully:', response);
          this.resetLinkSent = true; // Show confirmation UI
        },
        error: (error) => {
          console.error('Error sending reset link:', error);
          this.errorMessage = error?.error?.message || 'Please enter a valid email.';
        },
      });
    } else {
      this.errorMessage = 'Please enter your email.';
    }
  }
}
