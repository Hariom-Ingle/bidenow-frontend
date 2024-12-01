import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../services/auth-service.service';
import { UserServiceService } from '../../../services/user-service.service';
import { SharedImports } from '../../shared/shared-imports';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [...SharedImports],
  providers: [AuthServiceService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userData = {
    email: '',
    password: '',
    role: '',
  };

  errorMessage: string | null = null;
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private userService: UserServiceService // Inject UserServiceService
  ) {}

  // Submit handler for login
  onSubmit(): void {
    if (this.userData.email && this.userData.password && this.userData.role) {
      this.errorMessage = null;
      this.loading = true;
  
      this.authService.login(this.userData).subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);
          
          // Store user data in UserService (no need for manual localStorage set)
          const user = {
            username: response.user.username,
            role: response.user.role,
            profileImage: response.user.profileImage?.url || 'assets/default-profile.jpg',
          };

          this.userService.updateUser(user); // Update user state in service

          this.loading = false;
          this.router.navigate(['']); // Navigate to home after successful login
        },
        error: (error) => {
          console.error('Login error:', error);
          this.loading = false;
          this.errorMessage = error?.error?.message || 'Login failed. Please try again.';
        },
      });
    } else {
      this.errorMessage = 'Please fill in all fields correctly.';
    }
  }
}
