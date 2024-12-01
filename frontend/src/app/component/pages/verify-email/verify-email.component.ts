import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedImports } from '../../shared/shared-imports';
import { AuthServiceService } from '../../../services/auth-service.service';
@Component({
  selector: 'app-verify-email',
  standalone: true,
  providers: [AuthServiceService],
  imports: [...SharedImports],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent {
  code: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private router: Router, private authService: AuthServiceService) {}

  verifyCode() {
    if (this.code.length !== 6) {
      this.errorMessage = 'Code must be 6 digits.';
      this.successMessage = null;
      return;
    }

    this.authService.verifyEmail(this.code).subscribe({
      next: () => {
        this.successMessage = 'Email verified successfully!';
        this.errorMessage = null;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = error.error.message || 'Failed to verify email.';
        this.successMessage = null;
      },
    });
  }
}
