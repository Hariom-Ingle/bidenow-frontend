import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../services/auth-service.service';
import { UserServiceService } from '../../../services/user-service.service';
import { ToastService } from '../../../services/toast.service'; // Import ToastService
import { SharedImports } from '../../shared/shared-imports';
import { ToastComponent } from "../../components/toast/toast.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [...SharedImports, ToastComponent],
  providers: [AuthServiceService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userData = {
    email: '',
    password: '',
    role: '',
    userId: '',
  };

  errorMessage: string | null = null;
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private userService: UserServiceService, // Inject UserServiceService
    private toastService: ToastService // Inject ToastService
  ) {}

  // Submit handler for login
  onSubmit(): void {
    if (this.userData.email && this.userData.password && this.userData.role) {
      this.errorMessage = null;
      this.loading = true;

      this.authService.login(this.userData).subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);

          // Store user data in UserService
          const user = {
            username: response.user.username,
            role: response.user.role,
            userId: response.user._id,
            profileImage: response.user.profileImage?.url || 'assets/default-profile.jpg',
          };

          this.userService.updateUser(user); // Update user state in service

          this.loading = false;

          // Show success toast
          this.toastService.showToast('Login successful! Welcome back.');

          // Navigate to home after successful login
          this.router.navigate(['']);
        },
        error: (error) => {
          console.error('Login error:', error);
          this.loading = false;

          // Show error toast
          this.toastService.showToast(
            error?.error?.message || 'Login failed. Please try again.'
          );
        },
      });
    } else {
      // Show error toast for validation issues
      this.toastService.showToast('Please fill in all fields correctly.');
    }
  }
}
