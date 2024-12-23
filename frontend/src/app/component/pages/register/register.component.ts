import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedImports } from '../../shared/shared-imports';
import { AuthServiceService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [...SharedImports],
  providers: [AuthServiceService], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userData = {
    username: '',
    email: '',
    password: '',
    role: '', // User role (bidder/seller)
  };
  profileImage: File | null = null; // Holds the selected profile image file
  errorMessage: string | null = null;
  loading: boolean = false; // Loading state for the registration process

  constructor(private router: Router, private authService: AuthServiceService) {}

  // Handle file input change
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.profileImage = input.files[0];
    }
  }

  onSubmit(): void {
    if (
      this.userData.username &&
      this.userData.email &&
      this.userData.password &&
      this.userData.role &&
      this.profileImage
    ) {
      this.loading = true; // Show loader while processing registration
      this.authService
        .registerUser(this.userData, this.profileImage)
        .subscribe({
          next: (response) => {
            console.log('Registration successful:', response);
            this.router.navigate(['/verify-email']);
          },
          error: (error) => {
            console.error('Registration error:', error);
            this.errorMessage = error?.error?.message || 'Registration failed.';
          },
          complete: () => {
            this.loading = false; // Hide loader after the request is completed
          }
        });
    } else {
      this.errorMessage = 'All fields are required, including profile image.';
    }
  }
}
